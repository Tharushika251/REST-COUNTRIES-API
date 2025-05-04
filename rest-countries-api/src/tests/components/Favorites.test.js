import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Favorites from '../../components/Favorites';

// Mock the AuthContext values
const mockToggleFavorite = jest.fn();
const mockFavorites = ['USA', 'IND'];

jest.mock('../../context/AuthContext', () => ({
    AuthContext: {
        Consumer: jest.fn(),
    },
}));

// Provide mock AuthContext values
const renderWithContext = (ui) => {
    return render(
        <Router>
            <AuthContext.Provider value={{ favorites: mockFavorites, toggleFavorite: mockToggleFavorite }}>
                {ui}
            </AuthContext.Provider>
        </Router>
    );
};

describe('Favorites Component', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve([
                        {
                            cca3: 'USA',
                            name: { common: 'United States' },
                            population: 331000000,
                            region: 'Americas',
                            capital: ['Washington, D.C.'],
                            flags: { png: 'flag.png' },
                        },
                        {
                            cca3: 'IND',
                            name: { common: 'India' },
                            population: 1380004385,
                            region: 'Asia',
                            capital: ['New Delhi'],
                            flags: { png: 'flag.png' },
                        },
                    ]),
            })
        );
    });

    // Test if loading state is shown while fetching data
    it('should show loading state while fetching favorites', async () => {
        renderWithContext(<Favorites />);
        const loadingText = screen.getByText(/Loading favorites.../i);
        expect(loadingText).toBeInTheDocument();
    });

    // Test if favorites are displayed correctly
    it('should display the favorite countries', async () => {
        renderWithContext(<Favorites />);

        // Wait for the countries to be displayed
        const usaCountry = await screen.findByText(/United States/i);
        const indiaCountry = await screen.findByText(/India/i);

        expect(usaCountry).toBeInTheDocument();
        expect(indiaCountry).toBeInTheDocument();
    });

    // Test if the unfavorite button calls the toggleFavorite function
    it('should call toggleFavorite when unfavorite button is clicked', async () => {
        renderWithContext(<Favorites />);

        // Wait for the unfavorite button
        const unfavoriteButton = await screen.findAllByRole('button', { name: /Remove from favorites/i });

        // Click on the unfavorite button for the first country (USA)
        fireEvent.click(unfavoriteButton[0]);

        // Check if toggleFavorite was called with the correct argument (cca3 code)
        expect(mockToggleFavorite).toHaveBeenCalledWith('USA');
    });

    // Test if no favorites message is displayed when there are no favorites
    it('should display a message if no favorites are added', async () => {
        // Provide an empty list of favorites
        const mockEmptyFavorites = [];
        renderWithContext(
            <AuthContext.Provider value={{ favorites: mockEmptyFavorites, toggleFavorite: mockToggleFavorite }}>
                <Favorites />
            </AuthContext.Provider>
        );

        const noFavoritesMessage = screen.getByText(/You haven't added any favorites yet/i);
        expect(noFavoritesMessage).toBeInTheDocument();
    });

    // Test if the API call fails and error is handled
    it('should display an error message if fetching fails', async () => {
        // Mock fetch to reject with an error
        global.fetch = jest.fn(() => Promise.reject(new Error('Failed to fetch favorites')));

        renderWithContext(<Favorites />);

        // Wait for the loading state
        const errorMessage = await screen.findByText(/Error fetching favorites/i);
        expect(errorMessage).toBeInTheDocument();
    });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Country from '../../components/Country';

// Mock AuthContext
const mockToggleFavorite = jest.fn();
const mockFavorites = [];

jest.mock('../context/AuthContext', () => ({
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

describe('Country Component', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{
                    cca3: 'USA',
                    name: { common: 'United States', nativeName: {} },
                    flags: { png: 'flag.png' },
                    population: 331000000,
                    region: 'Americas',
                    subregion: 'North America',
                    capital: ['Washington, D.C.'],
                    tld: ['.us'],
                    currencies: { USD: { name: 'United States dollar' } },
                    languages: { eng: 'English' },
                    borders: ['CAN', 'MEX'],
                }]),
            })
        );
    });

    // Test if country data is rendered properly
    it('should render country details', async () => {
        renderWithContext(<Country />);

        // Use findByText to directly find elements
        const countryName = await screen.findByText('United States');
        const population = await screen.findByText('Population: 331,000,000');
        const region = await screen.findByText('Region: Americas');
        const subregion = await screen.findByText('Sub Region: North America');
        const capital = await screen.findByText('Capital: Washington, D.C.');
        const tld = await screen.findByText('Top Level Domain: .us');
        const currencies = await screen.findByText('Currencies: United States dollar');
        const languages = await screen.findByText('Languages: English');

        // Check if country details are displayed
        expect(countryName).toBeInTheDocument();
        expect(population).toBeInTheDocument();
        expect(region).toBeInTheDocument();
        expect(subregion).toBeInTheDocument();
        expect(capital).toBeInTheDocument();
        expect(tld).toBeInTheDocument();
        expect(currencies).toBeInTheDocument();
        expect(languages).toBeInTheDocument();
    });

    // Test if the favorite button is functional
    it('should toggle favorite on button click', async () => {
        renderWithContext(<Country />);

        const favoriteButton = await screen.findByRole('button', { name: /Add to favorites/i });
        fireEvent.click(favoriteButton);

        // Check if the toggleFavorite function is called
        expect(mockToggleFavorite).toHaveBeenCalledWith('USA');
    });

    // Test if border countries are rendered
    it('should render border countries if available', async () => {
        renderWithContext(<Country />);

        const canadaLink = await screen.findByText('Canada');
        const mexicoLink = await screen.findByText('Mexico');

        // Check if border countries are displayed
        expect(canadaLink).toBeInTheDocument();
        expect(mexicoLink).toBeInTheDocument();
    });

    // Test if the back button works
    it('should navigate back to home when clicking the back button', async () => {
        renderWithContext(<Country />);

        const backButton = await screen.findByRole('link', { name: /Back Home/i });
        fireEvent.click(backButton);

        // Check if back navigation is working
        expect(window.location.pathname).toBe('/');
    });

    // Test loading state
    it('should display loading state when data is being fetched', async () => {
        global.fetch = jest.fn(() => new Promise(() => { })); // Simulate loading state
        renderWithContext(<Country />);

        const loadingText = await screen.findByText('Loading...');
        expect(loadingText).toBeInTheDocument();
    });

    // Test error state
    it('should display error message if fetching fails', async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error('Failed to fetch')));
        renderWithContext(<Country />);

        const errorText = await screen.findByText('Error: Failed to fetch');
        expect(errorText).toBeInTheDocument();
    });

    // Test if country not found
    it('should display an error if country is not found', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([]), // Empty response simulates country not found
            })
        );
        renderWithContext(<Country />);

        const notFoundText = await screen.findByText('Country not found');
        expect(notFoundText).toBeInTheDocument();
    });
});

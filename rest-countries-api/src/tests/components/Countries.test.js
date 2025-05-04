import { render, screen, fireEvent } from '@testing-library/react';
import { Countries } from '../../components/Countries'; // Adjust import path based on your structure
import { AuthContext } from '../../context/AuthContext';

// Mock AuthContext
const mockToggleFavorite = jest.fn();
const mockFavorites = [];

// Provide mock AuthContext values
const renderWithContext = (ui) => {
    return render(
        <AuthContext.Provider value={{ favorites: mockFavorites, toggleFavorite: mockToggleFavorite }}>
            {ui}
        </AuthContext.Provider>
    );
};

// Mock react-router-dom Link component
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Link: ({ children }) => <span>{children}</span>, // Mock the Link component
}));

describe('Countries Component', () => {
    // Test for fetching countries and loading state
    it('should display loading text when data is being fetched', async () => {
        renderWithContext(<Countries />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    // Test for rendering country cards
    it('should display countries when data is fetched', async () => {
        // Mock fetch response
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ cca3: 'USA', name: { common: 'United States' }, flags: { png: 'flag.png' }, population: 331000000, region: 'Americas', capital: 'Washington D.C.' }]),
            })
        );

        renderWithContext(<Countries />);

        // Use findByText to replace waitFor + getByText
        const countryName = await screen.findByText('United States');

        expect(countryName).toBeInTheDocument();
        expect(screen.getByText('Population: 331000000')).toBeInTheDocument();
        expect(screen.getByText('Region: Americas')).toBeInTheDocument();
        expect(screen.getByText('Capital: Washington D.C.')).toBeInTheDocument();
    });

    // Test search functionality
    it('should filter countries based on search term', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ cca3: 'USA', name: { common: 'United States' }, flags: { png: 'flag.png' }, population: 331000000, region: 'Americas', capital: 'Washington D.C.' }]),
            })
        );

        renderWithContext(<Countries />);

        // Use findByText to replace waitFor + getByText
        await screen.findByText('United States');

        // Simulate typing in search input
        const searchInput = screen.getByPlaceholderText('Search for a country');
        fireEvent.change(searchInput, { target: { value: 'United' } });

        // Check if the country is visible after search
        expect(screen.getByText('United States')).toBeInTheDocument();
    });

    // Test region filter
    it('should filter countries based on region', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ cca3: 'USA', name: { common: 'United States' }, flags: { png: 'flag.png' }, population: 331000000, region: 'Americas', capital: 'Washington D.C.' }]),
            })
        );

        renderWithContext(<Countries />);

        // Use findByText to replace waitFor + getByText
        await screen.findByText('United States');

        // Simulate region filter
        const regionSelect = screen.getByLabelText('Select Region');
        fireEvent.change(regionSelect, { target: { value: 'Americas' } });

        // Check if the country is filtered by region
        expect(screen.getByText('United States')).toBeInTheDocument();
    });

    // Test favorites functionality
    it('should call toggleFavorite when clicking the favorite button', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ cca3: 'USA', name: { common: 'United States' }, flags: { png: 'flag.png' }, population: 331000000, region: 'Americas', capital: 'Washington D.C.' }]),
            })
        );

        renderWithContext(<Countries />);

        // Use findByText to replace waitFor + getByText
        await screen.findByText('United States');

        // Find the favorite button and simulate click
        const favoriteButton = screen.getByRole('button', { name: /Add to favorites/i });
        fireEvent.click(favoriteButton);

        // Check if the toggleFavorite function is called
        expect(mockToggleFavorite).toHaveBeenCalledWith('USA');
    });

    // Test remove country functionality
    it('should call removeCountry when clicking the delete button', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ cca3: 'USA', name: { common: 'United States' }, flags: { png: 'flag.png' }, population: 331000000, region: 'Americas', capital: 'Washington D.C.' }]),
            })
        );

        renderWithContext(<Countries />);

        // Use findByText to replace waitFor + getByText
        await screen.findByText('United States');

        const deleteButton = screen.getByRole('button', { name: /Remove country/i });
        fireEvent.click(deleteButton);

        // Ensure removeCountry is called and state is updated
        expect(screen.queryByText('United States')).not.toBeInTheDocument();
    });
});

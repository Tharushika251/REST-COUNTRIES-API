import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filter from '../../components/Filter';
import { ThemeContext } from '../../context/ThemeContext';

describe('Filter Component', () => {
    // Mock Theme Context Provider for testing
    const mockTheme = {
        darkMode: false, // or true for testing dark mode
    };

    const mockOnSearch = jest.fn();
    const mockOnRegionChange = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks(); // Reset mocks before each test
    });

    it('should render the search input field', () => {
        render(
            <ThemeContext.Provider value={mockTheme}>
                <Filter onSearch={mockOnSearch} onRegionChange={mockOnRegionChange} />
            </ThemeContext.Provider>
        );

        const searchInput = screen.getByPlaceholderText(/search for a country/i);
        expect(searchInput).toBeInTheDocument();
    });

    it('should update search input and call onSearch when typing', () => {
        render(
            <ThemeContext.Provider value={mockTheme}>
                <Filter onSearch={mockOnSearch} onRegionChange={mockOnRegionChange} />
            </ThemeContext.Provider>
        );

        const searchInput = screen.getByPlaceholderText(/search for a country/i);

        // Simulate user typing in the search input
        fireEvent.change(searchInput, { target: { value: 'Canada' } });

        expect(searchInput.value).toBe('Canada');
        expect(mockOnSearch).toHaveBeenCalledWith('Canada');
    });

    it('should render the region dropdown', () => {
        render(
            <ThemeContext.Provider value={mockTheme}>
                <Filter onSearch={mockOnSearch} onRegionChange={mockOnRegionChange} />
            </ThemeContext.Provider>
        );

        const regionDropdown = screen.getByRole('combobox');
        expect(regionDropdown).toBeInTheDocument();
    });

    it('should call onRegionChange when a region is selected', () => {
        render(
            <ThemeContext.Provider value={mockTheme}>
                <Filter onSearch={mockOnSearch} onRegionChange={mockOnRegionChange} />
            </ThemeContext.Provider>
        );

        const regionDropdown = screen.getByRole('combobox');

        // Simulate selecting a region
        fireEvent.change(regionDropdown, { target: { value: 'Asia' } });

        expect(mockOnRegionChange).toHaveBeenCalledWith('Asia');
    // });

    // it('should apply light-theme class when darkMode is false', () => {
    //     render(
    //         <ThemeContext.Provider value={mockTheme}>
    //             <Filter onSearch={mockOnSearch} onRegionChange={mockOnRegionChange} />
    //         </ThemeContext.Provider>
    //     );

    //     const filterSection = screen.getByRole('region-filter');
    //     expect(filterSection).toHaveClass('light-theme');
    // });

    // it('should not apply light-theme class when darkMode is true', () => {
    //     const mockDarkModeTheme = {
    //         darkMode: true,
    //     };

    //     render(
    //         <ThemeContext.Provider value={mockDarkModeTheme}>
    //             <Filter onSearch={mockOnSearch} onRegionChange={mockOnRegionChange} />
    //         </ThemeContext.Provider>
    //     );

    //     const filterSection = screen.getByRole('region-filter');
    //     expect(filterSection).not.toHaveClass('light-theme');
     });
});

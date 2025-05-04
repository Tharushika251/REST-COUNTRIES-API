import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '../../context/ThemeContext'; 

// Dummy component to consume the theme
const ThemeConsumer = () => {
    const { darkMode, toggleTheme } = useTheme();
    return (
        <div>
            <p data-testid="theme">{darkMode ? 'dark' : 'light'}</p>
            <button onClick={toggleTheme}>Toggle</button>
        </div>
    );
};

describe('ThemeContext', () => {
    beforeEach(() => {
        document.body.className = ''; // Clear classes before each test
    });

    it('should default to dark mode', () => {
        render(
            <ThemeProvider>
                <ThemeConsumer />
            </ThemeProvider>
        );

        expect(screen.getByTestId('theme').textContent).toBe('dark');
        expect(document.body.classList.contains('light-theme')).toBe(false);
    });

    it('should toggle to light mode when button is clicked', async () => {
        const user = userEvent.setup();

        render(
            <ThemeProvider>
                <ThemeConsumer />
            </ThemeProvider>
        );

        const button = screen.getByRole('button', { name: /toggle/i });
        await user.click(button);

        expect(screen.getByTestId('theme').textContent).toBe('light');
        expect(document.body.classList.contains('light-theme')).toBe(true);
    });

    it('should toggle back to dark mode on second click', async () => {
        const user = userEvent.setup();

        render(
            <ThemeProvider>
                <ThemeConsumer />
            </ThemeProvider>
        );

        const button = screen.getByRole('button', { name: /toggle/i });

        await user.click(button); // Light
        await user.click(button); // Dark again

        expect(screen.getByTestId('theme').textContent).toBe('dark');
        expect(document.body.classList.contains('light-theme')).toBe(false);
    });
});

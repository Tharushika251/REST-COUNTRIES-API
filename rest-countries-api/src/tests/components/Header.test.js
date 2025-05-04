import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../../components/Header'; 
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { MemoryRouter } from 'react-router-dom';

describe('Header Component', () => {
    const mockToggleTheme = jest.fn();
    const mockLogout = jest.fn();

    const renderHeader = (user = null, darkMode = true) => {
        render(
            <AuthContext.Provider value={{ user, logout: mockLogout }}>
                <ThemeContext.Provider value={{ darkMode, toggleTheme: mockToggleTheme }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </ThemeContext.Provider>
            </AuthContext.Provider>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders site title with link to home', () => {
        renderHeader();
        const title = screen.getByRole('heading', { name: /where in the world/i });
        expect(title).toBeInTheDocument();
        const link = screen.getByRole('link', { name: /where in the world/i });
        expect(link).toHaveAttribute('href', '/');
    });

    it('shows login button when user is not authenticated', () => {
        renderHeader(null);
        expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /logout/i })).not.toBeInTheDocument();
    });

    it('shows logout and favorites button when user is authenticated', () => {
        const mockUser = { email: 'test@example.com' };
        renderHeader(mockUser);

        expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /favorites/i })).toBeInTheDocument();
    });

    it('calls logout when logout button is clicked', async () => {
        const user = userEvent.setup();
        renderHeader({ email: 'user@example.com' });

        await user.click(screen.getByRole('button', { name: /logout/i }));
        expect(mockLogout).toHaveBeenCalled();
    });

    it('calls toggleTheme when theme icon is clicked', async () => {
        const user = userEvent.setup();
        renderHeader(null, true);

        const themeToggle = screen.getByRole('button', { hidden: true }); // it's not a semantic button
        await user.click(themeToggle);
        expect(mockToggleTheme).toHaveBeenCalled();
    });

    it('displays sun icon when in dark mode', () => {
        renderHeader(null, true);
        expect(screen.getByClass('fa-sun')).toBeInTheDocument();
    });

    it('displays moon icon when in light mode', () => {
        renderHeader(null, false);
        expect(screen.getByClass('fa-moon')).toBeInTheDocument();
    });
});

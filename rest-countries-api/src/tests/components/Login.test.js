import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../components/Login';
import { AuthContext } from '../../context/AuthContext';
import { MemoryRouter } from '../../../node_modules/react-router-dom';
const mockNavigate = jest.fn();

// Mock react-router-dom with just what we need
jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
    MemoryRouter: ({ children }) => <div>{children}</div>, // Simple mock for MemoryRouter
}));

describe('Login Component', () => {
    const mockLogin = jest.fn();

    const renderWithContext = () => {
        return render(
            <AuthContext.Provider value={{ login: mockLogin }}>
                {/* Use the mocked MemoryRouter */}
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </AuthContext.Provider>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders login form fields and button', () => {
        renderWithContext();

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('updates email and password input values', async () => {
        renderWithContext();
        const user = userEvent.setup();

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);

        await user.type(emailInput, 'test@example.com');
        await user.type(passwordInput, 'password123');

        expect(emailInput).toHaveValue('test@example.com');
        expect(passwordInput).toHaveValue('password123');
    });

    it('calls login and navigates on form submission', async () => {
        renderWithContext();
        const user = userEvent.setup();

        await user.type(screen.getByLabelText(/email/i), 'test@example.com');
        await user.type(screen.getByLabelText(/password/i), 'password123');
        await user.click(screen.getByRole('button', { name: /login/i }));

        expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});
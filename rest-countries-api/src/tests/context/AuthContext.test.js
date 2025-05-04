import React, {useEffect} from 'react';
import { render, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../context/AuthContext';

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: jest.fn(key => store[key] || null),
        setItem: jest.fn((key, value) => {
            store[key] = value.toString();
        }),
        removeItem: jest.fn(key => {
            delete store[key];
        }),
        clear: jest.fn(() => {
            store = {};
        })
    };
})();

beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
        value: localStorageMock
    });
});

beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
});

describe('AuthContext', () => {
    const TestComponent = ({ callback }) => {
        const auth = useAuth();
        useEffect(() => {
            if (!auth.isInitializing) {
                callback(auth);
            }
        }, [auth, auth.isInitializing, callback]);
        return null;
    };

    test('1. initializes with no user when localStorage is empty', async () => {
        let contextValue;
        render(
            <AuthProvider>
                <TestComponent callback={(ctx) => { contextValue = ctx; }} />
            </AuthProvider>
        );

        await waitFor(() => {
            expect(contextValue).toBeDefined();
        });
        await waitFor(() => {
            expect(contextValue.isInitializing).toBe(false);
        });

        expect(contextValue.user).toBeNull();
        expect(contextValue.favorites).toEqual([]);
    });

    test('2. initializes with user and favorites from localStorage', async () => {
        const mockUser = {
            email: 'test@example.com',
            name: 'Test User',
            token: 'mock-token',
            sessionStart: Date.now()
        };
        const mockFavorites = {
            'test@example.com': ['CAN']
        };

        localStorage.setItem('countryAppUser', JSON.stringify(mockUser));
        localStorage.setItem('countryAppFavorites', JSON.stringify(mockFavorites));

        let contextValue;
        render(
            <AuthProvider>
                <TestComponent callback={(ctx) => { contextValue = ctx; }} />
            </AuthProvider>
        );

        expect(contextValue.user.email).toBe('test@example.com');
        expect(contextValue.favorites).toEqual(['CAN']);
    });

    test('3. login sets user and initializes favorites', async () => {
        let contextValue;
        render(
            <AuthProvider>
                <TestComponent callback={(ctx) => { contextValue = ctx; }} />
            </AuthProvider>
        );

        await act(async () => {
            contextValue.login('user@example.com', 'password');
        });

        expect(contextValue.user.email).toBe('user@example.com');
        expect(contextValue.favorites).toEqual([]);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'countryAppUser',
            expect.any(String)
        );
    });

    test('4. logout clears user', async () => {
        const mockUser = {
            email: 'test@example.com',
            name: 'Test User',
            token: 'mock-token',
            sessionStart: Date.now()
        };
        localStorage.setItem('countryAppUser', JSON.stringify(mockUser));

        let contextValue;
        render(
            <AuthProvider>
                <TestComponent callback={(ctx) => { contextValue = ctx; }} />
            </AuthProvider>
        );

        await act(async () => {
            contextValue.logout();
        });

        expect(contextValue.user).toBeNull();
        expect(localStorage.removeItem).toHaveBeenCalledWith('countryAppUser');
    });

    test('5. toggleFavorite adds and removes country code', async () => {
        const mockUser = {
            email: 'test@example.com',
            name: 'Test User',
            token: 'mock-token',
            sessionStart: Date.now()
        };
        localStorage.setItem('countryAppUser', JSON.stringify(mockUser));

        let contextValue;
        render(
            <AuthProvider>
                <TestComponent callback={(ctx) => { contextValue = ctx; }} />
            </AuthProvider>
        );

        await act(async () => {
            contextValue.toggleFavorite('CAN');
        });

        expect(contextValue.favorites).toEqual(['CAN']);

        await act(async () => {
            contextValue.toggleFavorite('CAN');
        });

        expect(contextValue.favorites).toEqual([]);
    });

    test('6. getFavoriteCountries filters correctly', async () => {
        const mockUser = {
            email: 'test@example.com',
            name: 'Test User',
            token: 'mock-token',
            sessionStart: Date.now()
        };
        localStorage.setItem('countryAppUser', JSON.stringify(mockUser));
        localStorage.setItem('countryAppFavorites', JSON.stringify({
            'test@example.com': ['CAN']
        }));

        const allCountries = [
            { cca3: 'CAN', name: { common: 'Canada' } },
            { cca3: 'USA', name: { common: 'United States' } }
        ];

        let contextValue;
        render(
            <AuthProvider>
                <TestComponent callback={(ctx) => { contextValue = ctx; }} />
            </AuthProvider>
        );

        const favorites = contextValue.getFavoriteCountries(allCountries);
        expect(favorites).toEqual([{ cca3: 'CAN', name: { common: 'Canada' } }]);
    });

    test('7. toggleFavorite does nothing if user is not logged in', async () => {
        let contextValue;
        render(
            <AuthProvider>
                <TestComponent callback={(ctx) => { contextValue = ctx; }} />
            </AuthProvider>
        );

        await act(async () => {
            contextValue.toggleFavorite('CAN');
        });

        expect(contextValue.favorites).toEqual([]);
        expect(localStorage.setItem).not.toHaveBeenCalled();
    });
});
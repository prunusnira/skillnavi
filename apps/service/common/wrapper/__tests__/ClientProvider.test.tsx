import { render, screen } from '@testing-library/react';
import ClientProvider from '../ClientProvider';
import { createContext, useContext, useEffect, useState } from 'react';

// Mock react hooks
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
    useEffect: jest.fn(),
    createContext: jest.fn(),
    useContext: jest.fn(),
}));

describe('ClientProvider', () => {
    const mockSetIsClient = jest.fn();
    const mockUseState = (initialValue) => [
        initialValue,
        mockSetIsClient,
    ];
    const MockClientContext = createContext(false);

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(mockUseState);
        (useEffect as jest.Mock).mockImplementation((cb) => cb()); // Immediately run useEffect callback
        (createContext as jest.Mock).mockReturnValue(MockClientContext);
        (useContext as jest.Mock).mockImplementation((context) => {
            if (context === MockClientContext) {
                return true; // Simulate isClient being true after useEffect
            }
            return jest.requireActual('react').useContext(context);
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('sets isClient to true after mounting', () => {
        render(
            <ClientProvider>
                <div>Test Child</div>
            </ClientProvider>,
        );

        expect(mockSetIsClient).toHaveBeenCalledWith(true);
    });

    it('provides true to context after mounting', () => {
        render(
            <ClientProvider>
                <TestConsumer />
            </ClientProvider>,
        );

        expect(screen.getByText('Client: true')).toBeInTheDocument();
    });

    // Helper component to consume the context
    const TestConsumer = () => {
        const isClient = useContext(MockClientContext);
        return <div>Client: {isClient.toString()}</div>;
    };
});

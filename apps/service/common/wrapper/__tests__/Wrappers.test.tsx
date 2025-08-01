
import { render, screen } from '@testing-library/react';
import Wrappers from '../Wrappers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import ClientProvider from '../ClientProvider';
import DataProvider from '../DataProvider';

jest.mock('@tanstack/react-query');
jest.mock('next-auth/react');
jest.mock('../ClientProvider');
jest.mock('../DataProvider');

describe('Wrappers', () => {
  beforeEach(() => {
    // Mock the actual implementations of the providers
    (QueryClient as jest.Mock).mockImplementation(() => ({
      // Mock necessary QueryClient methods if needed
    }));
    (QueryClientProvider as jest.Mock).mockImplementation(({ children }) => <div>QueryClientProvider Mock{children}</div>);
    (SessionProvider as jest.Mock).mockImplementation(({ children }) => <div>SessionProvider Mock{children}</div>);
    (ClientProvider as jest.Mock).mockImplementation(({ children }) => <div>ClientProvider Mock{children}</div>);
    (DataProvider as jest.Mock).mockImplementation(({ children }) => <div>DataProvider Mock{children}</div>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders children wrapped in all providers', () => {
    render(
      <Wrappers>
        <div>Test Child</div>
      </Wrappers>
    );

    expect(screen.getByText('QueryClientProvider Mock')).toBeInTheDocument();
    expect(screen.getByText('SessionProvider Mock')).toBeInTheDocument();
    expect(screen.getByText('ClientProvider Mock')).toBeInTheDocument();
    expect(screen.getByText('DataProvider Mock')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();

    // Check the nesting order (simplified check)
    const queryClientProvider = screen.getByText('QueryClientProvider Mock');
    expect(queryClientProvider).toContainElement(screen.getByText('SessionProvider Mock'));
    expect(screen.getByText('SessionProvider Mock')).toContainElement(screen.getByText('ClientProvider Mock'));
    expect(screen.getByText('ClientProvider Mock')).toContainElement(screen.getByText('DataProvider Mock'));
    expect(screen.getByText('DataProvider Mock')).toContainElement(screen.getByText('Test Child'));
  });
});

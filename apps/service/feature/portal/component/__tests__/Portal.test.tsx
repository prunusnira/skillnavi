
import { render, screen } from '@testing-library/react';
import Portal from '../Portal';
import { useEffect } from 'react';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useState: jest.fn((initial) => [initial, jest.fn()]),
  createPortal: jest.fn((children) => children), // Mock createPortal to return children directly for testing
}));

jest.mock('@/common/card/Card', () => {
  return function MockCard({ title, children }) {
    return (
      <div data-testid="card">
        <h2 data-testid="card-title">{title}</h2>
        {children}
      </div>
    );
  };
});

describe('Portal', () => {
  const originalGetElementById = document.getElementById;

  beforeEach(() => {
    // Mock useEffect to immediately set isClient to true
    (useEffect as jest.Mock).mockImplementation((cb) => cb());

    // Create a div with id 'portal' in the DOM for the portal target
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'portal');
    document.body.appendChild(portalRoot);

    // Mock document.getElementById to return our mock portalRoot
    document.getElementById = jest.fn((id) => {
      if (id === 'portal') {
        return portalRoot;
      }
      return originalGetElementById(id);
    });
  });

  afterEach(() => {
    document.getElementById = originalGetElementById;
    document.body.innerHTML = ''; // Clean up the DOM
  });

  it('renders children and title inside a Card component', () => {
    render(<Portal title="Test Title"><div>Portal Content</div></Portal>);

    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('card-title')).toHaveTextContent('Test Title');
    expect(screen.getByText('Portal Content')).toBeInTheDocument();
  });

  it('renders nothing on initial server render (before useEffect)', () => {
    (useEffect as jest.Mock).mockImplementationOnce(() => {}); // Prevent useEffect from running immediately
    (jest.requireActual('react') as any).useState.mockReturnValueOnce([false, jest.fn()]); // Set isClient to false initially

    const { container } = render(<Portal title="Test Title"><div>Portal Content</div></Portal>);
    expect(container).toBeEmptyDOMElement();
  });
});

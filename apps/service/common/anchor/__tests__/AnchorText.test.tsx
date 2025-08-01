
import { render, screen, fireEvent } from '@testing-library/react';
import AnchorText from '../AnchorText';
import { useRouter } from '@/i18n/routing';

jest.mock('@/i18n/routing');

describe('AnchorText', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders text and calls router.push on click', () => {
    render(<AnchorText text="Click Me" path="/test-path" />);
    const textElement = screen.getByText('Click Me');
    expect(textElement).toBeInTheDocument();

    fireEvent.click(textElement);
    expect(mockRouterPush).toHaveBeenCalledWith('/test-path');
  });

  it('applies custom class name', () => {
    render(<AnchorText text="Styled Text" path="/path" className="custom-class" />);
    expect(screen.getByText('Styled Text')).toHaveClass('custom-class');
  });
});

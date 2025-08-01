
import { render, screen } from '@testing-library/react';
import Loading from '../Loading';

jest.mock('@lottiefiles/dotlottie-react', () => ({
  DotLottieReact: (props) => <div data-testid="dotlottie-mock" {...props} />,
}));

jest.mock('@/common/card/Card', () => {
  return function MockCard({ children }) {
    return <div data-testid="card-mock">{children}</div>;
  };
});

describe('Loading', () => {
  it('renders DotLottieReact inside Card', () => {
    render(<Loading />);
    expect(screen.getByTestId('card-mock')).toBeInTheDocument();
    expect(screen.getByTestId('dotlottie-mock')).toBeInTheDocument();
    expect(screen.getByTestId('dotlottie-mock')).toHaveAttribute('src', '/lottie/loading.lottie');
    expect(screen.getByTestId('dotlottie-mock')).toHaveAttribute('loop', '');
    expect(screen.getByTestId('dotlottie-mock')).toHaveAttribute('autoplay', '');
  });

  it('applies custom size', () => {
    render(<Loading size="100px" />);
    const dotlottieMock = screen.getByTestId('dotlottie-mock');
    expect(dotlottieMock).toHaveStyle({
      width: '100px',
      height: '100px',
    });
    expect(dotlottieMock).toHaveAttribute('width', '100px');
    expect(dotlottieMock).toHaveAttribute('height', '100px');
  });

  it('applies default size when size prop is not provided', () => {
    render(<Loading />);
    const dotlottieMock = screen.getByTestId('dotlottie-mock');
    expect(dotlottieMock).toHaveStyle({
      width: '48px', // Default width from Image mock
      height: '48px', // Default height from Image mock
    });
    expect(dotlottieMock).toHaveAttribute('width', '100%');
    expect(dotlottieMock).toHaveAttribute('height', '100%');
  });
});

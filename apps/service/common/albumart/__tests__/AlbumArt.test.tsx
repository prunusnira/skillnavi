
import { render, screen, fireEvent } from '@testing-library/react';
import AlbumArt from '../AlbumArt';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('AlbumArt', () => {
  it('renders album art with correct src', () => {
    render(<AlbumArt mid={123} />);
    const img = screen.getByAltText('albumart');
    expect(img).toHaveAttribute('src', '/album/123.jpg');
  });

  it('renders album art with custom size and class', () => {
    render(<AlbumArt mid={456} size={100} className="custom-class" />);
    const img = screen.getByAltText('albumart');
    expect(img).toHaveAttribute('src', '/album/456.jpg');
    expect(img).toHaveAttribute('width', '100');
    expect(img).toHaveAttribute('height', '100');
    expect(img).toHaveClass('custom-class');
  });

  it('changes src to empty.jpg on error', () => {
    render(<AlbumArt mid={789} />);
    const img = screen.getByAltText('albumart');
    fireEvent.error(img);
    expect(img).toHaveAttribute('src', '/album/empty.jpg');
  });
});

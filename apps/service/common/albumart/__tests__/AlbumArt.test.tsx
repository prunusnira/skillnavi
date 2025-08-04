import { render, screen, fireEvent } from '@testing-library/react';
import AlbumArt from '../AlbumArt';
import { ALBUM } from '@/url/url';
import { ImgHTMLAttributes } from 'react';

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: ImgHTMLAttributes<HTMLImageElement>) => {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                {...props}
                alt={''}
            />
        );
    },
}));

describe('AlbumArt', () => {
    it('renders album art with correct src', () => {
        render(<AlbumArt mid={123} />);
        const img = screen.getByAltText('albumart');
        expect(img).toHaveAttribute('src', `${ALBUM}/123.jpg`);
    });

    it('renders album art with custom size and class', () => {
        render(
            <AlbumArt
                mid={123}
                size={100}
                className="custom-class"
            />,
        );
        const img = screen.getByAltText('albumart');
        expect(img).toHaveAttribute('src', `${ALBUM}/123.jpg`);
        expect(img).toHaveAttribute('width', '100');
        expect(img).toHaveAttribute('height', '100');
        expect(img).toHaveClass('custom-class');
    });

    it('changes src to empty.jpg on error', () => {
        render(<AlbumArt mid={789} />);
        const img = screen.getByAltText('albumart');
        fireEvent.error(img);
        expect(img).toHaveAttribute('src', `${ALBUM}/empty.jpg`);
    });
});

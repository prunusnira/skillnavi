import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
    it('renders with title, sub, and children', () => {
        render(
            <Card
                title="Test Title"
                sub={<div>Test Sub</div>}
            >
                <div>Test Children</div>
            </Card>,
        );

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Sub')).toBeInTheDocument();
        expect(screen.getByText('Test Children')).toBeInTheDocument();
    });

    it('renders without title and sub', () => {
        render(
            <Card>
                <div>Test Children</div>
            </Card>,
        );

        expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
        expect(screen.queryByText('Test Sub')).not.toBeInTheDocument();
        expect(screen.getByText('Test Children')).toBeInTheDocument();
    });

    it('applies itemStartPosition from option', () => {
        render(
            <Card option={{ itemStartPosition: 'start' }}>Test Children</Card>,
        );
        expect(screen.getByText('Test Children').closest('div')).toHaveStyle({
            justifyContent: 'start',
        });
    });
});

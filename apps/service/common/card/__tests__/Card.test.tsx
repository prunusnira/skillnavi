
import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
  it('renders with title, sub, and children', () => {
    render(
      <Card title="Test Title" sub={<div>Test Sub</div>}>
        <div>Test Children</div>
      </Card>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Sub')).toBeInTheDocument();
    expect(screen.getByText('Test Children')).toBeInTheDocument();
    expect(screen.getByText('Test Title').closest('div')).toHaveClass('rounded-t-2xl');
    expect(screen.getByText('Test Children').closest('div')).toHaveClass('rounded-b-2xl');
  });

  it('renders without title and sub', () => {
    render(
      <Card>
        <div>Test Children</div>
      </Card>
    );

    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Sub')).not.toBeInTheDocument();
    expect(screen.getByText('Test Children')).toBeInTheDocument();
    expect(screen.getByText('Test Children').closest('div')).toHaveClass('rounded-2xl');
  });

  it('applies itemStartPosition from option', () => {
    render(
      <Card option={{ itemStartPosition: 'flex-start' }}>
        <div>Test Children</div>
      </Card>
    );
    expect(screen.getByText('Test Children').closest('div')).toHaveStyle({
      justifyContent: 'flex-start',
    });
  });
});

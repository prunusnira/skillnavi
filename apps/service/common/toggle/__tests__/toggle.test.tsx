
import { render, screen, fireEvent } from '@testing-library/react';
import Toggle from '../toggle';

describe('Toggle', () => {
  it('renders with initial value and calls callback on change', () => {
    const mockCallback = jest.fn();
    render(<Toggle id="test-toggle" value={false} callback={mockCallback} />);

    const checkbox = screen.getByLabelText('test-toggle');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(mockCallback).toHaveBeenCalledWith(true);
  });

  it('renders as checked when initial value is true', () => {
    const mockCallback = jest.fn();
    render(<Toggle id="test-toggle" value={true} callback={mockCallback} />);

    const checkbox = screen.getByLabelText('test-toggle');
    expect(checkbox).toBeChecked();
  });

  it('is disabled when isLoading is true', () => {
    const mockCallback = jest.fn();
    render(<Toggle id="test-toggle" value={false} callback={mockCallback} isLoading={true} />);

    const checkbox = screen.getByLabelText('test-toggle');
    expect(checkbox).toBeDisabled();

    fireEvent.click(checkbox);
    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('updates its internal state when value prop changes', () => {
    const mockCallback = jest.fn();
    const { rerender } = render(<Toggle id="test-toggle" value={false} callback={mockCallback} />);

    const checkbox = screen.getByLabelText('test-toggle');
    expect(checkbox).not.toBeChecked();

    rerender(<Toggle id="test-toggle" value={true} callback={mockCallback} />);
    expect(checkbox).toBeChecked();
  });
});


import { render, screen, fireEvent } from '@testing-library/react';
import InputFormItem from '../InputFormItem';

describe('InputFormItem', () => {
  it('renders with correct label, placeholder, and value', () => {
    const handleChange = jest.fn();
    render(
      <InputFormItem
        label="Username"
        placeholder="Enter your username"
        id="username"
        type="text"
        value="testuser"
        onChange={handleChange}
      />
    );

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your username')).toBeInTheDocument();
    expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'username');
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('calls onChange handler when input value changes', () => {
    const handleChange = jest.fn();
    render(
      <InputFormItem
        label="Password"
        placeholder="Enter your password"
        id="password"
        type="password"
        value=""
        onChange={handleChange}
      />
    );

    const inputElement = screen.getByLabelText('Password');
    fireEvent.change(inputElement, { target: { value: 'newpassword' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({
        value: 'newpassword',
      }),
    }));
  });

  it('applies custom labelWidth and inputWidth', () => {
    const handleChange = jest.fn();
    render(
      <InputFormItem
        label="Email"
        placeholder=""
        id="email"
        type="email"
        value=""
        onChange={handleChange}
        labelWidth={150}
        inputWidth={200}
      />
    );

    expect(screen.getByLabelText('Email')).toHaveStyle({
      width: '150px',
    });
    expect(screen.getByRole('textbox')).toHaveStyle({
      width: '200px',
    });
  });
});

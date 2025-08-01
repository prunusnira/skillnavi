import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../LoginForm';
import { signIn } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
    signIn: jest.fn(),
}));

jest.mock('next-intl', () => ({
    useTranslations: jest.fn(() => (key: string) => key),
}));

describe('LoginForm', () => {
    it('renders Google login button and calls signIn on click', () => {
        render(<LoginForm />);

        const googleButton = screen.getByText('google');
        expect(googleButton).toBeInTheDocument();

        fireEvent.click(googleButton);

        expect(signIn).toHaveBeenCalledWith('google', {
            callbackUrl: expect.any(String),
        });
    });
});

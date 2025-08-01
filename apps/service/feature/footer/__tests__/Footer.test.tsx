
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key) => {
    if (key === 'bottom') return 'Test Bottom Text';
    return key;
  }),
}));

describe('Footer', () => {
  it('renders footer with correct text', async () => {
    render(await Footer());

    expect(screen.getByText('(c) 2016 Nira, Made with NextJS')).toBeInTheDocument();
    expect(screen.getByText('Test Bottom Text')).toBeInTheDocument();
  });
});


import { render, screen, fireEvent } from '@testing-library/react';
import { SidebarSearch } from '../SidebarSearch';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';

jest.mock('next-intl');
jest.mock('@/i18n/routing');

jest.mock('@skillnavi/ui', () => ({
  ButtonStandard: ({ text, onClick }) => <button onClick={onClick}>{text}</button>,
  Select: ({ options, value, onChange }) => (
    <select value={value} onChange={onChange}>
      {options.map(option => <option key={option.value} value={option.value}>{option.display}</option>)}
    </select>
  ),
}));

jest.mock('@skillnavi/ui/src/input/InputText', () => ({
  InputText: ({ value, onChange, placeholder }) => (
    <input value={value} onChange={onChange} placeholder={placeholder} />
  ),
}));

describe('SidebarSearch', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key) => key);
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });

  it('renders search components', () => {
    render(<SidebarSearch />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('updates searchType on select change', () => {
    render(<SidebarSearch />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'player' } });
    expect((select as HTMLSelectElement).value).toBe('player');
  });

  it('updates searchText on input change', () => {
    render(<SidebarSearch />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test search' } });
    expect((input as HTMLInputElement).value).toBe('test search');
  });

  it('calls router.push with correct search params on button click', () => {
    render(<SidebarSearch />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test search' } });

    const searchButton = screen.getByRole('button');
    fireEvent.click(searchButton);

    expect(mockRouterPush).toHaveBeenCalledWith(expect.stringContaining('/search/music/test search'));
  });
});

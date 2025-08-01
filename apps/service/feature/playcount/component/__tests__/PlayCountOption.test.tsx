
import { render, screen, fireEvent } from '@testing-library/react';
import PlayCountOption from '../PlayCountOption';
import { useTranslations } from 'next-intl';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useAtomValue } from 'jotai';

jest.mock('next-intl');
jest.mock('next/navigation');
jest.mock('jotai');

jest.mock('@skillnavi/ui', () => ({
  ButtonStandard: ({ text, onClick, isSelected }) => (
    <button onClick={onClick} className={isSelected ? 'selected' : ''}>
      {text}
    </button>
  ),
}));

jest.mock('@/common/versionSelector/VersionSelector', () => ({
  VersionSelector: ({ currentVersion, onChangeVersion }) => (
    <select value={currentVersion} onChange={onChangeVersion} data-testid="version-selector">
      <option value="28">Version 28</option>
      <option value="27">Version 27</option>
    </select>
  ),
}));

describe('PlayCountOption', () => {
  const mockRouterReplace = jest.fn();

  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key) => key);
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    (usePathname as jest.Mock).mockReturnValue('/test-path');
    (useRouter as jest.Mock).mockReturnValue({ replace: mockRouterReplace });
    (useAtomValue as jest.Mock).mockReturnValue({ id: 28 });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders version and type selectors', () => {
    render(<PlayCountOption />);

    expect(screen.getByText('Game Version')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByTestId('version-selector')).toBeInTheDocument();
    expect(screen.getByText('user.playcount.button.music')).toBeInTheDocument();
    expect(screen.getByText('user.playcount.button.pt')).toBeInTheDocument();
    expect(screen.getByText('user.playcount.button.gf')).toBeInTheDocument();
    expect(screen.getByText('user.playcount.button.dm')).toBeInTheDocument();
  });

  it('calls router.replace with correct version param on version change', () => {
    render(<PlayCountOption />);
    const select = screen.getByTestId('version-selector');
    fireEvent.change(select, { target: { value: '27' } });
    expect(mockRouterReplace).toHaveBeenCalledWith('/test-path?version=27');
  });

  it('calls router.replace with correct type param on type button click', () => {
    render(<PlayCountOption />);
    fireEvent.click(screen.getByText('user.playcount.button.pt'));
    expect(mockRouterReplace).toHaveBeenCalledWith('/test-path?type=pattern');

    fireEvent.click(screen.getByText('user.playcount.button.gf'));
    expect(mockRouterReplace).toHaveBeenCalledWith('/test-path?type=gf');
  });
});


import { render, screen, fireEvent } from '@testing-library/react';
import { PatternListMenu } from '../PatternListMenu';
import { usePatternMenu } from '../usePatternMenu';
import { useTranslations } from 'next-intl';

jest.mock('../usePatternMenu');
jest.mock('next-intl');

jest.mock('../PatternMenuMusicVersion', () => ({
  PatternMenuMusicVersion: () => <div data-testid="music-version-menu">Music Version Menu</div>,
}));

jest.mock('../PatternMenuGameVersion', () => ({
  PatternMenuGameVersion: () => <div data-testid="game-version-menu">Game Version Menu</div>,
}));

jest.mock('../PatternMenuDifficulty', () => ({
  PatternMenuDifficulty: () => <div data-testid="difficulty-menu">Difficulty Menu</div>,
}));

jest.mock('@skillnavi/ui', () => ({
  ButtonRounded: ({ text, onClick }) => <button onClick={onClick}>{text}</button>,
}));

describe('PatternListMenu', () => {
  const mockToggleMenu = jest.fn();

  beforeEach(() => {
    (usePatternMenu as jest.Mock).mockReturnValue({ active: false, toggleMenu: mockToggleMenu });
    (useTranslations as jest.Mock).mockReturnValue((key) => key);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the menu icon', () => {
    render(<PatternListMenu />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument(); // FontAwesomeIcon
  });

  it('calls toggleMenu when menu icon is clicked', () => {
    render(<PatternListMenu />);
    fireEvent.click(screen.getByRole('img', { hidden: true }));
    expect(mockToggleMenu).toHaveBeenCalledTimes(1);
  });

  it('does not render the menu content when not active', () => {
    render(<PatternListMenu />);
    expect(screen.queryByTestId('music-version-menu')).not.toBeInTheDocument();
    expect(screen.queryByText('music.menu.close')).not.toBeInTheDocument();
  });

  it('renders the menu content when active', () => {
    (usePatternMenu as jest.Mock).mockReturnValue({ active: true, toggleMenu: mockToggleMenu });
    render(<PatternListMenu />);

    expect(screen.getByTestId('music-version-menu')).toBeInTheDocument();
    expect(screen.getByTestId('game-version-menu')).toBeInTheDocument();
    expect(screen.getByTestId('difficulty-menu')).toBeInTheDocument();
    expect(screen.getByText('music.menu.close')).toBeInTheDocument();
  });

  it('calls toggleMenu when close button is clicked', () => {
    (usePatternMenu as jest.Mock).mockReturnValue({ active: true, toggleMenu: mockToggleMenu });
    render(<PatternListMenu />);
    fireEvent.click(screen.getByText('music.menu.close'));
    expect(mockToggleMenu).toHaveBeenCalledTimes(1);
  });
});


import { render, screen, fireEvent } from '@testing-library/react';
import { PatternMenuMusicVersion } from '../PatternMenuMusicVersion';
import { usePatternMusicVersion } from '../usePatternMusicVersion';
import { useTranslations } from 'next-intl';

jest.mock('../usePatternMusicVersion');
jest.mock('next-intl');

jest.mock('@/common/versionSelector/VersionSelector', () => ({
  VersionSelector: ({ currentVersion, onChangeVersion }) => (
    <select value={currentVersion} onChange={onChangeVersion} data-testid="version-selector">
      <option value="28">Version 28</option>
      <option value="27">Version 27</option>
    </select>
  ),
}));

describe('PatternMenuMusicVersion', () => {
  const mockOnChangeMusicVersion = jest.fn();

  beforeEach(() => {
    (usePatternMusicVersion as jest.Mock).mockReturnValue({
      currentMusicVersion: 28,
      onChangeMusicVersion: mockOnChangeMusicVersion,
    });
    (useTranslations as jest.Mock).mockReturnValue((key) => key);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders music version selector', () => {
    render(<PatternMenuMusicVersion />);

    expect(screen.getByText('music.menu.musicVersion')).toBeInTheDocument();
    expect(screen.getByTestId('version-selector')).toBeInTheDocument();
  });

  it('calls onChangeMusicVersion on select change', () => {
    render(<PatternMenuMusicVersion />);
    const select = screen.getByTestId('version-selector');
    fireEvent.change(select, { target: { value: '27' } });
    expect(mockOnChangeMusicVersion).toHaveBeenCalledTimes(1);
  });
});

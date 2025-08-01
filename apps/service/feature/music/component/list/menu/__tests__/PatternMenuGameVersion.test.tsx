
import { render, screen, fireEvent } from '@testing-library/react';
import { PatternMenuGameVersion } from '../PatternMenuGameVersion';
import { usePatternGameVersion } from '../usePatternGameVersion';
import { useTranslations } from 'next-intl';

jest.mock('../usePatternGameVersion');
jest.mock('next-intl');

jest.mock('@/common/versionSelector/VersionSelector', () => ({
  VersionSelector: ({ currentVersion, onChangeVersion }) => (
    <select value={currentVersion} onChange={onChangeVersion} data-testid="version-selector">
      <option value="28">Version 28</option>
      <option value="27">Version 27</option>
    </select>
  ),
}));

describe('PatternMenuGameVersion', () => {
  const mockOnChangeGameVersion = jest.fn();

  beforeEach(() => {
    (usePatternGameVersion as jest.Mock).mockReturnValue({
      currentGameVersion: 28,
      onChangeGameVersion: mockOnChangeGameVersion,
    });
    (useTranslations as jest.Mock).mockReturnValue((key) => key);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders game version selector', () => {
    render(<PatternMenuGameVersion />);

    expect(screen.getByText('music.menu.gameVersion')).toBeInTheDocument();
    expect(screen.getByTestId('version-selector')).toBeInTheDocument();
  });

  it('calls onChangeGameVersion on select change', () => {
    render(<PatternMenuGameVersion />);
    const select = screen.getByTestId('version-selector');
    fireEvent.change(select, { target: { value: '27' } });
    expect(mockOnChangeGameVersion).toHaveBeenCalledTimes(1);
  });
});

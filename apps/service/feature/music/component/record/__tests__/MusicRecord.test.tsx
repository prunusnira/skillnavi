
import { render, screen, fireEvent } from '@testing-library/react';
import MusicRecord from '../MusicRecord';
import useMusicRecord from '../useMusicRecord';
import { useTranslations } from 'next-intl';

jest.mock('../useMusicRecord');
jest.mock('next-intl');

jest.mock('@skillnavi/ui', () => ({
  ButtonRounded: ({ text, onClick, isSelected }) => (
    <button onClick={onClick} className={isSelected ? 'selected' : ''}>
      {text}
    </button>
  ),
}));

jest.mock('../MusicRecordItem', () => {
  return function MockMusicRecordItem({ level, patterncode }) {
    return <div data-testid={`music-record-item-${patterncode}`}>Level: {level}</div>;
  };
});

describe('MusicRecord', () => {
  const mockChangeGameType = jest.fn();
  const mockChangeVersion = jest.fn();

  beforeEach(() => {
    (useMusicRecord as jest.Mock).mockReturnValue({
      gameMode: 'g',
      music: { pattern: [{ patterncode: 1, level: 500 }, { patterncode: 2, level: 600 }] },
      skill: [{ patterncode: 1, rate: 9000 }],
      changeGameType: mockChangeGameType,
      changeVersion: mockChangeVersion,
      ptcodeList: [1, 2],
      availableVersion: [{ id: 28, short: 'V28' }, { id: 29, short: 'V29' }],
      version: 28,
      mid: 123,
    });
    (useTranslations as jest.Mock).mockReturnValue((key) => key);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders version and game type selectors', () => {
    render(<MusicRecord />);

    expect(screen.getByText('music.version')).toBeInTheDocument();
    expect(screen.getByText('music.mode')).toBeInTheDocument();

    expect(screen.getByText('V28')).toBeInTheDocument();
    expect(screen.getByText('V29')).toBeInTheDocument();
    expect(screen.getByText('Guitar')).toBeInTheDocument();
    expect(screen.getByText('Bass')).toBeInTheDocument();
    expect(screen.getByText('Drum')).toBeInTheDocument();
  });

  it('renders MusicRecordItem for each valid pattern', () => {
    render(<MusicRecord />);

    expect(screen.getByTestId('music-record-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('music-record-item-1')).toHaveTextContent('Level: 500');
    expect(screen.getByTestId('music-record-item-2')).toBeInTheDocument();
    expect(screen.getByTestId('music-record-item-2')).toHaveTextContent('Level: 600');
  });

  it('calls changeVersion when version button is clicked', () => {
    render(<MusicRecord />);
    fireEvent.click(screen.getByText('V29'));
    expect(mockChangeVersion).toHaveBeenCalledWith(29);
  });

  it('calls changeGameType when game type button is clicked', () => {
    render(<MusicRecord />);
    fireEvent.click(screen.getByText('Bass'));
    expect(mockChangeGameType).toHaveBeenCalledWith('b');
  });

  it('does not render MusicRecordItem for patterns with level 0', () => {
    (useMusicRecord as jest.Mock).mockReturnValue({
      gameMode: 'g',
      music: { pattern: [{ patterncode: 1, level: 0 }] }, // Level 0 pattern
      skill: [],
      changeGameType: mockChangeGameType,
      changeVersion: mockChangeVersion,
      ptcodeList: [1],
      availableVersion: [],
      version: 28,
      mid: 123,
    });
    render(<MusicRecord />);
    expect(screen.queryByTestId('music-record-item-1')).not.toBeInTheDocument();
  });
});

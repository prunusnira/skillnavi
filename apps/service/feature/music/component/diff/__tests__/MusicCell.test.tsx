
import { render, screen } from '@testing-library/react';
import { MusicCell } from '../MusicCell';
import { Pattern } from '@/feature/music/data/Pattern';
import { Skill } from '@/feature/skill/data/Skill';
import { convertRateToRank } from '@/lib/game/convertRateToRank';
import { convertRank } from '@/lib/game/convertRank';

jest.mock('@/lib/game/convertRateToRank');
jest.mock('@/lib/game/convertRank');

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('MusicCell', () => {
  const mockPattern: Pattern[] = [
    { id: 1, mid: 1, type: 'gf', difficulty: 50, level: 500, play_type: 'd', skill_note: 100, skill_point: 100, patterncode: 1 },
    { id: 2, mid: 1, type: 'gf', difficulty: 60, level: 600, play_type: 'e', skill_note: 120, skill_point: 120, patterncode: 2 },
  ];

  it('renders level correctly when skill is not provided', () => {
    render(<MusicCell pattern={mockPattern} patterncode={1} />);
    expect(screen.getByText('5.00')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders level, rate, and rank image when skill is provided', () => {
    const mockSkill: Skill[] = [
      { id: 1, mid: 1, uid: 1, version: 28, type: 'gf', difficulty: 50, level: 500, play_type: 'd', skill_note: 100, skill_point: 100, clear_type: 1, rank_type: 1, full_combo: false, ex_clear: false, score: 900000, rate: 9500 },
    ];
    (convertRateToRank as jest.Mock).mockReturnValue(1); // Mock a rank
    (convertRank as jest.Mock).mockReturnValue('S'); // Mock a rank string

    render(<MusicCell pattern={mockPattern} skill={mockSkill} patterncode={1} />);

    expect(screen.getByText('5.00')).toBeInTheDocument();
    expect(screen.getByText('95.00%')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', '/rank/S');
  });

  it('does not render rate and rank image if rate is 0', () => {
    const mockSkill: Skill[] = [
      { id: 1, mid: 1, uid: 1, version: 28, type: 'gf', difficulty: 50, level: 500, play_type: 'd', skill_note: 100, skill_point: 100, clear_type: 1, rank_type: 1, full_combo: false, ex_clear: false, score: 0, rate: 0 },
    ];

    render(<MusicCell pattern={mockPattern} skill={mockSkill} patterncode={1} />);

    expect(screen.getByText('5.00')).toBeInTheDocument();
    expect(screen.queryByText('0.00%')).not.toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});

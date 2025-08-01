
import { render, screen } from '@testing-library/react';
import SkillGridForSnapshot from '../SkillGridForSnapshot';
import { SkillForTable } from '@/feature/skill/data/Skill';
import { getSkillCN } from '@/feature/skill/api/getSkillCN';
import { convertPatternCode } from '@/lib/game/convertPatternCode';
import { convertLevel } from '@/lib/game/convertLevel';
import { convertRank } from '@/lib/game/convertRank';
import { getClearState } from '@/lib/game/getClearState';
import { useParams, useSearchParams } from 'next/navigation';

jest.mock('@/feature/skill/api/getSkillCN');
jest.mock('@/lib/game/convertPatternCode');
jest.mock('@/lib/game/convertLevel');
jest.mock('@/lib/game/convertRank');
jest.mock('@/lib/game/getClearState');
jest.mock('next/navigation');

jest.mock('@/common/albumart/AlbumArt', () => {
  return function MockAlbumArt({ mid }) {
    return <div data-testid="album-art">Album Art for {mid}</div>;
  };
});

jest.mock('@/common/anchor/AnchorText', () => {
  return function MockAnchorText({ text, path }) {
    return <a href={path}>{text}</a>;
  };
});

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('SkillGridForSnapshot', () => {
  const mockSkill: SkillForTable & { mname: string } = {
    id: 1,
    mid: 100,
    uid: 1,
    version: 28,
    type: 'gf',
    difficulty: 50,
    level: 700,
    play_type: 'd',
    skill_note: 100,
    skill_point: 70000,
    clear_type: 1,
    rank_type: 1,
    full_combo: false,
    ex_clear: false,
    score: 950000,
    rate: 9500,
    skill: 70000,
    mname: 'Test Music Name',
  };

  beforeEach(() => {
    (getSkillCN as jest.Mock).mockReturnValue('skill-test');
    (convertPatternCode as jest.Mock).mockReturnValue('mock-pattern-image');
    (convertLevel as jest.Mock).mockReturnValue('7.00');
    (convertRank as jest.Mock).mockReturnValue('S');
    (getClearState as jest.Mock).mockReturnValue('CLEARED');
    (useParams as jest.Mock).mockReturnValue({ id: '123' });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('page=1&version=28'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders skill grid item for snapshot with correct data', () => {
    render(<SkillGridForSnapshot skill={mockSkill} index={0} />);

    expect(screen.getByText('1')).toBeInTheDocument(); // Index + 1
    expect(screen.getByText('Test Music Name')).toBeInTheDocument();
    expect(screen.getByTestId('album-art')).toHaveTextContent('Album Art for 100');
    expect(screen.getByAltText('difficulty')).toHaveAttribute('src', '/img/diff/mock-pattern-image');
    expect(screen.getByText('7.00')).toBeInTheDocument();
    expect(screen.getByAltText('rank')).toHaveAttribute('src', '/img/rank/S');
    expect(screen.getByText('CLEARED')).toBeInTheDocument();
    expect(screen.getByText('700.00')).toBeInTheDocument(); // skill / 100
    expect(screen.getByText('95.00%')).toBeInTheDocument(); // rate / 100
  });

  it('applies correct background class based on index', () => {
    const { rerender } = render(<SkillGridForSnapshot skill={mockSkill} index={0} />);
    expect(screen.getByText('Test Music Name').closest('section')).toHaveClass('bg-blue-200');

    rerender(<SkillGridForSnapshot skill={mockSkill} index={1} />);
    expect(screen.getByText('Test Music Name').closest('section')).toHaveClass('bg-blue-100');
  });

  it('forms the correct music info link', () => {
    render(<SkillGridForSnapshot skill={mockSkill} index={0} />);
    const musicLink = screen.getByText('Test Music Name').closest('a');
    expect(musicLink).toHaveAttribute('href', '/music/100/record/123/28');
  });
});

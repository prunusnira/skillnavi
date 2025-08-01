
import { render, screen, fireEvent } from '@testing-library/react';
import MusicDiffTable from '../MusicDiffTable';
import { Pattern } from '@/feature/music/data/Pattern';
import { Skill } from '@/feature/skill/data/Skill';
import { useRouter } from '@/i18n/routing';
import { useAtomValue } from 'jotai';

jest.mock('@/i18n/routing');
jest.mock('jotai');

jest.mock('../MusicCell', () => ({
  MusicCell: ({ patterncode }) => <div data-testid={`music-cell-${patterncode}`}></div>,
}));

describe('MusicDiffTable', () => {
  const mockPattern: Pattern[] = [];
  const mockSkill: Skill[] = [];
  const mockMid = 123;
  const mockVersion = 28;
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (useAtomValue as jest.Mock).mockReturnValue(null); // Default to no user
  });

  it('renders the table structure and MusicCells', () => {
    render(<MusicDiffTable pattern={mockPattern} skill={mockSkill} mid={mockMid} version={mockVersion} />);

    expect(screen.getByText('G')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
    expect(screen.getByText('BSC')).toBeInTheDocument();
    expect(screen.getByText('ADV')).toBeInTheDocument();
    expect(screen.getByText('EXT')).toBeInTheDocument();
    expect(screen.getByText('MAS')).toBeInTheDocument();

    expect(screen.getByTestId('music-cell-1')).toBeInTheDocument();
    expect(screen.getByTestId('music-cell-5')).toBeInTheDocument();
    expect(screen.getByTestId('music-cell-9')).toBeInTheDocument();
    expect(screen.getByTestId('music-cell-2')).toBeInTheDocument();
    expect(screen.getByTestId('music-cell-6')).toBeInTheDocument();
    expect(screen.getByTestId('music-cell-10')).toBeInTheDocument();
    expect(screen.getByTestId('music-cell-3')).toBeInTheDocument();
    expect(screen.getByTestId('music-cell-7')).toBeInTheDocument();
    expect(screen.getByTestId('music-cell-11')).toBeInTheDocument();
    expect(screen.getByTestId('music-cell-4')).toBeInTheDocument();
    expect(screen.getByTestId('music-cell-8')).toBeInTheDocument();
    expect(screen.getByTestId('music-cell-12')).toBeInTheDocument();
  });

  it('calls router.push when user exists and table is clicked', () => {
    (useAtomValue as jest.Mock).mockReturnValue({ id: 1, name: 'Test User' });
    render(<MusicDiffTable pattern={mockPattern} skill={mockSkill} mid={mockMid} version={mockVersion} />);

    fireEvent.click(screen.getByText('BSC').closest('section') as HTMLElement);

    expect(mockRouterPush).toHaveBeenCalledWith(expect.stringContaining(`/music/${mockMid}/record/1/${mockVersion}`));
  });

  it('does not call router.push when user does not exist and table is clicked', () => {
    render(<MusicDiffTable pattern={mockPattern} skill={mockSkill} mid={mockMid} version={mockVersion} />);

    fireEvent.click(screen.getByText('BSC').closest('section') as HTMLElement);

    expect(mockRouterPush).not.toHaveBeenCalled();
  });
});

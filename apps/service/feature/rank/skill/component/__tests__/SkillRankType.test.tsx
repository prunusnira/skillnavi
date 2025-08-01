
import { render, screen, fireEvent } from '@testing-library/react';
import SkillRankType from '../SkillRankType';
import { usePathname, useRouter } from '@/i18n/routing';

jest.mock('@/i18n/routing');

jest.mock('@skillnavi/ui', () => ({
  ButtonStandard: ({ text, onClick }) => <button onClick={onClick}>{text}</button>,
}));

describe('SkillRankType', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/rank/skill');
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders GF and DM buttons', () => {
    render(<SkillRankType />);
    expect(screen.getByText('GF')).toBeInTheDocument();
    expect(screen.getByText('DM')).toBeInTheDocument();
  });

  it('calls router.push with correct params when GF button is clicked', () => {
    render(<SkillRankType />);
    fireEvent.click(screen.getByText('GF'));
    expect(mockRouterPush).toHaveBeenCalledWith('/rank/skill?type=gf&page=1');
  });

  it('calls router.push with correct params when DM button is clicked', () => {
    render(<SkillRankType />);
    fireEvent.click(screen.getByText('DM'));
    expect(mockRouterPush).toHaveBeenCalledWith('/rank/skill?type=dm&page=1');
  });
});

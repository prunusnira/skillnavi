
import { render, screen, fireEvent } from '@testing-library/react';
import MusicRecordItem from '../MusicRecordItem';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { getPatternTypeFromCode } from '@/lib/pattern/getPatternTypeFromCode';

jest.mock('next-intl');
jest.mock('@/i18n/routing');
jest.mock('@/lib/pattern/getPatternTypeFromCode');

describe('MusicRecordItem', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key) => key);
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (getPatternTypeFromCode as jest.Mock).mockReturnValue('EXT');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders pattern info and no data message when skill is not provided', () => {
    render(<MusicRecordItem level={700} patterncode={3} mid="123" version="28" />);

    expect(screen.getByText('EXT 7.00')).toBeInTheDocument();
    expect(screen.getByText('music.ranking')).toBeInTheDocument();
    expect(screen.getByText('music.nodata')).toBeInTheDocument();
  });

  it('renders skill data when skill is provided', () => {
    const mockSkill = {
      rate: 9500,
      maxrank: 'S',
      combo: 1000,
    };
    render(<MusicRecordItem skill={mockSkill as any} level={700} patterncode={3} mid="123" version="28" />);

    expect(screen.getByText('95.00%')).toBeInTheDocument();
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('70.00')).toBeInTheDocument(); // (700 * 9500 * 2) / 1000 / 100 = 133
    expect(screen.getByText('1000')).toBeInTheDocument();
  });

  it('calls router.push with correct params when ranking button is clicked', () => {
    render(<MusicRecordItem level={700} patterncode={3} mid="123" version="28" />);

    fireEvent.click(screen.getByText('music.ranking'));

    expect(mockRouterPush).toHaveBeenCalledWith('/pattern/rank/28/1/123/3');
  });
});

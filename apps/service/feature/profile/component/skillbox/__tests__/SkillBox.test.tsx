
import { render, screen, fireEvent } from '@testing-library/react';
import SkillBox from '../SkillBox';
import useSkillBox from '../useSkillBox';
import { useAtomValue } from 'jotai';
import { useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

jest.mock('../useSkillBox');
jest.mock('jotai');
jest.mock('@/i18n/routing');
jest.mock('next/navigation');
jest.mock('next-intl');

jest.mock('../SkillBoxRow', () => {
  return function MockSkillBoxRow({ children }) {
    return <div data-testid="skill-box-row">{children}</div>;
  };
});

jest.mock('../SkillBoxCell', () => {
  return function MockSkillBoxCell({ children }) {
    return <div data-testid="skill-box-cell">{children}</div>;
  };
});

jest.mock('@/common/skillColor/SkillColor', () => {
  return function MockSkillColor({ value, onClick }) {
    return <div data-testid={`skill-color-${value}`} onClick={onClick}>{value}</div>;
  };
});

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }) => <svg data-testid={`fa-icon-${icon.iconName}`} />,
}));

describe('SkillBox', () => {
  const mockRouterPush = jest.fn();
  const mockOpenViewBox = jest.fn();
  const mockCloseViewBox = jest.fn();

  const mockSkillData = [
    { version: 28, gf: 1000, dm: 500 },
    { version: 27, gf: 900, dm: 400 },
  ];

  beforeEach(() => {
    (useSkillBox as jest.Mock).mockReturnValue({
      skillBox: mockSkillData,
      viewAll: false,
      openViewBox: mockOpenViewBox,
      closeViewBox: mockCloseViewBox,
    });
    (useAtomValue as jest.Mock).mockReturnValue([
      { id: 28, short: 'V28' },
      { id: 27, short: 'V27' },
    ]);
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (useParams as jest.Mock).mockReturnValue({ id: '123' });
    (useTranslations as jest.Mock).mockReturnValue((key) => key);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders skill box headers and data rows', () => {
    render(<SkillBox skill={[]} />);

    expect(screen.getByText('#')).toBeInTheDocument();
    expect(screen.getByText('GF')).toBeInTheDocument();
    expect(screen.getByText('DM')).toBeInTheDocument();

    expect(screen.getByText('V28')).toBeInTheDocument();
    expect(screen.getByText('V27')).toBeInTheDocument();
    expect(screen.getByTestId('skill-color-1000')).toBeInTheDocument();
    expect(screen.getByTestId('skill-color-500')).toBeInTheDocument();
    expect(screen.getByTestId('skill-color-900')).toBeInTheDocument();
    expect(screen.getByTestId('skill-color-400')).toBeInTheDocument();
  });

  it('renders open button when viewAll is false', () => {
    render(<SkillBox skill={[]} />);
    expect(screen.getByText('profile.info.skillbox.open')).toBeInTheDocument();
    expect(screen.getByTestId('fa-icon-circle-chevron-down')).toBeInTheDocument();
    expect(screen.queryByText('profile.info.skillbox.close')).not.toBeInTheDocument();
  });

  it('renders close button when viewAll is true', () => {
    (useSkillBox as jest.Mock).mockReturnValue({
      skillBox: mockSkillData,
      viewAll: true,
      openViewBox: mockOpenViewBox,
      closeViewBox: mockCloseViewBox,
    });
    render(<SkillBox skill={[]} />);
    expect(screen.getByText('profile.info.skillbox.close')).toBeInTheDocument();
    expect(screen.getByTestId('fa-icon-circle-chevron-up')).toBeInTheDocument();
    expect(screen.queryByText('profile.info.skillbox.open')).not.toBeInTheDocument();
  });

  it('calls openViewBox when open button is clicked', () => {
    render(<SkillBox skill={[]} />);
    fireEvent.click(screen.getByText('profile.info.skillbox.open'));
    expect(mockOpenViewBox).toHaveBeenCalledTimes(1);
  });

  it('calls closeViewBox when close button is clicked', () => {
    (useSkillBox as jest.Mock).mockReturnValue({
      skillBox: mockSkillData,
      viewAll: true,
      openViewBox: mockOpenViewBox,
      closeViewBox: mockCloseViewBox,
    });
    render(<SkillBox skill={[]} />);
    fireEvent.click(screen.getByText('profile.info.skillbox.close'));
    expect(mockCloseViewBox).toHaveBeenCalledTimes(1);
  });

  it('calls router.push with correct params when GF skill is clicked', () => {
    render(<SkillBox skill={[]} />);
    fireEvent.click(screen.getByTestId('skill-color-1000'));
    expect(mockRouterPush).toHaveBeenCalledWith(expect.stringContaining('/skill/28/gf/123/grid/target'));
  });

  it('calls router.push with correct params when DM skill is clicked', () => {
    render(<SkillBox skill={[]} />);
    fireEvent.click(screen.getByTestId('skill-color-500'));
    expect(mockRouterPush).toHaveBeenCalledWith(expect.stringContaining('/skill/28/dm/123/grid/target'));
  });
});

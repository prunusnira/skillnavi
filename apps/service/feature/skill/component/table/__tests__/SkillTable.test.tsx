
import { render, screen, fireEvent } from '@testing-library/react';
import SkillTable from '../SkillTable';
import useSkillTable from '../useSkillTable';
import { useAtomValue } from 'jotai';
import { useCreateSnapshot } from '@/feature/snapshot/component/useCreateSnapshot';
import { screenshot } from '@/lib/screenshot/screenshot';
import { createLog } from '@skillnavi/data/src/log/createLog';
import { useTranslations } from 'next-intl';

jest.mock('../useSkillTable');
jest.mock('jotai');
jest.mock('@/feature/snapshot/component/useCreateSnapshot');
jest.mock('@/lib/screenshot/screenshot');
jest.mock('@skillnavi/data/src/log/createLog');
jest.mock('next-intl');

jest.mock('@/common/card/Card', () => {
  return function MockCard({ title, sub, children, ref }) {
    return (
      <div data-testid="card" ref={ref}>
        <h1>{title}</h1>
        {sub && <div data-testid="card-sub">{sub}</div>}
        {children}
      </div>
    );
  };
});

jest.mock('../SkillMenu', () => {
  return function MockSkillMenu() {
    return <div data-testid="skill-menu">Skill Menu</div>;
  };
});

jest.mock('../SkillTableTitleVersion', () => {
  return function MockSkillTableTitleVersion({ versionId }) {
    return <div data-testid="skill-table-title-version">Version: {versionId}</div>;
  };
});

jest.mock('../SkillTableTextProfile', () => {
  return function MockSkillTableTextProfile({ profile }) {
    return <div data-testid="skill-table-text-profile">Profile: {profile.name}</div>;
  };
});

jest.mock('../SkillList', () => {
  return function MockSkillList({ skill, index }) {
    return <div data-testid={`skill-list-${index}`}>{skill.music.name}</div>;
  };
});

jest.mock('../SkillGrid', () => {
  return function MockSkillGrid({ skill, index }) {
    return <div data-testid={`skill-grid-${index}`}>{skill.music.name}</div>;
  };
});

jest.mock('@/common/pager/Pager', () => {
  return function MockPager({ page, allpage }) {
    return <div data-testid="pager">Pager: {page}/{allpage}</div>;
  };
});

jest.mock('@/common/loading/Loading', () => {
  return function MockLoading() {
    return <div data-testid="loading">Loading...</div>;
  };
});

jest.mock('@skillnavi/ui', () => ({
  ButtonRounded: ({ text, onClick }) => <button onClick={onClick}>{text}</button>,
}));

jest.mock('@/common/skillColor/SkillColor', () => {
  return function MockSkillColor({ value }) {
    return <div data-testid="skill-color">{value}</div>;
  };
});

describe('SkillTable', () => {
  const mockMakeSnapshot = jest.fn();
  const mockScreenshot = jest.fn();
  const mockCreateLog = jest.fn();

  beforeEach(() => {
    (useSkillTable as jest.Mock).mockReturnValue({
      userSkill: { all: 1000, gf: 500, dm: 500 },
      skillSum: [10000, 5000],
      profile: { id: 1, name: 'Test User' },
      skill: [
        { title: 'HOT', data: [{ mid: 1, music: { name: 'Hot Song' } }] },
        { title: 'OTHER', data: [{ mid: 2, music: { name: 'Other Song' } }] },
      ],
      isLoading: false,
      pages: 1,
      page: 1,
      game: 'gf',
      version: 28,
      display: 'grid',
      pageType: 'target',
      ref: { current: document.createElement('div') },
    });
    (useAtomValue as jest.Mock).mockReturnValue({ id: 1 });
    (useCreateSnapshot as jest.Mock).mockReturnValue({ makeSnapshot: mockMakeSnapshot });
    (screenshot as jest.Mock).mockImplementation(mockScreenshot);
    (createLog as jest.Mock).mockImplementation(mockCreateLog);
    (useTranslations as jest.Mock).mockReturnValue((key) => key);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (useSkillTable as jest.Mock).mockReturnValue({ isLoading: true });
    render(<SkillTable />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders no user data message when pageType is not exc and profile is null', () => {
    (useSkillTable as jest.Mock).mockReturnValue({ isLoading: false, pageType: 'target', profile: null });
    render(<SkillTable />);
    expect(screen.getByText('No user data')).toBeInTheDocument();
  });

  it('renders skill table with grid display', () => {
    render(<SkillTable />);

    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('skill-menu')).toBeInTheDocument();
    expect(screen.getByTestId('skill-table-title-version')).toBeInTheDocument();
    expect(screen.getByTestId('skill-table-text-profile')).toBeInTheDocument();
    expect(screen.getByText('GuitarFreaks')).toBeInTheDocument();
    expect(screen.getByText('skill.title')).toBeInTheDocument();
    expect(screen.getByText('skill.snapshot')).toBeInTheDocument();
    expect(screen.getByText('skill.screenshot')).toBeInTheDocument();
    expect(screen.getByText('HOT')).toBeInTheDocument();
    expect(screen.getByText('OTHER')).toBeInTheDocument();
    expect(screen.getByTestId('skill-grid-0')).toBeInTheDocument();
    expect(screen.getByTestId('skill-grid-0')).toHaveTextContent('Hot Song');
  });

  it('renders skill table with list display', () => {
    (useSkillTable as jest.Mock).mockReturnValue({
      userSkill: { all: 1000, gf: 500, dm: 500 },
      skillSum: [10000, 5000],
      profile: { id: 1, name: 'Test User' },
      skill: [
        { title: 'HOT', data: [{ mid: 1, music: { name: 'Hot Song' } }] },
        { title: 'OTHER', data: [{ mid: 2, music: { name: 'Other Song' } }] },
      ],
      isLoading: false,
      pages: 1,
      page: 1,
      game: 'gf',
      version: 28,
      display: 'list',
      pageType: 'target',
      ref: { current: document.createElement('div') },
    });
    render(<SkillTable />);
    expect(screen.getByTestId('skill-list-0')).toBeInTheDocument();
    expect(screen.getByTestId('skill-list-0')).toHaveTextContent('Hot Song');
  });

  it('calls makeSnapshot on snapshot button click', () => {
    render(<SkillTable />);
    fireEvent.click(screen.getByText('skill.snapshot'));
    expect(mockMakeSnapshot).toHaveBeenCalledWith({
      uid: 1,
      uname: 'Test User',
      type: 'gf',
      hot: [{ mid: 1, music: { name: 'Hot Song' }, mname: 'Hot Song' }],
      other: [{ mid: 2, music: { name: 'Other Song' }, mname: 'Other Song' }],
    });
    expect(mockCreateLog).toHaveBeenCalledWith({
      uid: 1,
      action: 'click',
      data: 'skill_create_snapshot',
    });
  });

  it('calls screenshot on screenshot button click', () => {
    render(<SkillTable />);
    fireEvent.click(screen.getByText('skill.screenshot'));
    expect(mockScreenshot).toHaveBeenCalledWith(expect.any(HTMLDivElement), 'SkillNavigator-SkillTable');
    expect(mockCreateLog).toHaveBeenCalledWith({
      uid: 1,
      action: 'click',
      data: 'skill_screenshot',
    });
  });

  it('renders Pager when pageType is all and pages > 0', () => {
    (useSkillTable as jest.Mock).mockReturnValue({
      userSkill: { all: 1000, gf: 500, dm: 500 },
      skillSum: [10000, 5000],
      profile: { id: 1, name: 'Test User' },
      skill: [],
      isLoading: false,
      pages: 5,
      page: 1,
      game: 'gf',
      version: 28,
      display: 'grid',
      pageType: 'all',
      ref: { current: document.createElement('div') },
    });
    render(<SkillTable />);
    expect(screen.getByTestId('pager')).toBeInTheDocument();
  });
});

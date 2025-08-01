
import { render, screen, fireEvent } from '@testing-library/react';
import SkillMenu from '../SkillMenu';
import useSkillMenu from '../useSkillMenu';
import { useTranslations } from 'next-intl';

jest.mock('../useSkillMenu');
jest.mock('next-intl');

jest.mock('@skillnavi/ui', () => ({
  Select: ({ options, onChange, value }) => (
    <select data-testid="select" onChange={onChange} value={value}>
      {options.map(option => <option key={option.value} value={option.value}>{option.display}</option>)}
    </select>
  ),
  ButtonRounded: ({ text, onClick }) => <button onClick={onClick}>{text}</button>,
}));

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }) => <svg data-testid={`fa-icon-${icon.iconName}`} />,
}));

describe('SkillMenu', () => {
  const mockToggleMenu = jest.fn();
  const mockOnChangeVersion = jest.fn();
  const mockOnChangeTable = jest.fn();
  const mockOnChangeData = jest.fn();
  const mockOnChangeGame = jest.fn();

  beforeEach(() => {
    (useSkillMenu as jest.Mock).mockReturnValue({
      active: false,
      toggleMenu: mockToggleMenu,
      versionSelectOption: [{ value: '28', display: 'V28' }],
      onChangeVersion: mockOnChangeVersion,
      onChangeTable: mockOnChangeTable,
      onChangeData: mockOnChangeData,
      onChangeGame: mockOnChangeGame,
      currentVersion: '28',
    });
    (useTranslations as jest.Mock).mockReturnValue((key) => key);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the menu icon', () => {
    render(<SkillMenu />);
    expect(screen.getByTestId('fa-icon-bars')).toBeInTheDocument();
  });

  it('calls toggleMenu when menu icon is clicked', () => {
    render(<SkillMenu />);
    fireEvent.click(screen.getByTestId('fa-icon-bars'));
    expect(mockToggleMenu).toHaveBeenCalledTimes(1);
  });

  it('does not render the menu content when not active', () => {
    render(<SkillMenu />);
    expect(screen.queryByText('skill.menu.version.title')).not.toBeInTheDocument();
  });

  it('renders the menu content when active', () => {
    (useSkillMenu as jest.Mock).mockReturnValue({
      active: true,
      toggleMenu: mockToggleMenu,
      versionSelectOption: [{ value: '28', display: 'V28' }],
      onChangeVersion: mockOnChangeVersion,
      onChangeTable: mockOnChangeTable,
      onChangeData: mockOnChangeData,
      onChangeGame: mockOnChangeGame,
      currentVersion: '28',
    });
    render(<SkillMenu />);

    expect(screen.getByText('skill.menu.version.title')).toBeInTheDocument();
    expect(screen.getByText('skill.menu.data.title')).toBeInTheDocument();
    expect(screen.getByText('skill.menu.table.title')).toBeInTheDocument();
    expect(screen.getByText('skill.menu.game.title')).toBeInTheDocument();
    expect(screen.getByText('skill.menu.button.close')).toBeInTheDocument();
  });

  it('calls onChangeVersion on version select change', () => {
    (useSkillMenu as jest.Mock).mockReturnValue({
      active: true,
      toggleMenu: mockToggleMenu,
      versionSelectOption: [{ value: '28', display: 'V28' }],
      onChangeVersion: mockOnChangeVersion,
      onChangeTable: mockOnChangeTable,
      onChangeData: mockOnChangeData,
      onChangeGame: mockOnChangeGame,
      currentVersion: '28',
    });
    render(<SkillMenu />);
    fireEvent.change(screen.getByTestId('select'), { target: { value: '27' } });
    expect(mockOnChangeVersion).toHaveBeenCalledTimes(1);
  });

  it('calls onChangeData on data button click', () => {
    (useSkillMenu as jest.Mock).mockReturnValue({
      active: true,
      toggleMenu: mockToggleMenu,
      versionSelectOption: [{ value: '28', display: 'V28' }],
      onChangeVersion: mockOnChangeVersion,
      onChangeTable: mockOnChangeTable,
      onChangeData: mockOnChangeData,
      onChangeGame: mockOnChangeGame,
      currentVersion: '28',
    });
    render(<SkillMenu />);
    fireEvent.click(screen.getByText('skill.menu.data.target'));
    expect(mockOnChangeData).toHaveBeenCalledWith('target');
  });

  it('calls onChangeTable on table button click', () => {
    (useSkillMenu as jest.Mock).mockReturnValue({
      active: true,
      toggleMenu: mockToggleMenu,
      versionSelectOption: [{ value: '28', display: 'V28' }],
      onChangeVersion: mockOnChangeVersion,
      onChangeTable: mockOnChangeTable,
      onChangeData: mockOnChangeData,
      onChangeGame: mockOnChangeGame,
      currentVersion: '28',
    });
    render(<SkillMenu />);
    fireEvent.click(screen.getByText('skill.menu.table.grid'));
    expect(mockOnChangeTable).toHaveBeenCalledWith('grid');
  });

  it('calls onChangeGame on game button click', () => {
    (useSkillMenu as jest.Mock).mockReturnValue({
      active: true,
      toggleMenu: mockToggleMenu,
      versionSelectOption: [{ value: '28', display: 'V28' }],
      onChangeVersion: mockOnChangeVersion,
      onChangeTable: mockOnChangeTable,
      onChangeData: mockOnChangeData,
      onChangeGame: mockOnChangeGame,
      currentVersion: '28',
    });
    render(<SkillMenu />);
    fireEvent.click(screen.getByText('skill.menu.game.gf'));
    expect(mockOnChangeGame).toHaveBeenCalledWith('gf');
  });

  it('calls toggleMenu when close button is clicked', () => {
    (useSkillMenu as jest.Mock).mockReturnValue({
      active: true,
      toggleMenu: mockToggleMenu,
      versionSelectOption: [{ value: '28', display: 'V28' }],
      onChangeVersion: mockOnChangeVersion,
      onChangeTable: mockOnChangeTable,
      onChangeData: mockOnChangeData,
      onChangeGame: mockOnChangeGame,
      currentVersion: '28',
    });
    render(<SkillMenu />);
    fireEvent.click(screen.getByText('skill.menu.button.close'));
    expect(mockToggleMenu).toHaveBeenCalledTimes(1);
  });
});

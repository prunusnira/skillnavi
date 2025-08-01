
import { render, screen, fireEvent } from '@testing-library/react';
import { TowerDetailBlock } from '../TowerDetailBlock';
import { useTranslations } from 'next-intl';

jest.mock('next-intl');

jest.mock('@/feature/tower/component/TowerUpdateFloorIcon', () => ({
  TowerUpdateFloorIcon: ({ icon }) => <div data-testid="tower-update-floor-icon">{icon}</div>,
}));

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }) => <svg data-testid={`fa-icon-${icon.iconName}`} />,
}));

describe('TowerDetailBlock', () => {
  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key) => key);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders floor number and clear status', () => {
    render(<TowerDetailBlock floor={0} isCleared={true}><div>Content</div></TowerDetailBlock>);
    expect(screen.getByText('Floor 1')).toBeInTheDocument();
    expect(screen.getByText('(tower.status.clear)')).toBeInTheDocument();
  });

  it('renders not cleared status', () => {
    render(<TowerDetailBlock floor={1} isCleared={false}><div>Content</div></TowerDetailBlock>);
    expect(screen.getByText('Floor 2')).toBeInTheDocument();
    expect(screen.getByText('(tower.status.yet)')).toBeInTheDocument();
  });

  it('shows TowerUpdateFloorIcon when cleared and icon is provided', () => {
    render(<TowerDetailBlock floor={0} isCleared={true} icon="test-icon"><div>Content</div></TowerDetailBlock>);
    expect(screen.getByTestId('tower-update-floor-icon')).toHaveTextContent('test-icon');
  });

  it('toggles content visibility on click', () => {
    render(<TowerDetailBlock floor={0} isCleared={true}><div>Content</div></TowerDetailBlock>);
    const floorTitle = screen.getByText('Floor 1');
    const content = screen.getByText('Content');

    expect(content).toHaveClass('hidden');

    fireEvent.click(floorTitle);
    expect(content).toHaveClass('flex');
    expect(content).not.toHaveClass('hidden');

    fireEvent.click(floorTitle);
    expect(content).toHaveClass('hidden');
    expect(content).not.toHaveClass('flex');
  });
});

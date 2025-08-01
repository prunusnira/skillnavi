
import { render, screen, fireEvent } from '@testing-library/react';
import { TowerListItem } from '../TowerListItem';
import { TowerList } from '@/feature/tower/data/Tower';
import { useRouter } from '@/i18n/routing';
import { getTowerType } from '@/feature/tower/data/getTowerType';

jest.mock('@/i18n/routing');
jest.mock('@/feature/tower/data/getTowerType');

describe('TowerListItem', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (getTowerType as jest.Mock).mockImplementation((type) => `Type: ${type}`);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders tower item with correct data and navigates on click', () => {
    const mockItem: TowerList = {
      id: 123,
      name: 'Test Tower',
      floors: 10,
      skill: 1000,
      open: true,
      game: 'gf',
      display: 'Tower Display',
    };

    render(<TowerListItem item={mockItem} />);

    expect(screen.getByText('Type: gf')).toBeInTheDocument();
    expect(screen.getByText('Tower Display')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Tower Display').closest('div') as HTMLElement);

    expect(mockRouterPush).toHaveBeenCalledWith('/tower/detail?id=123');
  });
});

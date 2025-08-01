
import { render, screen } from '@testing-library/react';
import { TowerListBlock } from '../TowerListBlock';
import { TowerList } from '@/feature/tower/data/Tower';
import { getTowerType } from '@/feature/tower/data/getTowerType';

jest.mock('@/feature/tower/data/getTowerType');

jest.mock('../TowerListItem', () => ({
  TowerListItem: ({ item }) => <div data-testid="tower-list-item">{item.name}</div>,
}));

describe('TowerListBlock', () => {
  beforeEach(() => {
    (getTowerType as jest.Mock).mockReturnValue('Test Tower Type');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders tower list block with title and items', () => {
    const mockItemList: TowerList[] = [
      { id: 1, name: 'Tower A', floors: 10, skill: 1000, open: true },
      { id: 2, name: 'Tower B', floors: 20, skill: 2000, open: false },
    ];

    render(<TowerListBlock type="normal" itemList={mockItemList} />);

    expect(screen.getByText('Test Tower Type')).toBeInTheDocument();
    expect(screen.getAllByTestId('tower-list-item')).toHaveLength(2);
    expect(screen.getByText('Tower A')).toBeInTheDocument();
    expect(screen.getByText('Tower B')).toBeInTheDocument();
  });

  it('renders empty list when itemList is empty', () => {
    render(<TowerListBlock type="normal" itemList={[]} />);
    expect(screen.getByText('Test Tower Type')).toBeInTheDocument();
    expect(screen.queryByTestId('tower-list-item')).not.toBeInTheDocument();
  });
});

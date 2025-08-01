
import { render, screen } from '@testing-library/react';
import { SnapshotsList } from '../SnapshotList';
import { getProfileSession } from '@/feature/profile/api/getProfileSession';
import { getServerSession } from 'next-auth';

jest.mock('@/feature/profile/api/getProfileSession');
jest.mock('next-auth');

jest.mock('../SnapshotList.item', () => ({
  SnapshotListItem: ({ uid, type, date }) => (
    <div data-testid="snapshot-list-item">{uid}-{type}-{date}</div>
  ),
}));

describe('SnapshotsList', () => {
  const mockUser = { id: 123, name: 'Test User' };

  beforeEach(() => {
    (getServerSession as jest.Mock).mockResolvedValue({});
    (getProfileSession as jest.Mock).mockResolvedValue(mockUser);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders snapshot list for GF type', async () => {
    const snapshotMap = new Map<string, string>();
    snapshotMap.set('2023-01-01', 'snap1');
    snapshotMap.set('2023-01-02', 'snap2');

    render(await SnapshotsList({ type: 'gf', snapshotMap }));

    expect(screen.getByText('GuitarFreaks')).toBeInTheDocument();
    expect(screen.getByTestId('snapshot-list-item')).toBeInTheDocument();
    expect(screen.getByText('123-gf-2023-01-01')).toBeInTheDocument();
    expect(screen.getByText('123-gf-2023-01-02')).toBeInTheDocument();
  });

  it('renders snapshot list for DM type', async () => {
    const snapshotMap = new Map<string, string>();
    snapshotMap.set('2023-03-01', 'snapA');

    render(await SnapshotsList({ type: 'dm', snapshotMap }));

    expect(screen.getByText('DrumMania')).toBeInTheDocument();
    expect(screen.getByText('123-dm-2023-03-01')).toBeInTheDocument();
  });

  it('does not render when user is null', async () => {
    (getProfileSession as jest.Mock).mockResolvedValue(null);
    const snapshotMap = new Map<string, string>();
    snapshotMap.set('2023-01-01', 'snap1');

    const { container } = render(await SnapshotsList({ type: 'gf', snapshotMap }));

    expect(container).toBeEmptyDOMElement();
  });
});

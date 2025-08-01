
import { render, screen, fireEvent } from '@testing-library/react';
import { SnapshotListItem } from '../SnapshotList.item';
import { useRouter } from '@/i18n/routing';

jest.mock('@/i18n/routing');

describe('SnapshotListItem', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the date and navigates on click', () => {
    const uid = 123;
    const type = 'gf';
    const date = '2023-10-26';

    render(<SnapshotListItem uid={uid} type={type} date={date} />);

    const dateElement = screen.getByText(date);
    expect(dateElement).toBeInTheDocument();

    fireEvent.click(dateElement);

    expect(mockRouterPush).toHaveBeenCalledWith(`/snapshot/${uid}/${type}/${date}`);
  });
});

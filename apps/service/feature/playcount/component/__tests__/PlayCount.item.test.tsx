
import { render, screen } from '@testing-library/react';
import PlayCountItem from '../PlayCount.item';
import { getTranslations } from 'next-intl/server';
import { convertPatternCode } from '@/lib/game/convertPatternCode';

jest.mock('next-intl/server');
jest.mock('@/lib/game/convertPatternCode');

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('PlayCountItem', () => {
  beforeEach(() => {
    (getTranslations as jest.Mock).mockResolvedValue((key) => key);
    (convertPatternCode as jest.Mock).mockReturnValue('mock-difficulty-image');
  });

  it('renders play count item for music type', async () => {
    const mockItem = {
      id: 123,
      name: 'Test Music',
      playcount: 50,
      patterncode: 0,
    };
    render(await PlayCountItem({ item: mockItem, pos: 1, type: 'music' }));

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByAltText('jacket')).toHaveAttribute('src', '/album/123.jpg');
    expect(screen.getByText('Test Music')).toBeInTheDocument();
    expect(screen.queryByAltText('difficulty')).not.toBeInTheDocument();
    expect(screen.getByText('50user.playcount.table.time')).toBeInTheDocument();
  });

  it('renders play count item for non-music type with pattern', async () => {
    const mockItem = {
      id: 456,
      name: 'Another Music',
      playcount: 100,
      patterncode: 1,
    };
    render(await PlayCountItem({ item: mockItem, pos: 2, type: 'skill' }));

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByAltText('jacket')).toHaveAttribute('src', '/album/456.jpg');
    expect(screen.getByText('Another Music')).toBeInTheDocument();
    expect(screen.getByAltText('difficulty')).toHaveAttribute('src', '/img/diff/mock-difficulty-image');
    expect(screen.getByText('100user.playcount.table.time')).toBeInTheDocument();
  });
});

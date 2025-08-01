
import { render, screen } from '@testing-library/react';
import { MusicListItem } from '../MusicListItem';
import { MusicListPageData } from '@/feature/music/data/MusicListPageData';

jest.mock('@/common/albumart/AlbumArt', () => {
  return function MockAlbumArt({ mid }) {
    return <div data-testid="album-art">Album Art for {mid}</div>;
  };
});

jest.mock('@/feature/music/component/remove/MusicRemoved', () => {
  return function MockMusicRemoved({ version }) {
    return <div data-testid="music-removed">Removed: {version}</div>;
  };
});

jest.mock('@/feature/music/component/diff/MusicDiffTable', () => {
  return function MockMusicDiffTable({ mid, version }) {
    return <div data-testid="music-diff-table">Diff Table for {mid} v{version}</div>;
  };
});

describe('MusicListItem', () => {
  const mockMusicData: MusicListPageData = {
    mid: 123,
    name: 'Test Song',
    composer: 'Test Artist',
    bpm: 120,
    version: 28,
    type: 'gf',
    patterns: [],
    skills: [],
    remove: 29,
  };
  const mockVersion = 28;

  it('renders music item with correct data', () => {
    render(<MusicListItem data={mockMusicData} version={mockVersion} />);

    expect(screen.getByTestId('album-art')).toHaveTextContent('Album Art for 123');
    expect(screen.getByText('Test Song')).toBeInTheDocument();
    expect(screen.getByTestId('music-removed')).toHaveTextContent('Removed: 29');
    expect(screen.getByTestId('music-diff-table')).toHaveTextContent('Diff Table for 123 v28');
  });
});

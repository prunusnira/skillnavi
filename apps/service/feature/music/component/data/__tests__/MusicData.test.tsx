
import { render, screen } from '@testing-library/react';
import MusicData from '../MusicData';
import { getMusicInfo } from '@/feature/music/api/getMusicInfo';

jest.mock('@/feature/music/api/getMusicInfo');

jest.mock('@/common/albumart/AlbumArt', () => {
  return function MockAlbumArt({ mid }) {
    return <div data-testid="album-art">Album Art for {mid}</div>;
  };
});

jest.mock('@/feature/version/VersionDisplay', () => {
  return function MockVersionDisplay({ version }) {
    return <div data-testid="version-display">Version: {version}</div>;
  };
});

describe('MusicData', () => {
  it('renders music data correctly', async () => {
    const mockMusic = {
      id: 1,
      name: 'Test Music Name',
      composer: 'Test Composer',
      bpm: 120,
      version: 28,
      type: 'gf',
    };
    (getMusicInfo as jest.Mock).mockResolvedValue(mockMusic);

    render(await MusicData({ mid: 1 }));

    expect(screen.getByText('Test Music Name')).toBeInTheDocument();
    expect(screen.getByText('Test Composer')).toBeInTheDocument();
    expect(screen.getByTestId('version-display')).toHaveTextContent('Version: 28');
    expect(screen.getByTestId('album-art')).toHaveTextContent('Album Art for 1');
  });
});

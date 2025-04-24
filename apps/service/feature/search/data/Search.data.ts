import { MusicListPageData } from '@/feature/music/data/MusicListPageData';
import { Recent } from '@/feature/recent/data/Recent';

export interface SearchResult {
    list: MusicListPageData[] | Recent[] | { detail: string };
    page: number;
}

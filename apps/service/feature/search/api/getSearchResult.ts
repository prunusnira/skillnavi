import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { API_SEARCH } from '@/url/api';
import { SearchResult } from '@/feature/search/data/Search.data';

export const getSearchResult = async (
    type: string,
    value: string,
    page: number,
    preview = false,
) => {
    return fetchAdv.get<SearchResult>(
        API_SEARCH(type, value, page ?? 1, preview),
    );
};

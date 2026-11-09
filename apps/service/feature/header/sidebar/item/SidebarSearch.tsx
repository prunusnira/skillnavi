'use client';

import { ButtonStandard } from '@skillnavi/ui';
import { useTranslations } from 'next-intl';
import { Select } from '@skillnavi/ui';
import { useEffect, useState, type KeyboardEvent } from 'react';
import { useRouter } from '@/i18n/routing';
import { LINK_MUSIC_INFO, LINK_SEARCH } from '@/url/url';
import { InputText } from '@skillnavi/ui/src/input/InputText';
import { getSearchResult } from '@/feature/search/api/getSearchResult';
import { MusicListPageData } from '@/feature/music/data/MusicListPageData';
import { useAtomValue } from 'jotai';
import { atomUser } from '@/feature/profile/data/atomUser';
import { atomGameVersionLatest } from '@/common/game/data/atomGameVersion';

export const SidebarSearch = () => {
    const [
        searchType,
        setSearchType,
    ] = useState<string>('music');
    const [
        searchText,
        setSearchText,
    ] = useState<string>('');
    const [musicPreview, setMusicPreview] = useState<MusicListPageData[]>([]);
    const [activePreviewIndex, setActivePreviewIndex] = useState(-1);
    const router = useRouter();
    const user = useAtomValue(atomUser);
    const latestVersion = useAtomValue(atomGameVersionLatest);
    const t = useTranslations('sidemenu.search');

    useEffect(() => {
        const value = searchText.trim();
        if (searchType !== 'music' || value.length === 0) {
            setMusicPreview([]);
            setActivePreviewIndex(-1);
            return;
        }

        let cancelled = false;
        const timeout = window.setTimeout(async () => {
            try {
                const result = await getSearchResult('music', value, 1, true);
                if (cancelled) return;

                if (Array.isArray(result.list)) {
                    const list = result.list as MusicListPageData[];
                    setMusicPreview(list);
                    setActivePreviewIndex(list.length > 0 ? 0 : -1);
                } else {
                    setMusicPreview([]);
                    setActivePreviewIndex(-1);
                }
            } catch {
                if (!cancelled) {
                    setMusicPreview([]);
                    setActivePreviewIndex(-1);
                }
            }
        }, 250);

        return () => {
            cancelled = true;
            window.clearTimeout(timeout);
        };
    }, [searchText, searchType]);

    const openMusic = (music: MusicListPageData) => {
        if (user && latestVersion) {
            router.push(
                LINK_MUSIC_INFO({
                    uid: user.id,
                    mid: music.mid,
                    version: latestVersion.id,
                }),
            );
        } else {
            const params = new URLSearchParams({ mid: String(music.mid) });
            if (user) params.set('uid', String(user.id));
            if (latestVersion) {
                params.set('version', String(latestVersion.id));
            }
            router.push(`/music/info?${params.toString()}`);
        }
        setMusicPreview([]);
        setActivePreviewIndex(-1);
    };

    const handleSearchKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (musicPreview.length === 0) return;

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActivePreviewIndex((index) =>
                index < 0 ? 0 : (index + 1) % musicPreview.length,
            );
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActivePreviewIndex((index) =>
                index < 0
                    ? musicPreview.length - 1
                    : (index - 1 + musicPreview.length) % musicPreview.length,
            );
        } else if (event.key === 'Enter' && activePreviewIndex >= 0) {
            event.preventDefault();
            const selectedMusic = musicPreview[activePreviewIndex];
            if (selectedMusic) openMusic(selectedMusic);
        } else if (event.key === 'Escape') {
            setMusicPreview([]);
            setActivePreviewIndex(-1);
        }
    };

    return (
        <div
            className={
                'surface-muted flex w-full max-w-3xl flex-col gap-2 p-3 md:flex-row'
            }
        >
            <Select
                options={[
                    {
                        value: 'music',
                        display: t('type.music'),
                    },
                    {
                        value: 'player',
                        display: t('type.player'),
                    },
                    {
                        value: 'gfskill',
                        display: t('type.gfskill'),
                    },
                    {
                        value: 'dmskill',
                        display: t('type.dmskill'),
                    },
                ]}
                value={searchType}
                onChange={(e) => {
                    setSearchType(e.currentTarget.value);
                    setMusicPreview([]);
                    setActivePreviewIndex(-1);
                }}
            />
            <div
                className="relative flex-1 w-full"
                role="combobox"
                aria-haspopup="listbox"
                aria-expanded={searchType === 'music' && musicPreview.length > 0}
                aria-controls={
                    searchType === 'music' && musicPreview.length > 0
                        ? 'music-search-preview'
                        : undefined
                }
                aria-activedescendant={
                    searchType === 'music' && activePreviewIndex >= 0
                        ? `music-search-preview-${musicPreview[activePreviewIndex]?.mid}`
                        : undefined
                }
                onKeyDown={handleSearchKeyDown}
            >
                <InputText
                    customClass={'flex-1 w-full'}
                    value={searchText}
                    placeholder={t('placeholder')}
                    onChange={(e) => {
                        setSearchText(e.currentTarget.value);
                        setMusicPreview([]);
                        setActivePreviewIndex(-1);
                    }}
                />
                {searchType === 'music' && musicPreview.length > 0 && (
                    <ul
                        id="music-search-preview"
                        className="absolute left-0 right-0 top-full z-50 mt-1 max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-900"
                        role="listbox"
                    >
                        {musicPreview.map((music, index) => (
                            <li
                                id={`music-search-preview-${music.mid}`}
                                key={music.mid}
                                role="option"
                                aria-selected={index === activePreviewIndex}
                                className={`cursor-pointer px-3 py-2 ${
                                    index === activePreviewIndex
                                        ? 'bg-indigo-50 dark:bg-slate-800'
                                        : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}
                                onMouseDown={(event) => event.preventDefault()}
                                onMouseEnter={() => setActivePreviewIndex(index)}
                                onClick={() => openMusic(music)}
                            >
                                <div className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                                    {music.name}
                                </div>
                                {music.composer && (
                                    <div className="truncate text-xs text-slate-500 dark:text-slate-400">
                                        {music.composer}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <ButtonStandard
                customTextClass={
                    'break-keep bg-indigo-600 text-white hover:bg-indigo-700'
                }
                text={t('button')}
                onClick={() => {
                    router.push(LINK_SEARCH(searchType, searchText));
                }}
            />
        </div>
    );
};

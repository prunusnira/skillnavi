'use client';

import { InputText } from '@/common/input/InputText';
import { ButtonStandard } from '@skillnavi/ui';
import { useTranslations } from 'next-intl';
import Select from '@/common/select/Select';
import { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { LINK_SEARCH } from '@/url/url';

export const SidebarSearch = () => {
    const [
        searchType,
        setSearchType,
    ] = useState<string>('music');
    const [
        searchText,
        setSearchText,
    ] = useState<string>('');
    const router = useRouter();
    const t = useTranslations('sidemenu.search');
    return (
        <div
            className={
                'flex flex-col md:flex-row w-full max-w-[768px] gap-[4px]'
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
                onChange={(e) => setSearchType(e.currentTarget.value)}
            />
            <InputText
                customClass={'flex-1 w-full'}
                value={searchText}
                placeholder={t('placeholder')}
                onChange={(e) => setSearchText(e.currentTarget.value)}
            />
            <ButtonStandard
                customClass={'break-keep'}
                text={t('button')}
                onClick={() => {
                    router.push(LINK_SEARCH(searchType, searchText));
                }}
            />
        </div>
    );
};

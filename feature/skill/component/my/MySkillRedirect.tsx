'use client';

import { useRouter } from '@/i18n/routing';
import { useEffect } from 'react';
import { LINK_SKILL_TABLE } from '@/url/url';
import { useAtomValue } from 'jotai';
import { atomGameVersionLatest } from '@/common/game/data/atomGameVersion';
import { useParams } from 'next/navigation';
import { GameType } from '@/common/game/data/GameType';

interface Props {
    userid: number;
}

const MySkillRedirect = ({ userid }: Props) => {
    const router = useRouter();
    const recent = useAtomValue(atomGameVersionLatest);

    const params = useParams<{ type: GameType }>();

    useEffect(() => {
        if (!recent) return;

        router.push(
            LINK_SKILL_TABLE({
                id: userid,
                game: params.type,
                pageType: 'target',
                version: recent,
                display: 'grid',
            }),
        );
    }, [recent]);

    return null;
};

export default MySkillRedirect;

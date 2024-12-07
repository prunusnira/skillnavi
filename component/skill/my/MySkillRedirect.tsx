'use client';

import { useRouter } from '@/i18n/routing';
import { useEffect } from 'react';
import { LINK } from '@/data/url';
import { useAtomValue } from 'jotai';
import { atomGameVersionLatest } from '@/jotai/atomGameVersion';
import { useParams } from 'next/navigation';
import { GameType } from '@/data/game/GameType';

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
            LINK.SKILL.skill({
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

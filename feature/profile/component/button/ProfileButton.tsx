'use client';

import ButtonRounded from '@/common/button/ButtonRounded';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { atomUser } from '@/feature/profile/data/atomUser';

const ProfileButton = () => {
    const t = useTranslations('user.profile.button');
    const { id } = useParams();
    const user = useAtomValue(atomUser);

    if (!user || user.id !== Number(id)) {
        return null;
    }

    return (
        <>
            <ButtonRounded text={t('changecomment')} />
            <ButtonRounded text={t('setdataopen')} />
        </>
    );
};

export default ProfileButton;

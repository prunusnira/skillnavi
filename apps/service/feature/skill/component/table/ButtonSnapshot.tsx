'use client';

import { ButtonRounded } from '@skillnavi/ui';
import { useCreateSnapshot } from '@/feature/snapshot/component/useCreateSnapshot';
import { useTranslations } from 'next-intl';
import { SkillTableData } from '@/feature/skill/data/Skill';
import { Profile } from '@/feature/profile/data/Profile';
import { useSearchParams } from 'next/navigation';
import { GameType } from '@/common/game/data/GameType';
import { createLog } from '@skillnavi/data/src/log/createLog';
import { useSession } from '@/feature/auth/hook/useSession';

interface Props {
    profile: Profile;
    skill?: SkillTableData[];
}

export const ButtonSnapshot = ({ profile, skill }: Props) => {
    const { makeSnapshot } = useCreateSnapshot();
    const session = useSession();
    const t = useTranslations('skill');
    const searchParams = useSearchParams();
    const game = (searchParams.get('game') as GameType) ?? 'gf';

    return (
        <ButtonRounded
            text={t('snapshot')}
            onClick={() => {
                makeSnapshot({
                    uid: profile.id,
                    uname: profile.name,
                    type: game,
                    hot:
                        skill
                            ?.find((set) => set.title === 'HOT')
                            ?.data.map((data) => ({
                                ...data,
                                mname: data.music.name,
                            })) || [],
                    other:
                        skill
                            ?.find((set) => set.title === 'OTHER')
                            ?.data.map((data) => ({
                                ...data,
                                mname: data.music.name,
                            })) || [],
                });
                createLog({
                    uid: session?.profile?.id ?? 0,
                    action: 'click',
                    data: 'skill_create_snapshot',
                });
            }}
        />
    );
};

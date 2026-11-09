'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';
import { useRouter } from '@/i18n/routing';
import {
    LINK_PATTERN_TABLE,
    LINK_PLAYCOUNT,
    LINK_TOWER_MAIN,
} from '@/url/url';
import CommentPortal from '@/feature/profile/component/comment/Comment.portal';
import useProfileButtonPortal from '@/feature/profile/component/button/useProfileButtonPortal';
import OpenDataPortal from '@/feature/profile/component/opendata/OpenData.portal';
import { ButtonRounded } from '@skillnavi/ui';
import { Profile } from '@/feature/profile/data/Profile';

interface Props {
    profile: Profile;
    isOwner: boolean;
}

const ProfileButton = ({ profile, isOwner }: Props) => {
    const t = useTranslations('profile.info.button');
    const tTower = useTranslations('tower.changeIcon');
    const router = useRouter();
    const {
        displayCommentPortal,
        openCommentPortal,
        closeCommentPortal,
        displayOpenDataPortal,
        openOpenDataPortal,
        closeOpenDataPortal,
    } = useProfileButtonPortal();

    return (
        <div className={cn('flex flex-wrap items-center justify-center gap-2')}>
            <ButtonRounded
                text={t('count')}
                onClick={() =>
                    router.push(
                        `${LINK_PLAYCOUNT}?id=${profile.id}&type=music`,
                    )
                }
            />
            <ButtonRounded
                text={t('cleartableGF')}
                onClick={() =>
                    router.push(
                        LINK_PATTERN_TABLE({
                            type: 'gf',
                            id: profile.id,
                        }),
                    )
                }
            />
            <ButtonRounded
                text={t('cleartableDM')}
                onClick={() =>
                    router.push(
                        LINK_PATTERN_TABLE({
                            type: 'dm',
                            id: profile.id,
                        }),
                    )
                }
            />
            {isOwner ? (
                <>
                    <ButtonRounded
                        text={t('comment')}
                        onClick={openCommentPortal}
                    />
                    <ButtonRounded
                        text={t('openinfo')}
                        onClick={openOpenDataPortal}
                    />
                    <ButtonRounded
                        text={tTower('button')}
                        onClick={() => router.push(LINK_TOWER_MAIN)}
                    />
                </>
            ) : null}

            {/* Comment change portal */}
            {displayCommentPortal && isOwner && (
                <CommentPortal
                    profile={profile}
                    closePortal={closeCommentPortal}
                />
            )}

            {/* Open data change portal */}
            {displayOpenDataPortal && isOwner && (
                <OpenDataPortal
                    profile={profile}
                    closePortal={closeOpenDataPortal}
                />
            )}
        </div>
    );
};

export default ProfileButton;

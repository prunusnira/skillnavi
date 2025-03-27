'use client';

import ButtonRounded from '@/common/button/ButtonRounded';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { atomUser } from '@/feature/profile/data/atomUser';
import { cn } from '@/lib/cn';
import { useRouter } from '@/i18n/routing';
import { LINK_PATTERN_TABLE, LINK_PLAYCOUNT } from '@/url/url';
import CommentPortal from '@/feature/profile/component/comment/Comment.portal';
import useProfileButtonPortal from '@/feature/profile/component/button/useProfileButtonPortal';
import OpenDataPortal from '@/feature/profile/component/opendata/OpenData.portal';

const ProfileButton = () => {
    const t = useTranslations('user.profile.button');
    const { id } = useParams();
    const user = useAtomValue(atomUser);
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
        <div className={cn('flex-center gap-2')}>
            <ButtonRounded
                text={t('mybest')}
                onClick={() =>
                    router.push(`${LINK_PLAYCOUNT}?id=${id}&type=music`)
                }
            />
            <ButtonRounded
                text={t('clearRankTable')}
                onClick={() =>
                    router.push(LINK_PATTERN_TABLE({ id: Number(id) }))
                }
            />
            {user && user.id === Number(id) ? (
                <>
                    <ButtonRounded
                        text={t('changecomment')}
                        onClick={openCommentPortal}
                    />
                    <ButtonRounded
                        text={t('setdataopen')}
                        onClick={openOpenDataPortal}
                    />
                </>
            ) : null}

            {/* Comment change portal */}
            {displayCommentPortal && user && (
                <CommentPortal
                    profile={user}
                    closePortal={closeCommentPortal}
                />
            )}

            {/* Open data change portal */}
            {displayOpenDataPortal && user && (
                <OpenDataPortal
                    profile={user}
                    closePortal={closeOpenDataPortal}
                />
            )}
        </div>
    );
};

export default ProfileButton;

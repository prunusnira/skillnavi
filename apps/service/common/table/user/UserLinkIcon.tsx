'use client';

import { IMG, LINK_PROFILE_MAIN } from '@/url/url';
import { cn } from '@/lib/cn';
import { ProfileSimple } from '@/feature/profile/data/ProfileSimple';
import { useRouter } from '@/i18n/routing';
import Image from 'next/image';

interface Props {
    user: ProfileSimple;
    privateNameLabel?: string;
    emptyNameLabel?: string;
}

const UserLinkIcon = ({
    user,
    privateNameLabel = '(이름 비공개)',
    emptyNameLabel = '(이름 없음)',
}: Props) => {
    const router = useRouter();
    const displayName = user.openinfo
        ? user.name || emptyNameLabel
        : privateNameLabel;

    return (
        <div
            className={cn(
                'flex min-w-0 items-center gap-2',
                user.openinfo && 'cursor-pointer',
            )}
            onClick={() => {
                if (user.openinfo) {
                    router.push(LINK_PROFILE_MAIN(user.id));
                }
            }}
        >
            {user.titletower && (
                <Image
                    unoptimized={true}
                    alt="icon"
                    src={`${IMG}/title/${user.titletower}.png`}
                    width={32}
                    height={32}
                    className="shrink-0"
                />
            )}
            <span
                className={cn(
                    'truncate',
                    user.openinfo
                        ? 'link'
                        : 'text-slate-500 dark:text-slate-400',
                )}
            >
                {displayName}
            </span>
        </div>
    );
};

export default UserLinkIcon;

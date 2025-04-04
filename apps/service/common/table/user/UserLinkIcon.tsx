'use client';

import { IMG, LINK_PROFILE_MAIN } from '@/url/url';
import { cn } from '@/lib/cn';
import { ProfileSimple } from '@/feature/profile/data/ProfileSimple';
import { useRouter } from '@/i18n/routing';
import Image from 'next/image';

interface Props {
    user: ProfileSimple;
}

const UserLinkIcon = ({ user }: Props) => {
    const router = useRouter();
    return (
        <div
            className={cn('flex items-center gap-2')}
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
                />
            )}
            <div className="link">
                {user.openinfo ? user.name : '(NO NAME)'}
            </div>
        </div>
    );
};

export default UserLinkIcon;

'use client';

import { IMG, LINK } from '@/data/url';
import { cn } from '@/module/util/cn';
import { ProfileSimple } from '@/data/profile/ProfileSimple';
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
            onClick={() => router.push(LINK.PROFILE.main(user.id))}
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

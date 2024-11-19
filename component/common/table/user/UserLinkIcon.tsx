'use client';

import { IMG, LINK } from '@/data/url';
import { cn } from '@/module/util/cn';
import { ProfileSimple } from '@/data/profile/ProfileSimple';
import { useRouter } from '@/i18n/routing';

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
                <img
                    alt="icon"
                    src={`${IMG}/title/${user.titletower}.png`}
                    className={cn('w-8 h-8')}
                />
            )}
            <div className="link">
                {user.opencount === 'Y' ? user.name : '(NO NAME)'}
            </div>
        </div>
    );
};

export default UserLinkIcon;

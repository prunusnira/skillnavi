'use client';

import ButtonStandard from '@/common/button/ButtonStandard';
import { cn } from '@/lib/cn';
import { useRouter } from '@/i18n/routing';
import { LINK_PLAYCOUNT, LINK_PROFILE_SELF, LINK_SKILL_SELF } from '@/url/url';

const UserButton = () => {
    const router = useRouter();
    return (
        <div className={cn('flex-center gap-2')}>
            <ButtonStandard
                text="Profile"
                onClick={() => router.push(LINK_PROFILE_SELF)}
            />
            <ButtonStandard
                text="My GF"
                onClick={() => router.push(LINK_SKILL_SELF('gf'))}
            />
            <ButtonStandard
                text="My DM"
                onClick={() => router.push(LINK_SKILL_SELF('dm'))}
            />
            <ButtonStandard
                text="My Best"
                onClick={() => router.push(LINK_PLAYCOUNT)}
            />
        </div>
    );
};

export default UserButton;

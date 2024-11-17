'use client';

import ButtonStandard from '@/component/common/button/ButtonStandard';
import { cn } from '@/module/util/cn';
import { useRouter } from '@/i18n/routing';
import { LINK } from '@/data/url';

const UserButton = () => {
    const router = useRouter();
    return (
        <div className={cn('flex-center gap-2')}>
            <ButtonStandard
                text="ProfileOld"
                onClick={() => router.push(LINK.PROFILE.self)}
            />
            <ButtonStandard
                text="My GF"
                onClick={() => router.push(LINK.SKILL.self('gf'))}
            />
            <ButtonStandard
                text="My DM"
                onClick={() => router.push(LINK.SKILL.self('dm'))}
            />
            <ButtonStandard
                text="My Best"
                onClick={() => router.push(LINK.PROFILE.playcount)}
            />
        </div>
    );
};

export default UserButton;

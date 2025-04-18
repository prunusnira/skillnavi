'use client';

import { usePathname } from '@/i18n/routing';
import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { atomUser } from '@/feature/profile/data/atomUser';
import { createLog } from '@skillnavi/data/src/log/createLog';

export const LogPageView = () => {
    const pathname = usePathname();
    const user = useAtomValue(atomUser);
    useEffect(() => {
        createLog({
            uid: user?.id || 0,
            action: 'pageview',
            data: pathname,
        });
    }, [pathname]);
    return null;
};
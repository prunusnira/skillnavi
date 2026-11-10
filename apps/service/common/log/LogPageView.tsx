'use client';

import { usePathname } from '@/i18n/routing';
import { useEffect } from 'react';
import { createLog } from '@skillnavi/data/src/log/createLog';
import { useSession } from '@/feature/auth/hook/useSession';

export const LogPageView = () => {
    const pathname = usePathname();
    const session = useSession();
    useEffect(() => {
        if (!session) return;

        createLog({
            uid: session.profile?.id ?? 0,
            action: 'pageview',
            data: pathname,
        });
    }, [pathname, session]);
    return null;
};

'use client';

import { useAtom } from 'jotai';
import { atomUser } from '@/feature/profile/data/atomUser';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProfileSession } from '@/feature/profile/api/getProfileSession';
import { useRouter } from '@/i18n/routing';
import { LINK_AUTH_NEWUSER } from '@/url/url';

const UserAuthWrapper = () => {
    const [user, setUser] = useAtom(atomUser);
    const router = useRouter();

    const { data: session } = useSession();

    const { data: profile } = useQuery({
        queryKey: [
            'profile',
            session,
        ],
        queryFn: () => getProfileSession(session),
        enabled: !user,
    });

    useEffect(() => {
        if (session && !user) {
            if (profile) {
                setUser(profile);
            } else {
                router.push(LINK_AUTH_NEWUSER);
            }
        }
    }, [profile]);

    return null;
};

export default UserAuthWrapper;

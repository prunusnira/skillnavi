'use client';

import { useSetAtom } from 'jotai';
import { atomUser } from '@/feature/profile/data/atomUser';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProfileSession } from '@/feature/profile/api/getProfileSession';

const UserAuthWrapper = () => {
    const setUser = useSetAtom(atomUser);

    const { data: session } = useSession();

    const { data: profile } = useQuery({
        queryKey: [
            'profile',
            session,
        ],
        queryFn: () => getProfileSession(session),
    });

    useEffect(() => {
        if (profile) {
            setUser(profile);
        }
    }, [profile]);

    return null;
};

export default UserAuthWrapper;

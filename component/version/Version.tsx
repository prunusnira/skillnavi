'use client';

import { getGameVersions } from '@/module/api/env/getGameVersions';
import { useQuery } from '@tanstack/react-query';
import {
    atomGameVersionLatest,
    atomGameVersionList,
} from '@/jotai/atomGameVersion';
import { useEffect } from 'react';
import { useAtom } from 'jotai';

const Version = () => {
    const [
        version,
        setVersion,
    ] = useAtom(atomGameVersionList);
    const [
        latest,
        setLatest,
    ] = useAtom(atomGameVersionLatest);

    const { data, refetch } = useQuery({
        queryKey: ['version'],
        queryFn: getGameVersions,
    });

    useEffect(() => {
        if (!version && !latest) {
            refetch();
        }
    }, []);

    useEffect(() => {
        if (data?.length) {
            setVersion(data);

            const latest = data.sort((a, b) => a.id - b.id);
            setLatest(latest[0]);
        }
    }, [data]);

    return null;
};

export default Version;

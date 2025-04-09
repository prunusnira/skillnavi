import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const useUser = () => {
    const [uniqueId, setUniqueId] = useState<string | null>(null);

    const getUserFromUniqueId = async () => {

    };

    const { data } = useQuery({
        queryKey: ['user', uniqueId],
        queryFn: getUserFromUniqueId,
    });

    useEffect(() => {
        // query parameter에서 unique id 정보 가져오기
        const searchParams = new URLSearchParams(window.location.search);
        const uniqueId = searchParams.get('token');

        // 데이터 없음
        if (!uniqueId) {
            alert('No Unique ID Provided');
        } else {
            setUniqueId(uniqueId);
        }
    }, []);
};

export default useUser;
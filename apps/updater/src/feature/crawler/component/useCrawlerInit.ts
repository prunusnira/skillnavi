import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getUserFromUniqueId } from '../../user/api/getUserFromUniqueId';
import { useSetAtom } from 'jotai';
import { atomCrawler } from '../atom/Crawler.atom';
import Language from '../../../function/language';
import { getLatestVersion } from '../../version/api/getLatestVersion';
import { getUrl } from '../../updater/api/getUrl';

// 역할: 토큰 파싱, 기본 데이터 정의 등
const useCrawlerInit = () => {
    const [token, setToken] = useState<string | null>(null);
    const setConfig = useSetAtom(atomCrawler);

    // token으로 사용자 정보 가져오기
    const { data: user } = useQuery({
        queryKey: [
            'user',
            token,
        ],
        queryFn: () => getUserFromUniqueId(token),
    });

    // 최근버전 가져오기
    const { data: latest } = useQuery({
        queryKey: [
            'recent',
        ],
        queryFn: () => getLatestVersion(),
    });

    // 데이터 url 가져오기
    const { data: url } = useQuery({
        queryKey: [
            'updateurl',
        ],
        queryFn: () => getUrl(),
    });

    // 초기값 설정
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const devToken = searchParams.get('token');

        const token = window.sinUpdateToken?.() || devToken || undefined;
        if (token) {
            setToken(token);
        }

        // 언어설정
        setConfig({ lang: Language.setLang() });
    }, []);

    useEffect(() => {
        if (user) {
            setConfig({
                user,
            });
            window.sinUid = user.id;
        }
    }, [user]);

    useEffect(() => {
        if (latest) {
            setConfig({ version: latest, latest });
        }
    }, [latest]);

    useEffect(() => {
        if (url) {
            window.sinUrl = url;
        }
    }, [url]);

    return {
        user,
    };
};

export default useCrawlerInit;
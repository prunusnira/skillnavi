import axios from 'axios';
import { UrlUploadBoard, UrlUploadProfile, UrlUploadSkill } from '../function/commonData';
import crawlProfile from './crawlProfile';
import { CrawlerUpload } from '../feature/crawler/component/CrawlerImport.type';

const axiosUpload = (
    {
        url,
        json,
        type,
        version,
        setCurrent,
        setBtnDisabled,
    }: CrawlerUpload & { url: string },
) => {
    axios.post(
        url,
        json,
        {
            headers: {
                'content-type': 'application/json',
            },
        },
    )
        .then(rtn => {
            if (rtn.data === 200) {
                alert(`[${type}] Update complete`);
                console.log(`[${type}] Update complete`);
                setCurrent(`[${type}] Update complete`);
                if (type === 'skill' || type === 'simple') {
                    crawlProfile({
                        version,
                        setCurrent,
                        setBtnDisabled,
                    });
                }
            }
            if (rtn.data === 500) {
                alert(`[${type}] Failed to parse data`);
                console.log(`[${type}] Update failed: due to parsing fail`);
                setCurrent(`[${type}] Failed to parse data`);
            }
            if (rtn.data === 501) {
                alert(`[${type}] Crawl token expired`);
                console.log(`[${type}] Update failed: Token is expired. Please try again from the first step.`);
                setCurrent(`[${type}] Crawl token expired`);
            }
            setBtnDisabled(false);
        })
        .catch(error => {
            if (error.response) {
                // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                // Node.js의 http.ClientRequest 인스턴스입니다.
                console.log(error.request);
            } else {
                // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
};

const upload = (
    props: CrawlerUpload,
) => {
    const { type } = props;
    let url = '';
    if (type === 'profile') {
        url = UrlUploadProfile;
    } else if (type === 'skill') {
        url = UrlUploadSkill;
    } else if (type === 'board') {
        url = UrlUploadBoard(window.sinUid);
    } else if (type === 'simple') {
        url = UrlUploadSkill;
    }
    axiosUpload({ url, ...props });
};

export default upload;
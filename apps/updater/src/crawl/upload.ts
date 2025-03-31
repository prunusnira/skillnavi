import axios, { isAxiosError } from 'axios';
import {
    UrlUploadBoard,
    UrlUploadProfile,
    UrlUploadSkill,
} from '../function/commonData';
import { CrawlerUpload } from '../feature/crawler/component/CrawlerImport.type';

const axiosUpload = async ({
    url,
    json,
    type,
    setCurrent,
    setBtnDisabled,
}: CrawlerUpload & { url: string }) => {
    try {
        const rtn = await axios.post(url, json, {
            headers: {
                'content-type': 'application/json',
            },
        });

        if (rtn.data.result === 'success') {
            alert(`[${type}] Update complete`);
            console.log(`[${type}] Update complete`);
            setCurrent(`[${type}] Update complete`);
        }
        setBtnDisabled(false);
    } catch (error) {
        console.log(error);
        if (isAxiosError(error)) {
            alert(`[${type}] Error to update data`);
        } else {
            alert(`[${type}] Unknown error`);
        }
    }
};

const upload = async (props: CrawlerUpload) => {
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
    await axiosUpload({ url, ...props });
};

export default upload;

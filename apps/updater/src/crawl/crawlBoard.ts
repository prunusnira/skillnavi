import upload from './upload';
import { CrawlerBoardParams } from '../feature/crawler/component/CrawlerImport.type';

const crawlBoard = (
    {
        gtype,
        setCurrent,
        setBtnDisabled,
    }: CrawlerBoardParams,
) => {
    const url = window.sinUrl.find(url => url.urltype === 'board')?.url;

    if (!url) {
        alert('No URL for board found');
        return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = `${url}?gtype=${gtype}&bkind=1`;

    img.onload = (event: Event) => {
        const canvas = document.createElement('canvas');
        canvas.width = (event.currentTarget as any).width;
        canvas.height = (event.currentTarget as any).height;

        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(event.currentTarget as any, 0, 0);

        const dataURL = canvas.toDataURL('image/png');

        // 이미지 데이터를 base64 인코딩 하여 전송
        upload({
            json: dataURL.replace(/^data:image\/(png|jpg);base64,/, ''),
            type: 'board',
            version: 0,
            setCurrent,
            setBtnDisabled,
        });
    };
};

export default crawlBoard;
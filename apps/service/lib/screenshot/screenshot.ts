import html2canvas from '@skillnavi/data/src/html2canvas/html2canvas';

function uriToBlob(uri: string): Blob {
    let byteString: string;

    // base64 데이터를 raw binary로 변환
    const splitedURI = uri.split(',');

    if (!splitedURI || splitedURI.length < 2) {
        return new Blob();
    }

    const dataType = splitedURI[0];
    const data = splitedURI[1];

    if (!dataType || !data) return new Blob();

    if (dataType.indexOf('base64') >= 0) {
        byteString = atob(data);
    } else {
        byteString = decodeURIComponent(data);
    }

    // mime type 추출
    const mime = dataType.split(':')[1]?.split(';')[0];

    // typed array에 string 쓰기
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mime });
}

export const screenshot = (elem: HTMLDivElement, filename: string) => {
    window.scrollTo(0, 0);
    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet?.insertRule('body > div:last-child img { display: inline-block; }');

    html2canvas(elem, {
        useCORS: true,
        allowTaint: true,
        logging: true,
    })
        .then((canvas: HTMLCanvasElement) => {
            document.body.append(canvas);
            // dataUrl로 뽑으면 파일명이 너무 길어서
            // 웹킷 브라우저에서는 길이 제한으로 잘라버림
            // 그래서 blob으로 변경할 필요가 있음
            const dataUrl = canvas.toDataURL('image/jpeg');
            const blob = uriToBlob(dataUrl);
            const downloadUrl = URL.createObjectURL(blob);

            const el = document.createElement('a');
            el.href = downloadUrl;
            el.download = filename;
            el.click();

            URL.revokeObjectURL(downloadUrl);
        })
        .catch((error: Error) => {
            console.error('html2canvas error', error);
        });
};

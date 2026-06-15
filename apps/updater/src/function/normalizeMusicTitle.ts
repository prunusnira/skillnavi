const normalizeMusicTitle = (title: string) => {
    // U+301C WAVE DASH (〜) -> U+FF5E FULLWIDTH TILDE (～)
    // DELTA에서 변경된 형태로 물결표가 들어와서 이를 보정함
    return title.replace(/\u301C/g, '\uFF5E');
};

export default normalizeMusicTitle;

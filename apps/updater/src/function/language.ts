class Language {
    static setLang = () => {
        let lang = navigator.language;
        if (lang === 'ko' || lang === 'ko-kr' || lang === 'ko-KR') {
            lang = 'ko';
        } else if (lang === 'ja' || lang === 'ja-jp' || lang === 'ja-JP') {
            lang = 'jp';
        } else {
            lang = 'en';
        }
        return lang;
    };
}

export default Language;
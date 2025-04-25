'use client';

import { useTranslations } from 'next-intl';

interface Props {
    unique: string;
}

const UserScript = ({ unique }: Props) => {
    const t = useTranslations('main.user.script');
    const text = `avascript:$.ajax({url:'https://sinupdater.nira.one',success:function(res){const div=document.createElement('div');div.innerHTML=res;const src=div.getElementsByTagName('script')[0].src;document.body.insertAdjacentHTML('afterend',res);$.getScript(src)}});window.sinUpdateToken=function(){return'${unique}';}`;

    const copyToClipboard = async () => {
        const cbdata = {
            ['text/plain']: text,
        };
        navigator.clipboard.write([new ClipboardItem(cbdata)]).then(() => {
            alert(t('click'));
        });
    };

    return (
        <div
            className={
                'break-all px-[20px] py-[10px] text-sm bg-white text-black border cursor-pointer'
            }
            onClick={() => copyToClipboard()}
        >
            j{text}
        </div>
    );
};

export default UserScript;

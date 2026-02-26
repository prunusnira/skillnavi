'use client';

import { useTranslations } from 'next-intl';
import { ButtonRounded } from '@skillnavi/ui';

interface Props {
    unique: string;
}

const UserScript = ({ unique }: Props) => {
    const t = useTranslations('main.user.script');
    const text = `avascript:$.ajax({url:'https://sinupdater.nira.one',success:function(res){const div=document.createElement('div');div.innerHTML=res;const src=div.getElementsByTagName('script')[0].src;document.body.insertAdjacentHTML('afterend',res);$.getScript(src)}});window.sinUpdateToken=function(){return'${unique}';}`;

    const copyToClipboard = async (all: boolean) => {
        const cbdata = {
            ['text/plain']: all ? `j${text}` : text,
        };
        navigator.clipboard.write([new ClipboardItem(cbdata)]).then(() => {
            alert(t('click'));
        });
    };

    return (
        <section>
            <div
                className={
                    'break-all px-[20px] py-[10px] text-sm bg-white text-black border cursor-pointer'
                }
            >
                j{text}
            </div>
            <div className="flex pt-[10px] justify-center">
                <ButtonRounded
                    onClick={() => copyToClipboard(true)}
                    text={t('button.all')}
                />
                <ButtonRounded
                    onClick={() => copyToClipboard(false)}
                    text={t('button.except')}
                />
            </div>
        </section>
    );
};

export default UserScript;

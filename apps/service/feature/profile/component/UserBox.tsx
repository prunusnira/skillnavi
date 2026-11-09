import { IMG } from '@/url/url';
import { Profile } from '@/feature/profile/data/Profile';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

interface Props {
    mydata: Profile;
}

const UserBox = async ({ mydata }: Props) => {
    const t = await getTranslations('common');

    return (
        <section className={'flex-col-center w-full gap-2'}>
            <div className={'text-sm font-light'}>({mydata.title})</div>
            <div className={'flex-center gap-2 text-xl font-bold'}>
                {mydata.titletower && (
                    <Image
                        unoptimized={true}
                        alt="icon"
                        src={`${IMG}/title/${mydata.titletower}.png`}
                        width={32}
                        height={32}
                    />
                )}
                <div
                    className={
                        mydata.openinfo
                            ? undefined
                            : 'text-base font-medium text-slate-500 dark:text-slate-400'
                    }
                >
                    {mydata.openinfo
                        ? mydata.name || t('nameMissing')
                        : t('namePrivate')}
                </div>
            </div>
        </section>
    );
};

export default UserBox;

import { cn } from '@/lib/cn';
import Image from 'next/image';
import { IMG } from '@/url/url';
import { Profile } from '@/feature/profile/data/Profile';
import { useTranslations } from 'next-intl';

interface Props {
    profile: Profile;
}

const SkillTableTextProfile = ({ profile }: Props) => {
    const t = useTranslations('common');

    return (
        <div className={cn('flex-center gap-1')}>
            {profile.titletower && (
                <Image
                    unoptimized={true}
                    alt={'tower'}
                    src={`${IMG}/title/${profile.titletower}.png`}
                    width={20}
                    height={20}
                />
            )}
            <span
                className={
                    profile.openinfo
                        ? undefined
                        : 'text-slate-500 dark:text-slate-400'
                }
            >
                {profile.openinfo
                    ? profile.name || t('nameMissing')
                    : t('namePrivate')}
            </span>
        </div>
    );
};

export default SkillTableTextProfile;

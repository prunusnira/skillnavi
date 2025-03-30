import { cn } from '@/lib/cn';
import Image from 'next/image';
import { IMG } from '@/url/url';
import { Profile } from '@/feature/profile/data/Profile';

interface Props {
    profile: Profile;
}

const SkillTableTextProfile = ({ profile }: Props) => {
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
            {profile.name}
        </div>
    );
};

export default SkillTableTextProfile;

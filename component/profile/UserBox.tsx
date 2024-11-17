import { cn } from '@/module/util/cn';
import { IMG } from '@/data/url';
import { ProfileOldBasic } from '@/data/profile/ProfileOldBasic';
import { ProfileOld } from '@/data/profile/ProfileOld';

interface Props {
    mydata: ProfileOldBasic | ProfileOld;
}

const UserBox = ({ mydata }: Props) => {
    return (
        <section className={cn('flex-col-center w-full gap-2')}>
            <div className={cn('text-sm font-light')}>({mydata.title})</div>
            <div className={cn('flex-center gap-2 text-xl font-bold')}>
                {mydata.titletower && (
                    <img
                        className={cn('w-8 h-8')}
                        alt="icon"
                        src={`${IMG}/title/${mydata.titletower}.png`}
                    />
                )}
                <div>{mydata.name}</div>
            </div>
        </section>
    );
};

export default UserBox;

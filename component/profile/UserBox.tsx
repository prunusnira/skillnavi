import { IMG } from '@/url/url';
import { Profile } from '@/data/profile/Profile';
import Image from 'next/image';

interface Props {
    mydata: Profile;
}

const UserBox = ({ mydata }: Props) => {
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
                <div>{mydata.name}</div>
            </div>
        </section>
    );
};

export default UserBox;

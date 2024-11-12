import { cn } from '@/module/util/cn';
import { getProfileBasic } from '@/module/api/profile/getProfileBasic';
import { getServerSession } from 'next-auth';
import { IMG } from '@/data/url';
import UserButton from '@/component/main/userCard/UserButton';

const UserInfo = async () => {
    const session = await getServerSession();
    const mydata = await getProfileBasic(session);

    if (!mydata) {
        return null;
    }

    return (
        <section className={cn('flex-col-center')}>
            {/* 프로필 정보 */}
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
                <UserButton />
                <div></div>
            </section>

            {/* 갱신 스크립트 */}
            <section>
                <div></div>
                <div></div>
                <div></div>
            </section>
        </section>
    );
};

export default UserInfo;

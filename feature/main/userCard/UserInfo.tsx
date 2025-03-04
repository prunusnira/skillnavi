import { cn } from '@/lib/cn';
import { getProfileSession } from '@/feature/profile/api/getProfileSession';
import { getServerSession } from 'next-auth';
import UserButton from '@/feature/main/userCard/UserButton';
import UserBox from '@/feature/profile/component/UserBox';

const UserInfo = async () => {
    const session = await getServerSession();
    const mydata = await getProfileSession(session);

    if (!mydata) {
        return null;
    }

    return (
        <section className={cn('flex-col-center')}>
            {/* 프로필 정보 */}
            <UserBox mydata={mydata} />
            <UserButton />

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

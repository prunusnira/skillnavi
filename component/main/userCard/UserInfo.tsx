import { cn } from '@/module/util/cn';
import { getProfileSession } from '@/module/api/profile/getProfileSession';
import { getServerSession } from 'next-auth';
import UserButton from '@/component/main/userCard/UserButton';
import UserBox from '@/component/profile/UserBox';

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

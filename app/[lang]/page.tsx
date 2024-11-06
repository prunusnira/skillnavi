import { cn } from '@/module/util/cn';
import Card from '@/component/common/card/card';
import UserCard from '@/component/main/userCard/UserCard';
import NoticeCard from '@/component/main/notice/NoticeCard';

/**
 * @about 메인 페이지
 * @type nextjs page
 *
 * 메인 페이지는 카드 모음으로 이루어져 있음
 */
const PageIndex = () => (
    <article className={cn('flex-col-center w-full')}>
        {/* 사용자 로그인 정보 & 스크립트 / 공지사항 목록 */}
        <section className={cn('flex w-full')}>
            {/* 로그인/사용자 정보 */}
            <UserCard />

            {/* 공지사항 */}
            <NoticeCard />
        </section>

        {/* 소개 및 사용방법 */}
        <section className={cn('flex w-full')}>
            {/* 카드 1 */}
            <Card>사용법1</Card>

            {/* 카드 2 */}
            <Card>사용법2</Card>
        </section>
    </article>
);

export default PageIndex;

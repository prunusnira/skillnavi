import Navbar from '@/feature/header/navbar/Navbar';
import Sidebar from '@/feature/header/sidebar/Sidebar';
import HeaderNotice from '@/feature/header/Notice';
import Option from '@/feature/header/option/Option';
import { clsx } from 'clsx';

const Header = () => {
    return (
        <header
            className={clsx(
                'bg-blue-200 dark:bg-blue-600',
                'w-full h-[60px] px-[20px] py-[10px]',
                'sticky top-0 bg-opacity-70 z-10',
            )}
        >
            {/* 상단 네비바 */}
            <Navbar />

            {/* 사이드바 */}
            <Sidebar />

            {/* 헤더에 표시하는 공지사항 */}
            <HeaderNotice />

            {/* 옵션 */}
            <Option />
        </header>
    );
};

export default Header;

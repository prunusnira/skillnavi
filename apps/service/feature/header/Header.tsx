import Navbar from '@/feature/header/navbar/Navbar';
import Sidebar from '@/feature/header/sidebar/Sidebar';
import HeaderNotice from '@/feature/header/Notice';
import Option from '@/feature/header/option/Option';
import { clsx } from 'clsx';

const Header = () => {
    return (
        <header
            className={clsx(
                'sticky top-0 z-40 h-16 w-full border-b border-lime-300/70 bg-slate-950 px-4 text-white shadow-[0_10px_32px_rgba(10,15,30,0.22)] sm:px-6',
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

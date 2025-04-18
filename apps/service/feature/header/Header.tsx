import Navbar from '@/feature/header/navbar/Navbar';
import Sidebar from '@/feature/header/sidebar/Sidebar';
import HeaderNotice from '@/feature/header/Notice';
import { cn } from '@/lib/cn';
import Option from '@/feature/header/option/Option';

const Header = () => {
    return (
        <header
            className={cn([
                'w-full h-[60px] px-[20px] py-[10px] sticky top-0 bg-opacity-70 bg-blue-600 z-10',
            ])}
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

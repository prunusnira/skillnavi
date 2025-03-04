import Navbar from '@/feature/header/navbar/Navbar';
import Sidebar from '@/feature/header/sidebar/Sidebar';
import HeaderNotice from '@/feature/header/Notice';
import { cn } from '@/lib/cn';

const Header = () => {
    return (
        <header
            className={cn([
                'w-full h-[60px] px-[20px] py-[10px] sticky top-0 fixed bg-blue-950',
            ])}
        >
            {/* 상단 네비바 */}
            <Navbar />

            {/* 사이드바 */}
            <Sidebar />

            {/* 헤더에 표시하는 공지사항 */}
            <HeaderNotice />
        </header>
    );
};

export default Header;

import Navbar from '@/component/header/navbar/Navbar';
import Sidebar from '@/component/header/sidebar';
import HeaderNotice from '@/component/header/notice';
import { cn } from '@/module/util/cn';

const Header = () => {
    return (
        <header className={cn(['w-full h-[60px] px-[20px] py-[10px]'])}>
            {/* nav bar */}
            <Navbar />

            {/* sidebar */}
            <Sidebar />

            {/* notice */}
            <HeaderNotice />
        </header>
    );
};

export default Header;

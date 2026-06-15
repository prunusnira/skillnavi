import Header from '@/feature/header/Header';
import { cn } from '@/lib/cn';
import Footer from '@/feature/footer/Footer';
import Version from '@/feature/version/Version';
import { ReactNode } from 'react';
import UserAuthWrapper from '@/feature/auth/wrapper/UserAuthWrapper';
import Theme from '@/feature/theme/component/Theme';
import { LogPageView } from '@/common/log/LogPageView';

interface Props {
    children: ReactNode;
}

const PageLayout = ({ children }: Props) => {
    return (
        <main
            className={
                'relative flex min-h-screen w-full flex-col items-center'
            }
        >
            <Header />
            <section
                className={cn(
                    'page-container min-h-[calc(100vh-172px)] flex-1',
                )}
            >
                {children}
            </section>
            <Footer />
            <Version />
            <UserAuthWrapper />
            <Theme />
            <LogPageView />
        </main>
    );
};

export default PageLayout;

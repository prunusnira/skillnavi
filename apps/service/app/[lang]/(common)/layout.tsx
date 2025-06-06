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
        <main className={'relative w-full min-h-screen flex-col-center'}>
            <Header />
            <section
                className={cn(
                    'max-w-screen-xl w-full min-h-[calc(100vh-172px)] flex-col-center pt-[60px]',
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

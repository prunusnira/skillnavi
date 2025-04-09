import Header from '@/feature/header/Header';
import { cn } from '@/lib/cn';
import Footer from '@/feature/footer/Footer';
import Version from '@/feature/version/Version';
import { ReactNode } from 'react';
import UserAuthWrapper from '@/feature/auth/wrapper/UserAuthWrapper';
import Theme from '@/feature/theme/component/Theme';

interface Props {
    children: ReactNode;
}

const PageLayout = ({ children }: Props) => {
    return (
        <main className={'relative w-full min-h-screen'}>
            <Header />
            <section
                className={cn(
                    'max-w-screen-xl w-full min-h-full flex-col-center pt-[60px]',
                )}
            >
                {children}
            </section>
            <Footer />
            <Version />
            <UserAuthWrapper />
            <Theme />
        </main>
    );
};

export default PageLayout;

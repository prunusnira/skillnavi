import Header from '@/feature/header/Header';
import { cn } from '@/lib/cn';
import Footer from '@/feature/footer/Footer';
import Version from '@/feature/version/Version';
import { ReactNode } from 'react';
import UserAuthWrapper from '@/feature/auth/wrapper/UserAuthWrapper';

interface Props {
    children: ReactNode;
}

const PageLayout = ({ children }: Props) => {
    return (
        <>
            <Header />
            <main
                className={cn(
                    'max-w-screen-xl w-full min-h-full flex-col-center pt-[60px]',
                )}
            >
                {children}
            </main>
            <Footer />
            <Version />
            <UserAuthWrapper />
        </>
    );
};

export default PageLayout;

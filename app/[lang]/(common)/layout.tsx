import Header from '@/component/header/Header';
import { cn } from '@/module/util/cn';
import Footer from '@/component/footer/Footer';
import Version from '@/component/version/Version';
import { ReactNode } from 'react';

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
        </>
    );
};

export default PageLayout;

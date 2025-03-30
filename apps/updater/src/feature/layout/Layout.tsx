import { ReactNode } from 'react';
import styles from './Layout.module.scss';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={styles.outerBox}>
            <header className={styles.header}>
                {/* Header content */}
            </header>
            <div className={styles.center}>
                {children}
            </div>
            <footer className={styles.footer}>
                <span>© 2024 SkillNavi. All rights reserved.</span>
                <a href="/privacy">개인정보처리방침</a>
            </footer>
        </div>
    );
}

export default Layout; 
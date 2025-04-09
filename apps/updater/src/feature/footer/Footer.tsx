import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <div className={styles.footerOuter}>
            <span>© 2024 SkillNavi. All rights reserved.</span>
            <a href="/privacy">개인정보처리방침</a>
        </div>
    );
};

export default Footer; 
import { useTranslations } from 'next-intl';
import { cn } from '@/module/util/cn';
import { Link } from '@/i18n/routing';
import { LINK } from '@/data/url';

const Login = () => {
    const t = useTranslations('index.self');
    return (
        <section>
            <div className={cn('link')}>
                <Link href={LINK.AUTH.login}>{t('login')}</Link>
            </div>
            <div>{t('loginFirst')}</div>
        </section>
    );
};

export default Login;

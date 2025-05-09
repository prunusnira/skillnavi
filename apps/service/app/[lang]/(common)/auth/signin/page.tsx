import Card from '@/common/card/Card';
import { getTranslations } from 'next-intl/server';
import { cn } from '@/lib/cn';
import LoginForm from '@/feature/auth/login/LoginForm';

const PageSignIn = async () => {
    const t = await getTranslations('user.login');

    return (
        <article className={cn('w-[90%] h-full flex-col-center')}>
            <Card title={t('title')}>
                <LoginForm />
            </Card>
        </article>
    );
};

export default PageSignIn;

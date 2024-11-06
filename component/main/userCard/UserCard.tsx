'use client';

import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import Card from '@/component/common/card/card';
import Login from '@/component/main/userCard/Login';
import UserInfo from '@/component/main/userCard/UserInfo';

const UserCard = () => {
    const t = useTranslations('index.self');
    const session = useSession();

    return <Card title={t('title')}>{session ? <UserInfo /> : <Login />}</Card>;
};

export default UserCard;

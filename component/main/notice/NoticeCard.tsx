'use client';

import Card from '@/component/common/card/card';
import { useTranslations } from 'next-intl';
import useNotice from '@/component/main/notice/useNotice';
import { NoticeDisplay } from '@/data/notice/Notice';
import { cn } from '@/module/util/cn';
import style from './NoticeCard.module.scss';

const NoticeCard = () => {
    const { notice } = useNotice();
    const t = useTranslations('index');

    const renderNotice = (notice: NoticeDisplay[]) => (
        <section className={cn(style.noticeCard)}>
            {notice.map((n) => (
                <section
                    key={n.id}
                    className={cn(style.noticeItem)}
                >
                    <div>{n.id}</div>
                    <div>{n.title}</div>
                    <div>{n.time}</div>
                </section>
            ))}
        </section>
    );

    if (!notice) {
        return <>no list</>;
    }

    return <Card title={t('notice')}>{renderNotice(notice)}</Card>;
};

export default NoticeCard;

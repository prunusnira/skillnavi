'use client';

import style from './card.module.scss';
import { cn } from '@/module/util/cn';

interface Props {
    title?: string;
    children: React.ReactNode;
}

const Card = ({ title, children }: Props) => {
    return (
        // 공통 카드 ui
        <section className={cn(style.wrapper, 'flex-col-center')}>
            {title && <div className={cn(style.title)}>{title}</div>}
            <div
                className={cn(style.contents, 'flex-col-center', {
                    ['rounded-2xl']: !title,
                    ['rounded-b-2xl rounded-t-none']: !!title,
                })}
            >
                {children}
            </div>
        </section>
    );
};

export default Card;

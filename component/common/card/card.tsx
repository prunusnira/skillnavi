import { clsx } from 'clsx';
import style from './card.module.scss';
import { useAtomValue } from 'jotai';
import { atomEnv } from '@/jotai/atomEnv';

interface Props {
    title: React.ReactNode;
    children: React.ReactNode;
}

const Card = ({ title, children }: Props) => {
    const env = useAtomValue(atomEnv);
    return (
        // 공통 카드 ui
        <section className={clsx(style.wrapper)}>
            {/* 타이틀 영역 */}
            <div
                className={clsx(style.title, {
                    [style.dark]: env.theme === 'dark',
                })}
            >
                {title}
            </div>

            {/* 콘텐츠 영역 */}
            <div
                className={clsx(style.contents, {
                    [style.dark]: env.theme === 'dark',
                })}
            >
                {children}
            </div>
        </section>
    );
};

export default Card;

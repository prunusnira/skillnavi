'use client';

import ButtonRounded from '@/component/common/button/ButtonRounded';
import { usePathname, useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/module/util/cn';

interface Props {
    page: number;
    allpage: number;
}

const Pager = ({ page, allpage }: Props) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const onPageClick = (page: number) => {
        const params = new URLSearchParams();
        const keys = Array.from(searchParams.keys());
        keys.forEach((key) => {
            if (key === 'page') {
                params.set('page', String(page));
            } else {
                const prev = searchParams.get(key);
                if (prev) {
                    params.set(key, prev);
                }
            }
        });

        router.push(`${pathname}?${params.toString()}`);
    };

    const createPager = (current: number, end: number) => {
        // 페이지가 7개 이하인 경우 모두 표시
        if (end === (0 || 1)) {
            return <ButtonRounded text={'1'} />;
        }
        if (end < 8) {
            const list = [];
            for (let i = 0; i < end; i += 1) {
                list.push(i);
            }
            return (
                <>
                    {list.map((v) => (
                        <ButtonRounded
                            key={`page${v}`}
                            text={String(v + 1)}
                            onClick={() => onPageClick(v + 1)}
                        />
                    ))}
                </>
            );
        }
        // 페이지가 3 이하면 1~5까지 표시
        if (current < 4) {
            const list = [
                0,
                1,
                2,
                3,
                4,
            ];
            return (
                <>
                    {list.map((v) => (
                        <ButtonRounded
                            key={`page${v}`}
                            text={String(v + 1)}
                            onClick={() => onPageClick(v + 1)}
                        />
                    ))}

                    <span>......</span>
                    <ButtonRounded
                        key={`page${end}`}
                        text={String(end)}
                        onClick={() => onPageClick(end)}
                    />
                </>
            );
        }

        // 페이지가 end-3 이내이면 end-5에서 end까지 표시
        if (end - current < 4) {
            const list = [];
            for (let i = end - 5; i < end; i += 1) {
                list.push(i);
            }
            return (
                <>
                    <ButtonRounded
                        key={`page${0}`}
                        text={String(1)}
                        onClick={() => onPageClick(1)}
                    />
                    <span>......</span>
                    {list.map((v) => (
                        <ButtonRounded
                            key={`page${v}`}
                            text={String(v + 1)}
                            onClick={() => onPageClick(v + 1)}
                        />
                    ))}
                </>
            );
        }

        // 그 외에는 1과 end를 표시하고 current-2, current+2까지 표시
        const list = [];
        for (let i = current - 3; i < current + 2; i += 1) {
            list.push(i);
        }
        return (
            <>
                <ButtonRounded
                    key={`page${0}`}
                    text={String(1)}
                    onClick={() => onPageClick(1)}
                />
                <span>...</span>
                {list.map((v) => (
                    <ButtonRounded
                        key={`page${v}`}
                        text={String(v + 1)}
                        onClick={() => onPageClick(v + 1)}
                    />
                ))}
                <span>...</span>
                <ButtonRounded
                    key={`page${end}`}
                    text={String(end)}
                    onClick={() => onPageClick(end)}
                />
            </>
        );
    };

    return (
        <section className={cn('flex gap-2')}>
            {createPager(page, allpage)}
        </section>
    );
};

export default Pager;

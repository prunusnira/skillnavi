'use client';

import { cn } from '@/module/util/cn';
import { Skill } from '@/data/skill/Skill';
import useMusicRecordItem from '@/component/music/useMusicRecordItem';
import { useTranslations } from 'next-intl';

interface Props {
    skill: Skill;
    level: number;
    patterncode: number;
}

interface DataProps {
    title: string;
    content: string;
}

const ColumnData = ({ title, content }: DataProps) => {
    return (
        <div className={cn('flex-col-center')}>
            <div className={cn('text-center w-full')}>{title}</div>
            <div className={cn('text-center w-full')}>{content}</div>
        </div>
    );
};

const MusicRecordItem = ({ skill, level, patterncode }: Props) => {
    const t = useTranslations('music.record');
    const { difficulty } = useMusicRecordItem({ skill, level, patterncode });

    return (
        <section className={cn('flex-col-center')}>
            {/* 패턴 정보 */}
            <div className={cn('w-full')}>
                {difficulty} {(level / 100).toFixed(2)}
            </div>

            {/* 데이터 */}
            <div className={cn('w-full flex justify-between items-center')}>
                {/* 달성률 */}
                <ColumnData
                    title={t('rate')}
                    content={`${(skill.rate / 100).toFixed(2)}%`}
                />

                {/* 랭크 */}
                <ColumnData
                    title={t('rank')}
                    content={skill.maxrank}
                />

                {/* 스킬 */}
                <ColumnData
                    title={t('skill')}
                    content={((level * skill.rate) / 10000).toFixed(2)}
                />

                {/* 콤보 */}
                <ColumnData
                    title={t('combo')}
                    content={String(skill.combo)}
                />
            </div>
        </section>
    );
};

export default MusicRecordItem;

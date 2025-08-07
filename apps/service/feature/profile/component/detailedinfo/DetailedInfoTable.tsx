'use client';

import { cn } from '@/lib/cn';
import style from './DetailedInfoTable.module.css';
import { useTranslations } from 'next-intl';
import { ProfileSkill } from '@/feature/profile/data/ProfileSkill';
import { VersionSelector } from '@/common/versionSelector/VersionSelector';
import { ChangeEvent, useState } from 'react';
import { useProfileDetail } from './useProfileDetail';
import { useParams } from 'next/navigation';

interface Props {
    initialSkill: ProfileSkill;
}

export const DetailedInfoTable = ({ initialSkill }: Props) => {
    const t = useTranslations('profile.detail');
    const { id } = useParams<{ id: string }>();
    const [
        version,
        setVersion,
    ] = useState(initialSkill.version);
    const { data: skill } = useProfileDetail(id, version);

    const handleVersionChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        const newVersion = Number(e.target.value);
        setVersion(newVersion);
    };

    return (
        <section className={cn('flex-col-center w-full px-[20px]')}>
            <VersionSelector
                currentVersion={version}
                onChangeVersion={handleVersionChange}
                versionFrom={31}
            />
            {skill && (
                <div className={'w-full pt-[30px]'}>
                    <div className={style.detailRow}>
                        <div className={style.detailCell}>#</div>
                        <div className={style.detailCell}>GuitarFreaks</div>
                        <div className={style.detailCell}>DrumMania</div>
                    </div>
                    <div className={style.detailRow}>
                        <div className={style.detailCell}>
                            {t('table.skill')}
                        </div>
                        <div className={style.detailCell}>
                            {(skill.gskill / 100).toFixed(2)}
                        </div>
                        <div className={style.detailCell}>
                            {(skill.dskill / 100).toFixed(2)}
                        </div>
                    </div>
                    <div className={style.detailRow}>
                        <div className={style.detailCell}>
                            {t('table.clear')}
                        </div>
                        <div className={style.detailCell}>
                            {(skill.gclearlv / 100).toFixed(2)} (
                            {skill.gclearnum})
                        </div>
                        <div className={style.detailCell}>
                            {(skill.dclearlv / 100).toFixed(2)} (
                            {skill.dclearnum})
                        </div>
                    </div>
                    <div className={style.detailRow}>
                        <div className={style.detailCell}>{t('table.fc')}</div>
                        <div className={style.detailCell}>
                            {(skill.gfclv / 100).toFixed(2)} ({skill.gfcnum})
                        </div>
                        <div className={style.detailCell}>
                            {(skill.dfclv / 100).toFixed(2)} ({skill.dfcnum})
                        </div>
                    </div>
                    <div className={style.detailRow}>
                        <div className={style.detailCell}>{t('table.exc')}</div>
                        <div className={style.detailCell}>
                            {(skill.gexclv / 100).toFixed(2)} ({skill.gexcnum})
                        </div>
                        <div className={style.detailCell}>
                            {(skill.dexclv / 100).toFixed(2)} ({skill.dexcnum})
                        </div>
                    </div>
                    <div className={style.detailRow}>
                        <div className={style.detailCell}>
                            {t('table.count')}
                        </div>
                        <div className={style.detailCell}>{skill.gcount}</div>
                        <div className={style.detailCell}>{skill.dcount}</div>
                    </div>
                </div>
            )}
        </section>
    );
};

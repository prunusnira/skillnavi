'use client';

import { cn } from '@/lib/cn';
import style from './DetailedInfoTable.module.css';
import { useTranslations } from 'next-intl';
import { ProfileSkill } from '@/feature/profile/data/ProfileSkill';
import { VersionSelector } from '@/common/versionSelector/VersionSelector';
import { ChangeEvent, useState } from 'react';
import { useProfileDetail } from './useProfileDetail';
import { useParams } from 'next/navigation';
import SkillColor from '@/common/skillColor/SkillColor';

interface Props {
    initialSkill: ProfileSkill;
}

export const DetailedInfoTable = ({ initialSkill }: Props) => {
    const t = useTranslations('profile.detail');
    const { id } = useParams<{ id: string }>();
    const [version, setVersion] = useState(initialSkill.version);
    const { data: skill } = useProfileDetail(id, version);

    const handleVersionChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        const newVersion = Number(e.target.value);
        setVersion(newVersion);
    };

    return (
        <section className={cn('flex w-full flex-col items-center gap-5')}>
            <VersionSelector
                currentVersion={version}
                onChangeVersion={handleVersionChange}
                versionFrom={31}
            />
            {skill && (
                <div className={style.tableWrap}>
                    <table className={style.detailTable}>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">GuitarFreaks</th>
                                <th scope="col">DrumMania</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={style.skillRow}>
                                <th scope="row" className={style.skillLabel}>
                                    {t('table.skill')}
                                </th>
                                <td>
                                    <div className={style.skillValue}>
                                        <SkillColor
                                            value={skill.gskill / 100}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className={style.skillValue}>
                                        <SkillColor
                                            value={skill.dskill / 100}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">{t('table.clear')}</th>
                                <td>
                                    {(skill.gclearlv / 100).toFixed(2)} (
                                    {skill.gclearnum})
                                </td>
                                <td>
                                    {(skill.dclearlv / 100).toFixed(2)} (
                                    {skill.dclearnum})
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">{t('table.fc')}</th>
                                <td>
                                    {(skill.gfclv / 100).toFixed(2)} (
                                    {skill.gfcnum})
                                </td>
                                <td>
                                    {(skill.dfclv / 100).toFixed(2)} (
                                    {skill.dfcnum})
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">{t('table.exc')}</th>
                                <td>
                                    {(skill.gexclv / 100).toFixed(2)} (
                                    {skill.gexcnum})
                                </td>
                                <td>
                                    {(skill.dexclv / 100).toFixed(2)} (
                                    {skill.dexcnum})
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">{t('table.count')}</th>
                                <td>{skill.gcount}</td>
                                <td>{skill.dcount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
};

'use client';

import { cn } from '@/lib/cn';
import style from './SkillBox.module.css';
import SkillColor from '@/common/skillColor/SkillColor';
import useSkillBox from '@/feature/profile/component/skillbox/useSkillBox';
import { ProfileSkill } from '@/feature/profile/data/ProfileSkill';
import { useAtomValue } from 'jotai';
import { atomGameVersionList } from '@/common/game/data/atomGameVersion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleChevronDown,
    faCircleChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from '@/i18n/routing';
import { LINK_SKILL_TABLE } from '@/url/url';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface Props {
    skill: ProfileSkill[];
}

const SkillBox = ({ skill }: Props) => {
    const { skillBox, viewAll, openViewBox, closeViewBox } = useSkillBox({
        skill,
    });
    const versionList = useAtomValue(atomGameVersionList);
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const t = useTranslations('profile.info.skillbox');
    const currentVersion = skillBox[0]?.version;

    return (
        <section className={cn('flex w-full flex-col items-center py-5')}>
            <div className={style.tableWrap}>
                <div
                    className={style.tableViewport}
                    style={{ maxHeight: viewAll ? '5000px' : '190px' }}
                >
                    <table className={style.skillTable}>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">GF</th>
                                <th scope="col">DM</th>
                            </tr>
                        </thead>
                        <tbody>
                            {skillBox.map((row) => {
                                const isCurrent =
                                    row.version === currentVersion;
                                const versionName =
                                    versionList?.find(
                                        (version) => version.id === row.version,
                                    )?.short ?? row.version.toString();

                                return (
                                    <tr
                                        className={cn(
                                            isCurrent && style.currentRow,
                                        )}
                                        key={`skill${row.version}`}
                                    >
                                        <th
                                            className={style.versionCell}
                                            scope="row"
                                        >
                                            <div className={style.versionInfo}>
                                                <span
                                                    className={
                                                        style.versionName
                                                    }
                                                >
                                                    {versionName}
                                                </span>
                                                {isCurrent && (
                                                    <span
                                                        className={
                                                            style.currentBadge
                                                        }
                                                    >
                                                        {t('current')}
                                                    </span>
                                                )}
                                            </div>
                                        </th>
                                        <td className={style.scoreCell}>
                                            <button
                                                aria-label={`GF ${row.gf.toFixed(2)} ${versionName}`}
                                                className={style.scoreButton}
                                                onClick={() =>
                                                    router.push(
                                                        LINK_SKILL_TABLE({
                                                            version:
                                                                row.version,
                                                            game: 'gf',
                                                            id: Number(id),
                                                            display: 'grid',
                                                            pageType: 'target',
                                                        }),
                                                    )
                                                }
                                                type="button"
                                            >
                                                <SkillColor value={row.gf} />
                                            </button>
                                        </td>
                                        <td className={style.scoreCell}>
                                            <button
                                                aria-label={`DM ${row.dm.toFixed(2)} ${versionName}`}
                                                className={style.scoreButton}
                                                onClick={() =>
                                                    router.push(
                                                        LINK_SKILL_TABLE({
                                                            version:
                                                                row.version,
                                                            game: 'dm',
                                                            id: Number(id),
                                                            display: 'grid',
                                                            pageType: 'target',
                                                        }),
                                                    )
                                                }
                                                type="button"
                                            >
                                                <SkillColor value={row.dm} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {skillBox.length > 1 && (
                <button
                    aria-expanded={viewAll}
                    className={style.toggleButton}
                    onClick={viewAll ? closeViewBox : openViewBox}
                    type="button"
                >
                    <span>{t(viewAll ? 'close' : 'open')}</span>
                    <FontAwesomeIcon
                        aria-hidden="true"
                        icon={viewAll ? faCircleChevronUp : faCircleChevronDown}
                        width={18}
                    />
                </button>
            )}
        </section>
    );
};

export default SkillBox;

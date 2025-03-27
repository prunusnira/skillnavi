'use client';

import { cn } from '@/lib/cn';
import SkillBoxRow from '@/feature/profile/component/skillbox/SkillBoxRow';
import SkillBoxCell from '@/feature/profile/component/skillbox/SkillBoxCell';
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

    return (
        <section className={'flex-col-center'}>
            <div
                className={cn(
                    'flex flex-col justify-start items-center overflow-y-hidden relative gap-[2px]',
                )}
                style={{
                    height: viewAll ? 'auto' : '100px',
                }}
            >
                <SkillBoxRow>
                    <SkillBoxCell>#</SkillBoxCell>
                    <SkillBoxCell>GF</SkillBoxCell>
                    <SkillBoxCell>DM</SkillBoxCell>
                </SkillBoxRow>
                {skillBox.map((skill) => (
                    <SkillBoxRow key={`skill${skill.version}`}>
                        <SkillBoxCell>
                            {
                                versionList?.find(
                                    (version) => version.id === skill.version,
                                )?.short
                            }
                        </SkillBoxCell>
                        <SkillBoxCell>
                            <SkillColor
                                externalStyleClass={
                                    'cursor-pointer border border-transparent hover:border-white'
                                }
                                value={skill.gf}
                                onClick={() =>
                                    router.push(
                                        LINK_SKILL_TABLE({
                                            version: skill.version,
                                            game: 'gf',
                                            id: Number(id),
                                            display: 'grid',
                                            pageType: 'target',
                                        }),
                                    )
                                }
                            />
                        </SkillBoxCell>
                        <SkillBoxCell>
                            <SkillColor
                                externalStyleClass={
                                    'cursor-pointer border border-transparent hover:border-white'
                                }
                                value={skill.dm}
                                onClick={() =>
                                    router.push(
                                        LINK_SKILL_TABLE({
                                            version: skill.version,
                                            game: 'dm',
                                            id: Number(id),
                                            display: 'grid',
                                            pageType: 'target',
                                        }),
                                    )
                                }
                            />
                        </SkillBoxCell>
                    </SkillBoxRow>
                ))}
            </div>
            {viewAll ? (
                <div
                    className={
                        'w-full flex-center cursor-pointer gap-[4px] py-[10px]'
                    }
                    onClick={closeViewBox}
                >
                    <div>Close</div>
                    <FontAwesomeIcon
                        icon={faCircleChevronUp}
                        width={20}
                    />
                </div>
            ) : (
                <div
                    className={
                        'w-full flex-center cursor-pointer gap-[4px] py-[10px]'
                    }
                    onClick={openViewBox}
                >
                    <div>Expand</div>
                    <FontAwesomeIcon
                        icon={faCircleChevronDown}
                        width={20}
                    />
                </div>
            )}
        </section>
    );
};

export default SkillBox;

'use client';

import { cn } from '@/module/util/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import useSkillMenu from '@/component/skill/menu/useSkillMenu';
import ButtonRounded from '@/component/common/button/ButtonRounded';
import Select from '@/component/common/select/Select';

const SkillMenu = () => {
    const { active, toggleMenu } = useSkillMenu();
    return (
        <>
            <section className={cn('z-10 w-full p-2.5')}>
                <FontAwesomeIcon
                    className={'cursor-pointer'}
                    onClick={toggleMenu}
                    icon={faBars}
                />
            </section>
            <section
                className={cn(
                    'absolute left-0 top-8 w-full md:w-768px flex-col-center bg-white bg-opacity-30',
                    'p-5 transition-left',
                    {
                        ['left-0']: active,
                        ['-left-full']: !active,
                    },
                )}
            >
                {/* 버전 설정 */}
                <div>
                    <Select options={<></>} />
                </div>

                {/* 데이터 설정 */}
                <div>
                    <ButtonRounded text={'스킬대상곡'} />
                    <ButtonRounded text={'전체스킬'} />
                </div>

                {/* 테이블 설정 */}
                <div>
                    <ButtonRounded text={'그리드형'} />
                    <ButtonRounded text={'리스트형'} />
                </div>
            </section>
        </>
    );
};

export default SkillMenu;

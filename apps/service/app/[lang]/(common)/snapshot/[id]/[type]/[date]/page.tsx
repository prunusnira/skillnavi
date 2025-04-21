import Card from '@/common/card/Card';
import { getSnapshotDetail } from '@/feature/snapshot/api/getSnapshotDetail';
import { SnapshotData, SnapshotSkill } from '@/feature/snapshot/data/Snapshot';
import { SkillForTable } from '@/feature/skill/data/Skill';
import SkillGridForSnapshot from '@/feature/skill/component/table/SkillGridForSnapshot';

const PageSnapshotDetail = async ({
    params,
}: {
    params: { id: string; type: string; date: string };
}) => {
    const { id, type, date } = params;
    const data = await getSnapshotDetail(id, type, date);
    const json = JSON.parse(data) as SnapshotData;

    const convertSnapshotToSkill = (
        data: SnapshotSkill[],
        isHot: boolean,
    ): (SkillForTable & { mname: string })[] => {
        return data.map((item) => {
            // 스킬값이 예전 형식인 경우 복구 처리
            let newSkill = item.skill;
            if (item.skill.toString().indexOf('.') !== -1) {
                const skill = item.skill.toString().split('.');
                if (skill[1]?.length === 1) {
                    newSkill = Number(`${skill.join('')}0`);
                } else {
                    newSkill = Number(skill.join(''));
                }
            }

            return {
                mid: item.mid,
                playver: item.version,
                patterncode: item.ptcode,
                level: item.lv,
                maxrank: item.rank,
                rate: item.rate,
                fc: item.fc === 'Y',
                hot: isHot,
                skill: newSkill,
                mname: item.mname,
            };
        });
    };

    return (
        <Card title={'Snapshot'}>
            <section className={'flex-col-center py-[60px]'}>
                {/* 사용자 정보 */}
                <div className={'flex-col-center'}>
                    <span className={'text-3xl font-bold'}>
                        Snapshot played by {json.uname}
                    </span>
                    <span className={'text-xl font-medium'}>
                        Played at {json.date}
                    </span>
                    <span className={'text-xl font-light'}>
                        For {json.type.toUpperCase()}
                    </span>
                </div>

                {/* 스킬 데이터 */}
                <div className={'text-2xl font-semibold py-[20px]'}>HOT</div>
                <div className={'w-full grid grid-cols-3 md:grid-cols-4'}>
                    {convertSnapshotToSkill(json.hot, true).map(
                        (item, index) => (
                            <SkillGridForSnapshot
                                key={item.mid}
                                skill={item}
                                index={index}
                            />
                        ),
                    )}
                </div>

                <div className={'text-2xl font-semibold py-[20px]'}>OTHER</div>
                <div className={'w-full grid grid-cols-3 md:grid-cols-4'}>
                    {convertSnapshotToSkill(json.oth, true).map(
                        (item, index) => (
                            <SkillGridForSnapshot
                                key={item.mid}
                                skill={item}
                                index={index}
                            />
                        ),
                    )}
                </div>
            </section>
        </Card>
    );
};

export default PageSnapshotDetail;

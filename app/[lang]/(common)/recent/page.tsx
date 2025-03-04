import Card from '@/common/card/Card';
import { getTranslations } from 'next-intl/server';
import { cn } from '@/lib/cn';
import SkillColor from '@/common/skillColor/SkillColor';
import UserLinkIcon from '@/common/table/user/UserLinkIcon';
import { getRecent } from '@/feature/recent/api/getRecent';

export const dynamic = 'force-dynamic';

const PageRecent = async () => {
    const t = await getTranslations('recent');
    const recent = await getRecent();

    if (!recent) {
        return null;
    }

    return (
        <Card title={t('recent')}>
            <section className={cn('w-full px-2 py-8')}>
                {recent.map((r) => (
                    <div
                        key={r.name}
                        className={cn(
                            'flex w-full p-2.5 border-b border-solid border-white',
                        )}
                    >
                        {/* 아이콘/이름 */}
                        <div className={cn('flex-grow w-full')}>
                            <UserLinkIcon
                                user={{
                                    id: r.id,
                                    name: r.name,
                                    titletower: r.titletower,
                                    openinfo: r.openinfo,
                                }}
                            />
                        </div>

                        {/* 스킬 정보 */}
                        <div className={cn('flex-col-center w-30')}>
                            <div className={cn('flex-center gap-2')}>
                                <div className={cn('w-8 text-center')}>GF</div>
                                <div className={cn('w-20 text-center')}>
                                    <SkillColor value={r.gskill / 100} />
                                </div>
                            </div>
                            <div className={cn('flex-center gap-2')}>
                                <div className={cn('w-8 text-center')}>DM</div>
                                <div className={cn('w-20 text-center')}>
                                    <SkillColor value={r.dskill / 100} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </Card>
    );
};

export default PageRecent;

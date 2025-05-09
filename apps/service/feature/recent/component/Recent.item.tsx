import { cn } from '@/lib/cn';
import UserLinkIcon from '@/common/table/user/UserLinkIcon';
import SkillColor from '@/common/skillColor/SkillColor';
import { Recent } from '../data/Recent';

interface Props {
    user: Recent;
}

export const RecentItem = ({ user }: Props) => {
    return (
        <div
            className={cn(
                'flex w-full p-2.5 border-b border-solid border-white dark:border-black',
            )}
        >
            {/* 아이콘/이름 */}
            <div className={cn('flex-grow w-full')}>
                <UserLinkIcon
                    user={{
                        id: user.id,
                        name: user.name,
                        titletower: user.titletower,
                        openinfo: user.openinfo,
                    }}
                />
            </div>

            {/* 스킬 정보 */}
            <div className={cn('flex-col-center w-30')}>
                <div className={cn('flex-center gap-2')}>
                    <div className={cn('w-8 text-center')}>GF</div>
                    <div className={cn('w-20 text-center bg-black')}>
                        <SkillColor value={user.gskill / 100} />
                    </div>
                </div>
                <div className={cn('flex-center gap-2')}>
                    <div className={cn('w-8 text-center')}>DM</div>
                    <div className={cn('w-20 text-center bg-black')}>
                        <SkillColor value={user.dskill / 100} />
                    </div>
                </div>
            </div>
        </div>
    );
};

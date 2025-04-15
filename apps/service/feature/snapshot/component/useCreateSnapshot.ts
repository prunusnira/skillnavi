import { SnapshotData } from '@/feature/snapshot/data/Snapshot';
import dayjs from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import { createSnapshot } from '@/feature/snapshot/api/createSnapshot';
import { SkillForTable } from '@/feature/skill/data/Skill';
import { GameType } from '@/common/game/data/GameType';

interface Params {
    hot: (SkillForTable & { mname: string })[];
    other: (SkillForTable & { mname: string })[];
    uid: number;
    uname: string;
    type: GameType;
}

export const useCreateSnapshot = () => {
    const { mutate: mutateSnapshot } = useMutation({
        mutationKey: ['snapshot', 'create'],
        mutationFn: createSnapshot,
        onSuccess: () => {
            alert('Snapshot successfully created!');
        },
        onError: () => {
            alert('Snapshot not created!');
        }
    });

    const makeSnapshot = ({ uid, uname, type, hot, other }: Params) => {
        const data: SnapshotData = {
            date: dayjs().format('YYYYMMDD'),
            uid,
            uname,
            type,
            hot: hot.map(item => ({
                ptcode: item.patterncode,
                rate: item.rate,
                meter: '',
                skill: item.skill,
                mid: item.mid,
                rank: item.maxrank,
                lv: item.level,
                mname: item.mname,
                version: item.playver,
                fc: item.fc ? 'Y' : 'N',
            })),
            oth: other.map(item => ({
                ptcode: item.patterncode,
                rate: item.rate,
                meter: '',
                skill: item.skill,
                mid: item.mid,
                rank: item.maxrank,
                lv: item.level,
                mname: item.mname,
                version: item.playver,
                fc: item.fc ? 'Y' : 'N',
            })),
        };

        mutateSnapshot(data);
    };

    return { makeSnapshot };
};
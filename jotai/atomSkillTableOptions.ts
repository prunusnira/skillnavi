import { atom } from 'jotai';
import { SkillTableOptions } from '@/data/skill/SkillTableOptions';
import { useAtom } from 'jotai/index';
import { TableDataType } from '@/data/skill/TableDataType';
import { TableType } from '@/data/skill/TableType';

export const atomSkillTableOptionsData = atom<SkillTableOptions>({
    versionId: 0,
    data: 'target',
    table: 'grid',
});

export const atomSkillTableOptions = atom(
    (get) => get(atomSkillTableOptionsData),
    (
        get,
        set,
        param: {
            type: keyof SkillTableOptions;
            data: number | TableDataType | TableType;
        },
    ) => {
        const prev = get(atomSkillTableOptionsData);
        const next = { ...prev };
        const { type, data } = param;

        if (type in next && typeof next[type] === typeof data) {
            (next[type] satisfies SkillTableOptions[typeof type]) = data;
        }
        set(atomSkillTableOptionsData, next);
    },
);

export const atomSkillTableOptionsInit = atom(
    (get) => get(atomSkillTableOptionsData),
    (get, set, data: SkillTableOptions) => {
        set(atomSkillTableOptionsData, data);
    },
);

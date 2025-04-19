import {
    IMG,
    LINK_MAIN,
    LINK_PATTERN_LIST,
    LINK_PATTERN_TABLE,
    LINK_PLAYCOUNT,
    LINK_PROFILE_SELF,
    LINK_RANK_PLAYCOUNT,
    LINK_RANK_SKILL,
    LINK_SKILL_EXC,
    LINK_SKILL_RECENT,
    LINK_SKILL_SELF,
    LINK_SNAPSHOT,
    LINK_TOWER_MAIN,
} from '@/url/url';

export interface SidebarSubMenu {
    id: string;
    href: string;
}

export interface SidebarMenu {
    id: string;
    iconSrc: string;
    href?: string;
    subMenu?: SidebarSubMenu[];
}

export const SidebarMenuItems = {
    home: {
        id: 'home',
        iconSrc: `${IMG}/header/logo.png`,
        href: LINK_MAIN,
    },
    mydata: {
        id: 'mydata.title',
        iconSrc: `${IMG}/header/mydata.png`,
        subMenu: [
            {
                id: 'mydata.profile',
                href: LINK_PROFILE_SELF,
            },
            {
                id: 'mydata.mygf',
                href: LINK_SKILL_SELF('gf'),
            },
            {
                id: 'mydata.mydm',
                href: LINK_SKILL_SELF('dm'),
            },
            {
                id: 'mydata.count',
                href: LINK_PLAYCOUNT,
            },
            {
                id: 'mydata.snapshot',
                href: LINK_SNAPSHOT,
            },
        ],
    },
    skill: {
        id: 'skill.title',
        iconSrc: `${IMG}/header/skill.png`,
        subMenu: [
            {
                id: 'skill.recent',
                href: LINK_SKILL_RECENT,
            },
            {
                id: 'skill.ranking',
                href: LINK_RANK_SKILL('gf', 1),
            },
            {
                id: 'skill.exc',
                href: LINK_SKILL_EXC('gf'),
            },
            {
                id: 'skill.countrank',
                href: LINK_RANK_PLAYCOUNT(1),
            },
        ],
    },
    pattern: {
        id: 'pattern.title',
        iconSrc: `${IMG}/header/pattern.png`,
        subMenu: [
            {
                id: 'pattern.list',
                href: LINK_PATTERN_LIST({}),
            },
            {
                id: 'pattern.cleartable',
                href: LINK_PATTERN_TABLE({}),
            },
        ],
    },
    tower: {
        id: 'tower.title',
        iconSrc: `${IMG}/header/tower.png`,
        href: LINK_TOWER_MAIN,
    },
};

export type SidebarItemKeys = keyof typeof SidebarMenuItems;

import { IMG, LINK } from '@/data/url';

export interface SidebarSubMenu {
    id: string;
    href: string;
}

interface SidebarMenu {
    id: string;
    iconSrc: string;
    href?: string;
    subMenu?: SidebarSubMenu[];
}

export const SidebarMenuItems: SidebarMenu[] = [
    {
        id: 'index',
        iconSrc: `${IMG}/header/logo.png`,
        href: LINK.MAIN,
    },
    {
        id: 'mydata',
        iconSrc: `${IMG}/header/mydata.png`,
        subMenu: [
            {
                id: 'mydata.profile',
                href: LINK.PROFILE.self,
            },
            {
                id: 'mydata.mygf',
                href: LINK.SKILL.self('gf'),
            },
            {
                id: 'mydata.mydm',
                href: LINK.SKILL.self('dm'),
            },
            {
                id: 'mydata.count',
                href: LINK.PROFILE.playcount,
            },
            {
                id: 'mydata.snapshot',
                href: LINK.PROFILE.snapshot,
            },
        ],
    },
    {
        id: 'skill',
        iconSrc: `${IMG}/header/skill.png`,
        subMenu: [
            {
                id: 'skill.recent',
                href: LINK.SKILL.recent,
            },
            {
                id: 'skill.rank',
                href: LINK.SKILL.ranking('gf', 1),
            },
            {
                id: 'skill.exc',
                href: LINK.SKILL.exc('gf'),
            },
            {
                id: 'skill.countrank',
                href: LINK.SKILL.countrank(1),
            },
        ],
    },
    {
        id: 'pattern',
        iconSrc: `${IMG}/header/pattern.png`,
        subMenu: [
            {
                id: 'pattern.list',
                href: LINK.PATTERN.list(0, 'titleasc', 1, true),
            },
            {
                id: 'pattern.noplay',
                href: LINK.PATTERN.noplay,
            },
            {
                id: 'pattern.table',
                href: LINK.PATTERN.table,
            },
        ],
    },
    {
        id: 'tower',
        iconSrc: `${IMG}/header/tower.png`,
        href: LINK.TOWER.main,
    },
];

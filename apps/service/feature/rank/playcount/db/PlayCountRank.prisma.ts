import { MUSICLIST_SIZE } from '@/feature/env/data/constant';
import { Prisma } from '@prisma/client';

interface Params {
    page: number;
    version: number
}

export const getPlayCountRankGFQuery = ({page, version}: Params) => Prisma.sql`
    select uid,
           gcount,
           dcount
    from ProfileSkill
    where version = ${version}
    order by gcount desc
    limit ${MUSICLIST_SIZE}
    offset ${(page - 1) * MUSICLIST_SIZE}
`;

export const getPlayCountRankDMQuery = ({page, version}: Params) => Prisma.sql`
    select uid,
           gcount,
           dcount
    from ProfileSkill
    where version = ${version}
    order by dcount desc
        limit ${MUSICLIST_SIZE}
    offset ${(page - 1) * MUSICLIST_SIZE}
`;

export const getPlayCountRankALLQuery = ({page, version}: Params) => Prisma.sql`
    select uid,
           gcount,
           dcount
    from ProfileSkill
    where version = ${version}
    order by gcount + dcount desc
        limit ${MUSICLIST_SIZE}
    offset ${(page - 1) * MUSICLIST_SIZE}
`;
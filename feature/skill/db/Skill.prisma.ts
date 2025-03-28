import { Prisma } from '@prisma/client';
import { SKILL_SIZE } from '@/feature/env/data/constant';

/**
 * 패턴코드 조건을 줘서 분기할 수 있는가 했으나 sql 에러가 발생하여 케이스별로 나눔
 */

interface ParamsTarget {
    userid: number;
    version: number;
}

interface ParamsAll extends ParamsTarget {
    page: number;
}

export const getQuerySkillTargetHotGF = ({
    userid,
    version,
}: ParamsTarget) => Prisma.sql`
    select s1.mid   as mid,
           playver,
           patterncode,
           level,
           maxrank,
           rate,
           fc,
           hot,
           s1.skill as skill
    from SkillList s1
             inner join(select mid,
                               max(skill) as skill
                        from SkillList
                        where uid = ${userid}
                          and playver = ${version}
                          and hot = 1
                          and patterncode < 9
                        group by mid) s2
                       on s1.mid = s2.mid and s1.skill = s2.skill
             inner join (select id
                         from MusicList
                         where (remove = 0
                             or remove > ${version})
                           and version <= ${version}) m
                        on s1.mid = m.id
    where s1.uid = ${userid}
      and s1.playver = ${version}
      and s1.hot = 1
      and s1.patterncode < 9
    order by skill desc limit 25
`;

export const getQuerySkillTargetOtherGF = ({
    userid,
    version,
}: ParamsTarget) => Prisma.sql`
    select s1.mid   as mid,
           playver,
           patterncode,
           level,
           maxrank,
           rate,
           fc,
           hot,
           s1.skill as skill
    from SkillList s1
             inner join(select mid,
                               max(skill) as skill
                        from SkillList
                        where uid = ${userid}
                          and playver = ${version}
                          and hot = 0
                          and patterncode < 9
                        group by mid) s2
                       on s1.mid = s2.mid and s1.skill = s2.skill
             inner join (select id
                         from MusicList
                         where (remove = 0
                             or remove > ${version})
                           and version <= ${version}) m
                        on s1.mid = m.id
    where s1.uid = ${userid}
      and s1.playver = ${version}
      and s1.hot = 0
      and s1.patterncode < 9
    order by skill desc limit 25
`;

export const getQuerySkillTargetHotDM = ({
    userid,
    version,
}: ParamsTarget) => Prisma.sql`
    select s1.mid   as mid,
           playver,
           patterncode,
           level,
           maxrank,
           rate,
           fc,
           hot,
           s1.skill as skill
    from SkillList s1
             inner join(select mid,
                               max(skill) as skill
                        from SkillList
                        where uid = ${userid}
                          and playver = ${version}
                          and hot = 1
                          and patterncode > 8
                        group by mid) s2
                       on s1.mid = s2.mid and s1.skill = s2.skill
             inner join (select id
                         from MusicList
                         where (remove = 0
                             or remove > ${version})
                           and version <= ${version}) m
                        on s1.mid = m.id
    where s1.uid = ${userid}
      and s1.playver = ${version}
      and s1.hot = 1
      and s1.patterncode > 8
    order by skill desc limit 25
`;

export const getQuerySkillTargetOtherDM = ({
    userid,
    version,
}: ParamsTarget) => Prisma.sql`
    select s1.mid   as mid,
           playver,
           patterncode,
           level,
           maxrank,
           rate,
           fc,
           hot,
           s1.skill as skill
    from SkillList s1
             inner join(select mid,
                               max(skill) as skill
                        from SkillList
                        where uid = ${userid}
                          and playver = ${version}
                          and hot = 0
                          and patterncode > 8
                        group by mid) s2
                       on s1.mid = s2.mid and s1.skill = s2.skill
             inner join (select id
                         from MusicList
                         where (remove = 0
                             or remove > ${version})
                           and version <= ${version}) m
                        on s1.mid = m.id
    where s1.uid = ${userid}
      and s1.playver = ${version}
      and s1.hot = 0
      and s1.patterncode > 8
    order by skill desc limit 25
`;

export const getQuerySkillAllGF = ({
    userid,
    version,
    page,
}: ParamsAll) => Prisma.sql`
    select mid,
           playver,
           patterncode,
           level,
           maxrank,
           rate,
           fc,
           hot,
           skill
    from SkillList
    where uid = ${userid}
      and playver = ${version}
      and patterncode < 9
    order by skill desc
    limit ${SKILL_SIZE}
    offset ${(page - 1) * SKILL_SIZE}
`;

export const getQuerySkillAllDM = ({
    userid,
    version,
    page,
}: ParamsAll) => Prisma.sql`
    select mid,
           playver,
           patterncode,
           level,
           maxrank,
           rate,
           fc,
           hot,
           skill
    from SkillList
    where uid = ${userid}
      and playver = ${version}
      and patterncode > 8
    order by skill desc
    limit ${SKILL_SIZE}
    offset ${(page - 1) * SKILL_SIZE}
`;

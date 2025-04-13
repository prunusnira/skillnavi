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

export const getSkillExcGFHot = (version: number) =>
    Prisma.sql`
        select p.mid                      as mid,
               p.version                  as playver,
               p.patterncode              as patterncode,
               p.level                    as level,
               'SS'                       as maxrank,
               10000                      as rate,
               1                          as fc,
               1                          as hot,
               p.level * 10000 * 2 / 1000 as skill
        from PatternList p
                 inner join (select mid,
                                    max(pl.level) as level,
                                    hot,
                                    hot_end,
                                    ml.version    as musicVersion,
                                    pl.version    as patternVersion,
                                    remove
                             from PatternList pl
                                      inner join (select id, hot, hot_end, version, remove
                                                  from MusicList
                                                  where remove = 0
                                                     or remove > ${version}) ml
                                                 on pl.mid = ml.id and
                                                    (hot <= ${version} and hot_end >= ${version}) and
                                                    pl.version = ${version}
                             where patterncode < 9
                             group by mid
                             order by level desc) list
                            on p.level = list.level and
                               p.mid = list.mid and
                               p.version = list.patternVersion and
                               p.patterncode < 9
        order by level desc limit 25
    `;

export const getSkillExcDMHot = (version: number) =>
    Prisma.sql`
        select p.mid                      as mid,
               p.version                  as playver,
               p.patterncode              as patterncode,
               p.level                    as level,
               'SS'                       as maxrank,
               10000                      as rate,
               1                          as fc,
               1                          as hot,
               p.level * 10000 * 2 / 1000 as skill
        from PatternList p
                 inner join (select mid,
                                    max(pl.level) as level,
                                    hot,
                                    hot_end,
                                    ml.version    as musicVersion,
                                    pl.version    as patternVersion,
                                    remove
                             from PatternList pl
                                      inner join (select id, hot, hot_end, version, remove
                                                  from MusicList
                                                  where remove = 0
                                                     or remove > ${version}) ml
                                                 on pl.mid = ml.id and
                                                    (hot <= ${version} and hot_end >= ${version}) and
                                                    pl.version = ${version}
                             where patterncode > 8
                             group by mid
                             order by level desc) list
                            on p.level = list.level and
                               p.mid = list.mid and
                               p.version = list.patternVersion and
                               p.patterncode > 8
        order by level desc limit 25
    `;

export const getSkillExcGFOther = (version: number) =>
    Prisma.sql`
        select p.mid                      as mid,
               p.version                  as playver,
               p.patterncode              as patterncode,
               p.level                    as level,
               'SS'                       as maxrank,
               10000                      as rate,
               1                          as fc,
               0                          as hot,
               p.level * 10000 * 2 / 1000 as skill
        from PatternList p
                 inner join (select mid,
                                    max(pl.level) as level,
                                    hot,
                                    hot_end,
                                    ml.version    as musicVersion,
                                    pl.version    as patternVersion,
                                    remove
                             from PatternList pl
                                      inner join (select id, hot, hot_end, version, remove
                                                  from MusicList
                                                  where remove = 0
                                                     or remove > ${version}) ml
                                                 on pl.mid = ml.id and
                                 !(hot <= ${version} and hot_end >= ${version}) and
                                 pl.version = ${version}
                             where patterncode < 9
                             group by mid
                             order by level desc) list
                            on p.level = list.level and
                               p.mid = list.mid and
                               p.version = list.patternVersion and
                               p.patterncode < 9
        order by level desc limit 25
    `;

export const getSkillExcDMOther = (version: number) =>
    Prisma.sql`
        select p.mid                      as mid,
               p.version                  as playver,
               p.patterncode              as patterncode,
               p.level                    as level,
               'SS'                       as maxrank,
               10000                      as rate,
               1                          as fc,
               0                          as hot,
               p.level * 10000 * 2 / 1000 as skill
        from PatternList p
                 inner join (select mid,
                                    max(pl.level) as level,
                                    hot,
                                    hot_end,
                                    ml.version    as musicVersion,
                                    pl.version    as patternVersion,
                                    remove
                             from PatternList pl
                                      inner join (select id, hot, hot_end, version, remove
                                                  from MusicList
                                                  where remove = 0
                                                     or remove > ${version}) ml
                                                 on pl.mid = ml.id and
                                 !(hot <= ${version} and hot_end >= ${version}) and
                                 pl.version = ${version}
                             where patterncode > 8
                             group by mid
                             order by level desc) list
                            on p.level = list.level and
                               p.mid = list.mid and
                               p.version = list.patternVersion and
                               p.patterncode > 8
        order by level desc limit 25
    `;
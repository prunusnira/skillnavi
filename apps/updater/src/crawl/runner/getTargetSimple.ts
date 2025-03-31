import axios from 'axios';
import * as cheerio from 'cheerio';
import {MusicSkill, SkillData} from "@skillnavi/data/src/skill/SkillData";

interface Params {
    gtype: string;
    stype: number;
    version: number;
}

const getTargetSimple = async (
    { gtype, stype, version }: Params,
) => {
    const url = window.sinUrl.find(url => url.version === version && url.urltype === 'skill')?.url;

    if (!url) {
        return [] as MusicSkill[];
    }

    // stype이 0이면 other, 그 외에는 hot
    const html = await axios.get(`${url}?gtype=${gtype}&stype=${stype}`);

    // get all link to each song -> run get song info
    const $ = cheerio.load(html.data);
    const returnData: MusicSkill[] = [];

    // 각 tablerow에 대해서 곡을 뽑아옴
    const rows = $('.skill_table_tb').find('tbody').children('tr');

    $(rows).each((i, v) => {
        const data: MusicSkill = {
            musictitle: '',
            data: [],
        };

        const skill: SkillData = {
            ptcode: 0,
            level: 0,
            playcount: 1,
            clearcount: 1,
            clearstat: '',
            rank: '',
            rate: '',
            score: 0,
            combo: 0,
            meter: '',
        };

        // 타이틀
        data.musictitle = $(v).find('.text_link').text();

        // ptcode
        let type = 'g';
        let diff = 'bsc';
        let ptcode = 0;

        if ($(v).find('.part_GUITAR').length > 0) {
            type = 'g';
        } else if ($(v).find('.part_BASS').length > 0) {
            type = 'b';
        } else if ($(v).find('.part_DRUM').length > 0) {
            type = 'd';
        }

        if ($(v).find('.diff_BASIC').length > 0) {
            diff = 'bsc';
        } else if ($(v).find('.diff_ADVANCED').length > 0) {
            diff = 'adv';
        } else if ($(v).find('.diff_EXTREME').length > 0) {
            diff = 'ext';
        } else if ($(v).find('.diff_MASTER').length > 0) {
            diff = 'mas';
        }

        switch (type) {
            case 'g':
                switch (diff) {
                    case 'bsc':
                        ptcode = 1;
                        break;
                    case 'adv':
                        ptcode = 2;
                        break;
                    case 'ext':
                        ptcode = 3;
                        break;
                    case 'mas':
                        ptcode = 4;
                        break;
                }
                break;
            case 'b':
                switch (diff) {
                    case 'bsc':
                        ptcode = 5;
                        break;
                    case 'adv':
                        ptcode = 6;
                        break;
                    case 'ext':
                        ptcode = 7;
                        break;
                    case 'mas':
                        ptcode = 8;
                        break;
                }
                break;
            case 'd':
                switch (diff) {
                    case 'bsc':
                        ptcode = 9;
                        break;
                    case 'adv':
                        ptcode = 10;
                        break;
                    case 'ext':
                        ptcode = 11;
                        break;
                    case 'mas':
                        ptcode = 12;
                        break;
                }
                break;
        }
        skill.ptcode = ptcode;
        skill.rate = $(v).find('.achive_cell').text().trim();
        skill.level = parseInt($(v).find('.diff_cell').text().trim().replace('.', ''));

        data.data.push(skill);
        returnData.push(data);
    });

    return returnData;
};

export default getTargetSimple;
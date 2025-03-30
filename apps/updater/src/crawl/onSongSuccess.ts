import * as cheerio from 'cheerio';
import MusicData from './data/musicData';
import PatternData from './data/patternData';

const onSongSuccess = (
    data: string,
    setCurrent: (s: string) => void,
) => {
    const $ = cheerio.load(data);

    const name = $('div.live_title').text();

    const music: MusicData = {
        musictitle: name,
        data: [],
    };

    const divs = $('div.md_list_contents');

    const gfExist = $('div.md_part_GUITAR').length;
    const baExist = $('div.md_part_BASS').length;
    const dmExist = $('div.md_part_').length;

    const divlist = new Array<string>();

    $('div.white_box').children().each((i, v) => {
        const str = $(v).attr('class');

        if (str === 'md_part_GUITAR' || str === 'md_part_BASS' || str === 'md_part_') {
            divlist.push(str);
        }

        if (str === 'md_list_contents') {
            divlist.push($(v).find('th').attr('class')!);
        }
    });

    const ptcodelist = new Array<number>();
    if (gfExist > 0 || baExist > 0) {
        let gfon = false;
        let baon = false;
        for (let i = 0; i < divlist.length; i++) {
            if (divlist[i] === 'md_part_GUITAR') {
                gfon = true;
                baon = false;
            } else if (divlist[i] === 'md_part_BASS') {
                gfon = false;
                baon = true;
            }

            if (gfon) {
                if (divlist[i] === 'diff_BASIC') ptcodelist.push(1);
                else if (divlist[i] === 'diff_ADVANCED') ptcodelist.push(2);
                else if (divlist[i] === 'diff_EXTREME') ptcodelist.push(3);
                else if (divlist[i] === 'diff_MASTER') ptcodelist.push(4);
            } else if (baon) {
                if (divlist[i] === 'diff_BASIC') ptcodelist.push(5);
                else if (divlist[i] === 'diff_ADVANCED') ptcodelist.push(6);
                else if (divlist[i] === 'diff_EXTREME') ptcodelist.push(7);
                else if (divlist[i] === 'diff_MASTER') ptcodelist.push(8);
            }
        }

        $(divs).each((i, v) => {
            const table = $(v).find('table');
            const tbody = $(table).find('tbody').children('tr');

            const ptData: PatternData = {
                ptcode: ptcodelist[i],
                level: parseInt($(table).find('.diff_area').text().replace('.', '')),
                playcount: 0,
                clearcount: 0,
                clearstat: '',
                rank: '',
                rate: '',
                score: 0,
                combo: 0,
                meter: '',
            };

            $(tbody).each((j, vv) => {
                switch (j) {
                    case 0:
                        ptData.playcount = parseInt($(vv).children('td.r').text().split(' ')[0]);
                        break;
                    case 1:
                        ptData.clearcount = parseInt($(vv).children('td.r').text().split(' ')[0]);
                        break;
                    case 2:
                        $(vv).children('td.r').each((k, vvv) => {
                            if (k === 0)
                                ptData.clearstat = $(vvv).attr('class')!.split(' ')[2];
                            else if (k === 1)
                                ptData.rank = $(vvv).attr('class')!.split(' ')[2];
                        });
                        break;
                    case 3:
                        ptData.rate = $(vv).children('td.r').text();
                        break;
                    case 4:
                        ptData.score = parseInt($(vv).children('td.r').text());
                        break;
                    case 5:
                        ptData.combo = parseInt($(vv).children('td.r').text());
                        break;
                }
            });

            let meter = '';
            const ul = $(v).children('div').children('div').children('ul').children('li');
            $(ul).each((l, vv) => {
                var str = $(vv).attr('class')!.split(' ')[1];
                meter += str[str.length - 1];
            });

            ptData.meter = meter;

            music.data.push(ptData);
        });
    } else if (dmExist > 0) {
        for (let i = 0; i < divlist.length; i++) {
            if (divlist[i] === 'diff_BASIC') ptcodelist.push(9);
            else if (divlist[i] === 'diff_ADVANCED') ptcodelist.push(10);
            else if (divlist[i] === 'diff_EXTREME') ptcodelist.push(11);
            else if (divlist[i] === 'diff_MASTER') ptcodelist.push(12);
        }

        $(divs).each((i, v) => {
            const table = $(v).find('table');
            const tbody = $(table).find('tbody').children('tr');

            const ptData: PatternData = {
                ptcode: ptcodelist[i],
                level: parseInt($(table).find('.diff_area').text().replace('.', '')),
                playcount: 0,
                clearcount: 0,
                clearstat: '',
                rank: '',
                rate: '',
                score: 0,
                combo: 0,
                meter: '',
            };

            $(tbody).each((j, vv) => {
                switch (j) {
                    case 0:
                        ptData.playcount = parseInt($(vv).children('td.r').text().split(' ')[0]);
                        break;
                    case 1:
                        ptData.clearcount = parseInt($(vv).children('td.r').text().split(' ')[0]);
                        break;
                    case 2:
                        $(vv).children('td.r').each((k, vvv) => {
                            if (k === 0)
                                ptData.clearstat = $(vvv).attr('class')!.split(' ')[2];
                            else if (k === 1)
                                ptData.rank = $(vvv).attr('class')!.split(' ')[2];
                        });
                        break;
                    case 3:
                        ptData.rate = $(vv).children('td.r').text();
                        break;
                    case 4:
                        ptData.score = parseInt($(vv).children('td.r').text());
                        break;
                    case 5:
                        ptData.combo = parseInt($(vv).children('td.r').text());
                        break;
                }
            });

            let meter = '';
            const ul = $(v).children('div').children('div').children('ul').children('li');
            $(ul).each((l, vv) => {
                var str = $(vv).attr('class')!.split('block_stat_')[1];
                meter += str[str.length - 1];
            });

            ptData.meter = meter;

            music.data.push(ptData);
        });
    }
    console.log('Collected: ' + name);
    setCurrent('Collected: ' + name);
    return music;
};

export default onSongSuccess;
import axios from 'axios';
import * as cheerio from 'cheerio';
import upload from './upload';
import { CrawlerProfileParams } from '../feature/crawler/component/CrawlerImport.type';
import {UpdateProfile} from "@skillnavi/data/src/profile";

const crawlProfile = async ({
    version,
    setCurrent,
    setBtnDisabled,
}: CrawlerProfileParams) => {
    console.log('[Skill Navigator] Profile Update Initializing');
    setCurrent('Profile Update Initializing...');

    const url = window.sinUrl.find(
        (url) => url.version === version && url.urltype === 'profile',
    )?.url;

    if (!url) {
        alert('No URL for profile found');
        return;
    }

    const html = await axios.get(url);

    console.log('[Skill Navigator] Profile Data Received');
    setCurrent('Profile Data Received');

    const $ = cheerio.load(html.data);

    const title = $('.profile_shogo_frame').text();
    const name = $('.profile_name_frame').text();

    const table = $('#profile_tb');

    const arr: string[][] = [];
    const data = $(table).children('tbody').children('tr');
    data.each((i, row) => {
        const rowarr = new Array<string>();
        $(row)
            .children('td')
            .each((j, col) => {
                rowarr.push($(col).text());
            });
        arr.push(rowarr);
    });

    const profileData: UpdateProfile = {
        title: title,
        name: name,
        gskill: Number(arr[0]?.[1] ?? '0'),
        dskill: Number(arr[0]?.[2] ?? '0'),
        gskillall: Number(arr[1]?.[1] ?? '0'),
        dskillall: Number(arr[1]?.[2] ?? '0'),
        gclearlv: Number(arr[2]?.[1] ?? '0'),
        dclearlv: Number(arr[2]?.[2] ?? '0'),
        gclearnum: Number(arr[3]?.[1] ?? '0'),
        dclearnum: Number(arr[3]?.[2] ?? '0'),
        gfclv: Number(arr[4]?.[1] ?? '0'),
        dfclv: Number(arr[4]?.[2] ?? '0'),
        gfcnum: Number(arr[5]?.[1] ?? '0'),
        dfcnum: Number(arr[5]?.[2] ?? '0'),
        gexclv: Number(arr[6]?.[1] ?? '0'),
        dexclv: Number(arr[6]?.[2] ?? '0'),
        gexcnum: Number(arr[7]?.[1] ?? '0'),
        dexcnum: Number(arr[7]?.[2] ?? '0'),
        crawlToken: window.sinUpdateToken() ?? '',
        userId: window.sinUid,
        targetVersion: version,
    };

    console.log('[Skill Navigator] Uploading Profile...');
    setCurrent('Uploading Profile...');
    upload({
        json: JSON.stringify(profileData),
        type: 'profile',
        version,
        setCurrent,
        setBtnDisabled,
    }).finally(() => setCurrent('Updated complete'));
};

export default crawlProfile;

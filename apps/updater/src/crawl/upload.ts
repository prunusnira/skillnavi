import axios, { isAxiosError } from 'axios';
import {
    UrlCheckSkillDuplicates,
    UrlUploadBoard,
    UrlUploadProfile,
    UrlUploadSkill,
} from '../function/commonData';
import { CrawlerUpload } from '../feature/crawler/component/CrawlerImport.type';
import { createLog } from '@skillnavi/data/src/log/createLog';
import {
    MusicDuplicateGroup,
    UpdateSkill,
} from '@skillnavi/data/src/skill/SkillData';

const skillDataBatchSize = 100;

const axiosUpload = async (
    {
        url,
        json,
        type,
        setCurrent,
        setBtnDisabled,
        keepBtnDisabled,
    }: CrawlerUpload & { url: string },
): Promise<boolean> => {
    try {
        const rtn = await axios.post(url, json, {
            headers: {
                'content-type': 'application/json',
            },
        });

        const success = rtn.data.result === 'success';
        if (success) {
            try {
                createLog({
                    uid: window.sinUid,
                    action: 'update',
                    data: type,
                });
            } catch (error) {
                // do nothing if log failed
            }
            alert(`[${type}] Update complete`);
            console.log(`[${type}] Update complete`);
            setCurrent(`[${type}] Update complete`);
        }
        if (!keepBtnDisabled) {
            setBtnDisabled(false);
        }
        return success;
    } catch (error) {
        console.log(error);
        if (isAxiosError(error)) {
            alert(`[${type}] Error to update data`);
        } else {
            alert(`[${type}] Unknown error`);
        }
        if (!keepBtnDisabled) {
            setBtnDisabled(false);
        }
        return false;
    }
};

const upload = async (props: CrawlerUpload) => {
    const { type } = props;
    let url = '';
    if (type === 'profile') {
        url = UrlUploadProfile;
    } else if (type === 'skill') {
        url = UrlUploadSkill;
    } else if (type === 'board') {
        url = UrlUploadBoard(window.sinUid);
    } else if (type === 'simple') {
        url = UrlUploadSkill;
    }
    return axiosUpload({ url, ...props });
};

export const uploadSkillData = async ({
    skillData,
    type,
    version,
    setCurrent,
    setBtnDisabled,
    onMusicConflicts,
}: {
    skillData: UpdateSkill;
    type: 'skill' | 'simple';
    version: number;
    setCurrent: (s: string) => void;
    setBtnDisabled: (b: boolean) => void;
    onMusicConflicts?: CrawlerUpload['onMusicConflicts'];
}) => {
    setCurrent('Checking for duplicate song titles...');

    try {
        const titles = [
            ...new Set(skillData.musicData.map((song) => song.musictitle)),
        ];
        const conflicts: MusicDuplicateGroup[] = [];

        for (
            let index = 0;
            index < titles.length;
            index += skillDataBatchSize
        ) {
            const check = await axios.post(
                UrlCheckSkillDuplicates,
                {
                    version: skillData.version,
                    titles: titles.slice(index, index + skillDataBatchSize),
                },
                {
                    headers: { 'content-type': 'application/json' },
                },
            );
            conflicts.push(...(check.data as MusicDuplicateGroup[]));
        }

        let musicData = skillData.musicData;

        if (conflicts.length > 0) {
            if (!onMusicConflicts) {
                alert('Duplicate songs need to be selected before update.');
                setBtnDisabled(false);
                return false;
            }

            const selectedMusicIds = await onMusicConflicts(conflicts);
            if (!selectedMusicIds) {
                setBtnDisabled(false);
                setCurrent(`[${type}] Update cancelled`);
                return false;
            }
            const selectedByTitle = new Map<string, number>();

            for (const conflict of conflicts) {
                const mid = selectedMusicIds[conflict.title];
                if (
                    mid === undefined ||
                    !conflict.candidates.some(
                        (candidate) => candidate.mid === mid,
                    )
                ) {
                    alert('Please select a duplicate song for every title.');
                    setBtnDisabled(false);
                    return false;
                }
                selectedByTitle.set(conflict.title, mid);
            }

            musicData = skillData.musicData.map((song) => {
                const mid = selectedByTitle.get(song.musictitle);
                return mid === undefined ? song : { ...song, mid };
            });
        }

        const uploadData: UpdateSkill = { ...skillData, musicData };
        const batches: UpdateSkill[] = [];
        for (
            let index = 0;
            index < uploadData.musicData.length;
            index += skillDataBatchSize
        ) {
            batches.push({
                ...uploadData,
                musicData: uploadData.musicData.slice(
                    index,
                    index + skillDataBatchSize,
                ),
            });
        }

        setCurrent(`[${type}] Uploading skill data...`);
        for (const batch of batches) {
            const success = await axiosUpload({
                url: UrlUploadSkill,
                json: JSON.stringify(batch),
                type,
                version,
                setCurrent,
                setBtnDisabled,
                keepBtnDisabled: true,
            });
            if (!success) {
                setBtnDisabled(false);
                return false;
            }
        }

        setBtnDisabled(false);
        return true;
    } catch (error) {
        console.log(error);
        alert('Error to check duplicate song titles');
        setBtnDisabled(false);
        return false;
    }
};

export default upload;

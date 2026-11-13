import { useEffect, useState } from 'react';
import { MusicDuplicateGroup } from '@skillnavi/data/src/skill/SkillData';

interface Props {
    conflicts: MusicDuplicateGroup[];
    lang: string;
    onConfirm: (selectedMusicIds: Record<string, number>) => void;
    onCancel: () => void;
}

const copy = {
    ko: {
        title: '중복된 곡을 선택해 주세요',
        description: '각 곡의 자켓, 작곡가, 난이도를 확인하고 등록할 곡을 골라 주세요.',
        composer: '작곡가',
        select: '선택',
        cancel: '업데이트 취소',
        confirm: '선택한 곡으로 업데이트',
        noJacket: '자켓 이미지 없음',
    },
    en: {
        title: 'Choose the matching songs',
        description: 'Check each jacket, composer, and chart level, then choose the correct song.',
        composer: 'Composer',
        select: 'Select',
        cancel: 'Cancel update',
        confirm: 'Update with selected songs',
        noJacket: 'No jacket image',
    },
    jp: {
        title: '重複した曲を選択してください',
        description: 'ジャケット、作曲者、各譜面のレベルを確認して曲を選んでください。',
        composer: '作曲者',
        select: '選択',
        cancel: '更新をキャンセル',
        confirm: '選択した曲で更新',
        noJacket: 'ジャケット画像なし',
    },
};

const getInstrument = (patterncode: number) => {
    if (patterncode < 5) return 'Guitar';
    if (patterncode < 9) return 'Bass';
    return 'Drum';
};

const getDifficulty = (patterncode: number) => {
    return ['BASIC', 'ADVANCED', 'EXTREME', 'MASTER'][
        (patterncode - 1) % 4
    ] ?? `Pattern ${patterncode}`;
};

const MusicConflictDialog = ({
    conflicts,
    lang,
    onConfirm,
    onCancel,
}: Props) => {
    const [selectedMusicIds, setSelectedMusicIds] = useState<
        Record<string, number>
    >({});
    const locale = lang === 'ko' || lang === 'jp' ? lang : 'en';
    const labels = copy[locale];

    useEffect(() => {
        setSelectedMusicIds({});
    }, [conflicts]);

    if (conflicts.length === 0) {
        return null;
    }

    const allSelected = conflicts.every(
        (conflict) => selectedMusicIds[conflict.title] !== undefined,
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
            <section
                aria-labelledby="music-conflict-title"
                aria-modal="true"
                className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-xl bg-white p-5 text-gray-900 shadow-2xl"
                role="dialog"
            >
                <h2 className="text-xl font-bold" id="music-conflict-title">
                    {labels.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    {labels.description}
                </p>

                <div className="mt-5 flex flex-col gap-6">
                    {conflicts.map((conflict, groupIndex) => (
                        <fieldset
                            className="min-w-0 border-t border-gray-200 pt-4"
                            key={`${conflict.title}-${groupIndex}`}
                        >
                            <legend className="px-1 text-lg font-semibold">
                                {conflict.title}
                            </legend>
                            <div className="mt-3 grid gap-3 md:grid-cols-2">
                                {conflict.candidates.map((candidate) => {
                                    const selected =
                                        selectedMusicIds[conflict.title] ===
                                        candidate.mid;

                                    return (
                                        <label
                                            className={`flex cursor-pointer gap-3 rounded-lg border p-3 ${
                                                selected
                                                    ? 'border-blue-600 bg-blue-50'
                                                    : 'border-gray-200 hover:border-gray-400'
                                            }`}
                                            key={candidate.mid}
                                        >
                                            <input
                                                checked={selected}
                                                className="mt-1"
                                                name={`music-${groupIndex}`}
                                                onChange={() =>
                                                    setSelectedMusicIds(
                                                        (current) => ({
                                                            ...current,
                                                            [conflict.title]:
                                                                candidate.mid,
                                                        }),
                                                    )
                                                }
                                                type="radio"
                                            />
                                            <CandidateDetails
                                                candidate={candidate}
                                                labels={labels}
                                            />
                                        </label>
                                    );
                                })}
                            </div>
                        </fieldset>
                    ))}
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm"
                        onClick={onCancel}
                        type="button"
                    >
                        {labels.cancel}
                    </button>
                    <button
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={!allSelected}
                        onClick={() => onConfirm(selectedMusicIds)}
                        type="button"
                    >
                        {labels.confirm}
                    </button>
                </div>
            </section>
        </div>
    );
};

const CandidateDetails = ({
    candidate,
    labels,
}: {
    candidate: MusicDuplicateGroup['candidates'][number];
    labels: (typeof copy)['ko'];
}) => {
    const [imageFailed, setImageFailed] = useState(false);

    return (
        <div className="flex min-w-0 flex-1 gap-3">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded bg-gray-100 text-center text-xs text-gray-500">
                {candidate.jacketUrl && !imageFailed ? (
                    <img
                        alt={candidate.title}
                        className="h-full w-full object-cover"
                        onError={() => setImageFailed(true)}
                        src={candidate.jacketUrl}
                    />
                ) : (
                    labels.noJacket
                )}
            </div>
            <div className="min-w-0">
                <div className="font-semibold">{candidate.title}</div>
                <div className="mt-1 text-sm text-gray-600">
                    {labels.composer}: {candidate.composer || '-'}
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                    {candidate.patterns.map((pattern) => (
                        <span
                            className="rounded bg-gray-100 px-2 py-1 text-xs"
                            key={pattern.patterncode}
                        >
                            {getInstrument(pattern.patterncode)}{' '}
                            {getDifficulty(pattern.patterncode)}{' '}
                            {pattern.level === null
                                ? '-'
                                : (pattern.level / 100).toFixed(2)}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MusicConflictDialog;

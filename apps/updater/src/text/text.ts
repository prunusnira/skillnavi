const text = {
    crawler: {
        errort: {
            jp: '緊急お知らせ',
            ko: '긴급 공지',
            en: 'URGENT NOTICE',
        },
        errorc: {
            jp: '現在、データの更新が正常にできません。修正を行っていますのでしばらくお待ちください。',
            ko: '현재 데이터 갱신이 정상적으로 이루어지지 않고 있습니다. 수정 중이니 잠시만 기다려주세요.',
            en: 'Data updates are currently unavailable. We are working to fix the issue, please wait a moment.',
        },
        notlogin: {
            line1: {
                jp: 'Skill Navigatorで新しくなったスクリプトを確認してください！',
                ko: 'Skill Navigator에서 새롭게 변경된 스크립트를 확인해보세요!',
                en: 'Check out the newly updated script on Skill Navigator!',
            },
            line2: {
                jp: '別途ログインは不要です。',
                ko: '별도의 로그인이 필요하지 않습니다.',
                en: 'No additional login is required.',
            },
            line3: {
                jp: 'こちらからログインしてください',
                ko: '여기에서 로그인하세요',
                en: 'Sign in here.',
            },
        },
        logined: {
            jp: 'のログイン確認',
            ko: '의 로그인 확인',
            en: 'is signed in',
        },
        alert: {
            title: {
                jp: '注意事項',
                ko: '주의사항',
                en: 'Notice',
            },
            warn1: {
                jp: 'ChromeやSafariなどの最新ブラウザをご利用ください。',
                ko: 'Chrome, Safari 등의 최신 브라우저를 사용해주세요.',
                en: 'Please use the latest browsers such as Chrome or Safari.',
            },
            warn2: {
                jp: 'ご利用前にeAmusementにログインしてください。',
                ko: '사용 전 eAmusement에 로그인해야 합니다.',
                en: 'Please sign in to eAmusement before using.',
            },
            warn3: {
                jp: '更新中にeAmusementの他のページを閲覧すると、データに異常が発生する場合があります（他のデバイスでも同様です）。',
                ko: '갱신 중에는 eAmusement의 다른 페이지에 접근하지 마세요 (다른 디바이스를 사용해도 안 됩니다).',
                en: 'Do not access other eAmusement pages while updating your data (even on other devices).',
            },
            warn4: {
                jp: '更新中はできるだけこのタブを画面に表示してください（バックグラウンドでは更新が遅くなったり止まることがあります）。',
                ko: '갱신 중에는 되도록 이 탭이 화면에 보이도록 해주세요 (백그라운드에서는 갱신이 느려지거나 멈출 수 있습니다).',
                en: 'While updating, please keep this tab in the foreground (updates may slow down or stop if in the background).',
            },
        },
        current: {
            jp: '現在の更新状況',
            ko: '갱신 진행 상황',
            en: 'Current update status',
        },
        pause: {
            jp: '読み込みタイム',
            ko: '곡별 갱신 대기 시간',
            en: 'Update interval for each song',
        },
        datat: {
            jp: 'データ更新',
            ko: '데이터 업데이트',
            en: 'Data Update',
        },
        descTgtShortT: {
            jp: 'スキル対象曲の早速更新',
            ko: '스킬 대상곡 빠른 갱신',
            en: 'Quick update for skill target songs',
        },
        descTgtShort: {
            jp: 'スキル対象曲の必須データのみを数秒以内に更新する機能です。',
            ko: '스킬 대상곡의 필수 데이터만 수 초 내에 갱신하는 기능입니다.',
            en: 'This feature updates only the essential data of skill target songs within a few seconds.',
        },
        descTgtAllT: {
            jp: 'スキル対象曲のデータ更新',
            ko: '스킬 대상곡 전체 갱신',
            en: 'Full update for skill target songs',
        },
        descTgtAll: {
            jp: 'スキル対象曲のすべてのデータを更新します。最大5分ほどかかります。',
            ko: '스킬 대상곡의 모든 데이터를 갱신합니다. 최대 5분 정도 소요됩니다.',
            en: 'Updates all data for skill target songs. This may take up to 5 minutes.',
        },
        descAllT: {
            jp: '全曲データ更新',
            ko: '전곡 데이터 갱신',
            en: 'Update all songs',
        },
        descAll: {
            jp: '解禁済みの全曲データを更新します。およそ1時間かかります（時間がかかるため、GF/DMを同時に進行できません）。',
            ko: '해금된 모든 곡의 데이터를 갱신합니다. 약 1시간 정도 소요됩니다. (시간이 오래 걸려 GF/DM을 동시에 진행할 수 없습니다.)',
            en: 'Updates all unlocked songs. This process takes about 1 hour (GF/DM cannot be updated simultaneously due to time constraints).',
        },
        descFavoT: {
            jp: '「お気に入り」更新',
            ko: '즐겨찾기 갱신',
            en: 'Update Favorites',
        },
        descFavo: {
            jp: '「お気に入り」の曲を更新します。',
            ko: '즐겨찾기에 등록된 곡들의 모든 패턴을 갱신합니다.',
            en: 'Updates all patterns for songs in your favorites.',
        },
        selection: {
            jp: '行別更新',
            ko: '행별 업데이트',
            en: 'Update by row',
        },
        seldesc: {
            jp: '行を選択してください。',
            ko: '행을 선택하세요.',
            en: 'Select a row.',
        },
        board: {
            title: {
                jp: 'プレイヤーボード',
                ko: '플레이어 보드',
                en: 'Player Board',
            },
            short: {
                jp: 'ボード',
                ko: '보드',
                en: 'Board',
            },
            desc: {
                jp: 'いずれか一つのみ適用されます。',
                ko: '둘 중 하나만 적용됩니다.',
                en: 'Only one of these can be applied.',
            },
        },
        gsel: {
            jp: 'GF選択曲',
            ko: 'GF선택곡',
            en: 'GF Selected Song',
        },
        dsel: {
            jp: 'DM選択行',
            ko: 'DM선택행',
            en: 'DM Selected Row',
        },
        line: {
            jp: '行',
            ko: '행',
            en: 'Row',
        },
        numberAndOther: {
            jp: '数字・記号',
            ko: '숫자/기호',
            en: 'Numbers/Symbols',
        },
        favorite: {
            pageError: {
                jp: 'お気に入りページの情報が正しくありません。',
                ko: '즐겨찾기 페이지 정보가 정확하지 않습니다.',
                en: 'Favorite page information is incorrect.',
            },
        },
    },
};

export default text;

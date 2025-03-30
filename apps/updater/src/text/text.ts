const text = {
	crawler: {
		errort: {
			"jp":"緊急お知らせ",
			"ko":"긴급 공지",
			"en":"URGENT NOTICE"
		},
		errorc: {
			"jp":"現在、データの更新が正常にできません。修正を行っていますのでしばらくお待ち下さい。",
			"ko":"현재 데이터 갱신이 정상적으로 이루어지지 않고 있습니다. 수정중이니 잠시만 기다려주세요",
			"en":"Updater is currently in construction. Please wait until fixed."
		},
		notlogin: {
			line1: {
				"jp":"Skill Navigatorで新しく変わったスクリプトを確認してください！",
				"ko":"Skill Navigator에서 새롭게 변경된 스크립트를 확인해보세요!",
				"en":"Please check new update script from website!"
			},
			line2: {
				"jp":"別のログインがなくてもご利用できます。",
				"ko":"별도의 로그인이 필요하지 않습니다.",
				"en":"You don't need separated login anymore"
			},
			line3: {
				"jp":"からログインしてください",
				"ko":"에 접속한 후 로그인 하세요",
				"en":"Sign in here"
			}
		},
		logined: {
			"jp":"のログイン確認",
			"ko":"의 로그인 확인",
			"en":"is signed in"
		},
		alert: {
			title: {
				"jp":"注意事項",
				"ko":"주의사항",
				"en":"Caution"
			},
			warn1: {
				"jp":"Chrome, Safariなどの最新ブラウザをご利用ください",
				"ko":"Chrome, Safari 등의 최신 브라우저를 사용해주세요",
				"en":"Please use recent browsers like Chrome, Safari"
			},
			warn2: {
				"jp":"使用前eAmusementのログインしてください",
				"ko":"사용 전 eAmusement에 로그인해야 합니다",
				"en":"Sign into eAmusement before using it"
			},
			warn3: {
				"jp":"更新中eAmusementの他のページを探索するとデータに異常が発生します (他のデバイスでもNG)",
				"ko":"갱신 중 eAmusement의 다른 페이지에 접근하지 마세요 (다른 디바이스를 사용해도 안됨)",
				"en":"Do not use other pages of eAmusement site while updating your data (Even in other devices)"
			},
			warn4: {
				"jp":"更新中ではなるべくこのタブが画面に見えるようにしてください (バックグラウンドでは更新が遅くなったり止まることがあります)",
				"ko":"갱신중에는 되도록 탭이 화면에 보이도록 해주세요 (백그라운드로 할 경우 갱신이 느려지거나 멈출 수 있습니다)",
				"en":"While updating, Please keep this tab foreground (Making background may slowdown or stop update)"
			}
		},
		current: {
			"jp":"現在の更新状況",
			"ko":"갱신 진행 상황",
			"en":"Update status"
		},
		pause: {
			"jp":"読み込みタイム",
			"ko":"곡 별 갱신 대기 시간",
			"en":"Time interval for each song"
		},
		datat: {
			"jp":"データ更新",
			"ko":"데이터 업데이트",
			"en":"Data update"
		},
		
		descTgtShortT: {
			"jp":"スキル対象曲の早速更新",
			"ko":"스킬 대상곡 빠른 갱신",
			"en":"Fast update for skill table"
		},
		descTgtShort: {
			"jp":"スキル対象曲の必須データのみ数秒以内に更新する機能です",
			"ko":"스킬 대상곡의 필수 데이터만 수 초 내에 갱신하는 기능입니다",
			"en":"It just take skill table's data within several seconds"
		},
		
		descTgtAllT: {
			"jp":"スキル対象曲のデータ更新",
			"ko":"스킬 대상곡 전체 갱신",
			"en":"It takes all data from skill table's music (it takes about 5 minutes)"
		},
		descTgtAll: {
			"jp":"スキル対象曲のすべてのデータを更新します。最大５分くらいかかります",
			"ko":"스킬 대상곡의 모든 데이터를 갱신합니다. 50개의 패턴을 갱신하므로 최대 5분정도 소요됩니다",
			"en":"It takes all data from skill table's music (it takes about 5 minutes)"
		},
		
		descAllT: {
			"jp":"全曲データ更新",
			"ko":"전곡 데이터 갱신",
			"en":"All data update"
		},
		descAll: {
			"jp":"解禁済みの全曲のデータを更新します。およそ1時間かかります (時間がかかりすぎるのでGF/DMを同時に進行できません)",
			"ko":"해금이 되어있는 모든 곡의 데이터를 갱신합니다. 약 1시간정도 소요됩니다. (시간이 너무 오래 소요되어 GF/DM을 동시에 진행할 수 없습니다)",
			"en":"All unlocked music is updated. It takes about 1 hours (ALL button is blocked here - too much time used)"
		},
		
		descFavoT: {
			"jp":"「お気に入り」更新",
			"ko":"즐겨찾기 갱신",
			"en":"Favorite"
		},
		descFavo: {
			"jp":"「お気に入り」の曲を更新します",
			"ko":"즐겨찾기에 등록된 곡들의 모든 패턴을 갱신합니다",
			"en":"Music in favorite folder are updated"
		},
		
		selection: {
			"jp":"行別更新",
			"ko":"행별 업데이트",
			"en":"Update by columns"
		},
		seldesc: {
			"jp":"行を選んでください",
			"ko":"행을 선택하세요",
			"en":"Select columns"
		},
		board: {
			title: {
				"jp":"プレイヤーボード",
				"ko":"플레이어 보드",
				"en":"Player board"
			},
			short: {
				"jp":"ボード",
				"ko":"보드",
				"en":"Board"
			},
			desc: {
				"jp":"一つのみ適用されます",
				"ko":"둘 중에 하나만 적용됩니다",
				"en":"Only one of them applied"
			}
		},
		gsel: {
			"jp":"GF選択曲",
			"ko":"GF선택곡",
			"en":"GF Selected",
		},
		dsel: {
			"jp":"DM選択行",
			"ko":"DM선택행",
			"en":"DM Selected"
		},
		line: {
			"jp":"行",
			"ko":"행",
			"en":"row"
		},
		numberAndOther: {
			"jp":"数字・記号",
			"ko":"숫자/기호",
			"en":"Number/Sign"
		},

		favorite: {
			pageError: {
				"jp": 'お気に入りページの情報が正しくありません',
				"ko": '즐겨찾기 페이지 정보가 정확하지 않습니다',
				"en": 'Favorite page number is not correct',
			}
		}
	}
};

export default text;
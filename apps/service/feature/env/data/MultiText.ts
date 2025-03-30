export interface MultiText {
    common: {
        other: {
            days: string;
            hrs: string;
            mins: string;
        };
        emptyname: string;
    };
    error404: {
        e404_1: string;
        e404_2: string;
    };
    error500: {
        e500_1: string;
        e500_2: string;
        e500_3: string;
        e500_4: string;
        e500_5: string;
        e500_6: string;
    };
    header: {
        mydata: {
            title: string;
            profile: string;
            mygf: string;
            mydm: string;
            count: string;
            snapshot: string;
        };
        skill: {
            title: string;
            recent: string;
            rank: string;
            exc: string;
            countrank: string;
        };
        pattern: {
            title: string;
            list: string;
            noplay: string;
            table: string;
        };
        tower: string;
        login: string;
        logout: string;
        search: {
            title: string;
            music: string;
            gskill: string;
            dskill: string;
            player: string;
        };
        test: string;
    };
    footer: {
        fanpage: string;
        langsel: string;
    };
    index: {
        self: {
            title: string;
            login: string;
            loginFirst: string;
        };
        notice: string;
        about: {
            title: string;
            cont: string;
        };
        script: {
            title: string;
            cont: string;
            scriptTitle: string;
            scriptNoLogin: string;
            scriptLogin: string;
            alert: string;
        };
        notice2: {
            title: string;
            desc: string;
        };
        howto: {
            title: string;
            desc1: string;
            desc2: string;
            desc3: string;
            browser: string;
            desc4: string;
            lang: string;
        };
    };
    notice: {
        title: string;
        no: string;
        noti: string;
        date: string;
    };
    pattern: {
        music: {
            count: string;
            rank: string;
            rate: string;
            score: string;
            combo: string;
            skill: string;
            oldrate: string;
        };
        noplay: {
            desc: string;
            all: string;
            ver: string;
            filter: {
                btn: {
                    title: string;
                    version: string;
                };
            };
        };
        rank: {
            title: string;
            desc1: string;
            desc2: string;
            ptinfo: string;
            selectver: string;
            filter: {
                btn: {
                    title: string;
                    version: string;
                };
            };
        };
        rankeach: {
            title: string;
            desc: string;
            pattern: string;
            mine: string;
            table: {
                ptinfo: string;
                ranking: string;
            };
        };
    };
    recent: {
        recent: string;
        notice: string;
        click: string;
    };
    search: {
        title: string;
        desc: string;
        table: {
            empty: string;
        };
    };
    skill: {
        countrank: {
            title: string;
            desc: {
                desc1: string;
                desc2: string;
                desc3: string;
            };
        };
        ranking: {
            title: string;
            totaltitle: string;
            desc: string;
            table: {
                comp: string;
                uptime: string;
            };
            click: string;
        };
        table: {
            scrshot: string;
            btnShareTable: string;
            btnNormalTable: string;
            order: {
                skillasc: string;
                skilldesc: string;
                titleasc: string;
                titledesc: string;
                verasc: string;
                verdesc: string;
                rateasc: string;
                ratedesc: string;
                playdesc: string;
            };
            tablehead: {
                empty: string;
            };
            float: string;
            snapshot: {
                button: string;
                created: string;
            };
            exc: string;
            filter: {
                btn: {
                    title: string;
                    version: string;
                };
            };
        };
    };
    tower: {
        towerlist: {
            main: {
                desc: string;
                skilltower: string;
                sptower: string;
                howto: string;
            };
            detail: {
                progress: string;
                below: string;
                titlechangable: string;
                titleunchangable: string;
                btntitlechange: string;
                require1: string;
                require2: string;
                require3: string;
            };
            howto: {
                step1: string;
                step2: string;
            };
            title: {
                changed: string;
            };
        };
        towerstatus: {
            towerhead: string;
            nodata: string;
            floor: string;
            titlehead: string;
            duplicate: string;
            btntitle: string;
            btntop: string;
        };
        towertitle: {
            title: string;
            body: string;
        };
    };
    user: {
        login: {
            title: string;
            google: string;
            titleAppFail: string;
            contentAppFailTitle: string;
            contentAppFail: string;
            loginErrorModal: {
                title: string;
                body: {
                    p1: string;
                    p2: string;
                    p3: string;
                    msg: string;
                };
            };
        };
        join: {
            title: string;
            desc: string;
            btnsign: string;
            btndecline: string;
            existAccess: string;
            invalidAccess: string;
        };
        playcount: {
            desc_1: string;
            desc_2: string;
            desc_3: string;
            button: {
                music: string;
                pt: string;
                gf: string;
                dm: string;
                scrshot: string;
            };
            table: {
                time: string;
            };
            nodata: string;
        };
        profile: {
            profile: string;
            table1: {
                prof: string;
                title: string;
                name: string;
                comment: string;
                emptyname: string;
            };
            oldver: {
                more: string;
                less: string;
            };
            graph: string;
            detail: string;
            button: {
                title: string;
                chkpskill: string;
                setdataopen: string;
                changecomment: string;
                clearRankTable: string;
                mybest: string;
                compare: string;
                reset: string;
                resetdanger: string;
                resetdone: string;
                countupdate: string;
                countdesc: string;
                towerupdate: string;
                towerstatus: string;
            };
            detailed: {
                s: string;
                clv: string;
                flv: string;
                elv: string;
                count: string;
                notopen: string;
                countdesc: string;
            };
            board: {
                title: string;
            };
            dataopen: {
                yes: string;
                no: string;
            };
            changecomment: {
                desc: string;
            };
            towerupdate: {
                alert: string;
                done: string;
            };
            click: string;
        };
        reset: {
            title: string;
            desc1: string;
            desc2t: string;
            desc2s: string;
            desc3: string;
            desc4: string;
            desc5: string;
        };
        snapshot: {
            desc1: string;
            desc2: string;
            desc3: string;
            btnN: string;
            btnS: string;
            btnD: string;
        };
    };
}

interface Props {
    version: number;
}

const MusicRemoved = ({ version }: Props) => {
    const removeText = (version: number) => {
        switch (version) {
            case 24:
                return 'removed in TB';
            case 25:
                return 'removed in TBRE';
            case 26:
                return 'removed in MX';
            case 27:
                return 'removed in EX';
            case 28:
                return 'removed in NX';
            case 29:
                return 'removed in HV';
            case 30:
                return 'removed in FU';
            case 31:
                return 'removed in GW';
        }
    };

    return <div>{removeText(version)}</div>;
};

export default MusicRemoved;

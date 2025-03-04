import { ProfileGraph, ProfileGraphRaw } from '@/feature/profile/data/ProfileGraph';

interface Props {
    data: ProfileGraphRaw[];
}

const useGraph = ({ data }: Props) => {
    const getGraphData = () => {
        const gfdata: ProfileGraph[] = [];
        const dmdata: ProfileGraph[] = [];
        let gfmin: number | undefined;
        let gfmax: number | undefined;
        let dmmin: number | undefined;
        let dmmax: number | undefined;

        if (data && data.length) {
            data.forEach((point) => {
                const { date, gf, dm } = point;
                if (gfmin === undefined || gfmax === undefined) {
                    gfmin = gf;
                    gfmax = gf;
                }
                if (dmmin === undefined || dmmax === undefined) {
                    dmmin = dm;
                    dmmax = dm;
                }

                if (gf < gfmin) gfmin = gf;
                if (gf > gfmax) gfmax = gf;
                if (dm < dmmin) dmmin = dm;
                if (dm > dmmax) dmmax = dm;

                gfdata.push({ date, value: gf });
                dmdata.push({ date, value: dm });
            });
        }

        return {
            gfdata,
            dmdata,
            gfmin,
            gfmax,
            dmmin,
            dmmax,
        };
    };

    return getGraphData();
};

export default useGraph;

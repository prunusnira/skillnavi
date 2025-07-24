interface Window {
    sinUpdateToken?: () => string;
    sinUid: number;
    sinUrl: {
        version: number;
        urltype: string;
        url: string;
    }[];
}

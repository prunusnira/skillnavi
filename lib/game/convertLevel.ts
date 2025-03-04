export const convertLevel = (level: number | string) => {
    const lv = String(level);
    return `${lv.charAt(0)}.${lv.substring(1)}`;
};

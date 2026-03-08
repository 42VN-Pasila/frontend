export const toDevPath = (path: string) => {
    return new URL(path).toString().replace(/\/$/, "");
};
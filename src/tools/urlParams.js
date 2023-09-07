export const getParamValue = (key,fullPath ) => {
     const urlParams = new URLSearchParams(new URL(fullPath).search);
    return urlParams.get(key) ?? null;
}

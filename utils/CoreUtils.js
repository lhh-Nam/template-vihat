import ApiMgr from '../cores/ApiMgr';

const apiInstance = ApiMgr.getInstance();

export async function doRequest(...arg) { return await apiInstance.doRequest(...arg); }
export async function simpleRequest(...arg) { return await apiInstance.simpleRequest(...arg); }
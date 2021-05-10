import { call, put, delay } from 'redux-saga/effects';

import RoleActions from '../reduxs/RoleRedux';

import { getTimestamp, getDelayTime } from '../utils/DateUtils';
import { validateResp, getErrorMsg } from '../utils/StringUtils';

import RoleAPIs from '../services/APIs/RoleAPIs';

const api = new RoleAPIs();

export function* getRoles(action) {
    const { classify, params } = action;
    const startReqAt = getTimestamp();
    try {
        let resp = yield call(api.getRoles, params);
        yield delay(getDelayTime(startReqAt, 'ms', 500));
        if (validateResp(resp)) {
            yield put(RoleActions.getRolesSuccess(classify, resp.payload));
        } else throw resp;
    } catch (error) {
        yield put(RoleActions.roleCommonFailure(classify, getErrorMsg(error)));
    }
}
import { call, put, delay } from 'redux-saga/effects';

import UserActions from '../reduxs/UserRedux';
import SessionActions from '../reduxs/SessionRedux';

import { getTimestamp, getDelayTime } from '../utils/DateUtils';
import { validateResp, getErrorMsg } from '../utils/StringUtils';

import UserAPIs from '../services/APIs/UserAPIs';

const api = new UserAPIs();

export function* userLogin(action) {
    const { classify, params } = action;
    try {
        let resp = yield call(api.userLogin, params);
        if (validateResp(resp)) {
            let getTokenParams = { ...params, tenant_id: resp.payload[0]._id };
            delete getTokenParams.domain;
            let tokenResp = yield call(api.getLoginToken, getTokenParams);
            if (validateResp(tokenResp)) {
                yield put(UserActions.userCommonSuccess(classify, resp.payload));
                yield put(SessionActions.setAccessToken(tokenResp.payload, params.identify_info));
            } else throw tokenResp;
        } else throw resp;
    } catch (error) {
        yield put(UserActions.userCommonFailure(classify, getErrorMsg(error)));
    }
}

export function* getUserInfo(action) {
    const { classify, params } = action, startReqAt = getTimestamp();
    try {
        let resp = yield call(api.getUserInfo, params);
        yield delay(getDelayTime(startReqAt, 'ms', 1000));
        if (validateResp(resp)) {
            yield put(UserActions.getUserInfoSuccess(classify, resp.payload));
        } else throw resp;
    } catch (error) {
        yield put(UserActions.userCommonFailure(classify, getErrorMsg(error)));
    }
}
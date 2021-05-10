import { call, put, delay } from 'redux-saga/effects';
import GitActions from '../reduxs/GitRedux';

import GitAPIs from '../services/APIs/GitAPIs';

const api = new GitAPIs();

export function* getGitRepo() {
    try {
        const resp = yield call(api.getGitRepo);
        console.log("🚀 ~ resp", resp)

        //yield put(GitActions.getGitRepo(resp.data));
    } catch (error) {
        console.log("🚀 ~ getGitRepo -> error:", error)
    }
}
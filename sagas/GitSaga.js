import { call, put, delay } from 'redux-saga/effects';
import GitActions from '../reduxs/GitRedux';

import GitAPIs from '../services/APIs/GitAPIs';

const api = new GitAPIs();

export function* getGitRepo(action) {
    const { classify } = action
    try {
        const resp = yield call(api.getGitRepo);
        console.log("🚀 ~ resp", resp)

        yield put(GitActions.getGitRepoSuccess(classify, resp));
    } catch (error) {
    console.log("🚀 ~ function*getGitRepo ~ error", error)
    }
}
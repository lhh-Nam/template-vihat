import { all, takeLatest, takeEvery } from 'redux-saga/effects';

/* ------------- START: Types ------------- */

import { RoleTypes } from '../reduxs/RoleRedux';

import { UserTypes } from '../reduxs/UserRedux';

import { GitTypes } from '../reduxs/GitRedux';

/* ------------- END: Types ------------- */

/* ------------- START: Sagas ------------- */

import { getRoles } from './RoleSaga';

import { userLogin, getUserInfo } from './UserSaga';

import { getGitRepo } from './GitSaga'

/* ------------- END: Sagas ------------- */

/* ------------- START: Connect Types To Sagas ------------- */
export default function* root() {
  yield all([

    // user
    takeLatest(UserTypes.USER_LOGIN_REQUEST, userLogin),
    takeLatest(UserTypes.GET_USER_INFO_REQUEST, getUserInfo),

    // role
    takeLatest(RoleTypes.GET_ROLES_REQUEST, getRoles),

    // git
     takeLatest(GitTypes.GET_GIT_REPO, getGitRepo),
  ]);
}
/* ------------- END: Connect Types To Sagas ------------- */
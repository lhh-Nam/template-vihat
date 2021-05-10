import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

import { setCookie, getRefreshToken } from '../utils/StringUtils';
import { jwtDecode, redirectToLoginPage, setTokenContent } from '../utils/WebUtils';

import { sourceVersion } from '../constants/Constants';

/* ------------- START: Types and Action Creators ------------- */
const { Types, Creators } = createActions({

    setAccessToken: ['loginToken', 'identifyInfo'],
    sessionLogout: ['isRedirect'],

});

export const SessionTypes = Types;
export default Creators;
/* ------------- END: Types and Action Creators ------------- */

/* ------------- START: Initial State ------------- */
export const INITIAL_STATE = Immutable({
    accessToken: null,
});
/* ------------- END: Initial State ------------- */

/* ------------- START: setAccessToken ------------- */
export const setAccessToken = (state, { loginToken, identifyInfo }) => {
    const { access_token, is_force_change_password, refresh_token } = loginToken;
    const tokenCookie = {
        sourceVersion,
        access_token,
        refresh_token: getRefreshToken(refresh_token),
        login_email: identifyInfo,
        is_force_change_password,
    };
    let accessToken = jwtDecode(loginToken.access_token);
    setCookie(tokenCookie);
    setTokenContent(accessToken);
    return state.merge({ accessToken });
}
/* ------------- END: setAccessToken ------------- */

/* ------------- START: sessionLogout ------------- */
export const sessionLogout = (state, { isRedirect }) => {
    setCookie({ sourceVersion });
    setTokenContent();
    localStorage.clear();
    if (isRedirect) { redirectToLoginPage(); }
    return state.merge({ accessToken: null });
};
/* ------------- END: sessionLogout ------------- */

/* ------------- START: Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {

    [Types.SET_ACCESS_TOKEN]: setAccessToken,
    [Types.SESSION_LOGOUT]: sessionLogout,

});
/* ------------- END: Hookup Reducers To Types ------------- */



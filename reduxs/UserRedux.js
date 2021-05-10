import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- START: Types and Action Creators ------------- */
const { Types, Creators } = createActions({

    userCommonSuccess: ['classify', 'payload'],
    userCommonFailure: ['classify', 'error'],

    userLoginRequest: ['classify', 'params'], // classify: userLogin

    getUserInfoRequest: ['classify', 'params'], // classify: userInfo
    getUserInfoSuccess: ['classify', 'payload'],

});
export const UserTypes = Types;
export default Creators;
/* ------------- END: Types and Action Creators ------------- */

/* ------------- START: Initial State ------------- */
export const INITIAL_STATE = Immutable({
    error: {},
    fetching: {},
    content: {},
});
/* ------------- END: Initial State ------------- */

/* ------------- START: common ------------- */
export const userCommonSuccess = (state, { classify, payload }) => {
    return state.merge({
        fetching: { ...state.fetching, [classify]: false },
        content: { ...state.content, [classify]: payload },
    });
};

export const userCommonFailure = (state, { classify, error }) => {
    return state.merge({
        fetching: { ...state.fetching, [classify]: false },
        error: { ...state.error, [classify]: error },
    });
};
/* ------------- END: common ------------- */

/* ------------- START: userLogin ------------- */
export const userLoginRequest = (state, { classify }) => {
    return state.merge({
        fetching: { ...state.fetching, [classify]: true },
        error: { ...state.error, [classify]: null },
    });
};
/* ------------- END: userLogin ------------- */

/* ------------- START: getUserInfo ------------- */
export const getUserInfoRequest = (state, { classify }) => {
    return state.merge({
        fetching: { ...state.fetching, [classify]: true },
        error: { ...state.error, [classify]: null },
        content: { ...state.content, [classify]: null },
    });
};

export const getUserInfoSuccess = (state, { classify, payload }) => {
    const { attribute_structure } = payload;
    let userInfo = {};
    attribute_structure.forEach(attr => {
        const { field_code, value } = attr;
        userInfo[field_code] = value.map(i => i.display_value);
    });
    return state.merge({
        fetching: { ...state.fetching, [classify]: false },
        content: { ...state.content, [classify]: userInfo },
    });
};
/* ------------- END: getUserInfo ------------- */

/* ------------- START: Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {

    [Types.USER_COMMON_SUCCESS]: userCommonSuccess,
    [Types.USER_COMMON_FAILURE]: userCommonFailure,

    [Types.USER_LOGIN_REQUEST]: userLoginRequest,

    [Types.GET_USER_INFO_REQUEST]: getUserInfoRequest,
    [Types.GET_USER_INFO_SUCCESS]: getUserInfoSuccess,

});
/* ------------- END: Hookup Reducers To Types ------------- */
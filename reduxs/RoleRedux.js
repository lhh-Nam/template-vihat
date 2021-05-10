import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- START: Types and Action Creators ------------- */
const { Types, Creators } = createActions({

    roleCommonSuccess: ['classify', 'payload'],
    roleCommonFailure: ['classify', 'error'],

    getRolesRequest: ['classify', 'params'], // classify: roles
    getRolesSuccess: ['classify', 'payload'],

});
export const RoleTypes = Types;
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
export const roleCommonSuccess = (state, { classify, payload }) => {
    return state.merge({
        fetching: { ...state.fetching, [classify]: false },
        content: { ...state.content, [classify]: payload },
    });
};

export const roleCommonFailure = (state, { classify, error }) => {
    return state.merge({
        fetching: { ...state.fetching, [classify]: false },
        error: { ...state.error, [classify]: error },
    });
};
/* ------------- END: common ------------- */

/* ------------- START: getRoles ------------- */
export const getRolesRequest = (state, { classify }) => {
    return state.merge({
        fetching: { ...state.fetching, [classify]: true },
        error: { ...state.error, [classify]: null },
    });
};

export const getRolesSuccess = (state, { classify, payload }) => {
    return state.merge({
        fetching: { ...state.fetching, [classify]: false },
        content: { ...state.content, [classify]: payload },
    });
};
/* ------------- END: getRoles ------------- */

/* ------------- START: Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {

    [Types.ROLE_COMMON_SUCCESS]: roleCommonSuccess,
    [Types.ROLE_COMMON_FAILURE]: roleCommonFailure,

    [Types.GET_ROLES_REQUEST]: getRolesRequest,
    [Types.GET_ROLES_SUCCESS]: getRolesSuccess,

});
/* ------------- END: Hookup Reducers To Types ------------- */
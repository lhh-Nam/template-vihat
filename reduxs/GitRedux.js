import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- START: Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    getGitRepo: ['payload'],
});

export const GitTypes = Types;
export default Creators;

/* ------------- END: Types and Action Creators ------------- */

/* ------------- START: Initial State ------------- */
export const INITIAL_STATE = Immutable({
    repos: {},
});
/* ------------- END: Initial State ------------- */

/* ------------- START: getGitRepo ------------- */
export const getGitRepo = (state) => {

    return state.merge({
        repos: { ...state.repos },
    });
};
/* ------------- END: getGitRepo ------------- */

/* ------------- START: Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_GIT_REPO]: getGitRepo,
});
/* ------------- END: Hookup Reducers To Types ------------- */
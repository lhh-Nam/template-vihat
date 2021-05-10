import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- START: Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    getGitRepoRequest: ['classify', 'params'],
    getGitRepoSuccess: ['classify', 'payload'],
});

export const GitTypes = Types;
export default Creators;

/* ------------- END: Types and Action Creators ------------- */

/* ------------- START: Initial State ------------- */
export const INITIAL_STATE = Immutable({
    error: {},
    fetching: {},
    content: {},
});
/* ------------- END: Initial State ------------- */

/* ------------- START: getGitRepo ------------- */
export const getGitRepoRequest = (state, { classify }) => {
    return state.merge({
        fetching: { ...state.fetching, [classify]: true },
        error: { ...state.error, [classify]: null },
        content: { ...state.content, [classify]: null },
    });
};

export const getGitRepoSuccess = (state, { classify, payload }) => {
    const attribute_structure = payload;

    return state.merge({
        fetching: { ...state.fetching, [classify]: false },
        content: { ...state.content, [classify]: attribute_structure },
    });
};


/* ------------- END: getGitRepo -------- ----- */

/* ------------- START: Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_GIT_REPO_REQUEST]: getGitRepoRequest,
    [Types.GET_GIT_REPO_SUCCESS]: getGitRepoSuccess,
});
/* ------------- END: Hookup Reducers To Types ------------- */
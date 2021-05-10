import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    startup: [],
});

export const StartupTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    loadedPersist: false,
});

/* ------------- Reducers ------------- */

export const startup = (state) => state.merge({ loadedPersist: true });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.STARTUP]: startup,
});


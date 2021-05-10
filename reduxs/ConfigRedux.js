import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- START: Types and Action Creators ------------- */
const { Types, Creators } = createActions({

    updateCurrentLanguage: ['lng'],

});
export const ConfigTypes = Types;
export default Creators;
/* ------------- END: Types and Action Creators ------------- */

/* ------------- START: Initial State ------------- */
export const INITIAL_STATE = Immutable({

    lng: 'vi', // vi, en;

});
/* ------------- END: Initial State ------------- */

/* ------------- START: Reducers ------------- */

/* ------------- START: updateCurrentLanguage ------------- */
export const updateCurrentLanguage = (state, { lng }) => {
    setCurrentLanguage(lng);
    return state.merge({ lng });
};
/* ------------- END: updateCurrentLanguage ------------- */

/* ------------- END: Reducers ------------- */

/* ------------- START: Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {

    [Types.UPDATE_CURRENT_LANGUAGE]: updateCurrentLanguage,

});

/* ------------- END: Hookup Reducers To Types ------------- */

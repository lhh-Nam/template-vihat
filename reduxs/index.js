import createSagaMiddleware from 'redux-saga';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';

import rootSaga from '../sagas';

import ReduxPersist from '../constants/ReduxPersist';

const reducers = combineReducers({
    config: require('./ConfigRedux').reducer,
    user: require('./UserRedux').reducer,
    session: require('./SessionRedux').reducer,
    role: require('./RoleRedux').reducer,
    git: require('./GitRedux').reducer,
});

const makeConfiguredStore = (reducer) => {
    // 1: Create the middleware
    const sagaMiddleware = createSagaMiddleware();
    // 2: Add an extra parameter for applying middleware:
    const store = createStore(reducer, applyMiddleware(sagaMiddleware));
    // 3: Run your sagas on server
    store.sagaTask = sagaMiddleware.run(rootSaga);
    // 4: now return the store:
    return store;
};

const makeStore = () => {
    const isServer = typeof window === 'undefined';
    if (isServer || !ReduxPersist.active) {
        return makeConfiguredStore(reducers);
    } else {
        // we need it only on client side
        const { persistStore, persistReducer } = require('redux-persist');
        const persistedReducer = persistReducer(ReduxPersist.storeConfig, reducers);
        const store = makeConfiguredStore(persistedReducer);
        store.__persistor = persistStore(store); // Nasty hack
        return store;
    }
};

export default createWrapper(makeStore, { debug: false });
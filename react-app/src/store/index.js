import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import channelReducer from './channels';
import channelMessageReducer from './channel_messages';
import dmuserReducer from './dm_people';
import directMessageReducer from './direct_messages';

const rootReducer = combineReducers({
	session,
	channels: channelReducer,
	channelMessages: channelMessageReducer,
	directMessages: directMessageReducer,
	dm_users: dmuserReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = require('redux-logger').default;
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = preloadedState => {
	return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

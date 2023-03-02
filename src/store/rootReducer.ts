import {
  AnyAction,
  CombinedState,
  combineReducers,
  Reducer,
} from '@reduxjs/toolkit';
import userMappingReducer from './userMappingSlice';
import notifClickReducer from './notifClickSlice';
import firebaseTokensReducer from './firebaseTokensSlice';
import userInfoReducer from './userInfoSlice';
import creationReducer from './creationSlice';

const appReducer = combineReducers({
  userMapping: userMappingReducer,
  notifClick: notifClickReducer,
  firebaseTokens: firebaseTokensReducer,
  userInfo: userInfoReducer,
  creation: creationReducer,
});

export type AppState = CombinedState<{
  userMapping: ReturnType<typeof userMappingReducer>;
  notifClick: ReturnType<typeof notifClickReducer>;
  firebaseTokens: ReturnType<typeof firebaseTokensReducer>;
  userInfo: ReturnType<typeof userInfoReducer>;
  creation: ReturnType<typeof creationReducer>;
}>;

const rootReducer: Reducer = (state: AppState, action: AnyAction) => {
  return appReducer(state, action);
};

export default rootReducer;

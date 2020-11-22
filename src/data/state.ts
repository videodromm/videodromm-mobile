import { combineReducers } from './combineReducers';
import { sessionsReducer } from './sessions/sessions.reducer';
import { userReducer } from './user/user.reducer';

export const initialState: AppState = {
  data: {
    glsl: { groups: [] } as any,
    sessions: [],
    uniforms: [],
    favorites: [],
    locations: [],
    allTracks: [],
    filteredTracks: [],
    mapCenterId: 0,
    loading: false,
    menuEnabled: true
  },
  user: {
    hasSeenTutorial: true,
    darkMode: true,
    isLoggedin: false,
    loading: false
  }
};

export const reducers = combineReducers({
  data: sessionsReducer,
  user: userReducer
});

export type AppState = ReturnType<typeof reducers>;

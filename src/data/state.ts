import { combineReducers } from './combineReducers';
import { shadersReducer } from './shaders/shaders.reducer';
import { userReducer } from './user/user.reducer';

export const initialState: AppState = {
  data: {
    glsl: { groups: [] } as any,
    shaders: [],
    uniforms: [],
    favorites: [],
    locations: [],
    allTags: [],
    filteredTags: [],
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
  data: shadersReducer,
  user: userReducer
});

export type AppState = ReturnType<typeof reducers>;

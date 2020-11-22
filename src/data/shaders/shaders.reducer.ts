import { ShadersActions } from './shaders.actions';
import { GlslState } from './glsl.state';

export const shadersReducer = (state: GlslState, action: ShadersActions): GlslState => {
  switch (action.type) {
    case 'set-glsl-loading': {
      return { ...state, loading: action.isLoading };
    }
    case 'set-glsl-data': {
      return { ...state, ...action.data };
    }
    case 'add-favorite': {
      return { ...state, favorites: [...(state.favorites), action.shaderId] };
    }
    case 'remove-favorite': {
      return { ...state, favorites: [...(state.favorites).filter(x => x !== action.shaderId)] };
    }
    case 'update-filtered-tracks': {
      return { ...state, filteredTracks: action.filteredTracks };
    }
    case 'set-search-text': {
      return { ...state, searchText: action.searchText };
    }
    case 'set-menu-enabled': {
      return { ...state, menuEnabled: action.menuEnabled };
    }
  }
}

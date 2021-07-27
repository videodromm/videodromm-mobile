import { ShadersActions } from './shaders.actions';
import { GlslState } from './glsl.state';
import { sendUniform } from '../dataApi';

export const shadersReducer = (state: GlslState, action: ShadersActions): GlslState => {
  switch (action.type) {
    case 'set-glsl-loading': {
      return { ...state, loading: action.isLoading };
    }
    case 'set-glsl-data': {
      return { ...state, ...action.data };
    }
    case 'update-uniform': {
      sendUniform(action.uniform);
      return { ...state, uniforms: state.uniforms.map(u => u === action.uniform ?
        {...u, value:action.uniform.value} : u
       ) };
    }
    case 'change-uniform': {
      return { ...state, uniforms: state.uniforms.map(u => u === action.uniform ?
        {...u, value:action.uniform.value} : u
       ) };
    }
    case 'add-favorite': {
      return { ...state, favorites: [...(state.favorites), action.shaderId] };
    }
    case 'remove-favorite': {
      return { ...state, favorites: [...(state.favorites).filter(x => x !== action.shaderId)] };
    }
    case 'update-filtered-tags': {
      return { ...state, filteredTags: action.filteredTags };
    }
    case 'set-search-text': {
      return { ...state, searchText: action.searchText };
    }
    case 'set-menu-enabled': {
      return { ...state, menuEnabled: action.menuEnabled };
    }
  }
}

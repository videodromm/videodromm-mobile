import { createSelector } from 'reselect';
import { Glsl, Shader, GlslGroup } from '../models/Glsl';
import { AppState } from './state';

const getGlsl = (state: AppState) => {

  return state.data.glsl
};
export const getUniforms = (state: AppState) => state.data.uniforms;
const getShaders = (state: AppState) => state.data.shaders;
const getFilteredTracks = (state: AppState) => state.data.filteredTracks;
const getFavoriteIds = (state: AppState) => state.data.favorites;
const getSearchText = (state: AppState) => state.data.searchText;

export const getFilteredGlsl = createSelector(
  getGlsl, getFilteredTracks,
  (glsl, filteredTracks) => {
    const groups: GlslGroup[] = [];
    glsl.groups.forEach(group => {
      const shaders: Shader[] = [];
      group.shaders.forEach(shader => {
        shader.tracks.forEach(track => {
          if (filteredTracks.indexOf(track) > -1) {
            shaders.push(shader);
          }
        })
      })
      if (shaders.length) {
        const groupToAdd: GlslGroup = {
          time: group.time,
          shaders
        }
        groups.push(groupToAdd);
      }
    });

    return {
      date: glsl.date,
      groups
    } as Glsl;
  }
);

export const getSearchedGlsl = createSelector(
  getFilteredGlsl, getSearchText,
  (glsl, searchText) => {
    if (!searchText) {
      return glsl;
    }
    const groups: GlslGroup[] = [];
    glsl.groups.forEach(group => {

      const shaders = group.shaders.filter(s => s.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
      if (shaders.length) {
        const groupToAdd: GlslGroup = {
          time: group.time,
          shaders
        }
        groups.push(groupToAdd);
      }
    });
    return {
      date: glsl.date,
      groups
    } as Glsl;
  }
)

export const getGlslList = createSelector(
  getSearchedGlsl,
  (glsl) => glsl
);

export const getGroupedFavorites = createSelector(
  getGlslList, getFavoriteIds,
  (glsl, favoriteIds) => {
    const groups: GlslGroup[] = [];
    glsl.groups.forEach(group => {
      const shaders = group.shaders.filter(s => favoriteIds.indexOf(s.id) > -1)
      if (shaders.length) {
        const groupToAdd: GlslGroup = {
          time: group.time,
          shaders
        }
        groups.push(groupToAdd);
      }
    });
    return {
      date: glsl.date,
      groups
    } as Glsl;
  }
);


const getIdParam = (_state: AppState, props: any) => {
  return props.match.params['id'];
}

export const getShader = createSelector(
  getShaders, getIdParam,
  (shaders, id) => {
    return shaders.find(s => s.id === id);
  }
);

export const getUniform = createSelector(
  getUniforms, getIdParam,
  (uniforms, id) => uniforms.find(x => x.id === id)
);

export const getUniformShaders = createSelector(
  getShaders,
  (shaders) => {
    const uniformShaders: { [key: string]: Shader[] } = {};

    shaders.forEach(shader => {
      shader.uniformNames && shader.uniformNames.forEach(name => {
        if (uniformShaders[name]) {
          uniformShaders[name].push(shader);
        } else {
          uniformShaders[name] = [shader];
        }
      })
    });
    return uniformShaders;
  }
);

export const mapCenter = (state: AppState) => {
  const item = state.data.locations.find(l => l.id === state.data.mapCenterId);
  if (item == null) {
    return {
      id: 1,
      name: 'Map Center',
      lat: 43.071584,
      lng: -89.380120
    };
  }
  return item;
}

import { createSelector } from 'reselect';
import { Glsl, Shader, GlslGroup } from '../models/Glsl';
import { AppState } from './state';

const getGlsl = (state: AppState) => {

  return state.data.glsl
};
export const getUniforms = (state: AppState) => state.data.uniforms;
const getShaders = (state: AppState) => state.data.shaders;
const getFilteredTags = (state: AppState) => state.data.filteredTags;
const getFavoriteIds = (state: AppState) => state.data.favorites;
const getSearchText = (state: AppState) => state.data.searchText;

export const getFilteredGlsl = createSelector(
  getGlsl, getFilteredTags,
  (glsl, filteredTags) => {
    const groups: GlslGroup[] = [];
    glsl.groups.forEach(group => {
      const shaders: Shader[] = [];
      group.shaders.forEach(shader => {
        shader.tags.forEach(tag => {
          if (filteredTags.indexOf(tag) > -1) {
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
export const getProjectionShader = createSelector(
  getShaders,
  (shaders) => {
    //console.log(`${JSON.stringify(shaders)}`);
    return shaders.find(s => s.id === 0);
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

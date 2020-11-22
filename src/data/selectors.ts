import { createSelector } from 'reselect';
import { Glsl, Session, GlslGroup } from '../models/Glsl';
import { AppState } from './state';

const getGlsl = (state: AppState) => {

  return state.data.glsl
};
export const getUniforms = (state: AppState) => state.data.uniforms;
const getSessions = (state: AppState) => state.data.sessions;
const getFilteredTracks = (state: AppState) => state.data.filteredTracks;
const getFavoriteIds = (state: AppState) => state.data.favorites;
const getSearchText = (state: AppState) => state.data.searchText;

export const getFilteredGlsl = createSelector(
  getGlsl, getFilteredTracks,
  (glsl, filteredTracks) => {
    const groups: GlslGroup[] = [];
    glsl.groups.forEach(group => {
      const sessions: Session[] = [];
      group.sessions.forEach(session => {
        session.tracks.forEach(track => {
          if (filteredTracks.indexOf(track) > -1) {
            sessions.push(session);
          }
        })
      })
      if (sessions.length) {
        const groupToAdd: GlslGroup = {
          time: group.time,
          sessions
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

      const sessions = group.sessions.filter(s => s.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
      if (sessions.length) {
        const groupToAdd: GlslGroup = {
          time: group.time,
          sessions
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
      const sessions = group.sessions.filter(s => favoriteIds.indexOf(s.id) > -1)
      if (sessions.length) {
        const groupToAdd: GlslGroup = {
          time: group.time,
          sessions
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

export const getSession = createSelector(
  getSessions, getIdParam,
  (sessions, id) => {
    return sessions.find(s => s.id === id);
  }
);

export const getUniform = createSelector(
  getUniforms, getIdParam,
  (uniforms, id) => uniforms.find(x => x.id === id)
);

export const getUniformSessions = createSelector(
  getSessions,
  (sessions) => {
    const uniformSessions: { [key: string]: Session[] } = {};

    sessions.forEach(session => {
      session.uniformNames && session.uniformNames.forEach(name => {
        if (uniformSessions[name]) {
          uniformSessions[name].push(session);
        } else {
          uniformSessions[name] = [session];
        }
      })
    });
    return uniformSessions;
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

import { getGlslData } from '../dataApi';
import { ActionType } from '../../util/types';
import { GlslState } from './glsl.state';

export const loadGlslData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const data = await getGlslData();
  dispatch(setData(data));
  dispatch(setLoading(false));
}

export const setLoading = (isLoading: boolean) => ({
  type: 'set-glsl-loading',
  isLoading
} as const);

export const setData = (data: Partial<GlslState>) => ({
  type: 'set-glsl-data',
  data
} as const);

export const addFavorite = (shaderId: number) => ({
  type: 'add-favorite',
  shaderId
} as const);

export const removeFavorite = (shaderId: number) => ({
  type: 'remove-favorite',
  shaderId
} as const);

export const updateFilteredTracks = (filteredTracks: string[]) => ({
  type: 'update-filtered-tracks',
  filteredTracks
} as const);

export const setSearchText = (searchText?: string) => ({
  type: 'set-search-text',
  searchText
} as const);

export const setMenuEnabled = (menuEnabled: boolean) => ({
  type: 'set-menu-enabled',
  menuEnabled
} as const);

export type ShadersActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setData>
  | ActionType<typeof addFavorite>
  | ActionType<typeof removeFavorite>
  | ActionType<typeof updateFilteredTracks>
  | ActionType<typeof setSearchText>
  | ActionType<typeof setMenuEnabled>

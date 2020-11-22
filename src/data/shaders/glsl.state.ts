import { Location } from '../../models/Location';
import { Uniform } from '../../models/Uniform';
import { Glsl, Shader } from '../../models/Glsl';
export interface GlslState {
  glsl: Glsl;
  shaders: Shader[];
  uniforms: Uniform[];
  favorites: number[];
  locations: Location[];
  filteredTracks: string[];
  searchText?: string;
  mapCenterId?: number;
  loading?: boolean;
  allTracks: string[];
  menuEnabled: boolean;
}

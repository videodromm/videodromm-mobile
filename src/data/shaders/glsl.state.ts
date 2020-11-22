import { Location } from '../../models/Location';
import { Uniform } from '../../models/Uniform';
import { Glsl, Shader } from '../../models/Glsl';
export interface GlslState {
  glsl: Glsl;
  shaders: Shader[];
  uniforms: Uniform[];
  favorites: number[];
  locations: Location[];
  filteredTags: string[];
  searchText?: string;
  mapCenterId?: number;
  loading?: boolean;
  allTags: string[];
  menuEnabled: boolean;
}

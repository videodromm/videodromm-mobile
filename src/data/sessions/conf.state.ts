import { Location } from '../../models/Location';
import { Uniform } from '../../models/Uniform';
import { Glsl, Session } from '../../models/Glsl';
export interface ConfState {
  glsl: Glsl;
  sessions: Session[];
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

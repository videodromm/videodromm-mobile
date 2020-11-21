import { Location } from '../../models/Location';
import { Uniform } from '../../models/Uniform';
import { Schedule, Session } from '../../models/Schedule';
export interface ConfState {
  schedule: Schedule;
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

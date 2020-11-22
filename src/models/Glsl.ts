export interface Glsl {
  date: string;
  groups: GlslGroup[]
}

export interface GlslGroup {
  time: string;
  sessions: Session[];
}

export interface Session {
  id: number;
  timeStart: string;
  timeEnd: string;
  name: string;
  location: string;
  description: string;
  uniformNames: string[];
  tracks: string[];
}

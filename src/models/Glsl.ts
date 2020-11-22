export interface Glsl {
  date: string;
  groups: GlslGroup[]
}

export interface GlslGroup {
  time: string;
  shaders: Shader[];
}

export interface Shader {
  id: number;
  thumbnail: string;
  timeStart: string;
  timeEnd: string;
  name: string;
  location: string;
  description: string;
  uniformNames: string[];
  tags: string[];
}

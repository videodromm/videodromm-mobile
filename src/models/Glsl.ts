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
  name: string;
  author: string;
  description: string;
  uniformNames: string[];
  tags: string[];
}

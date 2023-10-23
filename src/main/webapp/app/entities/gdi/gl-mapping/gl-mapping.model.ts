export interface IGlMapping {
  id: number;
  subGLCode?: string | null;
  subGLDescription?: string | null;
  mainGLCode?: string | null;
  mainGLDescription?: string | null;
  glType?: string | null;
}

export type NewGlMapping = Omit<IGlMapping, 'id'> & { id: null };

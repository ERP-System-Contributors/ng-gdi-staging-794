export interface ICrbGlCode {
  id: number;
  glCode?: string | null;
  glDescription?: string | null;
  glType?: string | null;
  institutionCategory?: string | null;
}

export type NewCrbGlCode = Omit<ICrbGlCode, 'id'> & { id: null };

export interface IProfessionalQualification {
  id: number;
  professionalQualificationsCode?: string | null;
  professionalQualificationsType?: string | null;
  professionalQualificationsDetails?: string | null;
}

export type NewProfessionalQualification = Omit<IProfessionalQualification, 'id'> & { id: null };

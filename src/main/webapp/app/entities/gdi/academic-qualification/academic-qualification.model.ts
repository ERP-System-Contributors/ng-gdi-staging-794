export interface IAcademicQualification {
  id: number;
  academicQualificationsCode?: string | null;
  academicQualificationType?: string | null;
  academicQualificationTypeDetail?: string | null;
}

export type NewAcademicQualification = Omit<IAcademicQualification, 'id'> & { id: null };

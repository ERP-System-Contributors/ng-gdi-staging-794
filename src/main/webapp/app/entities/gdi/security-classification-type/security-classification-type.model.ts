export interface ISecurityClassificationType {
  id: number;
  securityClassificationTypeCode?: string | null;
  securityClassificationType?: string | null;
  securityClassificationDetails?: string | null;
}

export type NewSecurityClassificationType = Omit<ISecurityClassificationType, 'id'> & { id: null };

import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';

export interface IDepartmentType {
  id: number;
  departmentTypeCode?: string | null;
  departmentType?: string | null;
  departmentTypeDetails?: string | null;
  placeholders?: Pick<IPlaceholder, 'id'>[] | null;
}

export type NewDepartmentType = Omit<IDepartmentType, 'id'> & { id: null };

import { FlagCodes } from 'app/entities/enumerations/flag-codes.model';

export interface IFraudCategoryFlag {
  id: number;
  fraudCategoryFlag?: FlagCodes | null;
  fraudCategoryTypeDetails?: string | null;
}

export type NewFraudCategoryFlag = Omit<IFraudCategoryFlag, 'id'> & { id: null };

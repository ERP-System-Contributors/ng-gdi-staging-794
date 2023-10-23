import { FlagCodes } from 'app/entities/enumerations/flag-codes.model';

export interface ILoanRestructureFlag {
  id: number;
  loanRestructureFlagCode?: FlagCodes | null;
  loanRestructureFlagType?: string | null;
  loanRestructureFlagDetails?: string | null;
}

export type NewLoanRestructureFlag = Omit<ILoanRestructureFlag, 'id'> & { id: null };

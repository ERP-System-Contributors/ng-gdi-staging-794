import { FlagCodes } from 'app/entities/enumerations/flag-codes.model';

export interface ICardStatusFlag {
  id: number;
  cardStatusFlag?: FlagCodes | null;
  cardStatusFlagDescription?: string | null;
  cardStatusFlagDetails?: string | null;
}

export type NewCardStatusFlag = Omit<ICardStatusFlag, 'id'> & { id: null };

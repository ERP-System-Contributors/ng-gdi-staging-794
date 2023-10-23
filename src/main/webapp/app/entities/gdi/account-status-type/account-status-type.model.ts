import { AccountStatusTypes } from 'app/entities/enumerations/account-status-types.model';

export interface IAccountStatusType {
  id: number;
  accountStatusCode?: string | null;
  accountStatusType?: AccountStatusTypes | null;
  accountStatusDescription?: string | null;
}

export type NewAccountStatusType = Omit<IAccountStatusType, 'id'> & { id: null };

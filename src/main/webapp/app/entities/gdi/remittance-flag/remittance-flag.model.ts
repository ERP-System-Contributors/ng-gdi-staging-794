import { RemittanceTypeFlag } from 'app/entities/enumerations/remittance-type-flag.model';
import { RemittanceType } from 'app/entities/enumerations/remittance-type.model';

export interface IRemittanceFlag {
  id: number;
  remittanceTypeFlag?: RemittanceTypeFlag | null;
  remittanceType?: RemittanceType | null;
  remittanceTypeDetails?: string | null;
}

export type NewRemittanceFlag = Omit<IRemittanceFlag, 'id'> & { id: null };

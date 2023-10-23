import dayjs from 'dayjs/esm';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { IBankBranchCode } from 'app/entities/gdi/bank-branch-code/bank-branch-code.model';
import { ICountySubCountyCode } from 'app/entities/gdi-data/county-sub-county-code/county-sub-county-code.model';
import { IKenyanCurrencyDenomination } from 'app/entities/gdi/kenyan-currency-denomination/kenyan-currency-denomination.model';

export interface IWeeklyCashHolding {
  id: number;
  reportingDate?: dayjs.Dayjs | null;
  fitUnits?: number | null;
  unfitUnits?: number | null;
  bankCode?: Pick<IInstitutionCode, 'id' | 'institutionName'> | null;
  branchId?: Pick<IBankBranchCode, 'id' | 'branchCode'> | null;
  subCountyCode?: Pick<ICountySubCountyCode, 'id' | 'subCountyName'> | null;
  denomination?: Pick<IKenyanCurrencyDenomination, 'id' | 'currencyDenominationType'> | null;
}

export type NewWeeklyCashHolding = Omit<IWeeklyCashHolding, 'id'> & { id: null };

import dayjs from 'dayjs/esm';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { IIsoCountryCode } from 'app/entities/gdi/iso-country-code/iso-country-code.model';

export interface IPerformanceOfForeignSubsidiaries {
  id: number;
  subsidiaryName?: string | null;
  reportingDate?: dayjs.Dayjs | null;
  subsidiaryId?: string | null;
  grossLoansAmount?: number | null;
  grossNPALoanAmount?: number | null;
  grossAssetsAmount?: number | null;
  grossDepositsAmount?: number | null;
  profitBeforeTax?: number | null;
  totalCapitalAdequacyRatio?: number | null;
  liquidityRatio?: number | null;
  generalProvisions?: number | null;
  specificProvisions?: number | null;
  interestInSuspenseAmount?: number | null;
  totalNumberOfStaff?: number | null;
  numberOfBranches?: number | null;
  bankCode?: Pick<IInstitutionCode, 'id' | 'institutionName'> | null;
  subsidiaryCountryCode?: Pick<IIsoCountryCode, 'id' | 'countryDescription'> | null;
}

export type NewPerformanceOfForeignSubsidiaries = Omit<IPerformanceOfForeignSubsidiaries, 'id'> & { id: null };

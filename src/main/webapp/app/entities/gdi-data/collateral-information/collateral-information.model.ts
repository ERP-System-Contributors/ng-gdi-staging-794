import dayjs from 'dayjs/esm';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { IBankBranchCode } from 'app/entities/gdi/bank-branch-code/bank-branch-code.model';
import { ICollateralType } from 'app/entities/gdi/collateral-type/collateral-type.model';
import { ICountySubCountyCode } from 'app/entities/gdi-data/county-sub-county-code/county-sub-county-code.model';
import { CollateralInsuredFlagTypes } from 'app/entities/enumerations/collateral-insured-flag-types.model';

export interface ICollateralInformation {
  id: number;
  reportingDate?: dayjs.Dayjs | null;
  collateralId?: string | null;
  loanContractId?: string | null;
  customerId?: string | null;
  registrationPropertyNumber?: string | null;
  collateralOMVInCCY?: number | null;
  collateralFSVInLCY?: number | null;
  collateralDiscountedValue?: number | null;
  amountCharged?: number | null;
  collateralDiscountRate?: number | null;
  loanToValueRatio?: number | null;
  nameOfPropertyValuer?: string | null;
  collateralLastValuationDate?: dayjs.Dayjs | null;
  insuredFlag?: CollateralInsuredFlagTypes | null;
  nameOfInsurer?: string | null;
  amountInsured?: number | null;
  insuranceExpiryDate?: dayjs.Dayjs | null;
  guaranteeInsurers?: string | null;
  bankCode?: Pick<IInstitutionCode, 'id' | 'institutionName'> | null;
  branchCode?: Pick<IBankBranchCode, 'id' | 'branchCode'> | null;
  collateralType?: Pick<ICollateralType, 'id' | 'collateralType'> | null;
  countyCode?: Pick<ICountySubCountyCode, 'id' | 'subCountyName'> | null;
}

export type NewCollateralInformation = Omit<ICollateralInformation, 'id'> & { id: null };

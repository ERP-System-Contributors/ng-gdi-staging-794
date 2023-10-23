import dayjs from 'dayjs/esm';
import { ICountySubCountyCode } from 'app/entities/gdi-data/county-sub-county-code/county-sub-county-code.model';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { IBankBranchCode } from 'app/entities/gdi/bank-branch-code/bank-branch-code.model';
import { IOutletType } from 'app/entities/gdi/outlet-type/outlet-type.model';
import { IOutletStatus } from 'app/entities/gdi/outlet-status/outlet-status.model';

export interface IParticularsOfOutlet {
  id: number;
  businessReportingDate?: dayjs.Dayjs | null;
  outletName?: string | null;
  town?: string | null;
  iso6709Latitute?: number | null;
  iso6709Longitude?: number | null;
  cbkApprovalDate?: dayjs.Dayjs | null;
  outletOpeningDate?: dayjs.Dayjs | null;
  outletClosureDate?: dayjs.Dayjs | null;
  licenseFeePayable?: number | null;
  subCountyCode?: Pick<ICountySubCountyCode, 'id' | 'subCountyName'> | null;
  bankCode?: Pick<IInstitutionCode, 'id' | 'institutionName'> | null;
  outletId?: Pick<IBankBranchCode, 'id' | 'branchCode'> | null;
  typeOfOutlet?: Pick<IOutletType, 'id' | 'outletType'> | null;
  outletStatus?: Pick<IOutletStatus, 'id' | 'branchStatusType'> | null;
}

export type NewParticularsOfOutlet = Omit<IParticularsOfOutlet, 'id'> & { id: null };

import dayjs from 'dayjs/esm';
import { ITerminalTypes } from 'app/entities/gdi/terminal-types/terminal-types.model';
import { ITerminalFunctions } from 'app/entities/gdi/terminal-functions/terminal-functions.model';
import { ICountySubCountyCode } from 'app/entities/gdi-data/county-sub-county-code/county-sub-county-code.model';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { IBankBranchCode } from 'app/entities/gdi/bank-branch-code/bank-branch-code.model';

export interface ITerminalsAndPOS {
  id: number;
  reportingDate?: dayjs.Dayjs | null;
  terminalId?: string | null;
  merchantId?: string | null;
  terminalName?: string | null;
  terminalLocation?: string | null;
  iso6709Latitute?: number | null;
  iso6709Longitude?: number | null;
  terminalOpeningDate?: dayjs.Dayjs | null;
  terminalClosureDate?: dayjs.Dayjs | null;
  terminalType?: Pick<ITerminalTypes, 'id' | 'txnTerminalTypeCode'> | null;
  terminalFunctionality?: Pick<ITerminalFunctions, 'id' | 'terminalFunctionality'> | null;
  physicalLocation?: Pick<ICountySubCountyCode, 'id' | 'subCountyCode'> | null;
  bankId?: Pick<IInstitutionCode, 'id' | 'institutionName'> | null;
  branchId?: Pick<IBankBranchCode, 'id' | 'branchCode'> | null;
}

export type NewTerminalsAndPOS = Omit<ITerminalsAndPOS, 'id'> & { id: null };

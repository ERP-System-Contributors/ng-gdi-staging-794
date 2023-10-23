import dayjs from 'dayjs/esm';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { IBankBranchCode } from 'app/entities/gdi/bank-branch-code/bank-branch-code.model';
import { IPartyRelationType } from 'app/entities/gdi/party-relation-type/party-relation-type.model';

export interface IRelatedPartyRelationship {
  id: number;
  reportingDate?: dayjs.Dayjs | null;
  customerId?: string | null;
  relatedPartyId?: string | null;
  bankCode?: Pick<IInstitutionCode, 'id' | 'institutionName'> | null;
  branchId?: Pick<IBankBranchCode, 'id' | 'branchCode'> | null;
  relationshipType?: Pick<IPartyRelationType, 'id' | 'partyRelationType'> | null;
}

export type NewRelatedPartyRelationship = Omit<IRelatedPartyRelationship, 'id'> & { id: null };

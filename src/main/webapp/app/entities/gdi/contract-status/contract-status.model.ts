export interface IContractStatus {
  id: number;
  contractStatusCode?: string | null;
  contractStatusType?: string | null;
  contractStatusTypeDescription?: string | null;
}

export type NewContractStatus = Omit<IContractStatus, 'id'> & { id: null };

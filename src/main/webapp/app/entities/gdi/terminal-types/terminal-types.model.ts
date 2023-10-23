export interface ITerminalTypes {
  id: number;
  txnTerminalTypeCode?: string | null;
  txnChannelType?: string | null;
  txnChannelTypeDetails?: string | null;
}

export type NewTerminalTypes = Omit<ITerminalTypes, 'id'> & { id: null };

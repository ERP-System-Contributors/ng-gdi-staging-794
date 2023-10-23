import dayjs from 'dayjs/esm';

export interface ICardFraudInformation {
  id: number;
  reportingDate?: dayjs.Dayjs | null;
  totalNumberOfFraudIncidents?: number | null;
  valueOfFraudIncedentsInLCY?: number | null;
}

export type NewCardFraudInformation = Omit<ICardFraudInformation, 'id'> & { id: null };

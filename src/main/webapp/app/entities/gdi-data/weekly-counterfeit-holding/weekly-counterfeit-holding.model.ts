import dayjs from 'dayjs/esm';

export interface IWeeklyCounterfeitHolding {
  id: number;
  reportingDate?: dayjs.Dayjs | null;
  dateConfiscated?: dayjs.Dayjs | null;
  serialNumber?: string | null;
  depositorsNames?: string | null;
  tellersNames?: string | null;
  dateSubmittedToCBK?: dayjs.Dayjs | null;
  remarks?: string | null;
}

export type NewWeeklyCounterfeitHolding = Omit<IWeeklyCounterfeitHolding, 'id'> & { id: null };

import { CardPerformanceFlags } from 'app/entities/enumerations/card-performance-flags.model';

export interface ICardPerformanceFlag {
  id: number;
  cardPerformanceFlag?: CardPerformanceFlags | null;
  cardPerformanceFlagDescription?: string | null;
  cardPerformanceFlagDetails?: string | null;
}

export type NewCardPerformanceFlag = Omit<ICardPerformanceFlag, 'id'> & { id: null };

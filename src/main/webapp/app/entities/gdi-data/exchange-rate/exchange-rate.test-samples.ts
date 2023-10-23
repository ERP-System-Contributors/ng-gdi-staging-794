import dayjs from 'dayjs/esm';

import { IExchangeRate, NewExchangeRate } from './exchange-rate.model';

export const sampleWithRequiredData: IExchangeRate = {
  id: 35336,
  businessReportingDay: dayjs('2023-10-03'),
  buyingRate: 21461,
  sellingRate: 18833,
  meanRate: 57919,
  closingBidRate: 21782,
  closingOfferRate: 2769,
  usdCrossRate: 18304,
};

export const sampleWithPartialData: IExchangeRate = {
  id: 33463,
  businessReportingDay: dayjs('2023-10-03'),
  buyingRate: 77890,
  sellingRate: 6611,
  meanRate: 26606,
  closingBidRate: 45079,
  closingOfferRate: 12638,
  usdCrossRate: 89366,
};

export const sampleWithFullData: IExchangeRate = {
  id: 71710,
  businessReportingDay: dayjs('2023-10-03'),
  buyingRate: 94054,
  sellingRate: 59843,
  meanRate: 39764,
  closingBidRate: 33287,
  closingOfferRate: 58877,
  usdCrossRate: 6444,
};

export const sampleWithNewData: NewExchangeRate = {
  businessReportingDay: dayjs('2023-10-03'),
  buyingRate: 56069,
  sellingRate: 1753,
  meanRate: 86790,
  closingBidRate: 11878,
  closingOfferRate: 55969,
  usdCrossRate: 10369,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

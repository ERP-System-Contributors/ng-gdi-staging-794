import { ICrbReportRequestReasons, NewCrbReportRequestReasons } from './crb-report-request-reasons.model';

export const sampleWithRequiredData: ICrbReportRequestReasons = {
  id: 38346,
  creditReportRequestReasonTypeCode: 'Grocery',
  creditReportRequestReasonType: 'driver Rubber Delaware',
};

export const sampleWithPartialData: ICrbReportRequestReasons = {
  id: 77887,
  creditReportRequestReasonTypeCode: 'responsive calculating Analyst',
  creditReportRequestReasonType: 'connect salmon back-end',
};

export const sampleWithFullData: ICrbReportRequestReasons = {
  id: 59430,
  creditReportRequestReasonTypeCode: 'index parse Rubber',
  creditReportRequestReasonType: 'mesh open-source Fundamental',
  creditReportRequestDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCrbReportRequestReasons = {
  creditReportRequestReasonTypeCode: '1080p Gorgeous Prairie',
  creditReportRequestReasonType: 'Car',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

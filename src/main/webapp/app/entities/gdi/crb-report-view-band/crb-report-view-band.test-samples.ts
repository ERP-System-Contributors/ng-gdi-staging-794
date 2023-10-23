import { ICrbReportViewBand, NewCrbReportViewBand } from './crb-report-view-band.model';

export const sampleWithRequiredData: ICrbReportViewBand = {
  id: 84229,
  reportViewCode: 'PCI SMS',
  reportViewCategory: 'Towels Czech cultivate',
};

export const sampleWithPartialData: ICrbReportViewBand = {
  id: 50961,
  reportViewCode: 'paradigm',
  reportViewCategory: 'Buckinghamshire',
  reportViewCategoryDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICrbReportViewBand = {
  id: 78076,
  reportViewCode: 'Credit HDD',
  reportViewCategory: 'TCP COM',
  reportViewCategoryDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCrbReportViewBand = {
  reportViewCode: 'Interface Object-based feed',
  reportViewCategory: 'Orchestrator Sports Caribbean',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

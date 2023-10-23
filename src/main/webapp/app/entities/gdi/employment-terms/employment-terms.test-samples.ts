import { IEmploymentTerms, NewEmploymentTerms } from './employment-terms.model';

export const sampleWithRequiredData: IEmploymentTerms = {
  id: 8098,
  employmentTermsCode: 'Plastic Frozen Rubber',
  employmentTermsStatus: 'implementation',
};

export const sampleWithPartialData: IEmploymentTerms = {
  id: 85211,
  employmentTermsCode: 'challenge Burgs challenge',
  employmentTermsStatus: 'tan Fresh Massachusetts',
};

export const sampleWithFullData: IEmploymentTerms = {
  id: 90249,
  employmentTermsCode: 'mobile Berkshire wireless',
  employmentTermsStatus: 'Handcrafted',
};

export const sampleWithNewData: NewEmploymentTerms = {
  employmentTermsCode: 'CSS',
  employmentTermsStatus: 'quantify payment',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

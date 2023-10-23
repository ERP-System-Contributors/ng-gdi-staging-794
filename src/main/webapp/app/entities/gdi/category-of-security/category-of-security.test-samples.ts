import { ICategoryOfSecurity, NewCategoryOfSecurity } from './category-of-security.model';

export const sampleWithRequiredData: ICategoryOfSecurity = {
  id: 24002,
  categoryOfSecurity: 'Cambridgeshire Books override',
  categoryOfSecurityDetails: 'EXE green disintermediate',
};

export const sampleWithPartialData: ICategoryOfSecurity = {
  id: 80089,
  categoryOfSecurity: 'deposit USB multi-byte',
  categoryOfSecurityDetails: 'Tasty bleeding-edge virtual',
};

export const sampleWithFullData: ICategoryOfSecurity = {
  id: 77990,
  categoryOfSecurity: 'Toys Quetzal Table',
  categoryOfSecurityDetails: 'Shoes',
  categoryOfSecurityDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCategoryOfSecurity = {
  categoryOfSecurity: 'generating Mews',
  categoryOfSecurityDetails: 'payment',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

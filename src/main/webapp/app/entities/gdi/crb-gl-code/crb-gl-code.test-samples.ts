import { ICrbGlCode, NewCrbGlCode } from './crb-gl-code.model';

export const sampleWithRequiredData: ICrbGlCode = {
  id: 51009,
  glCode: 'Burkina',
  glDescription: 'moratorium Turnpike',
  glType: 'technologies',
  institutionCategory: 'Mouse grid-enabled fresh-thinking',
};

export const sampleWithPartialData: ICrbGlCode = {
  id: 19908,
  glCode: 'Kuwaiti base',
  glDescription: 'generation Tasty Granite',
  glType: 'deposit hacking',
  institutionCategory: 'Corporate',
};

export const sampleWithFullData: ICrbGlCode = {
  id: 98413,
  glCode: 'Car parse XML',
  glDescription: 'Buckinghamshire Handmade',
  glType: 'purple',
  institutionCategory: 'Louisiana world-class',
};

export const sampleWithNewData: NewCrbGlCode = {
  glCode: 'deposit Savings Borders',
  glDescription: 'deposit e-markets Tools',
  glType: 'Points Towels Forest',
  institutionCategory: 'impactful',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

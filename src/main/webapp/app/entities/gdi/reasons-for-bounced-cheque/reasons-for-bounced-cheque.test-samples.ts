import { IReasonsForBouncedCheque, NewReasonsForBouncedCheque } from './reasons-for-bounced-cheque.model';

export const sampleWithRequiredData: IReasonsForBouncedCheque = {
  id: 33442,
  bouncedChequeReasonsTypeCode: 'state mint',
};

export const sampleWithPartialData: IReasonsForBouncedCheque = {
  id: 41331,
  bouncedChequeReasonsTypeCode: 'wireless AGP',
};

export const sampleWithFullData: IReasonsForBouncedCheque = {
  id: 38971,
  bouncedChequeReasonsTypeCode: 'maximize Small',
  bouncedChequeReasonsType: 'Baby Berkshire',
};

export const sampleWithNewData: NewReasonsForBouncedCheque = {
  bouncedChequeReasonsTypeCode: 'quantify',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

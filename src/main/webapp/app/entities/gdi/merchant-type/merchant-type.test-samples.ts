import { IMerchantType, NewMerchantType } from './merchant-type.model';

export const sampleWithRequiredData: IMerchantType = {
  id: 1045,
  merchantTypeCode: 'Networked',
  merchantType: 'firewall Wooden Hat',
};

export const sampleWithPartialData: IMerchantType = {
  id: 75208,
  merchantTypeCode: 'turquoise networks',
  merchantType: '(Keeling)',
};

export const sampleWithFullData: IMerchantType = {
  id: 68058,
  merchantTypeCode: 'Metal Cambodia Concrete',
  merchantType: 'seamless context-sensitive Supervisor',
  merchantTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewMerchantType = {
  merchantTypeCode: 'Designer',
  merchantType: 'withdrawal Corporate Mobility',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

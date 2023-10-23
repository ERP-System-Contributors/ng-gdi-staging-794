import { IChannelType, NewChannelType } from './channel-type.model';

export const sampleWithRequiredData: IChannelType = {
  id: 80706,
  channelsTypeCode: 'Loan mesh',
  channelTypes: 'Niger',
};

export const sampleWithPartialData: IChannelType = {
  id: 74421,
  channelsTypeCode: 'Executive',
  channelTypes: 'mint Dinar',
  channelTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IChannelType = {
  id: 14958,
  channelsTypeCode: 'Virginia',
  channelTypes: 'Salad ubiquitous',
  channelTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewChannelType = {
  channelsTypeCode: 'Lithuanian Refined communities',
  channelTypes: 'Gloves SSL Sleek',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

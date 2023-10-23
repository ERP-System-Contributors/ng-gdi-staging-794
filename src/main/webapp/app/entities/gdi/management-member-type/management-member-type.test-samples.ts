import { IManagementMemberType, NewManagementMemberType } from './management-member-type.model';

export const sampleWithRequiredData: IManagementMemberType = {
  id: 47354,
  managementMemberTypeCode: 'Generic',
  managementMemberType: 'Home hacking',
};

export const sampleWithPartialData: IManagementMemberType = {
  id: 43109,
  managementMemberTypeCode: 'technologies integrate',
  managementMemberType: 'cultivate Buckinghamshire',
};

export const sampleWithFullData: IManagementMemberType = {
  id: 94267,
  managementMemberTypeCode: 'Indiana Pizza',
  managementMemberType: 'Mandatory',
};

export const sampleWithNewData: NewManagementMemberType = {
  managementMemberTypeCode: 'Specialist',
  managementMemberType: 'Pennsylvania 1080p reboot',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

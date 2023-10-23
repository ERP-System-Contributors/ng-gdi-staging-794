///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { IInstitutionContactDetails, NewInstitutionContactDetails } from './institution-contact-details.model';

export const sampleWithRequiredData: IInstitutionContactDetails = {
  id: 75691,
  entityId: 'Home copying relationships',
  entityName: 'Producer Vermont 24/7',
  contactType: 'synergies',
};

export const sampleWithPartialData: IInstitutionContactDetails = {
  id: 32496,
  entityId: 'Internal',
  entityName: 'Pass',
  contactType: 'Synchronised',
  contactLevel: 'Strategist bypassing',
  contactName: 'transition',
  contactDesignation: 'CSS Bedfordshire Small',
};

export const sampleWithFullData: IInstitutionContactDetails = {
  id: 10694,
  entityId: 'withdrawal bypass Federation',
  entityName: 'lavender',
  contactType: 'redefine deposit',
  contactLevel: 'maximize support synthesize',
  contactValue: 'world-class THX Metal',
  contactName: 'compressing redundant',
  contactDesignation: 'withdrawal',
};

export const sampleWithNewData: NewInstitutionContactDetails = {
  entityId: 'Burgs Wooden',
  entityName: 'compressing Anguilla Account',
  contactType: 'Generic',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

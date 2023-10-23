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

import { IIsicEconomicActivity, NewIsicEconomicActivity } from './isic-economic-activity.model';

export const sampleWithRequiredData: IIsicEconomicActivity = {
  id: 80385,
  businessEconomicActivityCode: 'indigo deliver Open-source',
  section: 'eyeballs Tools protocol',
  sectionLabel: 'motivating Specialist',
  division: 'Ball',
  divisionLabel: 'Small Developer',
  groupLabel: 'Table Technician',
  classCode: 'Producer',
};

export const sampleWithPartialData: IIsicEconomicActivity = {
  id: 77881,
  businessEconomicActivityCode: 'Berkshire',
  section: 'auxiliary Sausages Horizontal',
  sectionLabel: 'orange',
  division: 'Cotton Engineer South',
  divisionLabel: 'Cotton',
  groupLabel: 'Shoes',
  classCode: 'salmon',
  businessEconomicActivityType: 'XSS redundant Incredible',
};

export const sampleWithFullData: IIsicEconomicActivity = {
  id: 77995,
  businessEconomicActivityCode: 'state wireless',
  section: 'seamless',
  sectionLabel: 'Cheese Island Grocery',
  division: 'PCI',
  divisionLabel: 'Analyst',
  groupCode: 'Villages monitor',
  groupLabel: 'mindshare knowledge optical',
  classCode: 'systems Investor Wooden',
  businessEconomicActivityType: 'New',
  businessEconomicActivityTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewIsicEconomicActivity = {
  businessEconomicActivityCode: 'Metal web-readiness',
  section: 'embrace Sleek',
  sectionLabel: 'Bacon',
  division: 'Jewelery Circle',
  divisionLabel: 'Canyon United Pizza',
  groupLabel: 'circuit web-readiness context-sensitive',
  classCode: 'Chair',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

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

import { ICardClassType, NewCardClassType } from './card-class-type.model';

export const sampleWithRequiredData: ICardClassType = {
  id: 37539,
  cardClassTypeCode: 'back-end',
  cardClassType: 'Chicken engage FTP',
};

export const sampleWithPartialData: ICardClassType = {
  id: 47634,
  cardClassTypeCode: 'Caribbean Team-oriented Rubber',
  cardClassType: 'methodologies Intelligent Specialist',
  cardClassDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICardClassType = {
  id: 72636,
  cardClassTypeCode: 'circuit',
  cardClassType: 'withdrawal Corporate embrace',
  cardClassDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCardClassType = {
  cardClassTypeCode: 'Outdoors',
  cardClassType: 'virtual deposit',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

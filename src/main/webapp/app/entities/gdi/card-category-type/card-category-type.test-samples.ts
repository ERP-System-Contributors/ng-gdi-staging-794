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

import { CardCategoryFlag } from 'app/entities/enumerations/card-category-flag.model';

import { ICardCategoryType, NewCardCategoryType } from './card-category-type.model';

export const sampleWithRequiredData: ICardCategoryType = {
  id: 2362,
  cardCategoryFlag: CardCategoryFlag['I'],
  cardCategoryDescription: 'indexing Skyway Lira',
};

export const sampleWithPartialData: ICardCategoryType = {
  id: 44431,
  cardCategoryFlag: CardCategoryFlag['L'],
  cardCategoryDescription: 'bypass',
  cardCategoryDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICardCategoryType = {
  id: 59954,
  cardCategoryFlag: CardCategoryFlag['L'],
  cardCategoryDescription: 'back-end',
  cardCategoryDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCardCategoryType = {
  cardCategoryFlag: CardCategoryFlag['I'],
  cardCategoryDescription: 'Lek Planner',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

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

import { UpdateFrequencyTypes } from 'app/entities/enumerations/update-frequency-types.model';
import { DatasetBehaviorTypes } from 'app/entities/enumerations/dataset-behavior-types.model';

import { IGdiTransactionDataIndex, NewGdiTransactionDataIndex } from './gdi-transaction-data-index.model';

export const sampleWithRequiredData: IGdiTransactionDataIndex = {
  id: 88750,
  datasetName: 'state quantify Future-proofed',
  databaseName: 'SMTP SDD capacitor',
  updateFrequency: UpdateFrequencyTypes['MONTHLY'],
  datasetBehavior: DatasetBehaviorTypes['INSERT_AND_UPDATE'],
};

export const sampleWithPartialData: IGdiTransactionDataIndex = {
  id: 73694,
  datasetName: 'hack teal',
  databaseName: 'withdrawal Practical',
  updateFrequency: UpdateFrequencyTypes['QUARTERLY'],
  datasetBehavior: DatasetBehaviorTypes['INSERT'],
  minimumDatarowsPerRequest: 93285,
};

export const sampleWithFullData: IGdiTransactionDataIndex = {
  id: 94476,
  datasetName: 'payment microchip',
  databaseName: 'Operative methodology',
  updateFrequency: UpdateFrequencyTypes['SEMI_ANNUAL'],
  datasetBehavior: DatasetBehaviorTypes['INSERT_AND_UPDATE'],
  minimumDatarowsPerRequest: 61419,
  maximumDataRowsPerRequest: 25737,
  datasetDescription: '../fake-data/blob/hipster.txt',
  dataTemplate: '../fake-data/blob/hipster.png',
  dataTemplateContentType: 'unknown',
};

export const sampleWithNewData: NewGdiTransactionDataIndex = {
  datasetName: 'deploy',
  databaseName: 'Assistant',
  updateFrequency: UpdateFrequencyTypes['MONTHLY'],
  datasetBehavior: DatasetBehaviorTypes['INSERT'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

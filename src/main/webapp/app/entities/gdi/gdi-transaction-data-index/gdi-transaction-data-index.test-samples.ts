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

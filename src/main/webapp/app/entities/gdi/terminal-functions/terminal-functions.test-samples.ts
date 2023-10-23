import { ITerminalFunctions, NewTerminalFunctions } from './terminal-functions.model';

export const sampleWithRequiredData: ITerminalFunctions = {
  id: 66235,
  functionCode: 'benchmark Fresh Borders',
  terminalFunctionality: 'Sausages tan',
};

export const sampleWithPartialData: ITerminalFunctions = {
  id: 9279,
  functionCode: 'Account Coordinator Account',
  terminalFunctionality: 'Networked Liechtenstein bypassing',
};

export const sampleWithFullData: ITerminalFunctions = {
  id: 10727,
  functionCode: 'Intranet payment National',
  terminalFunctionality: 'pink',
};

export const sampleWithNewData: NewTerminalFunctions = {
  functionCode: 'Cotton harness Small',
  terminalFunctionality: 'Mauritius Soft Sausages',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

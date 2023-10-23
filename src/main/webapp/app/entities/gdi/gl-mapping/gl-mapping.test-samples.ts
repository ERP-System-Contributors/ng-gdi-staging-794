import { IGlMapping, NewGlMapping } from './gl-mapping.model';

export const sampleWithRequiredData: IGlMapping = {
  id: 5931,
  subGLCode: 'synergies Compatible',
  mainGLCode: 'New',
  glType: 'reboot',
};

export const sampleWithPartialData: IGlMapping = {
  id: 18478,
  subGLCode: 'exuding',
  subGLDescription: 'Orchestrator Massachusetts Dollar',
  mainGLCode: 'Virtual dynamic Sleek',
  glType: 'neutral Kentucky',
};

export const sampleWithFullData: IGlMapping = {
  id: 23361,
  subGLCode: 'cross-platform',
  subGLDescription: 'Future-proofed Iraq',
  mainGLCode: 'Rubber CSS',
  mainGLDescription: 'RSS navigate Gorgeous',
  glType: 'JBOD',
};

export const sampleWithNewData: NewGlMapping = {
  subGLCode: 'eyeballs',
  mainGLCode: 'magnetic e-business',
  glType: 'Mobility Shirt Avon',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

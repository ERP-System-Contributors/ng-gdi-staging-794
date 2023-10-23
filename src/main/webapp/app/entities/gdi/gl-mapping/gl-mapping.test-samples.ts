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

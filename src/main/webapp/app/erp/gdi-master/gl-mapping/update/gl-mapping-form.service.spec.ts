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

import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../gl-mapping.test-samples';

import { GlMappingFormService } from './gl-mapping-form.service';

describe('GlMapping Form Service', () => {
  let service: GlMappingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlMappingFormService);
  });

  describe('Service methods', () => {
    describe('createGlMappingFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createGlMappingFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            subGLCode: expect.any(Object),
            subGLDescription: expect.any(Object),
            mainGLCode: expect.any(Object),
            mainGLDescription: expect.any(Object),
            glType: expect.any(Object),
          })
        );
      });

      it('passing IGlMapping should create a new form with FormGroup', () => {
        const formGroup = service.createGlMappingFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            subGLCode: expect.any(Object),
            subGLDescription: expect.any(Object),
            mainGLCode: expect.any(Object),
            mainGLDescription: expect.any(Object),
            glType: expect.any(Object),
          })
        );
      });
    });

    describe('getGlMapping', () => {
      it('should return NewGlMapping for default GlMapping initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createGlMappingFormGroup(sampleWithNewData);

        const glMapping = service.getGlMapping(formGroup) as any;

        expect(glMapping).toMatchObject(sampleWithNewData);
      });

      it('should return NewGlMapping for empty GlMapping initial value', () => {
        const formGroup = service.createGlMappingFormGroup();

        const glMapping = service.getGlMapping(formGroup) as any;

        expect(glMapping).toMatchObject({});
      });

      it('should return IGlMapping', () => {
        const formGroup = service.createGlMappingFormGroup(sampleWithRequiredData);

        const glMapping = service.getGlMapping(formGroup) as any;

        expect(glMapping).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IGlMapping should not enable id FormControl', () => {
        const formGroup = service.createGlMappingFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewGlMapping should disable id FormControl', () => {
        const formGroup = service.createGlMappingFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

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

import { sampleWithRequiredData, sampleWithNewData } from '../crb-gl-code.test-samples';

import { CrbGlCodeFormService } from './crb-gl-code-form.service';

describe('CrbGlCode Form Service', () => {
  let service: CrbGlCodeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbGlCodeFormService);
  });

  describe('Service methods', () => {
    describe('createCrbGlCodeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbGlCodeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            glCode: expect.any(Object),
            glDescription: expect.any(Object),
            glType: expect.any(Object),
            institutionCategory: expect.any(Object),
          })
        );
      });

      it('passing ICrbGlCode should create a new form with FormGroup', () => {
        const formGroup = service.createCrbGlCodeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            glCode: expect.any(Object),
            glDescription: expect.any(Object),
            glType: expect.any(Object),
            institutionCategory: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbGlCode', () => {
      it('should return NewCrbGlCode for default CrbGlCode initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbGlCodeFormGroup(sampleWithNewData);

        const crbGlCode = service.getCrbGlCode(formGroup) as any;

        expect(crbGlCode).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbGlCode for empty CrbGlCode initial value', () => {
        const formGroup = service.createCrbGlCodeFormGroup();

        const crbGlCode = service.getCrbGlCode(formGroup) as any;

        expect(crbGlCode).toMatchObject({});
      });

      it('should return ICrbGlCode', () => {
        const formGroup = service.createCrbGlCodeFormGroup(sampleWithRequiredData);

        const crbGlCode = service.getCrbGlCode(formGroup) as any;

        expect(crbGlCode).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbGlCode should not enable id FormControl', () => {
        const formGroup = service.createCrbGlCodeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbGlCode should disable id FormControl', () => {
        const formGroup = service.createCrbGlCodeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

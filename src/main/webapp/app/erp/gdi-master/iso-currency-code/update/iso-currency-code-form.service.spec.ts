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

import { sampleWithRequiredData, sampleWithNewData } from '../iso-currency-code.test-samples';

import { IsoCurrencyCodeFormService } from './iso-currency-code-form.service';

describe('IsoCurrencyCode Form Service', () => {
  let service: IsoCurrencyCodeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsoCurrencyCodeFormService);
  });

  describe('Service methods', () => {
    describe('createIsoCurrencyCodeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createIsoCurrencyCodeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            alphabeticCode: expect.any(Object),
            numericCode: expect.any(Object),
            minorUnit: expect.any(Object),
            currency: expect.any(Object),
            country: expect.any(Object),
          })
        );
      });

      it('passing IIsoCurrencyCode should create a new form with FormGroup', () => {
        const formGroup = service.createIsoCurrencyCodeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            alphabeticCode: expect.any(Object),
            numericCode: expect.any(Object),
            minorUnit: expect.any(Object),
            currency: expect.any(Object),
            country: expect.any(Object),
          })
        );
      });
    });

    describe('getIsoCurrencyCode', () => {
      it('should return NewIsoCurrencyCode for default IsoCurrencyCode initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createIsoCurrencyCodeFormGroup(sampleWithNewData);

        const isoCurrencyCode = service.getIsoCurrencyCode(formGroup) as any;

        expect(isoCurrencyCode).toMatchObject(sampleWithNewData);
      });

      it('should return NewIsoCurrencyCode for empty IsoCurrencyCode initial value', () => {
        const formGroup = service.createIsoCurrencyCodeFormGroup();

        const isoCurrencyCode = service.getIsoCurrencyCode(formGroup) as any;

        expect(isoCurrencyCode).toMatchObject({});
      });

      it('should return IIsoCurrencyCode', () => {
        const formGroup = service.createIsoCurrencyCodeFormGroup(sampleWithRequiredData);

        const isoCurrencyCode = service.getIsoCurrencyCode(formGroup) as any;

        expect(isoCurrencyCode).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IIsoCurrencyCode should not enable id FormControl', () => {
        const formGroup = service.createIsoCurrencyCodeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewIsoCurrencyCode should disable id FormControl', () => {
        const formGroup = service.createIsoCurrencyCodeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

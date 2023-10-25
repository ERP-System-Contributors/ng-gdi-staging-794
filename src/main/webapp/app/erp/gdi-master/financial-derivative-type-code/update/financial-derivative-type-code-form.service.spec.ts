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

import { sampleWithRequiredData, sampleWithNewData } from '../financial-derivative-type-code.test-samples';

import { FinancialDerivativeTypeCodeFormService } from './financial-derivative-type-code-form.service';

describe('FinancialDerivativeTypeCode Form Service', () => {
  let service: FinancialDerivativeTypeCodeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialDerivativeTypeCodeFormService);
  });

  describe('Service methods', () => {
    describe('createFinancialDerivativeTypeCodeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFinancialDerivativeTypeCodeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            financialDerivativeTypeCode: expect.any(Object),
            financialDerivativeType: expect.any(Object),
            financialDerivativeTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing IFinancialDerivativeTypeCode should create a new form with FormGroup', () => {
        const formGroup = service.createFinancialDerivativeTypeCodeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            financialDerivativeTypeCode: expect.any(Object),
            financialDerivativeType: expect.any(Object),
            financialDerivativeTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getFinancialDerivativeTypeCode', () => {
      it('should return NewFinancialDerivativeTypeCode for default FinancialDerivativeTypeCode initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFinancialDerivativeTypeCodeFormGroup(sampleWithNewData);

        const financialDerivativeTypeCode = service.getFinancialDerivativeTypeCode(formGroup) as any;

        expect(financialDerivativeTypeCode).toMatchObject(sampleWithNewData);
      });

      it('should return NewFinancialDerivativeTypeCode for empty FinancialDerivativeTypeCode initial value', () => {
        const formGroup = service.createFinancialDerivativeTypeCodeFormGroup();

        const financialDerivativeTypeCode = service.getFinancialDerivativeTypeCode(formGroup) as any;

        expect(financialDerivativeTypeCode).toMatchObject({});
      });

      it('should return IFinancialDerivativeTypeCode', () => {
        const formGroup = service.createFinancialDerivativeTypeCodeFormGroup(sampleWithRequiredData);

        const financialDerivativeTypeCode = service.getFinancialDerivativeTypeCode(formGroup) as any;

        expect(financialDerivativeTypeCode).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFinancialDerivativeTypeCode should not enable id FormControl', () => {
        const formGroup = service.createFinancialDerivativeTypeCodeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFinancialDerivativeTypeCode should disable id FormControl', () => {
        const formGroup = service.createFinancialDerivativeTypeCodeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

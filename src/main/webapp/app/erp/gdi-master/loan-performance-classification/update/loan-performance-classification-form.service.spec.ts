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

import { sampleWithRequiredData, sampleWithNewData } from '../loan-performance-classification.test-samples';

import { LoanPerformanceClassificationFormService } from './loan-performance-classification-form.service';

describe('LoanPerformanceClassification Form Service', () => {
  let service: LoanPerformanceClassificationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanPerformanceClassificationFormService);
  });

  describe('Service methods', () => {
    describe('createLoanPerformanceClassificationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLoanPerformanceClassificationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            loanPerformanceClassificationCode: expect.any(Object),
            loanPerformanceClassificationType: expect.any(Object),
            commercialBankDescription: expect.any(Object),
            microfinanceDescription: expect.any(Object),
          })
        );
      });

      it('passing ILoanPerformanceClassification should create a new form with FormGroup', () => {
        const formGroup = service.createLoanPerformanceClassificationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            loanPerformanceClassificationCode: expect.any(Object),
            loanPerformanceClassificationType: expect.any(Object),
            commercialBankDescription: expect.any(Object),
            microfinanceDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getLoanPerformanceClassification', () => {
      it('should return NewLoanPerformanceClassification for default LoanPerformanceClassification initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createLoanPerformanceClassificationFormGroup(sampleWithNewData);

        const loanPerformanceClassification = service.getLoanPerformanceClassification(formGroup) as any;

        expect(loanPerformanceClassification).toMatchObject(sampleWithNewData);
      });

      it('should return NewLoanPerformanceClassification for empty LoanPerformanceClassification initial value', () => {
        const formGroup = service.createLoanPerformanceClassificationFormGroup();

        const loanPerformanceClassification = service.getLoanPerformanceClassification(formGroup) as any;

        expect(loanPerformanceClassification).toMatchObject({});
      });

      it('should return ILoanPerformanceClassification', () => {
        const formGroup = service.createLoanPerformanceClassificationFormGroup(sampleWithRequiredData);

        const loanPerformanceClassification = service.getLoanPerformanceClassification(formGroup) as any;

        expect(loanPerformanceClassification).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILoanPerformanceClassification should not enable id FormControl', () => {
        const formGroup = service.createLoanPerformanceClassificationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLoanPerformanceClassification should disable id FormControl', () => {
        const formGroup = service.createLoanPerformanceClassificationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

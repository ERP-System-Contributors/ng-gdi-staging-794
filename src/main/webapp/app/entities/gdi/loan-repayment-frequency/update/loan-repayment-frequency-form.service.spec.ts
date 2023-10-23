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

import { sampleWithRequiredData, sampleWithNewData } from '../loan-repayment-frequency.test-samples';

import { LoanRepaymentFrequencyFormService } from './loan-repayment-frequency-form.service';

describe('LoanRepaymentFrequency Form Service', () => {
  let service: LoanRepaymentFrequencyFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanRepaymentFrequencyFormService);
  });

  describe('Service methods', () => {
    describe('createLoanRepaymentFrequencyFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLoanRepaymentFrequencyFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            frequencyTypeCode: expect.any(Object),
            frequencyType: expect.any(Object),
            frequencyTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing ILoanRepaymentFrequency should create a new form with FormGroup', () => {
        const formGroup = service.createLoanRepaymentFrequencyFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            frequencyTypeCode: expect.any(Object),
            frequencyType: expect.any(Object),
            frequencyTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getLoanRepaymentFrequency', () => {
      it('should return NewLoanRepaymentFrequency for default LoanRepaymentFrequency initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createLoanRepaymentFrequencyFormGroup(sampleWithNewData);

        const loanRepaymentFrequency = service.getLoanRepaymentFrequency(formGroup) as any;

        expect(loanRepaymentFrequency).toMatchObject(sampleWithNewData);
      });

      it('should return NewLoanRepaymentFrequency for empty LoanRepaymentFrequency initial value', () => {
        const formGroup = service.createLoanRepaymentFrequencyFormGroup();

        const loanRepaymentFrequency = service.getLoanRepaymentFrequency(formGroup) as any;

        expect(loanRepaymentFrequency).toMatchObject({});
      });

      it('should return ILoanRepaymentFrequency', () => {
        const formGroup = service.createLoanRepaymentFrequencyFormGroup(sampleWithRequiredData);

        const loanRepaymentFrequency = service.getLoanRepaymentFrequency(formGroup) as any;

        expect(loanRepaymentFrequency).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILoanRepaymentFrequency should not enable id FormControl', () => {
        const formGroup = service.createLoanRepaymentFrequencyFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLoanRepaymentFrequency should disable id FormControl', () => {
        const formGroup = service.createLoanRepaymentFrequencyFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

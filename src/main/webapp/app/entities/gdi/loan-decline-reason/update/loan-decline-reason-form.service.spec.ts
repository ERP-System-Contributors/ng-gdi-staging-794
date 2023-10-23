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

import { sampleWithRequiredData, sampleWithNewData } from '../loan-decline-reason.test-samples';

import { LoanDeclineReasonFormService } from './loan-decline-reason-form.service';

describe('LoanDeclineReason Form Service', () => {
  let service: LoanDeclineReasonFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanDeclineReasonFormService);
  });

  describe('Service methods', () => {
    describe('createLoanDeclineReasonFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLoanDeclineReasonFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            loanDeclineReasonTypeCode: expect.any(Object),
            loanDeclineReasonType: expect.any(Object),
            loanDeclineReasonDetails: expect.any(Object),
          })
        );
      });

      it('passing ILoanDeclineReason should create a new form with FormGroup', () => {
        const formGroup = service.createLoanDeclineReasonFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            loanDeclineReasonTypeCode: expect.any(Object),
            loanDeclineReasonType: expect.any(Object),
            loanDeclineReasonDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getLoanDeclineReason', () => {
      it('should return NewLoanDeclineReason for default LoanDeclineReason initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createLoanDeclineReasonFormGroup(sampleWithNewData);

        const loanDeclineReason = service.getLoanDeclineReason(formGroup) as any;

        expect(loanDeclineReason).toMatchObject(sampleWithNewData);
      });

      it('should return NewLoanDeclineReason for empty LoanDeclineReason initial value', () => {
        const formGroup = service.createLoanDeclineReasonFormGroup();

        const loanDeclineReason = service.getLoanDeclineReason(formGroup) as any;

        expect(loanDeclineReason).toMatchObject({});
      });

      it('should return ILoanDeclineReason', () => {
        const formGroup = service.createLoanDeclineReasonFormGroup(sampleWithRequiredData);

        const loanDeclineReason = service.getLoanDeclineReason(formGroup) as any;

        expect(loanDeclineReason).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILoanDeclineReason should not enable id FormControl', () => {
        const formGroup = service.createLoanDeclineReasonFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLoanDeclineReason should disable id FormControl', () => {
        const formGroup = service.createLoanDeclineReasonFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

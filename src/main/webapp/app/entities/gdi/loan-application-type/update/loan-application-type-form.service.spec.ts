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

import { sampleWithRequiredData, sampleWithNewData } from '../loan-application-type.test-samples';

import { LoanApplicationTypeFormService } from './loan-application-type-form.service';

describe('LoanApplicationType Form Service', () => {
  let service: LoanApplicationTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanApplicationTypeFormService);
  });

  describe('Service methods', () => {
    describe('createLoanApplicationTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLoanApplicationTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            loanApplicationTypeCode: expect.any(Object),
            loanApplicationType: expect.any(Object),
            loanApplicationDetails: expect.any(Object),
          })
        );
      });

      it('passing ILoanApplicationType should create a new form with FormGroup', () => {
        const formGroup = service.createLoanApplicationTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            loanApplicationTypeCode: expect.any(Object),
            loanApplicationType: expect.any(Object),
            loanApplicationDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getLoanApplicationType', () => {
      it('should return NewLoanApplicationType for default LoanApplicationType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createLoanApplicationTypeFormGroup(sampleWithNewData);

        const loanApplicationType = service.getLoanApplicationType(formGroup) as any;

        expect(loanApplicationType).toMatchObject(sampleWithNewData);
      });

      it('should return NewLoanApplicationType for empty LoanApplicationType initial value', () => {
        const formGroup = service.createLoanApplicationTypeFormGroup();

        const loanApplicationType = service.getLoanApplicationType(formGroup) as any;

        expect(loanApplicationType).toMatchObject({});
      });

      it('should return ILoanApplicationType', () => {
        const formGroup = service.createLoanApplicationTypeFormGroup(sampleWithRequiredData);

        const loanApplicationType = service.getLoanApplicationType(formGroup) as any;

        expect(loanApplicationType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILoanApplicationType should not enable id FormControl', () => {
        const formGroup = service.createLoanApplicationTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLoanApplicationType should disable id FormControl', () => {
        const formGroup = service.createLoanApplicationTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

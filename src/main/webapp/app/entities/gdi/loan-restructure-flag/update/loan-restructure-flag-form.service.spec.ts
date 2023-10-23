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

import { sampleWithRequiredData, sampleWithNewData } from '../loan-restructure-flag.test-samples';

import { LoanRestructureFlagFormService } from './loan-restructure-flag-form.service';

describe('LoanRestructureFlag Form Service', () => {
  let service: LoanRestructureFlagFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanRestructureFlagFormService);
  });

  describe('Service methods', () => {
    describe('createLoanRestructureFlagFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLoanRestructureFlagFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            loanRestructureFlagCode: expect.any(Object),
            loanRestructureFlagType: expect.any(Object),
            loanRestructureFlagDetails: expect.any(Object),
          })
        );
      });

      it('passing ILoanRestructureFlag should create a new form with FormGroup', () => {
        const formGroup = service.createLoanRestructureFlagFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            loanRestructureFlagCode: expect.any(Object),
            loanRestructureFlagType: expect.any(Object),
            loanRestructureFlagDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getLoanRestructureFlag', () => {
      it('should return NewLoanRestructureFlag for default LoanRestructureFlag initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createLoanRestructureFlagFormGroup(sampleWithNewData);

        const loanRestructureFlag = service.getLoanRestructureFlag(formGroup) as any;

        expect(loanRestructureFlag).toMatchObject(sampleWithNewData);
      });

      it('should return NewLoanRestructureFlag for empty LoanRestructureFlag initial value', () => {
        const formGroup = service.createLoanRestructureFlagFormGroup();

        const loanRestructureFlag = service.getLoanRestructureFlag(formGroup) as any;

        expect(loanRestructureFlag).toMatchObject({});
      });

      it('should return ILoanRestructureFlag', () => {
        const formGroup = service.createLoanRestructureFlagFormGroup(sampleWithRequiredData);

        const loanRestructureFlag = service.getLoanRestructureFlag(formGroup) as any;

        expect(loanRestructureFlag).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILoanRestructureFlag should not enable id FormControl', () => {
        const formGroup = service.createLoanRestructureFlagFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLoanRestructureFlag should disable id FormControl', () => {
        const formGroup = service.createLoanRestructureFlagFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

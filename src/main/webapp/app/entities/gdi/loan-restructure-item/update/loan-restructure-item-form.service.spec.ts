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

import { sampleWithRequiredData, sampleWithNewData } from '../loan-restructure-item.test-samples';

import { LoanRestructureItemFormService } from './loan-restructure-item-form.service';

describe('LoanRestructureItem Form Service', () => {
  let service: LoanRestructureItemFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanRestructureItemFormService);
  });

  describe('Service methods', () => {
    describe('createLoanRestructureItemFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLoanRestructureItemFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            loanRestructureItemCode: expect.any(Object),
            loanRestructureItemType: expect.any(Object),
            loanRestructureItemDetails: expect.any(Object),
          })
        );
      });

      it('passing ILoanRestructureItem should create a new form with FormGroup', () => {
        const formGroup = service.createLoanRestructureItemFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            loanRestructureItemCode: expect.any(Object),
            loanRestructureItemType: expect.any(Object),
            loanRestructureItemDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getLoanRestructureItem', () => {
      it('should return NewLoanRestructureItem for default LoanRestructureItem initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createLoanRestructureItemFormGroup(sampleWithNewData);

        const loanRestructureItem = service.getLoanRestructureItem(formGroup) as any;

        expect(loanRestructureItem).toMatchObject(sampleWithNewData);
      });

      it('should return NewLoanRestructureItem for empty LoanRestructureItem initial value', () => {
        const formGroup = service.createLoanRestructureItemFormGroup();

        const loanRestructureItem = service.getLoanRestructureItem(formGroup) as any;

        expect(loanRestructureItem).toMatchObject({});
      });

      it('should return ILoanRestructureItem', () => {
        const formGroup = service.createLoanRestructureItemFormGroup(sampleWithRequiredData);

        const loanRestructureItem = service.getLoanRestructureItem(formGroup) as any;

        expect(loanRestructureItem).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILoanRestructureItem should not enable id FormControl', () => {
        const formGroup = service.createLoanRestructureItemFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLoanRestructureItem should disable id FormControl', () => {
        const formGroup = service.createLoanRestructureItemFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

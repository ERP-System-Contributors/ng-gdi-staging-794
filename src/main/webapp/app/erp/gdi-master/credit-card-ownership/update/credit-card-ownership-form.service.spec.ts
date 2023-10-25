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

import { sampleWithRequiredData, sampleWithNewData } from '../credit-card-ownership.test-samples';

import { CreditCardOwnershipFormService } from './credit-card-ownership-form.service';

describe('CreditCardOwnership Form Service', () => {
  let service: CreditCardOwnershipFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardOwnershipFormService);
  });

  describe('Service methods', () => {
    describe('createCreditCardOwnershipFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCreditCardOwnershipFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            creditCardOwnershipCategoryCode: expect.any(Object),
            creditCardOwnershipCategoryType: expect.any(Object),
            description: expect.any(Object),
          })
        );
      });

      it('passing ICreditCardOwnership should create a new form with FormGroup', () => {
        const formGroup = service.createCreditCardOwnershipFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            creditCardOwnershipCategoryCode: expect.any(Object),
            creditCardOwnershipCategoryType: expect.any(Object),
            description: expect.any(Object),
          })
        );
      });
    });

    describe('getCreditCardOwnership', () => {
      it('should return NewCreditCardOwnership for default CreditCardOwnership initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCreditCardOwnershipFormGroup(sampleWithNewData);

        const creditCardOwnership = service.getCreditCardOwnership(formGroup) as any;

        expect(creditCardOwnership).toMatchObject(sampleWithNewData);
      });

      it('should return NewCreditCardOwnership for empty CreditCardOwnership initial value', () => {
        const formGroup = service.createCreditCardOwnershipFormGroup();

        const creditCardOwnership = service.getCreditCardOwnership(formGroup) as any;

        expect(creditCardOwnership).toMatchObject({});
      });

      it('should return ICreditCardOwnership', () => {
        const formGroup = service.createCreditCardOwnershipFormGroup(sampleWithRequiredData);

        const creditCardOwnership = service.getCreditCardOwnership(formGroup) as any;

        expect(creditCardOwnership).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICreditCardOwnership should not enable id FormControl', () => {
        const formGroup = service.createCreditCardOwnershipFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCreditCardOwnership should disable id FormControl', () => {
        const formGroup = service.createCreditCardOwnershipFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

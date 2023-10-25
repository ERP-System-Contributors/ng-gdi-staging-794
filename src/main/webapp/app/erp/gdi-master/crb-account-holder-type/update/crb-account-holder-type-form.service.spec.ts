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

import { sampleWithRequiredData, sampleWithNewData } from '../crb-account-holder-type.test-samples';

import { CrbAccountHolderTypeFormService } from './crb-account-holder-type-form.service';

describe('CrbAccountHolderType Form Service', () => {
  let service: CrbAccountHolderTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbAccountHolderTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCrbAccountHolderTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbAccountHolderTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            accountHolderCategoryTypeCode: expect.any(Object),
            accountHolderCategoryType: expect.any(Object),
          })
        );
      });

      it('passing ICrbAccountHolderType should create a new form with FormGroup', () => {
        const formGroup = service.createCrbAccountHolderTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            accountHolderCategoryTypeCode: expect.any(Object),
            accountHolderCategoryType: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbAccountHolderType', () => {
      it('should return NewCrbAccountHolderType for default CrbAccountHolderType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbAccountHolderTypeFormGroup(sampleWithNewData);

        const crbAccountHolderType = service.getCrbAccountHolderType(formGroup) as any;

        expect(crbAccountHolderType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbAccountHolderType for empty CrbAccountHolderType initial value', () => {
        const formGroup = service.createCrbAccountHolderTypeFormGroup();

        const crbAccountHolderType = service.getCrbAccountHolderType(formGroup) as any;

        expect(crbAccountHolderType).toMatchObject({});
      });

      it('should return ICrbAccountHolderType', () => {
        const formGroup = service.createCrbAccountHolderTypeFormGroup(sampleWithRequiredData);

        const crbAccountHolderType = service.getCrbAccountHolderType(formGroup) as any;

        expect(crbAccountHolderType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbAccountHolderType should not enable id FormControl', () => {
        const formGroup = service.createCrbAccountHolderTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbAccountHolderType should disable id FormControl', () => {
        const formGroup = service.createCrbAccountHolderTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

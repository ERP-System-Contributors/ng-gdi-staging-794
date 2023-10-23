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

import { sampleWithRequiredData, sampleWithNewData } from '../ultimate-beneficiary-types.test-samples';

import { UltimateBeneficiaryTypesFormService } from './ultimate-beneficiary-types-form.service';

describe('UltimateBeneficiaryTypes Form Service', () => {
  let service: UltimateBeneficiaryTypesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UltimateBeneficiaryTypesFormService);
  });

  describe('Service methods', () => {
    describe('createUltimateBeneficiaryTypesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createUltimateBeneficiaryTypesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ultimateBeneficiaryTypeCode: expect.any(Object),
            ultimateBeneficiaryType: expect.any(Object),
            ultimateBeneficiaryTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing IUltimateBeneficiaryTypes should create a new form with FormGroup', () => {
        const formGroup = service.createUltimateBeneficiaryTypesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ultimateBeneficiaryTypeCode: expect.any(Object),
            ultimateBeneficiaryType: expect.any(Object),
            ultimateBeneficiaryTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getUltimateBeneficiaryTypes', () => {
      it('should return NewUltimateBeneficiaryTypes for default UltimateBeneficiaryTypes initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createUltimateBeneficiaryTypesFormGroup(sampleWithNewData);

        const ultimateBeneficiaryTypes = service.getUltimateBeneficiaryTypes(formGroup) as any;

        expect(ultimateBeneficiaryTypes).toMatchObject(sampleWithNewData);
      });

      it('should return NewUltimateBeneficiaryTypes for empty UltimateBeneficiaryTypes initial value', () => {
        const formGroup = service.createUltimateBeneficiaryTypesFormGroup();

        const ultimateBeneficiaryTypes = service.getUltimateBeneficiaryTypes(formGroup) as any;

        expect(ultimateBeneficiaryTypes).toMatchObject({});
      });

      it('should return IUltimateBeneficiaryTypes', () => {
        const formGroup = service.createUltimateBeneficiaryTypesFormGroup(sampleWithRequiredData);

        const ultimateBeneficiaryTypes = service.getUltimateBeneficiaryTypes(formGroup) as any;

        expect(ultimateBeneficiaryTypes).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IUltimateBeneficiaryTypes should not enable id FormControl', () => {
        const formGroup = service.createUltimateBeneficiaryTypesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewUltimateBeneficiaryTypes should disable id FormControl', () => {
        const formGroup = service.createUltimateBeneficiaryTypesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

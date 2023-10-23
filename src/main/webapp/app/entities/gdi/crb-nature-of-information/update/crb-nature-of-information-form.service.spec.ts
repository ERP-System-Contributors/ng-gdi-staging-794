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

import { sampleWithRequiredData, sampleWithNewData } from '../crb-nature-of-information.test-samples';

import { CrbNatureOfInformationFormService } from './crb-nature-of-information-form.service';

describe('CrbNatureOfInformation Form Service', () => {
  let service: CrbNatureOfInformationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbNatureOfInformationFormService);
  });

  describe('Service methods', () => {
    describe('createCrbNatureOfInformationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbNatureOfInformationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            natureOfInformationTypeCode: expect.any(Object),
            natureOfInformationType: expect.any(Object),
            natureOfInformationTypeDescription: expect.any(Object),
          })
        );
      });

      it('passing ICrbNatureOfInformation should create a new form with FormGroup', () => {
        const formGroup = service.createCrbNatureOfInformationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            natureOfInformationTypeCode: expect.any(Object),
            natureOfInformationType: expect.any(Object),
            natureOfInformationTypeDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbNatureOfInformation', () => {
      it('should return NewCrbNatureOfInformation for default CrbNatureOfInformation initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbNatureOfInformationFormGroup(sampleWithNewData);

        const crbNatureOfInformation = service.getCrbNatureOfInformation(formGroup) as any;

        expect(crbNatureOfInformation).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbNatureOfInformation for empty CrbNatureOfInformation initial value', () => {
        const formGroup = service.createCrbNatureOfInformationFormGroup();

        const crbNatureOfInformation = service.getCrbNatureOfInformation(formGroup) as any;

        expect(crbNatureOfInformation).toMatchObject({});
      });

      it('should return ICrbNatureOfInformation', () => {
        const formGroup = service.createCrbNatureOfInformationFormGroup(sampleWithRequiredData);

        const crbNatureOfInformation = service.getCrbNatureOfInformation(formGroup) as any;

        expect(crbNatureOfInformation).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbNatureOfInformation should not enable id FormControl', () => {
        const formGroup = service.createCrbNatureOfInformationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbNatureOfInformation should disable id FormControl', () => {
        const formGroup = service.createCrbNatureOfInformationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

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

import { sampleWithRequiredData, sampleWithNewData } from '../crb-source-of-information-type.test-samples';

import { CrbSourceOfInformationTypeFormService } from './crb-source-of-information-type-form.service';

describe('CrbSourceOfInformationType Form Service', () => {
  let service: CrbSourceOfInformationTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbSourceOfInformationTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCrbSourceOfInformationTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbSourceOfInformationTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sourceOfInformationTypeCode: expect.any(Object),
            sourceOfInformationTypeDescription: expect.any(Object),
          })
        );
      });

      it('passing ICrbSourceOfInformationType should create a new form with FormGroup', () => {
        const formGroup = service.createCrbSourceOfInformationTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sourceOfInformationTypeCode: expect.any(Object),
            sourceOfInformationTypeDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbSourceOfInformationType', () => {
      it('should return NewCrbSourceOfInformationType for default CrbSourceOfInformationType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbSourceOfInformationTypeFormGroup(sampleWithNewData);

        const crbSourceOfInformationType = service.getCrbSourceOfInformationType(formGroup) as any;

        expect(crbSourceOfInformationType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbSourceOfInformationType for empty CrbSourceOfInformationType initial value', () => {
        const formGroup = service.createCrbSourceOfInformationTypeFormGroup();

        const crbSourceOfInformationType = service.getCrbSourceOfInformationType(formGroup) as any;

        expect(crbSourceOfInformationType).toMatchObject({});
      });

      it('should return ICrbSourceOfInformationType', () => {
        const formGroup = service.createCrbSourceOfInformationTypeFormGroup(sampleWithRequiredData);

        const crbSourceOfInformationType = service.getCrbSourceOfInformationType(formGroup) as any;

        expect(crbSourceOfInformationType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbSourceOfInformationType should not enable id FormControl', () => {
        const formGroup = service.createCrbSourceOfInformationTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbSourceOfInformationType should disable id FormControl', () => {
        const formGroup = service.createCrbSourceOfInformationTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

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

import { sampleWithRequiredData, sampleWithNewData } from '../source-remittance-purpose-type.test-samples';

import { SourceRemittancePurposeTypeFormService } from './source-remittance-purpose-type-form.service';

describe('SourceRemittancePurposeType Form Service', () => {
  let service: SourceRemittancePurposeTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SourceRemittancePurposeTypeFormService);
  });

  describe('Service methods', () => {
    describe('createSourceRemittancePurposeTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSourceRemittancePurposeTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sourceOrPurposeTypeCode: expect.any(Object),
            sourceOrPurposeOfRemittanceFlag: expect.any(Object),
            sourceOrPurposeOfRemittanceType: expect.any(Object),
            remittancePurposeTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing ISourceRemittancePurposeType should create a new form with FormGroup', () => {
        const formGroup = service.createSourceRemittancePurposeTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sourceOrPurposeTypeCode: expect.any(Object),
            sourceOrPurposeOfRemittanceFlag: expect.any(Object),
            sourceOrPurposeOfRemittanceType: expect.any(Object),
            remittancePurposeTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getSourceRemittancePurposeType', () => {
      it('should return NewSourceRemittancePurposeType for default SourceRemittancePurposeType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSourceRemittancePurposeTypeFormGroup(sampleWithNewData);

        const sourceRemittancePurposeType = service.getSourceRemittancePurposeType(formGroup) as any;

        expect(sourceRemittancePurposeType).toMatchObject(sampleWithNewData);
      });

      it('should return NewSourceRemittancePurposeType for empty SourceRemittancePurposeType initial value', () => {
        const formGroup = service.createSourceRemittancePurposeTypeFormGroup();

        const sourceRemittancePurposeType = service.getSourceRemittancePurposeType(formGroup) as any;

        expect(sourceRemittancePurposeType).toMatchObject({});
      });

      it('should return ISourceRemittancePurposeType', () => {
        const formGroup = service.createSourceRemittancePurposeTypeFormGroup(sampleWithRequiredData);

        const sourceRemittancePurposeType = service.getSourceRemittancePurposeType(formGroup) as any;

        expect(sourceRemittancePurposeType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISourceRemittancePurposeType should not enable id FormControl', () => {
        const formGroup = service.createSourceRemittancePurposeTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSourceRemittancePurposeType should disable id FormControl', () => {
        const formGroup = service.createSourceRemittancePurposeTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

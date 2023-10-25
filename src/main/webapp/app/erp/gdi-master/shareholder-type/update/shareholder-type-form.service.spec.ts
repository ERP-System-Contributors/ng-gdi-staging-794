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

import { sampleWithRequiredData, sampleWithNewData } from '../shareholder-type.test-samples';

import { ShareholderTypeFormService } from './shareholder-type-form.service';

describe('ShareholderType Form Service', () => {
  let service: ShareholderTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareholderTypeFormService);
  });

  describe('Service methods', () => {
    describe('createShareholderTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createShareholderTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            shareHolderTypeCode: expect.any(Object),
            shareHolderType: expect.any(Object),
          })
        );
      });

      it('passing IShareholderType should create a new form with FormGroup', () => {
        const formGroup = service.createShareholderTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            shareHolderTypeCode: expect.any(Object),
            shareHolderType: expect.any(Object),
          })
        );
      });
    });

    describe('getShareholderType', () => {
      it('should return NewShareholderType for default ShareholderType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createShareholderTypeFormGroup(sampleWithNewData);

        const shareholderType = service.getShareholderType(formGroup) as any;

        expect(shareholderType).toMatchObject(sampleWithNewData);
      });

      it('should return NewShareholderType for empty ShareholderType initial value', () => {
        const formGroup = service.createShareholderTypeFormGroup();

        const shareholderType = service.getShareholderType(formGroup) as any;

        expect(shareholderType).toMatchObject({});
      });

      it('should return IShareholderType', () => {
        const formGroup = service.createShareholderTypeFormGroup(sampleWithRequiredData);

        const shareholderType = service.getShareholderType(formGroup) as any;

        expect(shareholderType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IShareholderType should not enable id FormControl', () => {
        const formGroup = service.createShareholderTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewShareholderType should disable id FormControl', () => {
        const formGroup = service.createShareholderTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

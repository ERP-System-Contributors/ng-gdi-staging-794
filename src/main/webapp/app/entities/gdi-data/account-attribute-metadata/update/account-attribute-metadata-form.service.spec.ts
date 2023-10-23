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

import { sampleWithRequiredData, sampleWithNewData } from '../account-attribute-metadata.test-samples';

import { AccountAttributeMetadataFormService } from './account-attribute-metadata-form.service';

describe('AccountAttributeMetadata Form Service', () => {
  let service: AccountAttributeMetadataFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountAttributeMetadataFormService);
  });

  describe('Service methods', () => {
    describe('createAccountAttributeMetadataFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAccountAttributeMetadataFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            precedence: expect.any(Object),
            columnName: expect.any(Object),
            shortName: expect.any(Object),
            detailedDefinition: expect.any(Object),
            dataType: expect.any(Object),
            length: expect.any(Object),
            columnIndex: expect.any(Object),
            mandatoryFieldFlag: expect.any(Object),
            businessValidation: expect.any(Object),
            technicalValidation: expect.any(Object),
            dbColumnName: expect.any(Object),
            metadataVersion: expect.any(Object),
            standardInputTemplate: expect.any(Object),
          })
        );
      });

      it('passing IAccountAttributeMetadata should create a new form with FormGroup', () => {
        const formGroup = service.createAccountAttributeMetadataFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            precedence: expect.any(Object),
            columnName: expect.any(Object),
            shortName: expect.any(Object),
            detailedDefinition: expect.any(Object),
            dataType: expect.any(Object),
            length: expect.any(Object),
            columnIndex: expect.any(Object),
            mandatoryFieldFlag: expect.any(Object),
            businessValidation: expect.any(Object),
            technicalValidation: expect.any(Object),
            dbColumnName: expect.any(Object),
            metadataVersion: expect.any(Object),
            standardInputTemplate: expect.any(Object),
          })
        );
      });
    });

    describe('getAccountAttributeMetadata', () => {
      it('should return NewAccountAttributeMetadata for default AccountAttributeMetadata initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAccountAttributeMetadataFormGroup(sampleWithNewData);

        const accountAttributeMetadata = service.getAccountAttributeMetadata(formGroup) as any;

        expect(accountAttributeMetadata).toMatchObject(sampleWithNewData);
      });

      it('should return NewAccountAttributeMetadata for empty AccountAttributeMetadata initial value', () => {
        const formGroup = service.createAccountAttributeMetadataFormGroup();

        const accountAttributeMetadata = service.getAccountAttributeMetadata(formGroup) as any;

        expect(accountAttributeMetadata).toMatchObject({});
      });

      it('should return IAccountAttributeMetadata', () => {
        const formGroup = service.createAccountAttributeMetadataFormGroup(sampleWithRequiredData);

        const accountAttributeMetadata = service.getAccountAttributeMetadata(formGroup) as any;

        expect(accountAttributeMetadata).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAccountAttributeMetadata should not enable id FormControl', () => {
        const formGroup = service.createAccountAttributeMetadataFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAccountAttributeMetadata should disable id FormControl', () => {
        const formGroup = service.createAccountAttributeMetadataFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

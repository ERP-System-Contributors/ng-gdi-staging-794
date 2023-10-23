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

import { sampleWithRequiredData, sampleWithNewData } from '../legal-status.test-samples';

import { LegalStatusFormService } from './legal-status-form.service';

describe('LegalStatus Form Service', () => {
  let service: LegalStatusFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegalStatusFormService);
  });

  describe('Service methods', () => {
    describe('createLegalStatusFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLegalStatusFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            legalStatusCode: expect.any(Object),
            legalStatusType: expect.any(Object),
            legalStatusDescription: expect.any(Object),
          })
        );
      });

      it('passing ILegalStatus should create a new form with FormGroup', () => {
        const formGroup = service.createLegalStatusFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            legalStatusCode: expect.any(Object),
            legalStatusType: expect.any(Object),
            legalStatusDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getLegalStatus', () => {
      it('should return NewLegalStatus for default LegalStatus initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createLegalStatusFormGroup(sampleWithNewData);

        const legalStatus = service.getLegalStatus(formGroup) as any;

        expect(legalStatus).toMatchObject(sampleWithNewData);
      });

      it('should return NewLegalStatus for empty LegalStatus initial value', () => {
        const formGroup = service.createLegalStatusFormGroup();

        const legalStatus = service.getLegalStatus(formGroup) as any;

        expect(legalStatus).toMatchObject({});
      });

      it('should return ILegalStatus', () => {
        const formGroup = service.createLegalStatusFormGroup(sampleWithRequiredData);

        const legalStatus = service.getLegalStatus(formGroup) as any;

        expect(legalStatus).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILegalStatus should not enable id FormControl', () => {
        const formGroup = service.createLegalStatusFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLegalStatus should disable id FormControl', () => {
        const formGroup = service.createLegalStatusFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

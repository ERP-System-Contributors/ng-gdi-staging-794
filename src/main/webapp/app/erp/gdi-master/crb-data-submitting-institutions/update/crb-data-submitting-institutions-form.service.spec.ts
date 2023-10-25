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

import { sampleWithRequiredData, sampleWithNewData } from '../crb-data-submitting-institutions.test-samples';

import { CrbDataSubmittingInstitutionsFormService } from './crb-data-submitting-institutions-form.service';

describe('CrbDataSubmittingInstitutions Form Service', () => {
  let service: CrbDataSubmittingInstitutionsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbDataSubmittingInstitutionsFormService);
  });

  describe('Service methods', () => {
    describe('createCrbDataSubmittingInstitutionsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbDataSubmittingInstitutionsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            institutionCode: expect.any(Object),
            institutionName: expect.any(Object),
            institutionCategory: expect.any(Object),
          })
        );
      });

      it('passing ICrbDataSubmittingInstitutions should create a new form with FormGroup', () => {
        const formGroup = service.createCrbDataSubmittingInstitutionsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            institutionCode: expect.any(Object),
            institutionName: expect.any(Object),
            institutionCategory: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbDataSubmittingInstitutions', () => {
      it('should return NewCrbDataSubmittingInstitutions for default CrbDataSubmittingInstitutions initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbDataSubmittingInstitutionsFormGroup(sampleWithNewData);

        const crbDataSubmittingInstitutions = service.getCrbDataSubmittingInstitutions(formGroup) as any;

        expect(crbDataSubmittingInstitutions).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbDataSubmittingInstitutions for empty CrbDataSubmittingInstitutions initial value', () => {
        const formGroup = service.createCrbDataSubmittingInstitutionsFormGroup();

        const crbDataSubmittingInstitutions = service.getCrbDataSubmittingInstitutions(formGroup) as any;

        expect(crbDataSubmittingInstitutions).toMatchObject({});
      });

      it('should return ICrbDataSubmittingInstitutions', () => {
        const formGroup = service.createCrbDataSubmittingInstitutionsFormGroup(sampleWithRequiredData);

        const crbDataSubmittingInstitutions = service.getCrbDataSubmittingInstitutions(formGroup) as any;

        expect(crbDataSubmittingInstitutions).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbDataSubmittingInstitutions should not enable id FormControl', () => {
        const formGroup = service.createCrbDataSubmittingInstitutionsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbDataSubmittingInstitutions should disable id FormControl', () => {
        const formGroup = service.createCrbDataSubmittingInstitutionsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

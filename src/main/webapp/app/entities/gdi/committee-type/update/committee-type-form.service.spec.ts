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

import { sampleWithRequiredData, sampleWithNewData } from '../committee-type.test-samples';

import { CommitteeTypeFormService } from './committee-type-form.service';

describe('CommitteeType Form Service', () => {
  let service: CommitteeTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommitteeTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCommitteeTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCommitteeTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            committeeTypeCode: expect.any(Object),
            committeeType: expect.any(Object),
            committeeTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing ICommitteeType should create a new form with FormGroup', () => {
        const formGroup = service.createCommitteeTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            committeeTypeCode: expect.any(Object),
            committeeType: expect.any(Object),
            committeeTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCommitteeType', () => {
      it('should return NewCommitteeType for default CommitteeType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCommitteeTypeFormGroup(sampleWithNewData);

        const committeeType = service.getCommitteeType(formGroup) as any;

        expect(committeeType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCommitteeType for empty CommitteeType initial value', () => {
        const formGroup = service.createCommitteeTypeFormGroup();

        const committeeType = service.getCommitteeType(formGroup) as any;

        expect(committeeType).toMatchObject({});
      });

      it('should return ICommitteeType', () => {
        const formGroup = service.createCommitteeTypeFormGroup(sampleWithRequiredData);

        const committeeType = service.getCommitteeType(formGroup) as any;

        expect(committeeType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICommitteeType should not enable id FormControl', () => {
        const formGroup = service.createCommitteeTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCommitteeType should disable id FormControl', () => {
        const formGroup = service.createCommitteeTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

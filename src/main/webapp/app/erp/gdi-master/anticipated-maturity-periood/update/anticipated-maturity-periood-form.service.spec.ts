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

import { sampleWithRequiredData, sampleWithNewData } from '../anticipated-maturity-periood.test-samples';

import { AnticipatedMaturityPerioodFormService } from './anticipated-maturity-periood-form.service';

describe('AnticipatedMaturityPeriood Form Service', () => {
  let service: AnticipatedMaturityPerioodFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnticipatedMaturityPerioodFormService);
  });

  describe('Service methods', () => {
    describe('createAnticipatedMaturityPerioodFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAnticipatedMaturityPerioodFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            anticipatedMaturityTenorCode: expect.any(Object),
            aniticipatedMaturityTenorType: expect.any(Object),
            anticipatedMaturityTenorDetails: expect.any(Object),
          })
        );
      });

      it('passing IAnticipatedMaturityPeriood should create a new form with FormGroup', () => {
        const formGroup = service.createAnticipatedMaturityPerioodFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            anticipatedMaturityTenorCode: expect.any(Object),
            aniticipatedMaturityTenorType: expect.any(Object),
            anticipatedMaturityTenorDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getAnticipatedMaturityPeriood', () => {
      it('should return NewAnticipatedMaturityPeriood for default AnticipatedMaturityPeriood initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAnticipatedMaturityPerioodFormGroup(sampleWithNewData);

        const anticipatedMaturityPeriood = service.getAnticipatedMaturityPeriood(formGroup) as any;

        expect(anticipatedMaturityPeriood).toMatchObject(sampleWithNewData);
      });

      it('should return NewAnticipatedMaturityPeriood for empty AnticipatedMaturityPeriood initial value', () => {
        const formGroup = service.createAnticipatedMaturityPerioodFormGroup();

        const anticipatedMaturityPeriood = service.getAnticipatedMaturityPeriood(formGroup) as any;

        expect(anticipatedMaturityPeriood).toMatchObject({});
      });

      it('should return IAnticipatedMaturityPeriood', () => {
        const formGroup = service.createAnticipatedMaturityPerioodFormGroup(sampleWithRequiredData);

        const anticipatedMaturityPeriood = service.getAnticipatedMaturityPeriood(formGroup) as any;

        expect(anticipatedMaturityPeriood).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAnticipatedMaturityPeriood should not enable id FormControl', () => {
        const formGroup = service.createAnticipatedMaturityPerioodFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAnticipatedMaturityPeriood should disable id FormControl', () => {
        const formGroup = service.createAnticipatedMaturityPerioodFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

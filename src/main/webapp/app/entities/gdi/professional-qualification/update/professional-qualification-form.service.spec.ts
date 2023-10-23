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

import { sampleWithRequiredData, sampleWithNewData } from '../professional-qualification.test-samples';

import { ProfessionalQualificationFormService } from './professional-qualification-form.service';

describe('ProfessionalQualification Form Service', () => {
  let service: ProfessionalQualificationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessionalQualificationFormService);
  });

  describe('Service methods', () => {
    describe('createProfessionalQualificationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProfessionalQualificationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            professionalQualificationsCode: expect.any(Object),
            professionalQualificationsType: expect.any(Object),
            professionalQualificationsDetails: expect.any(Object),
          })
        );
      });

      it('passing IProfessionalQualification should create a new form with FormGroup', () => {
        const formGroup = service.createProfessionalQualificationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            professionalQualificationsCode: expect.any(Object),
            professionalQualificationsType: expect.any(Object),
            professionalQualificationsDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getProfessionalQualification', () => {
      it('should return NewProfessionalQualification for default ProfessionalQualification initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createProfessionalQualificationFormGroup(sampleWithNewData);

        const professionalQualification = service.getProfessionalQualification(formGroup) as any;

        expect(professionalQualification).toMatchObject(sampleWithNewData);
      });

      it('should return NewProfessionalQualification for empty ProfessionalQualification initial value', () => {
        const formGroup = service.createProfessionalQualificationFormGroup();

        const professionalQualification = service.getProfessionalQualification(formGroup) as any;

        expect(professionalQualification).toMatchObject({});
      });

      it('should return IProfessionalQualification', () => {
        const formGroup = service.createProfessionalQualificationFormGroup(sampleWithRequiredData);

        const professionalQualification = service.getProfessionalQualification(formGroup) as any;

        expect(professionalQualification).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IProfessionalQualification should not enable id FormControl', () => {
        const formGroup = service.createProfessionalQualificationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewProfessionalQualification should disable id FormControl', () => {
        const formGroup = service.createProfessionalQualificationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

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

import { sampleWithRequiredData, sampleWithNewData } from '../interest-calc-method.test-samples';

import { InterestCalcMethodFormService } from './interest-calc-method-form.service';

describe('InterestCalcMethod Form Service', () => {
  let service: InterestCalcMethodFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterestCalcMethodFormService);
  });

  describe('Service methods', () => {
    describe('createInterestCalcMethodFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createInterestCalcMethodFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            interestCalculationMethodCode: expect.any(Object),
            interestCalculationMthodType: expect.any(Object),
            interestCalculationMethodDetails: expect.any(Object),
          })
        );
      });

      it('passing IInterestCalcMethod should create a new form with FormGroup', () => {
        const formGroup = service.createInterestCalcMethodFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            interestCalculationMethodCode: expect.any(Object),
            interestCalculationMthodType: expect.any(Object),
            interestCalculationMethodDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getInterestCalcMethod', () => {
      it('should return NewInterestCalcMethod for default InterestCalcMethod initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createInterestCalcMethodFormGroup(sampleWithNewData);

        const interestCalcMethod = service.getInterestCalcMethod(formGroup) as any;

        expect(interestCalcMethod).toMatchObject(sampleWithNewData);
      });

      it('should return NewInterestCalcMethod for empty InterestCalcMethod initial value', () => {
        const formGroup = service.createInterestCalcMethodFormGroup();

        const interestCalcMethod = service.getInterestCalcMethod(formGroup) as any;

        expect(interestCalcMethod).toMatchObject({});
      });

      it('should return IInterestCalcMethod', () => {
        const formGroup = service.createInterestCalcMethodFormGroup(sampleWithRequiredData);

        const interestCalcMethod = service.getInterestCalcMethod(formGroup) as any;

        expect(interestCalcMethod).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IInterestCalcMethod should not enable id FormControl', () => {
        const formGroup = service.createInterestCalcMethodFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewInterestCalcMethod should disable id FormControl', () => {
        const formGroup = service.createInterestCalcMethodFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

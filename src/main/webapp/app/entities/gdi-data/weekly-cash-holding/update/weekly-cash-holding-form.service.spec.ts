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

import { sampleWithRequiredData, sampleWithNewData } from '../weekly-cash-holding.test-samples';

import { WeeklyCashHoldingFormService } from './weekly-cash-holding-form.service';

describe('WeeklyCashHolding Form Service', () => {
  let service: WeeklyCashHoldingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeeklyCashHoldingFormService);
  });

  describe('Service methods', () => {
    describe('createWeeklyCashHoldingFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createWeeklyCashHoldingFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            fitUnits: expect.any(Object),
            unfitUnits: expect.any(Object),
            bankCode: expect.any(Object),
            branchId: expect.any(Object),
            subCountyCode: expect.any(Object),
            denomination: expect.any(Object),
          })
        );
      });

      it('passing IWeeklyCashHolding should create a new form with FormGroup', () => {
        const formGroup = service.createWeeklyCashHoldingFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            fitUnits: expect.any(Object),
            unfitUnits: expect.any(Object),
            bankCode: expect.any(Object),
            branchId: expect.any(Object),
            subCountyCode: expect.any(Object),
            denomination: expect.any(Object),
          })
        );
      });
    });

    describe('getWeeklyCashHolding', () => {
      it('should return NewWeeklyCashHolding for default WeeklyCashHolding initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createWeeklyCashHoldingFormGroup(sampleWithNewData);

        const weeklyCashHolding = service.getWeeklyCashHolding(formGroup) as any;

        expect(weeklyCashHolding).toMatchObject(sampleWithNewData);
      });

      it('should return NewWeeklyCashHolding for empty WeeklyCashHolding initial value', () => {
        const formGroup = service.createWeeklyCashHoldingFormGroup();

        const weeklyCashHolding = service.getWeeklyCashHolding(formGroup) as any;

        expect(weeklyCashHolding).toMatchObject({});
      });

      it('should return IWeeklyCashHolding', () => {
        const formGroup = service.createWeeklyCashHoldingFormGroup(sampleWithRequiredData);

        const weeklyCashHolding = service.getWeeklyCashHolding(formGroup) as any;

        expect(weeklyCashHolding).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IWeeklyCashHolding should not enable id FormControl', () => {
        const formGroup = service.createWeeklyCashHoldingFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewWeeklyCashHolding should disable id FormControl', () => {
        const formGroup = service.createWeeklyCashHoldingFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

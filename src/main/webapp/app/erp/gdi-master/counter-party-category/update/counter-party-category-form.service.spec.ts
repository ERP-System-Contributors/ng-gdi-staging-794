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

import { sampleWithRequiredData, sampleWithNewData } from '../counter-party-category.test-samples';

import { CounterPartyCategoryFormService } from './counter-party-category-form.service';

describe('CounterPartyCategory Form Service', () => {
  let service: CounterPartyCategoryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterPartyCategoryFormService);
  });

  describe('Service methods', () => {
    describe('createCounterPartyCategoryFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCounterPartyCategoryFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            counterpartyCategoryCode: expect.any(Object),
            counterpartyCategoryCodeDetails: expect.any(Object),
            counterpartyCategoryDescription: expect.any(Object),
          })
        );
      });

      it('passing ICounterPartyCategory should create a new form with FormGroup', () => {
        const formGroup = service.createCounterPartyCategoryFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            counterpartyCategoryCode: expect.any(Object),
            counterpartyCategoryCodeDetails: expect.any(Object),
            counterpartyCategoryDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getCounterPartyCategory', () => {
      it('should return NewCounterPartyCategory for default CounterPartyCategory initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCounterPartyCategoryFormGroup(sampleWithNewData);

        const counterPartyCategory = service.getCounterPartyCategory(formGroup) as any;

        expect(counterPartyCategory).toMatchObject(sampleWithNewData);
      });

      it('should return NewCounterPartyCategory for empty CounterPartyCategory initial value', () => {
        const formGroup = service.createCounterPartyCategoryFormGroup();

        const counterPartyCategory = service.getCounterPartyCategory(formGroup) as any;

        expect(counterPartyCategory).toMatchObject({});
      });

      it('should return ICounterPartyCategory', () => {
        const formGroup = service.createCounterPartyCategoryFormGroup(sampleWithRequiredData);

        const counterPartyCategory = service.getCounterPartyCategory(formGroup) as any;

        expect(counterPartyCategory).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICounterPartyCategory should not enable id FormControl', () => {
        const formGroup = service.createCounterPartyCategoryFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCounterPartyCategory should disable id FormControl', () => {
        const formGroup = service.createCounterPartyCategoryFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

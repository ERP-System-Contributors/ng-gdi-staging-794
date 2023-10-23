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

import { sampleWithRequiredData, sampleWithNewData } from '../moratorium-item.test-samples';

import { MoratoriumItemFormService } from './moratorium-item-form.service';

describe('MoratoriumItem Form Service', () => {
  let service: MoratoriumItemFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoratoriumItemFormService);
  });

  describe('Service methods', () => {
    describe('createMoratoriumItemFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMoratoriumItemFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            moratoriumItemTypeCode: expect.any(Object),
            moratoriumItemType: expect.any(Object),
            moratoriumTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing IMoratoriumItem should create a new form with FormGroup', () => {
        const formGroup = service.createMoratoriumItemFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            moratoriumItemTypeCode: expect.any(Object),
            moratoriumItemType: expect.any(Object),
            moratoriumTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getMoratoriumItem', () => {
      it('should return NewMoratoriumItem for default MoratoriumItem initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createMoratoriumItemFormGroup(sampleWithNewData);

        const moratoriumItem = service.getMoratoriumItem(formGroup) as any;

        expect(moratoriumItem).toMatchObject(sampleWithNewData);
      });

      it('should return NewMoratoriumItem for empty MoratoriumItem initial value', () => {
        const formGroup = service.createMoratoriumItemFormGroup();

        const moratoriumItem = service.getMoratoriumItem(formGroup) as any;

        expect(moratoriumItem).toMatchObject({});
      });

      it('should return IMoratoriumItem', () => {
        const formGroup = service.createMoratoriumItemFormGroup(sampleWithRequiredData);

        const moratoriumItem = service.getMoratoriumItem(formGroup) as any;

        expect(moratoriumItem).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMoratoriumItem should not enable id FormControl', () => {
        const formGroup = service.createMoratoriumItemFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMoratoriumItem should disable id FormControl', () => {
        const formGroup = service.createMoratoriumItemFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

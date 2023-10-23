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

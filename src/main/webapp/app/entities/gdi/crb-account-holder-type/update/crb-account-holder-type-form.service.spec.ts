import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crb-account-holder-type.test-samples';

import { CrbAccountHolderTypeFormService } from './crb-account-holder-type-form.service';

describe('CrbAccountHolderType Form Service', () => {
  let service: CrbAccountHolderTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrbAccountHolderTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCrbAccountHolderTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrbAccountHolderTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            accountHolderCategoryTypeCode: expect.any(Object),
            accountHolderCategoryType: expect.any(Object),
          })
        );
      });

      it('passing ICrbAccountHolderType should create a new form with FormGroup', () => {
        const formGroup = service.createCrbAccountHolderTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            accountHolderCategoryTypeCode: expect.any(Object),
            accountHolderCategoryType: expect.any(Object),
          })
        );
      });
    });

    describe('getCrbAccountHolderType', () => {
      it('should return NewCrbAccountHolderType for default CrbAccountHolderType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrbAccountHolderTypeFormGroup(sampleWithNewData);

        const crbAccountHolderType = service.getCrbAccountHolderType(formGroup) as any;

        expect(crbAccountHolderType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrbAccountHolderType for empty CrbAccountHolderType initial value', () => {
        const formGroup = service.createCrbAccountHolderTypeFormGroup();

        const crbAccountHolderType = service.getCrbAccountHolderType(formGroup) as any;

        expect(crbAccountHolderType).toMatchObject({});
      });

      it('should return ICrbAccountHolderType', () => {
        const formGroup = service.createCrbAccountHolderTypeFormGroup(sampleWithRequiredData);

        const crbAccountHolderType = service.getCrbAccountHolderType(formGroup) as any;

        expect(crbAccountHolderType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrbAccountHolderType should not enable id FormControl', () => {
        const formGroup = service.createCrbAccountHolderTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrbAccountHolderType should disable id FormControl', () => {
        const formGroup = service.createCrbAccountHolderTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../shareholder-type.test-samples';

import { ShareholderTypeFormService } from './shareholder-type-form.service';

describe('ShareholderType Form Service', () => {
  let service: ShareholderTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareholderTypeFormService);
  });

  describe('Service methods', () => {
    describe('createShareholderTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createShareholderTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            shareHolderTypeCode: expect.any(Object),
            shareHolderType: expect.any(Object),
          })
        );
      });

      it('passing IShareholderType should create a new form with FormGroup', () => {
        const formGroup = service.createShareholderTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            shareHolderTypeCode: expect.any(Object),
            shareHolderType: expect.any(Object),
          })
        );
      });
    });

    describe('getShareholderType', () => {
      it('should return NewShareholderType for default ShareholderType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createShareholderTypeFormGroup(sampleWithNewData);

        const shareholderType = service.getShareholderType(formGroup) as any;

        expect(shareholderType).toMatchObject(sampleWithNewData);
      });

      it('should return NewShareholderType for empty ShareholderType initial value', () => {
        const formGroup = service.createShareholderTypeFormGroup();

        const shareholderType = service.getShareholderType(formGroup) as any;

        expect(shareholderType).toMatchObject({});
      });

      it('should return IShareholderType', () => {
        const formGroup = service.createShareholderTypeFormGroup(sampleWithRequiredData);

        const shareholderType = service.getShareholderType(formGroup) as any;

        expect(shareholderType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IShareholderType should not enable id FormControl', () => {
        const formGroup = service.createShareholderTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewShareholderType should disable id FormControl', () => {
        const formGroup = service.createShareholderTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

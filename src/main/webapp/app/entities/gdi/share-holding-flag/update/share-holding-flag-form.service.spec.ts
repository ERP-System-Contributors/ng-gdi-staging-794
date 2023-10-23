import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../share-holding-flag.test-samples';

import { ShareHoldingFlagFormService } from './share-holding-flag-form.service';

describe('ShareHoldingFlag Form Service', () => {
  let service: ShareHoldingFlagFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareHoldingFlagFormService);
  });

  describe('Service methods', () => {
    describe('createShareHoldingFlagFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createShareHoldingFlagFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            shareholdingFlagTypeCode: expect.any(Object),
            shareholdingFlagType: expect.any(Object),
            shareholdingTypeDescription: expect.any(Object),
          })
        );
      });

      it('passing IShareHoldingFlag should create a new form with FormGroup', () => {
        const formGroup = service.createShareHoldingFlagFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            shareholdingFlagTypeCode: expect.any(Object),
            shareholdingFlagType: expect.any(Object),
            shareholdingTypeDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getShareHoldingFlag', () => {
      it('should return NewShareHoldingFlag for default ShareHoldingFlag initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createShareHoldingFlagFormGroup(sampleWithNewData);

        const shareHoldingFlag = service.getShareHoldingFlag(formGroup) as any;

        expect(shareHoldingFlag).toMatchObject(sampleWithNewData);
      });

      it('should return NewShareHoldingFlag for empty ShareHoldingFlag initial value', () => {
        const formGroup = service.createShareHoldingFlagFormGroup();

        const shareHoldingFlag = service.getShareHoldingFlag(formGroup) as any;

        expect(shareHoldingFlag).toMatchObject({});
      });

      it('should return IShareHoldingFlag', () => {
        const formGroup = service.createShareHoldingFlagFormGroup(sampleWithRequiredData);

        const shareHoldingFlag = service.getShareHoldingFlag(formGroup) as any;

        expect(shareHoldingFlag).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IShareHoldingFlag should not enable id FormControl', () => {
        const formGroup = service.createShareHoldingFlagFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewShareHoldingFlag should disable id FormControl', () => {
        const formGroup = service.createShareHoldingFlagFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

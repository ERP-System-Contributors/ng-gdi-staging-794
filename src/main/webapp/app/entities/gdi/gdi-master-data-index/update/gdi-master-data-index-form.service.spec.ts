import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../gdi-master-data-index.test-samples';

import { GdiMasterDataIndexFormService } from './gdi-master-data-index-form.service';

describe('GdiMasterDataIndex Form Service', () => {
  let service: GdiMasterDataIndexFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GdiMasterDataIndexFormService);
  });

  describe('Service methods', () => {
    describe('createGdiMasterDataIndexFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createGdiMasterDataIndexFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            entityName: expect.any(Object),
            databaseName: expect.any(Object),
            businessDescription: expect.any(Object),
          })
        );
      });

      it('passing IGdiMasterDataIndex should create a new form with FormGroup', () => {
        const formGroup = service.createGdiMasterDataIndexFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            entityName: expect.any(Object),
            databaseName: expect.any(Object),
            businessDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getGdiMasterDataIndex', () => {
      it('should return NewGdiMasterDataIndex for default GdiMasterDataIndex initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createGdiMasterDataIndexFormGroup(sampleWithNewData);

        const gdiMasterDataIndex = service.getGdiMasterDataIndex(formGroup) as any;

        expect(gdiMasterDataIndex).toMatchObject(sampleWithNewData);
      });

      it('should return NewGdiMasterDataIndex for empty GdiMasterDataIndex initial value', () => {
        const formGroup = service.createGdiMasterDataIndexFormGroup();

        const gdiMasterDataIndex = service.getGdiMasterDataIndex(formGroup) as any;

        expect(gdiMasterDataIndex).toMatchObject({});
      });

      it('should return IGdiMasterDataIndex', () => {
        const formGroup = service.createGdiMasterDataIndexFormGroup(sampleWithRequiredData);

        const gdiMasterDataIndex = service.getGdiMasterDataIndex(formGroup) as any;

        expect(gdiMasterDataIndex).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IGdiMasterDataIndex should not enable id FormControl', () => {
        const formGroup = service.createGdiMasterDataIndexFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewGdiMasterDataIndex should disable id FormControl', () => {
        const formGroup = service.createGdiMasterDataIndexFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

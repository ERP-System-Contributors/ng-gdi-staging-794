import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../gdi-transaction-data-index.test-samples';

import { GdiTransactionDataIndexFormService } from './gdi-transaction-data-index-form.service';

describe('GdiTransactionDataIndex Form Service', () => {
  let service: GdiTransactionDataIndexFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GdiTransactionDataIndexFormService);
  });

  describe('Service methods', () => {
    describe('createGdiTransactionDataIndexFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createGdiTransactionDataIndexFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            datasetName: expect.any(Object),
            databaseName: expect.any(Object),
            updateFrequency: expect.any(Object),
            datasetBehavior: expect.any(Object),
            minimumDatarowsPerRequest: expect.any(Object),
            maximumDataRowsPerRequest: expect.any(Object),
            datasetDescription: expect.any(Object),
            dataTemplate: expect.any(Object),
            masterDataItems: expect.any(Object),
          })
        );
      });

      it('passing IGdiTransactionDataIndex should create a new form with FormGroup', () => {
        const formGroup = service.createGdiTransactionDataIndexFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            datasetName: expect.any(Object),
            databaseName: expect.any(Object),
            updateFrequency: expect.any(Object),
            datasetBehavior: expect.any(Object),
            minimumDatarowsPerRequest: expect.any(Object),
            maximumDataRowsPerRequest: expect.any(Object),
            datasetDescription: expect.any(Object),
            dataTemplate: expect.any(Object),
            masterDataItems: expect.any(Object),
          })
        );
      });
    });

    describe('getGdiTransactionDataIndex', () => {
      it('should return NewGdiTransactionDataIndex for default GdiTransactionDataIndex initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createGdiTransactionDataIndexFormGroup(sampleWithNewData);

        const gdiTransactionDataIndex = service.getGdiTransactionDataIndex(formGroup) as any;

        expect(gdiTransactionDataIndex).toMatchObject(sampleWithNewData);
      });

      it('should return NewGdiTransactionDataIndex for empty GdiTransactionDataIndex initial value', () => {
        const formGroup = service.createGdiTransactionDataIndexFormGroup();

        const gdiTransactionDataIndex = service.getGdiTransactionDataIndex(formGroup) as any;

        expect(gdiTransactionDataIndex).toMatchObject({});
      });

      it('should return IGdiTransactionDataIndex', () => {
        const formGroup = service.createGdiTransactionDataIndexFormGroup(sampleWithRequiredData);

        const gdiTransactionDataIndex = service.getGdiTransactionDataIndex(formGroup) as any;

        expect(gdiTransactionDataIndex).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IGdiTransactionDataIndex should not enable id FormControl', () => {
        const formGroup = service.createGdiTransactionDataIndexFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewGdiTransactionDataIndex should disable id FormControl', () => {
        const formGroup = service.createGdiTransactionDataIndexFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

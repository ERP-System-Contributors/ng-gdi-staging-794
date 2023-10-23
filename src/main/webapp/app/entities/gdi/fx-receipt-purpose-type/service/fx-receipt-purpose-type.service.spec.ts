import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFxReceiptPurposeType } from '../fx-receipt-purpose-type.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../fx-receipt-purpose-type.test-samples';

import { FxReceiptPurposeTypeService } from './fx-receipt-purpose-type.service';

const requireRestSample: IFxReceiptPurposeType = {
  ...sampleWithRequiredData,
};

describe('FxReceiptPurposeType Service', () => {
  let service: FxReceiptPurposeTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IFxReceiptPurposeType | IFxReceiptPurposeType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FxReceiptPurposeTypeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a FxReceiptPurposeType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const fxReceiptPurposeType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(fxReceiptPurposeType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FxReceiptPurposeType', () => {
      const fxReceiptPurposeType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(fxReceiptPurposeType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FxReceiptPurposeType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FxReceiptPurposeType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FxReceiptPurposeType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFxReceiptPurposeTypeToCollectionIfMissing', () => {
      it('should add a FxReceiptPurposeType to an empty array', () => {
        const fxReceiptPurposeType: IFxReceiptPurposeType = sampleWithRequiredData;
        expectedResult = service.addFxReceiptPurposeTypeToCollectionIfMissing([], fxReceiptPurposeType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fxReceiptPurposeType);
      });

      it('should not add a FxReceiptPurposeType to an array that contains it', () => {
        const fxReceiptPurposeType: IFxReceiptPurposeType = sampleWithRequiredData;
        const fxReceiptPurposeTypeCollection: IFxReceiptPurposeType[] = [
          {
            ...fxReceiptPurposeType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFxReceiptPurposeTypeToCollectionIfMissing(fxReceiptPurposeTypeCollection, fxReceiptPurposeType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FxReceiptPurposeType to an array that doesn't contain it", () => {
        const fxReceiptPurposeType: IFxReceiptPurposeType = sampleWithRequiredData;
        const fxReceiptPurposeTypeCollection: IFxReceiptPurposeType[] = [sampleWithPartialData];
        expectedResult = service.addFxReceiptPurposeTypeToCollectionIfMissing(fxReceiptPurposeTypeCollection, fxReceiptPurposeType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fxReceiptPurposeType);
      });

      it('should add only unique FxReceiptPurposeType to an array', () => {
        const fxReceiptPurposeTypeArray: IFxReceiptPurposeType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const fxReceiptPurposeTypeCollection: IFxReceiptPurposeType[] = [sampleWithRequiredData];
        expectedResult = service.addFxReceiptPurposeTypeToCollectionIfMissing(fxReceiptPurposeTypeCollection, ...fxReceiptPurposeTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const fxReceiptPurposeType: IFxReceiptPurposeType = sampleWithRequiredData;
        const fxReceiptPurposeType2: IFxReceiptPurposeType = sampleWithPartialData;
        expectedResult = service.addFxReceiptPurposeTypeToCollectionIfMissing([], fxReceiptPurposeType, fxReceiptPurposeType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fxReceiptPurposeType);
        expect(expectedResult).toContain(fxReceiptPurposeType2);
      });

      it('should accept null and undefined values', () => {
        const fxReceiptPurposeType: IFxReceiptPurposeType = sampleWithRequiredData;
        expectedResult = service.addFxReceiptPurposeTypeToCollectionIfMissing([], null, fxReceiptPurposeType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fxReceiptPurposeType);
      });

      it('should return initial array if no FxReceiptPurposeType is added', () => {
        const fxReceiptPurposeTypeCollection: IFxReceiptPurposeType[] = [sampleWithRequiredData];
        expectedResult = service.addFxReceiptPurposeTypeToCollectionIfMissing(fxReceiptPurposeTypeCollection, undefined, null);
        expect(expectedResult).toEqual(fxReceiptPurposeTypeCollection);
      });
    });

    describe('compareFxReceiptPurposeType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFxReceiptPurposeType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFxReceiptPurposeType(entity1, entity2);
        const compareResult2 = service.compareFxReceiptPurposeType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFxReceiptPurposeType(entity1, entity2);
        const compareResult2 = service.compareFxReceiptPurposeType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFxReceiptPurposeType(entity1, entity2);
        const compareResult2 = service.compareFxReceiptPurposeType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IGdiTransactionDataIndex } from '../gdi-transaction-data-index.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../gdi-transaction-data-index.test-samples';

import { GdiTransactionDataIndexService } from './gdi-transaction-data-index.service';

const requireRestSample: IGdiTransactionDataIndex = {
  ...sampleWithRequiredData,
};

describe('GdiTransactionDataIndex Service', () => {
  let service: GdiTransactionDataIndexService;
  let httpMock: HttpTestingController;
  let expectedResult: IGdiTransactionDataIndex | IGdiTransactionDataIndex[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(GdiTransactionDataIndexService);
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

    it('should create a GdiTransactionDataIndex', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const gdiTransactionDataIndex = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(gdiTransactionDataIndex).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a GdiTransactionDataIndex', () => {
      const gdiTransactionDataIndex = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(gdiTransactionDataIndex).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a GdiTransactionDataIndex', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of GdiTransactionDataIndex', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a GdiTransactionDataIndex', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addGdiTransactionDataIndexToCollectionIfMissing', () => {
      it('should add a GdiTransactionDataIndex to an empty array', () => {
        const gdiTransactionDataIndex: IGdiTransactionDataIndex = sampleWithRequiredData;
        expectedResult = service.addGdiTransactionDataIndexToCollectionIfMissing([], gdiTransactionDataIndex);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(gdiTransactionDataIndex);
      });

      it('should not add a GdiTransactionDataIndex to an array that contains it', () => {
        const gdiTransactionDataIndex: IGdiTransactionDataIndex = sampleWithRequiredData;
        const gdiTransactionDataIndexCollection: IGdiTransactionDataIndex[] = [
          {
            ...gdiTransactionDataIndex,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addGdiTransactionDataIndexToCollectionIfMissing(
          gdiTransactionDataIndexCollection,
          gdiTransactionDataIndex
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a GdiTransactionDataIndex to an array that doesn't contain it", () => {
        const gdiTransactionDataIndex: IGdiTransactionDataIndex = sampleWithRequiredData;
        const gdiTransactionDataIndexCollection: IGdiTransactionDataIndex[] = [sampleWithPartialData];
        expectedResult = service.addGdiTransactionDataIndexToCollectionIfMissing(
          gdiTransactionDataIndexCollection,
          gdiTransactionDataIndex
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(gdiTransactionDataIndex);
      });

      it('should add only unique GdiTransactionDataIndex to an array', () => {
        const gdiTransactionDataIndexArray: IGdiTransactionDataIndex[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const gdiTransactionDataIndexCollection: IGdiTransactionDataIndex[] = [sampleWithRequiredData];
        expectedResult = service.addGdiTransactionDataIndexToCollectionIfMissing(
          gdiTransactionDataIndexCollection,
          ...gdiTransactionDataIndexArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const gdiTransactionDataIndex: IGdiTransactionDataIndex = sampleWithRequiredData;
        const gdiTransactionDataIndex2: IGdiTransactionDataIndex = sampleWithPartialData;
        expectedResult = service.addGdiTransactionDataIndexToCollectionIfMissing([], gdiTransactionDataIndex, gdiTransactionDataIndex2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(gdiTransactionDataIndex);
        expect(expectedResult).toContain(gdiTransactionDataIndex2);
      });

      it('should accept null and undefined values', () => {
        const gdiTransactionDataIndex: IGdiTransactionDataIndex = sampleWithRequiredData;
        expectedResult = service.addGdiTransactionDataIndexToCollectionIfMissing([], null, gdiTransactionDataIndex, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(gdiTransactionDataIndex);
      });

      it('should return initial array if no GdiTransactionDataIndex is added', () => {
        const gdiTransactionDataIndexCollection: IGdiTransactionDataIndex[] = [sampleWithRequiredData];
        expectedResult = service.addGdiTransactionDataIndexToCollectionIfMissing(gdiTransactionDataIndexCollection, undefined, null);
        expect(expectedResult).toEqual(gdiTransactionDataIndexCollection);
      });
    });

    describe('compareGdiTransactionDataIndex', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareGdiTransactionDataIndex(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareGdiTransactionDataIndex(entity1, entity2);
        const compareResult2 = service.compareGdiTransactionDataIndex(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareGdiTransactionDataIndex(entity1, entity2);
        const compareResult2 = service.compareGdiTransactionDataIndex(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareGdiTransactionDataIndex(entity1, entity2);
        const compareResult2 = service.compareGdiTransactionDataIndex(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrbProductServiceFeeType } from '../crb-product-service-fee-type.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../crb-product-service-fee-type.test-samples';

import { CrbProductServiceFeeTypeService } from './crb-product-service-fee-type.service';

const requireRestSample: ICrbProductServiceFeeType = {
  ...sampleWithRequiredData,
};

describe('CrbProductServiceFeeType Service', () => {
  let service: CrbProductServiceFeeTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrbProductServiceFeeType | ICrbProductServiceFeeType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrbProductServiceFeeTypeService);
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

    it('should create a CrbProductServiceFeeType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crbProductServiceFeeType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crbProductServiceFeeType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrbProductServiceFeeType', () => {
      const crbProductServiceFeeType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crbProductServiceFeeType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrbProductServiceFeeType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrbProductServiceFeeType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrbProductServiceFeeType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrbProductServiceFeeTypeToCollectionIfMissing', () => {
      it('should add a CrbProductServiceFeeType to an empty array', () => {
        const crbProductServiceFeeType: ICrbProductServiceFeeType = sampleWithRequiredData;
        expectedResult = service.addCrbProductServiceFeeTypeToCollectionIfMissing([], crbProductServiceFeeType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbProductServiceFeeType);
      });

      it('should not add a CrbProductServiceFeeType to an array that contains it', () => {
        const crbProductServiceFeeType: ICrbProductServiceFeeType = sampleWithRequiredData;
        const crbProductServiceFeeTypeCollection: ICrbProductServiceFeeType[] = [
          {
            ...crbProductServiceFeeType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrbProductServiceFeeTypeToCollectionIfMissing(
          crbProductServiceFeeTypeCollection,
          crbProductServiceFeeType
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrbProductServiceFeeType to an array that doesn't contain it", () => {
        const crbProductServiceFeeType: ICrbProductServiceFeeType = sampleWithRequiredData;
        const crbProductServiceFeeTypeCollection: ICrbProductServiceFeeType[] = [sampleWithPartialData];
        expectedResult = service.addCrbProductServiceFeeTypeToCollectionIfMissing(
          crbProductServiceFeeTypeCollection,
          crbProductServiceFeeType
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbProductServiceFeeType);
      });

      it('should add only unique CrbProductServiceFeeType to an array', () => {
        const crbProductServiceFeeTypeArray: ICrbProductServiceFeeType[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const crbProductServiceFeeTypeCollection: ICrbProductServiceFeeType[] = [sampleWithRequiredData];
        expectedResult = service.addCrbProductServiceFeeTypeToCollectionIfMissing(
          crbProductServiceFeeTypeCollection,
          ...crbProductServiceFeeTypeArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crbProductServiceFeeType: ICrbProductServiceFeeType = sampleWithRequiredData;
        const crbProductServiceFeeType2: ICrbProductServiceFeeType = sampleWithPartialData;
        expectedResult = service.addCrbProductServiceFeeTypeToCollectionIfMissing([], crbProductServiceFeeType, crbProductServiceFeeType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbProductServiceFeeType);
        expect(expectedResult).toContain(crbProductServiceFeeType2);
      });

      it('should accept null and undefined values', () => {
        const crbProductServiceFeeType: ICrbProductServiceFeeType = sampleWithRequiredData;
        expectedResult = service.addCrbProductServiceFeeTypeToCollectionIfMissing([], null, crbProductServiceFeeType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbProductServiceFeeType);
      });

      it('should return initial array if no CrbProductServiceFeeType is added', () => {
        const crbProductServiceFeeTypeCollection: ICrbProductServiceFeeType[] = [sampleWithRequiredData];
        expectedResult = service.addCrbProductServiceFeeTypeToCollectionIfMissing(crbProductServiceFeeTypeCollection, undefined, null);
        expect(expectedResult).toEqual(crbProductServiceFeeTypeCollection);
      });
    });

    describe('compareCrbProductServiceFeeType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrbProductServiceFeeType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrbProductServiceFeeType(entity1, entity2);
        const compareResult2 = service.compareCrbProductServiceFeeType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrbProductServiceFeeType(entity1, entity2);
        const compareResult2 = service.compareCrbProductServiceFeeType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrbProductServiceFeeType(entity1, entity2);
        const compareResult2 = service.compareCrbProductServiceFeeType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

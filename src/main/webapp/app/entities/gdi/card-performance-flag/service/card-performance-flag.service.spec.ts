import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICardPerformanceFlag } from '../card-performance-flag.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../card-performance-flag.test-samples';

import { CardPerformanceFlagService } from './card-performance-flag.service';

const requireRestSample: ICardPerformanceFlag = {
  ...sampleWithRequiredData,
};

describe('CardPerformanceFlag Service', () => {
  let service: CardPerformanceFlagService;
  let httpMock: HttpTestingController;
  let expectedResult: ICardPerformanceFlag | ICardPerformanceFlag[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CardPerformanceFlagService);
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

    it('should create a CardPerformanceFlag', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const cardPerformanceFlag = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cardPerformanceFlag).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CardPerformanceFlag', () => {
      const cardPerformanceFlag = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cardPerformanceFlag).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CardPerformanceFlag', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CardPerformanceFlag', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CardPerformanceFlag', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCardPerformanceFlagToCollectionIfMissing', () => {
      it('should add a CardPerformanceFlag to an empty array', () => {
        const cardPerformanceFlag: ICardPerformanceFlag = sampleWithRequiredData;
        expectedResult = service.addCardPerformanceFlagToCollectionIfMissing([], cardPerformanceFlag);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cardPerformanceFlag);
      });

      it('should not add a CardPerformanceFlag to an array that contains it', () => {
        const cardPerformanceFlag: ICardPerformanceFlag = sampleWithRequiredData;
        const cardPerformanceFlagCollection: ICardPerformanceFlag[] = [
          {
            ...cardPerformanceFlag,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCardPerformanceFlagToCollectionIfMissing(cardPerformanceFlagCollection, cardPerformanceFlag);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CardPerformanceFlag to an array that doesn't contain it", () => {
        const cardPerformanceFlag: ICardPerformanceFlag = sampleWithRequiredData;
        const cardPerformanceFlagCollection: ICardPerformanceFlag[] = [sampleWithPartialData];
        expectedResult = service.addCardPerformanceFlagToCollectionIfMissing(cardPerformanceFlagCollection, cardPerformanceFlag);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cardPerformanceFlag);
      });

      it('should add only unique CardPerformanceFlag to an array', () => {
        const cardPerformanceFlagArray: ICardPerformanceFlag[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cardPerformanceFlagCollection: ICardPerformanceFlag[] = [sampleWithRequiredData];
        expectedResult = service.addCardPerformanceFlagToCollectionIfMissing(cardPerformanceFlagCollection, ...cardPerformanceFlagArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cardPerformanceFlag: ICardPerformanceFlag = sampleWithRequiredData;
        const cardPerformanceFlag2: ICardPerformanceFlag = sampleWithPartialData;
        expectedResult = service.addCardPerformanceFlagToCollectionIfMissing([], cardPerformanceFlag, cardPerformanceFlag2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cardPerformanceFlag);
        expect(expectedResult).toContain(cardPerformanceFlag2);
      });

      it('should accept null and undefined values', () => {
        const cardPerformanceFlag: ICardPerformanceFlag = sampleWithRequiredData;
        expectedResult = service.addCardPerformanceFlagToCollectionIfMissing([], null, cardPerformanceFlag, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cardPerformanceFlag);
      });

      it('should return initial array if no CardPerformanceFlag is added', () => {
        const cardPerformanceFlagCollection: ICardPerformanceFlag[] = [sampleWithRequiredData];
        expectedResult = service.addCardPerformanceFlagToCollectionIfMissing(cardPerformanceFlagCollection, undefined, null);
        expect(expectedResult).toEqual(cardPerformanceFlagCollection);
      });
    });

    describe('compareCardPerformanceFlag', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCardPerformanceFlag(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCardPerformanceFlag(entity1, entity2);
        const compareResult2 = service.compareCardPerformanceFlag(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCardPerformanceFlag(entity1, entity2);
        const compareResult2 = service.compareCardPerformanceFlag(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCardPerformanceFlag(entity1, entity2);
        const compareResult2 = service.compareCardPerformanceFlag(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

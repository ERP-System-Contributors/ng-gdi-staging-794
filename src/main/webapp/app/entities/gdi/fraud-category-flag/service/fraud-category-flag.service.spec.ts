import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFraudCategoryFlag } from '../fraud-category-flag.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../fraud-category-flag.test-samples';

import { FraudCategoryFlagService } from './fraud-category-flag.service';

const requireRestSample: IFraudCategoryFlag = {
  ...sampleWithRequiredData,
};

describe('FraudCategoryFlag Service', () => {
  let service: FraudCategoryFlagService;
  let httpMock: HttpTestingController;
  let expectedResult: IFraudCategoryFlag | IFraudCategoryFlag[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FraudCategoryFlagService);
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

    it('should create a FraudCategoryFlag', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const fraudCategoryFlag = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(fraudCategoryFlag).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FraudCategoryFlag', () => {
      const fraudCategoryFlag = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(fraudCategoryFlag).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FraudCategoryFlag', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FraudCategoryFlag', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FraudCategoryFlag', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFraudCategoryFlagToCollectionIfMissing', () => {
      it('should add a FraudCategoryFlag to an empty array', () => {
        const fraudCategoryFlag: IFraudCategoryFlag = sampleWithRequiredData;
        expectedResult = service.addFraudCategoryFlagToCollectionIfMissing([], fraudCategoryFlag);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fraudCategoryFlag);
      });

      it('should not add a FraudCategoryFlag to an array that contains it', () => {
        const fraudCategoryFlag: IFraudCategoryFlag = sampleWithRequiredData;
        const fraudCategoryFlagCollection: IFraudCategoryFlag[] = [
          {
            ...fraudCategoryFlag,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFraudCategoryFlagToCollectionIfMissing(fraudCategoryFlagCollection, fraudCategoryFlag);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FraudCategoryFlag to an array that doesn't contain it", () => {
        const fraudCategoryFlag: IFraudCategoryFlag = sampleWithRequiredData;
        const fraudCategoryFlagCollection: IFraudCategoryFlag[] = [sampleWithPartialData];
        expectedResult = service.addFraudCategoryFlagToCollectionIfMissing(fraudCategoryFlagCollection, fraudCategoryFlag);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fraudCategoryFlag);
      });

      it('should add only unique FraudCategoryFlag to an array', () => {
        const fraudCategoryFlagArray: IFraudCategoryFlag[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const fraudCategoryFlagCollection: IFraudCategoryFlag[] = [sampleWithRequiredData];
        expectedResult = service.addFraudCategoryFlagToCollectionIfMissing(fraudCategoryFlagCollection, ...fraudCategoryFlagArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const fraudCategoryFlag: IFraudCategoryFlag = sampleWithRequiredData;
        const fraudCategoryFlag2: IFraudCategoryFlag = sampleWithPartialData;
        expectedResult = service.addFraudCategoryFlagToCollectionIfMissing([], fraudCategoryFlag, fraudCategoryFlag2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fraudCategoryFlag);
        expect(expectedResult).toContain(fraudCategoryFlag2);
      });

      it('should accept null and undefined values', () => {
        const fraudCategoryFlag: IFraudCategoryFlag = sampleWithRequiredData;
        expectedResult = service.addFraudCategoryFlagToCollectionIfMissing([], null, fraudCategoryFlag, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fraudCategoryFlag);
      });

      it('should return initial array if no FraudCategoryFlag is added', () => {
        const fraudCategoryFlagCollection: IFraudCategoryFlag[] = [sampleWithRequiredData];
        expectedResult = service.addFraudCategoryFlagToCollectionIfMissing(fraudCategoryFlagCollection, undefined, null);
        expect(expectedResult).toEqual(fraudCategoryFlagCollection);
      });
    });

    describe('compareFraudCategoryFlag', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFraudCategoryFlag(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFraudCategoryFlag(entity1, entity2);
        const compareResult2 = service.compareFraudCategoryFlag(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFraudCategoryFlag(entity1, entity2);
        const compareResult2 = service.compareFraudCategoryFlag(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFraudCategoryFlag(entity1, entity2);
        const compareResult2 = service.compareFraudCategoryFlag(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

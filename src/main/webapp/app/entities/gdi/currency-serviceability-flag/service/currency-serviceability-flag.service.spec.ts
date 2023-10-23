import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICurrencyServiceabilityFlag } from '../currency-serviceability-flag.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../currency-serviceability-flag.test-samples';

import { CurrencyServiceabilityFlagService } from './currency-serviceability-flag.service';

const requireRestSample: ICurrencyServiceabilityFlag = {
  ...sampleWithRequiredData,
};

describe('CurrencyServiceabilityFlag Service', () => {
  let service: CurrencyServiceabilityFlagService;
  let httpMock: HttpTestingController;
  let expectedResult: ICurrencyServiceabilityFlag | ICurrencyServiceabilityFlag[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CurrencyServiceabilityFlagService);
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

    it('should create a CurrencyServiceabilityFlag', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const currencyServiceabilityFlag = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(currencyServiceabilityFlag).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CurrencyServiceabilityFlag', () => {
      const currencyServiceabilityFlag = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(currencyServiceabilityFlag).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CurrencyServiceabilityFlag', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CurrencyServiceabilityFlag', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CurrencyServiceabilityFlag', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCurrencyServiceabilityFlagToCollectionIfMissing', () => {
      it('should add a CurrencyServiceabilityFlag to an empty array', () => {
        const currencyServiceabilityFlag: ICurrencyServiceabilityFlag = sampleWithRequiredData;
        expectedResult = service.addCurrencyServiceabilityFlagToCollectionIfMissing([], currencyServiceabilityFlag);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(currencyServiceabilityFlag);
      });

      it('should not add a CurrencyServiceabilityFlag to an array that contains it', () => {
        const currencyServiceabilityFlag: ICurrencyServiceabilityFlag = sampleWithRequiredData;
        const currencyServiceabilityFlagCollection: ICurrencyServiceabilityFlag[] = [
          {
            ...currencyServiceabilityFlag,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCurrencyServiceabilityFlagToCollectionIfMissing(
          currencyServiceabilityFlagCollection,
          currencyServiceabilityFlag
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CurrencyServiceabilityFlag to an array that doesn't contain it", () => {
        const currencyServiceabilityFlag: ICurrencyServiceabilityFlag = sampleWithRequiredData;
        const currencyServiceabilityFlagCollection: ICurrencyServiceabilityFlag[] = [sampleWithPartialData];
        expectedResult = service.addCurrencyServiceabilityFlagToCollectionIfMissing(
          currencyServiceabilityFlagCollection,
          currencyServiceabilityFlag
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(currencyServiceabilityFlag);
      });

      it('should add only unique CurrencyServiceabilityFlag to an array', () => {
        const currencyServiceabilityFlagArray: ICurrencyServiceabilityFlag[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const currencyServiceabilityFlagCollection: ICurrencyServiceabilityFlag[] = [sampleWithRequiredData];
        expectedResult = service.addCurrencyServiceabilityFlagToCollectionIfMissing(
          currencyServiceabilityFlagCollection,
          ...currencyServiceabilityFlagArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const currencyServiceabilityFlag: ICurrencyServiceabilityFlag = sampleWithRequiredData;
        const currencyServiceabilityFlag2: ICurrencyServiceabilityFlag = sampleWithPartialData;
        expectedResult = service.addCurrencyServiceabilityFlagToCollectionIfMissing(
          [],
          currencyServiceabilityFlag,
          currencyServiceabilityFlag2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(currencyServiceabilityFlag);
        expect(expectedResult).toContain(currencyServiceabilityFlag2);
      });

      it('should accept null and undefined values', () => {
        const currencyServiceabilityFlag: ICurrencyServiceabilityFlag = sampleWithRequiredData;
        expectedResult = service.addCurrencyServiceabilityFlagToCollectionIfMissing([], null, currencyServiceabilityFlag, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(currencyServiceabilityFlag);
      });

      it('should return initial array if no CurrencyServiceabilityFlag is added', () => {
        const currencyServiceabilityFlagCollection: ICurrencyServiceabilityFlag[] = [sampleWithRequiredData];
        expectedResult = service.addCurrencyServiceabilityFlagToCollectionIfMissing(currencyServiceabilityFlagCollection, undefined, null);
        expect(expectedResult).toEqual(currencyServiceabilityFlagCollection);
      });
    });

    describe('compareCurrencyServiceabilityFlag', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCurrencyServiceabilityFlag(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCurrencyServiceabilityFlag(entity1, entity2);
        const compareResult2 = service.compareCurrencyServiceabilityFlag(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCurrencyServiceabilityFlag(entity1, entity2);
        const compareResult2 = service.compareCurrencyServiceabilityFlag(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCurrencyServiceabilityFlag(entity1, entity2);
        const compareResult2 = service.compareCurrencyServiceabilityFlag(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

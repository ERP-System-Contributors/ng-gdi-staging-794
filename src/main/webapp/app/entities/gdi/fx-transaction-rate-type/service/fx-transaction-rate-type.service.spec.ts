import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFxTransactionRateType } from '../fx-transaction-rate-type.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../fx-transaction-rate-type.test-samples';

import { FxTransactionRateTypeService } from './fx-transaction-rate-type.service';

const requireRestSample: IFxTransactionRateType = {
  ...sampleWithRequiredData,
};

describe('FxTransactionRateType Service', () => {
  let service: FxTransactionRateTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IFxTransactionRateType | IFxTransactionRateType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FxTransactionRateTypeService);
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

    it('should create a FxTransactionRateType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const fxTransactionRateType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(fxTransactionRateType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FxTransactionRateType', () => {
      const fxTransactionRateType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(fxTransactionRateType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FxTransactionRateType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FxTransactionRateType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FxTransactionRateType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFxTransactionRateTypeToCollectionIfMissing', () => {
      it('should add a FxTransactionRateType to an empty array', () => {
        const fxTransactionRateType: IFxTransactionRateType = sampleWithRequiredData;
        expectedResult = service.addFxTransactionRateTypeToCollectionIfMissing([], fxTransactionRateType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fxTransactionRateType);
      });

      it('should not add a FxTransactionRateType to an array that contains it', () => {
        const fxTransactionRateType: IFxTransactionRateType = sampleWithRequiredData;
        const fxTransactionRateTypeCollection: IFxTransactionRateType[] = [
          {
            ...fxTransactionRateType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFxTransactionRateTypeToCollectionIfMissing(fxTransactionRateTypeCollection, fxTransactionRateType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FxTransactionRateType to an array that doesn't contain it", () => {
        const fxTransactionRateType: IFxTransactionRateType = sampleWithRequiredData;
        const fxTransactionRateTypeCollection: IFxTransactionRateType[] = [sampleWithPartialData];
        expectedResult = service.addFxTransactionRateTypeToCollectionIfMissing(fxTransactionRateTypeCollection, fxTransactionRateType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fxTransactionRateType);
      });

      it('should add only unique FxTransactionRateType to an array', () => {
        const fxTransactionRateTypeArray: IFxTransactionRateType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const fxTransactionRateTypeCollection: IFxTransactionRateType[] = [sampleWithRequiredData];
        expectedResult = service.addFxTransactionRateTypeToCollectionIfMissing(
          fxTransactionRateTypeCollection,
          ...fxTransactionRateTypeArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const fxTransactionRateType: IFxTransactionRateType = sampleWithRequiredData;
        const fxTransactionRateType2: IFxTransactionRateType = sampleWithPartialData;
        expectedResult = service.addFxTransactionRateTypeToCollectionIfMissing([], fxTransactionRateType, fxTransactionRateType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fxTransactionRateType);
        expect(expectedResult).toContain(fxTransactionRateType2);
      });

      it('should accept null and undefined values', () => {
        const fxTransactionRateType: IFxTransactionRateType = sampleWithRequiredData;
        expectedResult = service.addFxTransactionRateTypeToCollectionIfMissing([], null, fxTransactionRateType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fxTransactionRateType);
      });

      it('should return initial array if no FxTransactionRateType is added', () => {
        const fxTransactionRateTypeCollection: IFxTransactionRateType[] = [sampleWithRequiredData];
        expectedResult = service.addFxTransactionRateTypeToCollectionIfMissing(fxTransactionRateTypeCollection, undefined, null);
        expect(expectedResult).toEqual(fxTransactionRateTypeCollection);
      });
    });

    describe('compareFxTransactionRateType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFxTransactionRateType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFxTransactionRateType(entity1, entity2);
        const compareResult2 = service.compareFxTransactionRateType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFxTransactionRateType(entity1, entity2);
        const compareResult2 = service.compareFxTransactionRateType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFxTransactionRateType(entity1, entity2);
        const compareResult2 = service.compareFxTransactionRateType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

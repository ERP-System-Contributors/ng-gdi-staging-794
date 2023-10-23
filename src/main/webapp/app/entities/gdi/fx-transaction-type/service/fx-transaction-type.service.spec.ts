import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFxTransactionType } from '../fx-transaction-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../fx-transaction-type.test-samples';

import { FxTransactionTypeService } from './fx-transaction-type.service';

const requireRestSample: IFxTransactionType = {
  ...sampleWithRequiredData,
};

describe('FxTransactionType Service', () => {
  let service: FxTransactionTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IFxTransactionType | IFxTransactionType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FxTransactionTypeService);
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

    it('should create a FxTransactionType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const fxTransactionType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(fxTransactionType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FxTransactionType', () => {
      const fxTransactionType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(fxTransactionType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FxTransactionType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FxTransactionType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FxTransactionType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFxTransactionTypeToCollectionIfMissing', () => {
      it('should add a FxTransactionType to an empty array', () => {
        const fxTransactionType: IFxTransactionType = sampleWithRequiredData;
        expectedResult = service.addFxTransactionTypeToCollectionIfMissing([], fxTransactionType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fxTransactionType);
      });

      it('should not add a FxTransactionType to an array that contains it', () => {
        const fxTransactionType: IFxTransactionType = sampleWithRequiredData;
        const fxTransactionTypeCollection: IFxTransactionType[] = [
          {
            ...fxTransactionType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFxTransactionTypeToCollectionIfMissing(fxTransactionTypeCollection, fxTransactionType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FxTransactionType to an array that doesn't contain it", () => {
        const fxTransactionType: IFxTransactionType = sampleWithRequiredData;
        const fxTransactionTypeCollection: IFxTransactionType[] = [sampleWithPartialData];
        expectedResult = service.addFxTransactionTypeToCollectionIfMissing(fxTransactionTypeCollection, fxTransactionType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fxTransactionType);
      });

      it('should add only unique FxTransactionType to an array', () => {
        const fxTransactionTypeArray: IFxTransactionType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const fxTransactionTypeCollection: IFxTransactionType[] = [sampleWithRequiredData];
        expectedResult = service.addFxTransactionTypeToCollectionIfMissing(fxTransactionTypeCollection, ...fxTransactionTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const fxTransactionType: IFxTransactionType = sampleWithRequiredData;
        const fxTransactionType2: IFxTransactionType = sampleWithPartialData;
        expectedResult = service.addFxTransactionTypeToCollectionIfMissing([], fxTransactionType, fxTransactionType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fxTransactionType);
        expect(expectedResult).toContain(fxTransactionType2);
      });

      it('should accept null and undefined values', () => {
        const fxTransactionType: IFxTransactionType = sampleWithRequiredData;
        expectedResult = service.addFxTransactionTypeToCollectionIfMissing([], null, fxTransactionType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fxTransactionType);
      });

      it('should return initial array if no FxTransactionType is added', () => {
        const fxTransactionTypeCollection: IFxTransactionType[] = [sampleWithRequiredData];
        expectedResult = service.addFxTransactionTypeToCollectionIfMissing(fxTransactionTypeCollection, undefined, null);
        expect(expectedResult).toEqual(fxTransactionTypeCollection);
      });
    });

    describe('compareFxTransactionType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFxTransactionType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFxTransactionType(entity1, entity2);
        const compareResult2 = service.compareFxTransactionType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFxTransactionType(entity1, entity2);
        const compareResult2 = service.compareFxTransactionType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFxTransactionType(entity1, entity2);
        const compareResult2 = service.compareFxTransactionType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICounterpartyType } from '../counterparty-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../counterparty-type.test-samples';

import { CounterpartyTypeService } from './counterparty-type.service';

const requireRestSample: ICounterpartyType = {
  ...sampleWithRequiredData,
};

describe('CounterpartyType Service', () => {
  let service: CounterpartyTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: ICounterpartyType | ICounterpartyType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CounterpartyTypeService);
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

    it('should create a CounterpartyType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const counterpartyType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(counterpartyType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CounterpartyType', () => {
      const counterpartyType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(counterpartyType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CounterpartyType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CounterpartyType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CounterpartyType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCounterpartyTypeToCollectionIfMissing', () => {
      it('should add a CounterpartyType to an empty array', () => {
        const counterpartyType: ICounterpartyType = sampleWithRequiredData;
        expectedResult = service.addCounterpartyTypeToCollectionIfMissing([], counterpartyType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(counterpartyType);
      });

      it('should not add a CounterpartyType to an array that contains it', () => {
        const counterpartyType: ICounterpartyType = sampleWithRequiredData;
        const counterpartyTypeCollection: ICounterpartyType[] = [
          {
            ...counterpartyType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCounterpartyTypeToCollectionIfMissing(counterpartyTypeCollection, counterpartyType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CounterpartyType to an array that doesn't contain it", () => {
        const counterpartyType: ICounterpartyType = sampleWithRequiredData;
        const counterpartyTypeCollection: ICounterpartyType[] = [sampleWithPartialData];
        expectedResult = service.addCounterpartyTypeToCollectionIfMissing(counterpartyTypeCollection, counterpartyType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(counterpartyType);
      });

      it('should add only unique CounterpartyType to an array', () => {
        const counterpartyTypeArray: ICounterpartyType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const counterpartyTypeCollection: ICounterpartyType[] = [sampleWithRequiredData];
        expectedResult = service.addCounterpartyTypeToCollectionIfMissing(counterpartyTypeCollection, ...counterpartyTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const counterpartyType: ICounterpartyType = sampleWithRequiredData;
        const counterpartyType2: ICounterpartyType = sampleWithPartialData;
        expectedResult = service.addCounterpartyTypeToCollectionIfMissing([], counterpartyType, counterpartyType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(counterpartyType);
        expect(expectedResult).toContain(counterpartyType2);
      });

      it('should accept null and undefined values', () => {
        const counterpartyType: ICounterpartyType = sampleWithRequiredData;
        expectedResult = service.addCounterpartyTypeToCollectionIfMissing([], null, counterpartyType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(counterpartyType);
      });

      it('should return initial array if no CounterpartyType is added', () => {
        const counterpartyTypeCollection: ICounterpartyType[] = [sampleWithRequiredData];
        expectedResult = service.addCounterpartyTypeToCollectionIfMissing(counterpartyTypeCollection, undefined, null);
        expect(expectedResult).toEqual(counterpartyTypeCollection);
      });
    });

    describe('compareCounterpartyType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCounterpartyType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCounterpartyType(entity1, entity2);
        const compareResult2 = service.compareCounterpartyType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCounterpartyType(entity1, entity2);
        const compareResult2 = service.compareCounterpartyType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCounterpartyType(entity1, entity2);
        const compareResult2 = service.compareCounterpartyType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

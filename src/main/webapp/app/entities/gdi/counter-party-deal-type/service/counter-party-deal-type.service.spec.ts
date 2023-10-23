import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICounterPartyDealType } from '../counter-party-deal-type.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../counter-party-deal-type.test-samples';

import { CounterPartyDealTypeService } from './counter-party-deal-type.service';

const requireRestSample: ICounterPartyDealType = {
  ...sampleWithRequiredData,
};

describe('CounterPartyDealType Service', () => {
  let service: CounterPartyDealTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: ICounterPartyDealType | ICounterPartyDealType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CounterPartyDealTypeService);
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

    it('should create a CounterPartyDealType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const counterPartyDealType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(counterPartyDealType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CounterPartyDealType', () => {
      const counterPartyDealType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(counterPartyDealType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CounterPartyDealType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CounterPartyDealType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CounterPartyDealType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCounterPartyDealTypeToCollectionIfMissing', () => {
      it('should add a CounterPartyDealType to an empty array', () => {
        const counterPartyDealType: ICounterPartyDealType = sampleWithRequiredData;
        expectedResult = service.addCounterPartyDealTypeToCollectionIfMissing([], counterPartyDealType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(counterPartyDealType);
      });

      it('should not add a CounterPartyDealType to an array that contains it', () => {
        const counterPartyDealType: ICounterPartyDealType = sampleWithRequiredData;
        const counterPartyDealTypeCollection: ICounterPartyDealType[] = [
          {
            ...counterPartyDealType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCounterPartyDealTypeToCollectionIfMissing(counterPartyDealTypeCollection, counterPartyDealType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CounterPartyDealType to an array that doesn't contain it", () => {
        const counterPartyDealType: ICounterPartyDealType = sampleWithRequiredData;
        const counterPartyDealTypeCollection: ICounterPartyDealType[] = [sampleWithPartialData];
        expectedResult = service.addCounterPartyDealTypeToCollectionIfMissing(counterPartyDealTypeCollection, counterPartyDealType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(counterPartyDealType);
      });

      it('should add only unique CounterPartyDealType to an array', () => {
        const counterPartyDealTypeArray: ICounterPartyDealType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const counterPartyDealTypeCollection: ICounterPartyDealType[] = [sampleWithRequiredData];
        expectedResult = service.addCounterPartyDealTypeToCollectionIfMissing(counterPartyDealTypeCollection, ...counterPartyDealTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const counterPartyDealType: ICounterPartyDealType = sampleWithRequiredData;
        const counterPartyDealType2: ICounterPartyDealType = sampleWithPartialData;
        expectedResult = service.addCounterPartyDealTypeToCollectionIfMissing([], counterPartyDealType, counterPartyDealType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(counterPartyDealType);
        expect(expectedResult).toContain(counterPartyDealType2);
      });

      it('should accept null and undefined values', () => {
        const counterPartyDealType: ICounterPartyDealType = sampleWithRequiredData;
        expectedResult = service.addCounterPartyDealTypeToCollectionIfMissing([], null, counterPartyDealType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(counterPartyDealType);
      });

      it('should return initial array if no CounterPartyDealType is added', () => {
        const counterPartyDealTypeCollection: ICounterPartyDealType[] = [sampleWithRequiredData];
        expectedResult = service.addCounterPartyDealTypeToCollectionIfMissing(counterPartyDealTypeCollection, undefined, null);
        expect(expectedResult).toEqual(counterPartyDealTypeCollection);
      });
    });

    describe('compareCounterPartyDealType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCounterPartyDealType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCounterPartyDealType(entity1, entity2);
        const compareResult2 = service.compareCounterPartyDealType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCounterPartyDealType(entity1, entity2);
        const compareResult2 = service.compareCounterPartyDealType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCounterPartyDealType(entity1, entity2);
        const compareResult2 = service.compareCounterPartyDealType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IKenyanCurrencyDenomination } from '../kenyan-currency-denomination.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../kenyan-currency-denomination.test-samples';

import { KenyanCurrencyDenominationService } from './kenyan-currency-denomination.service';

const requireRestSample: IKenyanCurrencyDenomination = {
  ...sampleWithRequiredData,
};

describe('KenyanCurrencyDenomination Service', () => {
  let service: KenyanCurrencyDenominationService;
  let httpMock: HttpTestingController;
  let expectedResult: IKenyanCurrencyDenomination | IKenyanCurrencyDenomination[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(KenyanCurrencyDenominationService);
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

    it('should create a KenyanCurrencyDenomination', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const kenyanCurrencyDenomination = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(kenyanCurrencyDenomination).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a KenyanCurrencyDenomination', () => {
      const kenyanCurrencyDenomination = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(kenyanCurrencyDenomination).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a KenyanCurrencyDenomination', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of KenyanCurrencyDenomination', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a KenyanCurrencyDenomination', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addKenyanCurrencyDenominationToCollectionIfMissing', () => {
      it('should add a KenyanCurrencyDenomination to an empty array', () => {
        const kenyanCurrencyDenomination: IKenyanCurrencyDenomination = sampleWithRequiredData;
        expectedResult = service.addKenyanCurrencyDenominationToCollectionIfMissing([], kenyanCurrencyDenomination);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(kenyanCurrencyDenomination);
      });

      it('should not add a KenyanCurrencyDenomination to an array that contains it', () => {
        const kenyanCurrencyDenomination: IKenyanCurrencyDenomination = sampleWithRequiredData;
        const kenyanCurrencyDenominationCollection: IKenyanCurrencyDenomination[] = [
          {
            ...kenyanCurrencyDenomination,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addKenyanCurrencyDenominationToCollectionIfMissing(
          kenyanCurrencyDenominationCollection,
          kenyanCurrencyDenomination
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a KenyanCurrencyDenomination to an array that doesn't contain it", () => {
        const kenyanCurrencyDenomination: IKenyanCurrencyDenomination = sampleWithRequiredData;
        const kenyanCurrencyDenominationCollection: IKenyanCurrencyDenomination[] = [sampleWithPartialData];
        expectedResult = service.addKenyanCurrencyDenominationToCollectionIfMissing(
          kenyanCurrencyDenominationCollection,
          kenyanCurrencyDenomination
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(kenyanCurrencyDenomination);
      });

      it('should add only unique KenyanCurrencyDenomination to an array', () => {
        const kenyanCurrencyDenominationArray: IKenyanCurrencyDenomination[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const kenyanCurrencyDenominationCollection: IKenyanCurrencyDenomination[] = [sampleWithRequiredData];
        expectedResult = service.addKenyanCurrencyDenominationToCollectionIfMissing(
          kenyanCurrencyDenominationCollection,
          ...kenyanCurrencyDenominationArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const kenyanCurrencyDenomination: IKenyanCurrencyDenomination = sampleWithRequiredData;
        const kenyanCurrencyDenomination2: IKenyanCurrencyDenomination = sampleWithPartialData;
        expectedResult = service.addKenyanCurrencyDenominationToCollectionIfMissing(
          [],
          kenyanCurrencyDenomination,
          kenyanCurrencyDenomination2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(kenyanCurrencyDenomination);
        expect(expectedResult).toContain(kenyanCurrencyDenomination2);
      });

      it('should accept null and undefined values', () => {
        const kenyanCurrencyDenomination: IKenyanCurrencyDenomination = sampleWithRequiredData;
        expectedResult = service.addKenyanCurrencyDenominationToCollectionIfMissing([], null, kenyanCurrencyDenomination, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(kenyanCurrencyDenomination);
      });

      it('should return initial array if no KenyanCurrencyDenomination is added', () => {
        const kenyanCurrencyDenominationCollection: IKenyanCurrencyDenomination[] = [sampleWithRequiredData];
        expectedResult = service.addKenyanCurrencyDenominationToCollectionIfMissing(kenyanCurrencyDenominationCollection, undefined, null);
        expect(expectedResult).toEqual(kenyanCurrencyDenominationCollection);
      });
    });

    describe('compareKenyanCurrencyDenomination', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareKenyanCurrencyDenomination(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareKenyanCurrencyDenomination(entity1, entity2);
        const compareResult2 = service.compareKenyanCurrencyDenomination(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareKenyanCurrencyDenomination(entity1, entity2);
        const compareResult2 = service.compareKenyanCurrencyDenomination(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareKenyanCurrencyDenomination(entity1, entity2);
        const compareResult2 = service.compareKenyanCurrencyDenomination(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

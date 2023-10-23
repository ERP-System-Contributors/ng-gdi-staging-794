import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IBankTransactionType } from '../bank-transaction-type.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../bank-transaction-type.test-samples';

import { BankTransactionTypeService } from './bank-transaction-type.service';

const requireRestSample: IBankTransactionType = {
  ...sampleWithRequiredData,
};

describe('BankTransactionType Service', () => {
  let service: BankTransactionTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IBankTransactionType | IBankTransactionType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(BankTransactionTypeService);
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

    it('should create a BankTransactionType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const bankTransactionType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(bankTransactionType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a BankTransactionType', () => {
      const bankTransactionType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(bankTransactionType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a BankTransactionType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of BankTransactionType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a BankTransactionType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addBankTransactionTypeToCollectionIfMissing', () => {
      it('should add a BankTransactionType to an empty array', () => {
        const bankTransactionType: IBankTransactionType = sampleWithRequiredData;
        expectedResult = service.addBankTransactionTypeToCollectionIfMissing([], bankTransactionType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(bankTransactionType);
      });

      it('should not add a BankTransactionType to an array that contains it', () => {
        const bankTransactionType: IBankTransactionType = sampleWithRequiredData;
        const bankTransactionTypeCollection: IBankTransactionType[] = [
          {
            ...bankTransactionType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addBankTransactionTypeToCollectionIfMissing(bankTransactionTypeCollection, bankTransactionType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a BankTransactionType to an array that doesn't contain it", () => {
        const bankTransactionType: IBankTransactionType = sampleWithRequiredData;
        const bankTransactionTypeCollection: IBankTransactionType[] = [sampleWithPartialData];
        expectedResult = service.addBankTransactionTypeToCollectionIfMissing(bankTransactionTypeCollection, bankTransactionType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(bankTransactionType);
      });

      it('should add only unique BankTransactionType to an array', () => {
        const bankTransactionTypeArray: IBankTransactionType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const bankTransactionTypeCollection: IBankTransactionType[] = [sampleWithRequiredData];
        expectedResult = service.addBankTransactionTypeToCollectionIfMissing(bankTransactionTypeCollection, ...bankTransactionTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const bankTransactionType: IBankTransactionType = sampleWithRequiredData;
        const bankTransactionType2: IBankTransactionType = sampleWithPartialData;
        expectedResult = service.addBankTransactionTypeToCollectionIfMissing([], bankTransactionType, bankTransactionType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(bankTransactionType);
        expect(expectedResult).toContain(bankTransactionType2);
      });

      it('should accept null and undefined values', () => {
        const bankTransactionType: IBankTransactionType = sampleWithRequiredData;
        expectedResult = service.addBankTransactionTypeToCollectionIfMissing([], null, bankTransactionType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(bankTransactionType);
      });

      it('should return initial array if no BankTransactionType is added', () => {
        const bankTransactionTypeCollection: IBankTransactionType[] = [sampleWithRequiredData];
        expectedResult = service.addBankTransactionTypeToCollectionIfMissing(bankTransactionTypeCollection, undefined, null);
        expect(expectedResult).toEqual(bankTransactionTypeCollection);
      });
    });

    describe('compareBankTransactionType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareBankTransactionType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareBankTransactionType(entity1, entity2);
        const compareResult2 = service.compareBankTransactionType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareBankTransactionType(entity1, entity2);
        const compareResult2 = service.compareBankTransactionType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareBankTransactionType(entity1, entity2);
        const compareResult2 = service.compareBankTransactionType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

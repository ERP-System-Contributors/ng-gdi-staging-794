import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IAccountBalance } from '../account-balance.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../account-balance.test-samples';

import { AccountBalanceService, RestAccountBalance } from './account-balance.service';

const requireRestSample: RestAccountBalance = {
  ...sampleWithRequiredData,
  reportingDate: sampleWithRequiredData.reportingDate?.format(DATE_FORMAT),
};

describe('AccountBalance Service', () => {
  let service: AccountBalanceService;
  let httpMock: HttpTestingController;
  let expectedResult: IAccountBalance | IAccountBalance[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AccountBalanceService);
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

    it('should create a AccountBalance', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const accountBalance = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(accountBalance).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AccountBalance', () => {
      const accountBalance = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(accountBalance).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AccountBalance', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AccountBalance', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AccountBalance', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAccountBalanceToCollectionIfMissing', () => {
      it('should add a AccountBalance to an empty array', () => {
        const accountBalance: IAccountBalance = sampleWithRequiredData;
        expectedResult = service.addAccountBalanceToCollectionIfMissing([], accountBalance);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(accountBalance);
      });

      it('should not add a AccountBalance to an array that contains it', () => {
        const accountBalance: IAccountBalance = sampleWithRequiredData;
        const accountBalanceCollection: IAccountBalance[] = [
          {
            ...accountBalance,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAccountBalanceToCollectionIfMissing(accountBalanceCollection, accountBalance);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AccountBalance to an array that doesn't contain it", () => {
        const accountBalance: IAccountBalance = sampleWithRequiredData;
        const accountBalanceCollection: IAccountBalance[] = [sampleWithPartialData];
        expectedResult = service.addAccountBalanceToCollectionIfMissing(accountBalanceCollection, accountBalance);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(accountBalance);
      });

      it('should add only unique AccountBalance to an array', () => {
        const accountBalanceArray: IAccountBalance[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const accountBalanceCollection: IAccountBalance[] = [sampleWithRequiredData];
        expectedResult = service.addAccountBalanceToCollectionIfMissing(accountBalanceCollection, ...accountBalanceArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const accountBalance: IAccountBalance = sampleWithRequiredData;
        const accountBalance2: IAccountBalance = sampleWithPartialData;
        expectedResult = service.addAccountBalanceToCollectionIfMissing([], accountBalance, accountBalance2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(accountBalance);
        expect(expectedResult).toContain(accountBalance2);
      });

      it('should accept null and undefined values', () => {
        const accountBalance: IAccountBalance = sampleWithRequiredData;
        expectedResult = service.addAccountBalanceToCollectionIfMissing([], null, accountBalance, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(accountBalance);
      });

      it('should return initial array if no AccountBalance is added', () => {
        const accountBalanceCollection: IAccountBalance[] = [sampleWithRequiredData];
        expectedResult = service.addAccountBalanceToCollectionIfMissing(accountBalanceCollection, undefined, null);
        expect(expectedResult).toEqual(accountBalanceCollection);
      });
    });

    describe('compareAccountBalance', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAccountBalance(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAccountBalance(entity1, entity2);
        const compareResult2 = service.compareAccountBalance(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAccountBalance(entity1, entity2);
        const compareResult2 = service.compareAccountBalance(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAccountBalance(entity1, entity2);
        const compareResult2 = service.compareAccountBalance(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAccountType } from '../account-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../account-type.test-samples';

import { AccountTypeService } from './account-type.service';

const requireRestSample: IAccountType = {
  ...sampleWithRequiredData,
};

describe('AccountType Service', () => {
  let service: AccountTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IAccountType | IAccountType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AccountTypeService);
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

    it('should create a AccountType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const accountType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(accountType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AccountType', () => {
      const accountType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(accountType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AccountType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AccountType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AccountType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAccountTypeToCollectionIfMissing', () => {
      it('should add a AccountType to an empty array', () => {
        const accountType: IAccountType = sampleWithRequiredData;
        expectedResult = service.addAccountTypeToCollectionIfMissing([], accountType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(accountType);
      });

      it('should not add a AccountType to an array that contains it', () => {
        const accountType: IAccountType = sampleWithRequiredData;
        const accountTypeCollection: IAccountType[] = [
          {
            ...accountType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAccountTypeToCollectionIfMissing(accountTypeCollection, accountType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AccountType to an array that doesn't contain it", () => {
        const accountType: IAccountType = sampleWithRequiredData;
        const accountTypeCollection: IAccountType[] = [sampleWithPartialData];
        expectedResult = service.addAccountTypeToCollectionIfMissing(accountTypeCollection, accountType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(accountType);
      });

      it('should add only unique AccountType to an array', () => {
        const accountTypeArray: IAccountType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const accountTypeCollection: IAccountType[] = [sampleWithRequiredData];
        expectedResult = service.addAccountTypeToCollectionIfMissing(accountTypeCollection, ...accountTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const accountType: IAccountType = sampleWithRequiredData;
        const accountType2: IAccountType = sampleWithPartialData;
        expectedResult = service.addAccountTypeToCollectionIfMissing([], accountType, accountType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(accountType);
        expect(expectedResult).toContain(accountType2);
      });

      it('should accept null and undefined values', () => {
        const accountType: IAccountType = sampleWithRequiredData;
        expectedResult = service.addAccountTypeToCollectionIfMissing([], null, accountType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(accountType);
      });

      it('should return initial array if no AccountType is added', () => {
        const accountTypeCollection: IAccountType[] = [sampleWithRequiredData];
        expectedResult = service.addAccountTypeToCollectionIfMissing(accountTypeCollection, undefined, null);
        expect(expectedResult).toEqual(accountTypeCollection);
      });
    });

    describe('compareAccountType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAccountType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAccountType(entity1, entity2);
        const compareResult2 = service.compareAccountType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAccountType(entity1, entity2);
        const compareResult2 = service.compareAccountType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAccountType(entity1, entity2);
        const compareResult2 = service.compareAccountType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

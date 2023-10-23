import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAccountOwnershipType } from '../account-ownership-type.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../account-ownership-type.test-samples';

import { AccountOwnershipTypeService } from './account-ownership-type.service';

const requireRestSample: IAccountOwnershipType = {
  ...sampleWithRequiredData,
};

describe('AccountOwnershipType Service', () => {
  let service: AccountOwnershipTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IAccountOwnershipType | IAccountOwnershipType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AccountOwnershipTypeService);
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

    it('should return a list of AccountOwnershipType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    describe('addAccountOwnershipTypeToCollectionIfMissing', () => {
      it('should add a AccountOwnershipType to an empty array', () => {
        const accountOwnershipType: IAccountOwnershipType = sampleWithRequiredData;
        expectedResult = service.addAccountOwnershipTypeToCollectionIfMissing([], accountOwnershipType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(accountOwnershipType);
      });

      it('should not add a AccountOwnershipType to an array that contains it', () => {
        const accountOwnershipType: IAccountOwnershipType = sampleWithRequiredData;
        const accountOwnershipTypeCollection: IAccountOwnershipType[] = [
          {
            ...accountOwnershipType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAccountOwnershipTypeToCollectionIfMissing(accountOwnershipTypeCollection, accountOwnershipType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AccountOwnershipType to an array that doesn't contain it", () => {
        const accountOwnershipType: IAccountOwnershipType = sampleWithRequiredData;
        const accountOwnershipTypeCollection: IAccountOwnershipType[] = [sampleWithPartialData];
        expectedResult = service.addAccountOwnershipTypeToCollectionIfMissing(accountOwnershipTypeCollection, accountOwnershipType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(accountOwnershipType);
      });

      it('should add only unique AccountOwnershipType to an array', () => {
        const accountOwnershipTypeArray: IAccountOwnershipType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const accountOwnershipTypeCollection: IAccountOwnershipType[] = [sampleWithRequiredData];
        expectedResult = service.addAccountOwnershipTypeToCollectionIfMissing(accountOwnershipTypeCollection, ...accountOwnershipTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const accountOwnershipType: IAccountOwnershipType = sampleWithRequiredData;
        const accountOwnershipType2: IAccountOwnershipType = sampleWithPartialData;
        expectedResult = service.addAccountOwnershipTypeToCollectionIfMissing([], accountOwnershipType, accountOwnershipType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(accountOwnershipType);
        expect(expectedResult).toContain(accountOwnershipType2);
      });

      it('should accept null and undefined values', () => {
        const accountOwnershipType: IAccountOwnershipType = sampleWithRequiredData;
        expectedResult = service.addAccountOwnershipTypeToCollectionIfMissing([], null, accountOwnershipType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(accountOwnershipType);
      });

      it('should return initial array if no AccountOwnershipType is added', () => {
        const accountOwnershipTypeCollection: IAccountOwnershipType[] = [sampleWithRequiredData];
        expectedResult = service.addAccountOwnershipTypeToCollectionIfMissing(accountOwnershipTypeCollection, undefined, null);
        expect(expectedResult).toEqual(accountOwnershipTypeCollection);
      });
    });

    describe('compareAccountOwnershipType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAccountOwnershipType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAccountOwnershipType(entity1, entity2);
        const compareResult2 = service.compareAccountOwnershipType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAccountOwnershipType(entity1, entity2);
        const compareResult2 = service.compareAccountOwnershipType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAccountOwnershipType(entity1, entity2);
        const compareResult2 = service.compareAccountOwnershipType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

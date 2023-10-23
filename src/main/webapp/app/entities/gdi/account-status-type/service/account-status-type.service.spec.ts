import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAccountStatusType } from '../account-status-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../account-status-type.test-samples';

import { AccountStatusTypeService } from './account-status-type.service';

const requireRestSample: IAccountStatusType = {
  ...sampleWithRequiredData,
};

describe('AccountStatusType Service', () => {
  let service: AccountStatusTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IAccountStatusType | IAccountStatusType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AccountStatusTypeService);
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

    it('should create a AccountStatusType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const accountStatusType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(accountStatusType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AccountStatusType', () => {
      const accountStatusType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(accountStatusType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AccountStatusType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AccountStatusType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AccountStatusType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAccountStatusTypeToCollectionIfMissing', () => {
      it('should add a AccountStatusType to an empty array', () => {
        const accountStatusType: IAccountStatusType = sampleWithRequiredData;
        expectedResult = service.addAccountStatusTypeToCollectionIfMissing([], accountStatusType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(accountStatusType);
      });

      it('should not add a AccountStatusType to an array that contains it', () => {
        const accountStatusType: IAccountStatusType = sampleWithRequiredData;
        const accountStatusTypeCollection: IAccountStatusType[] = [
          {
            ...accountStatusType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAccountStatusTypeToCollectionIfMissing(accountStatusTypeCollection, accountStatusType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AccountStatusType to an array that doesn't contain it", () => {
        const accountStatusType: IAccountStatusType = sampleWithRequiredData;
        const accountStatusTypeCollection: IAccountStatusType[] = [sampleWithPartialData];
        expectedResult = service.addAccountStatusTypeToCollectionIfMissing(accountStatusTypeCollection, accountStatusType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(accountStatusType);
      });

      it('should add only unique AccountStatusType to an array', () => {
        const accountStatusTypeArray: IAccountStatusType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const accountStatusTypeCollection: IAccountStatusType[] = [sampleWithRequiredData];
        expectedResult = service.addAccountStatusTypeToCollectionIfMissing(accountStatusTypeCollection, ...accountStatusTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const accountStatusType: IAccountStatusType = sampleWithRequiredData;
        const accountStatusType2: IAccountStatusType = sampleWithPartialData;
        expectedResult = service.addAccountStatusTypeToCollectionIfMissing([], accountStatusType, accountStatusType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(accountStatusType);
        expect(expectedResult).toContain(accountStatusType2);
      });

      it('should accept null and undefined values', () => {
        const accountStatusType: IAccountStatusType = sampleWithRequiredData;
        expectedResult = service.addAccountStatusTypeToCollectionIfMissing([], null, accountStatusType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(accountStatusType);
      });

      it('should return initial array if no AccountStatusType is added', () => {
        const accountStatusTypeCollection: IAccountStatusType[] = [sampleWithRequiredData];
        expectedResult = service.addAccountStatusTypeToCollectionIfMissing(accountStatusTypeCollection, undefined, null);
        expect(expectedResult).toEqual(accountStatusTypeCollection);
      });
    });

    describe('compareAccountStatusType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAccountStatusType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAccountStatusType(entity1, entity2);
        const compareResult2 = service.compareAccountStatusType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAccountStatusType(entity1, entity2);
        const compareResult2 = service.compareAccountStatusType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAccountStatusType(entity1, entity2);
        const compareResult2 = service.compareAccountStatusType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

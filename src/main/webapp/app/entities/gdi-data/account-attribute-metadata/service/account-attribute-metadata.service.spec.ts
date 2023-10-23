import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAccountAttributeMetadata } from '../account-attribute-metadata.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../account-attribute-metadata.test-samples';

import { AccountAttributeMetadataService } from './account-attribute-metadata.service';

const requireRestSample: IAccountAttributeMetadata = {
  ...sampleWithRequiredData,
};

describe('AccountAttributeMetadata Service', () => {
  let service: AccountAttributeMetadataService;
  let httpMock: HttpTestingController;
  let expectedResult: IAccountAttributeMetadata | IAccountAttributeMetadata[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AccountAttributeMetadataService);
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

    it('should create a AccountAttributeMetadata', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const accountAttributeMetadata = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(accountAttributeMetadata).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AccountAttributeMetadata', () => {
      const accountAttributeMetadata = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(accountAttributeMetadata).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AccountAttributeMetadata', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AccountAttributeMetadata', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AccountAttributeMetadata', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAccountAttributeMetadataToCollectionIfMissing', () => {
      it('should add a AccountAttributeMetadata to an empty array', () => {
        const accountAttributeMetadata: IAccountAttributeMetadata = sampleWithRequiredData;
        expectedResult = service.addAccountAttributeMetadataToCollectionIfMissing([], accountAttributeMetadata);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(accountAttributeMetadata);
      });

      it('should not add a AccountAttributeMetadata to an array that contains it', () => {
        const accountAttributeMetadata: IAccountAttributeMetadata = sampleWithRequiredData;
        const accountAttributeMetadataCollection: IAccountAttributeMetadata[] = [
          {
            ...accountAttributeMetadata,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAccountAttributeMetadataToCollectionIfMissing(
          accountAttributeMetadataCollection,
          accountAttributeMetadata
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AccountAttributeMetadata to an array that doesn't contain it", () => {
        const accountAttributeMetadata: IAccountAttributeMetadata = sampleWithRequiredData;
        const accountAttributeMetadataCollection: IAccountAttributeMetadata[] = [sampleWithPartialData];
        expectedResult = service.addAccountAttributeMetadataToCollectionIfMissing(
          accountAttributeMetadataCollection,
          accountAttributeMetadata
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(accountAttributeMetadata);
      });

      it('should add only unique AccountAttributeMetadata to an array', () => {
        const accountAttributeMetadataArray: IAccountAttributeMetadata[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const accountAttributeMetadataCollection: IAccountAttributeMetadata[] = [sampleWithRequiredData];
        expectedResult = service.addAccountAttributeMetadataToCollectionIfMissing(
          accountAttributeMetadataCollection,
          ...accountAttributeMetadataArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const accountAttributeMetadata: IAccountAttributeMetadata = sampleWithRequiredData;
        const accountAttributeMetadata2: IAccountAttributeMetadata = sampleWithPartialData;
        expectedResult = service.addAccountAttributeMetadataToCollectionIfMissing([], accountAttributeMetadata, accountAttributeMetadata2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(accountAttributeMetadata);
        expect(expectedResult).toContain(accountAttributeMetadata2);
      });

      it('should accept null and undefined values', () => {
        const accountAttributeMetadata: IAccountAttributeMetadata = sampleWithRequiredData;
        expectedResult = service.addAccountAttributeMetadataToCollectionIfMissing([], null, accountAttributeMetadata, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(accountAttributeMetadata);
      });

      it('should return initial array if no AccountAttributeMetadata is added', () => {
        const accountAttributeMetadataCollection: IAccountAttributeMetadata[] = [sampleWithRequiredData];
        expectedResult = service.addAccountAttributeMetadataToCollectionIfMissing(accountAttributeMetadataCollection, undefined, null);
        expect(expectedResult).toEqual(accountAttributeMetadataCollection);
      });
    });

    describe('compareAccountAttributeMetadata', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAccountAttributeMetadata(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAccountAttributeMetadata(entity1, entity2);
        const compareResult2 = service.compareAccountAttributeMetadata(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAccountAttributeMetadata(entity1, entity2);
        const compareResult2 = service.compareAccountAttributeMetadata(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAccountAttributeMetadata(entity1, entity2);
        const compareResult2 = service.compareAccountAttributeMetadata(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

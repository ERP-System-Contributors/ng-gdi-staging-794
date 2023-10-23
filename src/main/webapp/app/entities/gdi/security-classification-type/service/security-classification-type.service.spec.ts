import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISecurityClassificationType } from '../security-classification-type.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../security-classification-type.test-samples';

import { SecurityClassificationTypeService } from './security-classification-type.service';

const requireRestSample: ISecurityClassificationType = {
  ...sampleWithRequiredData,
};

describe('SecurityClassificationType Service', () => {
  let service: SecurityClassificationTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: ISecurityClassificationType | ISecurityClassificationType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SecurityClassificationTypeService);
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

    it('should create a SecurityClassificationType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const securityClassificationType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(securityClassificationType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SecurityClassificationType', () => {
      const securityClassificationType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(securityClassificationType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SecurityClassificationType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SecurityClassificationType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SecurityClassificationType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSecurityClassificationTypeToCollectionIfMissing', () => {
      it('should add a SecurityClassificationType to an empty array', () => {
        const securityClassificationType: ISecurityClassificationType = sampleWithRequiredData;
        expectedResult = service.addSecurityClassificationTypeToCollectionIfMissing([], securityClassificationType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(securityClassificationType);
      });

      it('should not add a SecurityClassificationType to an array that contains it', () => {
        const securityClassificationType: ISecurityClassificationType = sampleWithRequiredData;
        const securityClassificationTypeCollection: ISecurityClassificationType[] = [
          {
            ...securityClassificationType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSecurityClassificationTypeToCollectionIfMissing(
          securityClassificationTypeCollection,
          securityClassificationType
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SecurityClassificationType to an array that doesn't contain it", () => {
        const securityClassificationType: ISecurityClassificationType = sampleWithRequiredData;
        const securityClassificationTypeCollection: ISecurityClassificationType[] = [sampleWithPartialData];
        expectedResult = service.addSecurityClassificationTypeToCollectionIfMissing(
          securityClassificationTypeCollection,
          securityClassificationType
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(securityClassificationType);
      });

      it('should add only unique SecurityClassificationType to an array', () => {
        const securityClassificationTypeArray: ISecurityClassificationType[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const securityClassificationTypeCollection: ISecurityClassificationType[] = [sampleWithRequiredData];
        expectedResult = service.addSecurityClassificationTypeToCollectionIfMissing(
          securityClassificationTypeCollection,
          ...securityClassificationTypeArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const securityClassificationType: ISecurityClassificationType = sampleWithRequiredData;
        const securityClassificationType2: ISecurityClassificationType = sampleWithPartialData;
        expectedResult = service.addSecurityClassificationTypeToCollectionIfMissing(
          [],
          securityClassificationType,
          securityClassificationType2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(securityClassificationType);
        expect(expectedResult).toContain(securityClassificationType2);
      });

      it('should accept null and undefined values', () => {
        const securityClassificationType: ISecurityClassificationType = sampleWithRequiredData;
        expectedResult = service.addSecurityClassificationTypeToCollectionIfMissing([], null, securityClassificationType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(securityClassificationType);
      });

      it('should return initial array if no SecurityClassificationType is added', () => {
        const securityClassificationTypeCollection: ISecurityClassificationType[] = [sampleWithRequiredData];
        expectedResult = service.addSecurityClassificationTypeToCollectionIfMissing(securityClassificationTypeCollection, undefined, null);
        expect(expectedResult).toEqual(securityClassificationTypeCollection);
      });
    });

    describe('compareSecurityClassificationType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSecurityClassificationType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSecurityClassificationType(entity1, entity2);
        const compareResult2 = service.compareSecurityClassificationType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSecurityClassificationType(entity1, entity2);
        const compareResult2 = service.compareSecurityClassificationType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSecurityClassificationType(entity1, entity2);
        const compareResult2 = service.compareSecurityClassificationType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IInstitutionStatusType } from '../institution-status-type.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../institution-status-type.test-samples';

import { InstitutionStatusTypeService } from './institution-status-type.service';

const requireRestSample: IInstitutionStatusType = {
  ...sampleWithRequiredData,
};

describe('InstitutionStatusType Service', () => {
  let service: InstitutionStatusTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IInstitutionStatusType | IInstitutionStatusType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(InstitutionStatusTypeService);
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

    it('should create a InstitutionStatusType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const institutionStatusType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(institutionStatusType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a InstitutionStatusType', () => {
      const institutionStatusType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(institutionStatusType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a InstitutionStatusType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of InstitutionStatusType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a InstitutionStatusType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addInstitutionStatusTypeToCollectionIfMissing', () => {
      it('should add a InstitutionStatusType to an empty array', () => {
        const institutionStatusType: IInstitutionStatusType = sampleWithRequiredData;
        expectedResult = service.addInstitutionStatusTypeToCollectionIfMissing([], institutionStatusType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(institutionStatusType);
      });

      it('should not add a InstitutionStatusType to an array that contains it', () => {
        const institutionStatusType: IInstitutionStatusType = sampleWithRequiredData;
        const institutionStatusTypeCollection: IInstitutionStatusType[] = [
          {
            ...institutionStatusType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addInstitutionStatusTypeToCollectionIfMissing(institutionStatusTypeCollection, institutionStatusType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a InstitutionStatusType to an array that doesn't contain it", () => {
        const institutionStatusType: IInstitutionStatusType = sampleWithRequiredData;
        const institutionStatusTypeCollection: IInstitutionStatusType[] = [sampleWithPartialData];
        expectedResult = service.addInstitutionStatusTypeToCollectionIfMissing(institutionStatusTypeCollection, institutionStatusType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(institutionStatusType);
      });

      it('should add only unique InstitutionStatusType to an array', () => {
        const institutionStatusTypeArray: IInstitutionStatusType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const institutionStatusTypeCollection: IInstitutionStatusType[] = [sampleWithRequiredData];
        expectedResult = service.addInstitutionStatusTypeToCollectionIfMissing(
          institutionStatusTypeCollection,
          ...institutionStatusTypeArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const institutionStatusType: IInstitutionStatusType = sampleWithRequiredData;
        const institutionStatusType2: IInstitutionStatusType = sampleWithPartialData;
        expectedResult = service.addInstitutionStatusTypeToCollectionIfMissing([], institutionStatusType, institutionStatusType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(institutionStatusType);
        expect(expectedResult).toContain(institutionStatusType2);
      });

      it('should accept null and undefined values', () => {
        const institutionStatusType: IInstitutionStatusType = sampleWithRequiredData;
        expectedResult = service.addInstitutionStatusTypeToCollectionIfMissing([], null, institutionStatusType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(institutionStatusType);
      });

      it('should return initial array if no InstitutionStatusType is added', () => {
        const institutionStatusTypeCollection: IInstitutionStatusType[] = [sampleWithRequiredData];
        expectedResult = service.addInstitutionStatusTypeToCollectionIfMissing(institutionStatusTypeCollection, undefined, null);
        expect(expectedResult).toEqual(institutionStatusTypeCollection);
      });
    });

    describe('compareInstitutionStatusType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareInstitutionStatusType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareInstitutionStatusType(entity1, entity2);
        const compareResult2 = service.compareInstitutionStatusType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareInstitutionStatusType(entity1, entity2);
        const compareResult2 = service.compareInstitutionStatusType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareInstitutionStatusType(entity1, entity2);
        const compareResult2 = service.compareInstitutionStatusType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

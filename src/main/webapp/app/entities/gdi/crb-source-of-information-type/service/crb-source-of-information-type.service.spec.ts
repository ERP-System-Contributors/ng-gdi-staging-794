import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrbSourceOfInformationType } from '../crb-source-of-information-type.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../crb-source-of-information-type.test-samples';

import { CrbSourceOfInformationTypeService } from './crb-source-of-information-type.service';

const requireRestSample: ICrbSourceOfInformationType = {
  ...sampleWithRequiredData,
};

describe('CrbSourceOfInformationType Service', () => {
  let service: CrbSourceOfInformationTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrbSourceOfInformationType | ICrbSourceOfInformationType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrbSourceOfInformationTypeService);
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

    it('should create a CrbSourceOfInformationType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crbSourceOfInformationType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crbSourceOfInformationType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrbSourceOfInformationType', () => {
      const crbSourceOfInformationType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crbSourceOfInformationType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrbSourceOfInformationType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrbSourceOfInformationType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrbSourceOfInformationType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrbSourceOfInformationTypeToCollectionIfMissing', () => {
      it('should add a CrbSourceOfInformationType to an empty array', () => {
        const crbSourceOfInformationType: ICrbSourceOfInformationType = sampleWithRequiredData;
        expectedResult = service.addCrbSourceOfInformationTypeToCollectionIfMissing([], crbSourceOfInformationType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbSourceOfInformationType);
      });

      it('should not add a CrbSourceOfInformationType to an array that contains it', () => {
        const crbSourceOfInformationType: ICrbSourceOfInformationType = sampleWithRequiredData;
        const crbSourceOfInformationTypeCollection: ICrbSourceOfInformationType[] = [
          {
            ...crbSourceOfInformationType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrbSourceOfInformationTypeToCollectionIfMissing(
          crbSourceOfInformationTypeCollection,
          crbSourceOfInformationType
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrbSourceOfInformationType to an array that doesn't contain it", () => {
        const crbSourceOfInformationType: ICrbSourceOfInformationType = sampleWithRequiredData;
        const crbSourceOfInformationTypeCollection: ICrbSourceOfInformationType[] = [sampleWithPartialData];
        expectedResult = service.addCrbSourceOfInformationTypeToCollectionIfMissing(
          crbSourceOfInformationTypeCollection,
          crbSourceOfInformationType
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbSourceOfInformationType);
      });

      it('should add only unique CrbSourceOfInformationType to an array', () => {
        const crbSourceOfInformationTypeArray: ICrbSourceOfInformationType[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const crbSourceOfInformationTypeCollection: ICrbSourceOfInformationType[] = [sampleWithRequiredData];
        expectedResult = service.addCrbSourceOfInformationTypeToCollectionIfMissing(
          crbSourceOfInformationTypeCollection,
          ...crbSourceOfInformationTypeArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crbSourceOfInformationType: ICrbSourceOfInformationType = sampleWithRequiredData;
        const crbSourceOfInformationType2: ICrbSourceOfInformationType = sampleWithPartialData;
        expectedResult = service.addCrbSourceOfInformationTypeToCollectionIfMissing(
          [],
          crbSourceOfInformationType,
          crbSourceOfInformationType2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbSourceOfInformationType);
        expect(expectedResult).toContain(crbSourceOfInformationType2);
      });

      it('should accept null and undefined values', () => {
        const crbSourceOfInformationType: ICrbSourceOfInformationType = sampleWithRequiredData;
        expectedResult = service.addCrbSourceOfInformationTypeToCollectionIfMissing([], null, crbSourceOfInformationType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbSourceOfInformationType);
      });

      it('should return initial array if no CrbSourceOfInformationType is added', () => {
        const crbSourceOfInformationTypeCollection: ICrbSourceOfInformationType[] = [sampleWithRequiredData];
        expectedResult = service.addCrbSourceOfInformationTypeToCollectionIfMissing(crbSourceOfInformationTypeCollection, undefined, null);
        expect(expectedResult).toEqual(crbSourceOfInformationTypeCollection);
      });
    });

    describe('compareCrbSourceOfInformationType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrbSourceOfInformationType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrbSourceOfInformationType(entity1, entity2);
        const compareResult2 = service.compareCrbSourceOfInformationType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrbSourceOfInformationType(entity1, entity2);
        const compareResult2 = service.compareCrbSourceOfInformationType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrbSourceOfInformationType(entity1, entity2);
        const compareResult2 = service.compareCrbSourceOfInformationType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

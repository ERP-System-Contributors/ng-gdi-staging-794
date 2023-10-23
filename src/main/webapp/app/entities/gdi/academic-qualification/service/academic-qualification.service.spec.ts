import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAcademicQualification } from '../academic-qualification.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../academic-qualification.test-samples';

import { AcademicQualificationService } from './academic-qualification.service';

const requireRestSample: IAcademicQualification = {
  ...sampleWithRequiredData,
};

describe('AcademicQualification Service', () => {
  let service: AcademicQualificationService;
  let httpMock: HttpTestingController;
  let expectedResult: IAcademicQualification | IAcademicQualification[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AcademicQualificationService);
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

    it('should create a AcademicQualification', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const academicQualification = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(academicQualification).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AcademicQualification', () => {
      const academicQualification = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(academicQualification).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AcademicQualification', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AcademicQualification', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AcademicQualification', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAcademicQualificationToCollectionIfMissing', () => {
      it('should add a AcademicQualification to an empty array', () => {
        const academicQualification: IAcademicQualification = sampleWithRequiredData;
        expectedResult = service.addAcademicQualificationToCollectionIfMissing([], academicQualification);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(academicQualification);
      });

      it('should not add a AcademicQualification to an array that contains it', () => {
        const academicQualification: IAcademicQualification = sampleWithRequiredData;
        const academicQualificationCollection: IAcademicQualification[] = [
          {
            ...academicQualification,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAcademicQualificationToCollectionIfMissing(academicQualificationCollection, academicQualification);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AcademicQualification to an array that doesn't contain it", () => {
        const academicQualification: IAcademicQualification = sampleWithRequiredData;
        const academicQualificationCollection: IAcademicQualification[] = [sampleWithPartialData];
        expectedResult = service.addAcademicQualificationToCollectionIfMissing(academicQualificationCollection, academicQualification);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(academicQualification);
      });

      it('should add only unique AcademicQualification to an array', () => {
        const academicQualificationArray: IAcademicQualification[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const academicQualificationCollection: IAcademicQualification[] = [sampleWithRequiredData];
        expectedResult = service.addAcademicQualificationToCollectionIfMissing(
          academicQualificationCollection,
          ...academicQualificationArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const academicQualification: IAcademicQualification = sampleWithRequiredData;
        const academicQualification2: IAcademicQualification = sampleWithPartialData;
        expectedResult = service.addAcademicQualificationToCollectionIfMissing([], academicQualification, academicQualification2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(academicQualification);
        expect(expectedResult).toContain(academicQualification2);
      });

      it('should accept null and undefined values', () => {
        const academicQualification: IAcademicQualification = sampleWithRequiredData;
        expectedResult = service.addAcademicQualificationToCollectionIfMissing([], null, academicQualification, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(academicQualification);
      });

      it('should return initial array if no AcademicQualification is added', () => {
        const academicQualificationCollection: IAcademicQualification[] = [sampleWithRequiredData];
        expectedResult = service.addAcademicQualificationToCollectionIfMissing(academicQualificationCollection, undefined, null);
        expect(expectedResult).toEqual(academicQualificationCollection);
      });
    });

    describe('compareAcademicQualification', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAcademicQualification(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAcademicQualification(entity1, entity2);
        const compareResult2 = service.compareAcademicQualification(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAcademicQualification(entity1, entity2);
        const compareResult2 = service.compareAcademicQualification(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAcademicQualification(entity1, entity2);
        const compareResult2 = service.compareAcademicQualification(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

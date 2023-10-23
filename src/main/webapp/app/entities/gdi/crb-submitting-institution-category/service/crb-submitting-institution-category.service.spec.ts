import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrbSubmittingInstitutionCategory } from '../crb-submitting-institution-category.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../crb-submitting-institution-category.test-samples';

import { CrbSubmittingInstitutionCategoryService } from './crb-submitting-institution-category.service';

const requireRestSample: ICrbSubmittingInstitutionCategory = {
  ...sampleWithRequiredData,
};

describe('CrbSubmittingInstitutionCategory Service', () => {
  let service: CrbSubmittingInstitutionCategoryService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrbSubmittingInstitutionCategory | ICrbSubmittingInstitutionCategory[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrbSubmittingInstitutionCategoryService);
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

    it('should create a CrbSubmittingInstitutionCategory', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crbSubmittingInstitutionCategory = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crbSubmittingInstitutionCategory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrbSubmittingInstitutionCategory', () => {
      const crbSubmittingInstitutionCategory = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crbSubmittingInstitutionCategory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrbSubmittingInstitutionCategory', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrbSubmittingInstitutionCategory', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrbSubmittingInstitutionCategory', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrbSubmittingInstitutionCategoryToCollectionIfMissing', () => {
      it('should add a CrbSubmittingInstitutionCategory to an empty array', () => {
        const crbSubmittingInstitutionCategory: ICrbSubmittingInstitutionCategory = sampleWithRequiredData;
        expectedResult = service.addCrbSubmittingInstitutionCategoryToCollectionIfMissing([], crbSubmittingInstitutionCategory);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbSubmittingInstitutionCategory);
      });

      it('should not add a CrbSubmittingInstitutionCategory to an array that contains it', () => {
        const crbSubmittingInstitutionCategory: ICrbSubmittingInstitutionCategory = sampleWithRequiredData;
        const crbSubmittingInstitutionCategoryCollection: ICrbSubmittingInstitutionCategory[] = [
          {
            ...crbSubmittingInstitutionCategory,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrbSubmittingInstitutionCategoryToCollectionIfMissing(
          crbSubmittingInstitutionCategoryCollection,
          crbSubmittingInstitutionCategory
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrbSubmittingInstitutionCategory to an array that doesn't contain it", () => {
        const crbSubmittingInstitutionCategory: ICrbSubmittingInstitutionCategory = sampleWithRequiredData;
        const crbSubmittingInstitutionCategoryCollection: ICrbSubmittingInstitutionCategory[] = [sampleWithPartialData];
        expectedResult = service.addCrbSubmittingInstitutionCategoryToCollectionIfMissing(
          crbSubmittingInstitutionCategoryCollection,
          crbSubmittingInstitutionCategory
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbSubmittingInstitutionCategory);
      });

      it('should add only unique CrbSubmittingInstitutionCategory to an array', () => {
        const crbSubmittingInstitutionCategoryArray: ICrbSubmittingInstitutionCategory[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const crbSubmittingInstitutionCategoryCollection: ICrbSubmittingInstitutionCategory[] = [sampleWithRequiredData];
        expectedResult = service.addCrbSubmittingInstitutionCategoryToCollectionIfMissing(
          crbSubmittingInstitutionCategoryCollection,
          ...crbSubmittingInstitutionCategoryArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crbSubmittingInstitutionCategory: ICrbSubmittingInstitutionCategory = sampleWithRequiredData;
        const crbSubmittingInstitutionCategory2: ICrbSubmittingInstitutionCategory = sampleWithPartialData;
        expectedResult = service.addCrbSubmittingInstitutionCategoryToCollectionIfMissing(
          [],
          crbSubmittingInstitutionCategory,
          crbSubmittingInstitutionCategory2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbSubmittingInstitutionCategory);
        expect(expectedResult).toContain(crbSubmittingInstitutionCategory2);
      });

      it('should accept null and undefined values', () => {
        const crbSubmittingInstitutionCategory: ICrbSubmittingInstitutionCategory = sampleWithRequiredData;
        expectedResult = service.addCrbSubmittingInstitutionCategoryToCollectionIfMissing(
          [],
          null,
          crbSubmittingInstitutionCategory,
          undefined
        );
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbSubmittingInstitutionCategory);
      });

      it('should return initial array if no CrbSubmittingInstitutionCategory is added', () => {
        const crbSubmittingInstitutionCategoryCollection: ICrbSubmittingInstitutionCategory[] = [sampleWithRequiredData];
        expectedResult = service.addCrbSubmittingInstitutionCategoryToCollectionIfMissing(
          crbSubmittingInstitutionCategoryCollection,
          undefined,
          null
        );
        expect(expectedResult).toEqual(crbSubmittingInstitutionCategoryCollection);
      });
    });

    describe('compareCrbSubmittingInstitutionCategory', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrbSubmittingInstitutionCategory(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrbSubmittingInstitutionCategory(entity1, entity2);
        const compareResult2 = service.compareCrbSubmittingInstitutionCategory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrbSubmittingInstitutionCategory(entity1, entity2);
        const compareResult2 = service.compareCrbSubmittingInstitutionCategory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrbSubmittingInstitutionCategory(entity1, entity2);
        const compareResult2 = service.compareCrbSubmittingInstitutionCategory(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

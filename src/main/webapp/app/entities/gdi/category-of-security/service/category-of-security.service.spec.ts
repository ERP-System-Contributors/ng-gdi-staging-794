import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICategoryOfSecurity } from '../category-of-security.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../category-of-security.test-samples';

import { CategoryOfSecurityService } from './category-of-security.service';

const requireRestSample: ICategoryOfSecurity = {
  ...sampleWithRequiredData,
};

describe('CategoryOfSecurity Service', () => {
  let service: CategoryOfSecurityService;
  let httpMock: HttpTestingController;
  let expectedResult: ICategoryOfSecurity | ICategoryOfSecurity[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CategoryOfSecurityService);
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

    it('should create a CategoryOfSecurity', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const categoryOfSecurity = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(categoryOfSecurity).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CategoryOfSecurity', () => {
      const categoryOfSecurity = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(categoryOfSecurity).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CategoryOfSecurity', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CategoryOfSecurity', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CategoryOfSecurity', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCategoryOfSecurityToCollectionIfMissing', () => {
      it('should add a CategoryOfSecurity to an empty array', () => {
        const categoryOfSecurity: ICategoryOfSecurity = sampleWithRequiredData;
        expectedResult = service.addCategoryOfSecurityToCollectionIfMissing([], categoryOfSecurity);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(categoryOfSecurity);
      });

      it('should not add a CategoryOfSecurity to an array that contains it', () => {
        const categoryOfSecurity: ICategoryOfSecurity = sampleWithRequiredData;
        const categoryOfSecurityCollection: ICategoryOfSecurity[] = [
          {
            ...categoryOfSecurity,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCategoryOfSecurityToCollectionIfMissing(categoryOfSecurityCollection, categoryOfSecurity);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CategoryOfSecurity to an array that doesn't contain it", () => {
        const categoryOfSecurity: ICategoryOfSecurity = sampleWithRequiredData;
        const categoryOfSecurityCollection: ICategoryOfSecurity[] = [sampleWithPartialData];
        expectedResult = service.addCategoryOfSecurityToCollectionIfMissing(categoryOfSecurityCollection, categoryOfSecurity);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(categoryOfSecurity);
      });

      it('should add only unique CategoryOfSecurity to an array', () => {
        const categoryOfSecurityArray: ICategoryOfSecurity[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const categoryOfSecurityCollection: ICategoryOfSecurity[] = [sampleWithRequiredData];
        expectedResult = service.addCategoryOfSecurityToCollectionIfMissing(categoryOfSecurityCollection, ...categoryOfSecurityArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const categoryOfSecurity: ICategoryOfSecurity = sampleWithRequiredData;
        const categoryOfSecurity2: ICategoryOfSecurity = sampleWithPartialData;
        expectedResult = service.addCategoryOfSecurityToCollectionIfMissing([], categoryOfSecurity, categoryOfSecurity2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(categoryOfSecurity);
        expect(expectedResult).toContain(categoryOfSecurity2);
      });

      it('should accept null and undefined values', () => {
        const categoryOfSecurity: ICategoryOfSecurity = sampleWithRequiredData;
        expectedResult = service.addCategoryOfSecurityToCollectionIfMissing([], null, categoryOfSecurity, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(categoryOfSecurity);
      });

      it('should return initial array if no CategoryOfSecurity is added', () => {
        const categoryOfSecurityCollection: ICategoryOfSecurity[] = [sampleWithRequiredData];
        expectedResult = service.addCategoryOfSecurityToCollectionIfMissing(categoryOfSecurityCollection, undefined, null);
        expect(expectedResult).toEqual(categoryOfSecurityCollection);
      });
    });

    describe('compareCategoryOfSecurity', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCategoryOfSecurity(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCategoryOfSecurity(entity1, entity2);
        const compareResult2 = service.compareCategoryOfSecurity(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCategoryOfSecurity(entity1, entity2);
        const compareResult2 = service.compareCategoryOfSecurity(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCategoryOfSecurity(entity1, entity2);
        const compareResult2 = service.compareCategoryOfSecurity(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

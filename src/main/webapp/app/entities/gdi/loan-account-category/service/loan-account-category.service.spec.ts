import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ILoanAccountCategory } from '../loan-account-category.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../loan-account-category.test-samples';

import { LoanAccountCategoryService } from './loan-account-category.service';

const requireRestSample: ILoanAccountCategory = {
  ...sampleWithRequiredData,
};

describe('LoanAccountCategory Service', () => {
  let service: LoanAccountCategoryService;
  let httpMock: HttpTestingController;
  let expectedResult: ILoanAccountCategory | ILoanAccountCategory[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LoanAccountCategoryService);
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

    it('should create a LoanAccountCategory', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const loanAccountCategory = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(loanAccountCategory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LoanAccountCategory', () => {
      const loanAccountCategory = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(loanAccountCategory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LoanAccountCategory', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LoanAccountCategory', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LoanAccountCategory', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLoanAccountCategoryToCollectionIfMissing', () => {
      it('should add a LoanAccountCategory to an empty array', () => {
        const loanAccountCategory: ILoanAccountCategory = sampleWithRequiredData;
        expectedResult = service.addLoanAccountCategoryToCollectionIfMissing([], loanAccountCategory);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(loanAccountCategory);
      });

      it('should not add a LoanAccountCategory to an array that contains it', () => {
        const loanAccountCategory: ILoanAccountCategory = sampleWithRequiredData;
        const loanAccountCategoryCollection: ILoanAccountCategory[] = [
          {
            ...loanAccountCategory,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLoanAccountCategoryToCollectionIfMissing(loanAccountCategoryCollection, loanAccountCategory);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LoanAccountCategory to an array that doesn't contain it", () => {
        const loanAccountCategory: ILoanAccountCategory = sampleWithRequiredData;
        const loanAccountCategoryCollection: ILoanAccountCategory[] = [sampleWithPartialData];
        expectedResult = service.addLoanAccountCategoryToCollectionIfMissing(loanAccountCategoryCollection, loanAccountCategory);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(loanAccountCategory);
      });

      it('should add only unique LoanAccountCategory to an array', () => {
        const loanAccountCategoryArray: ILoanAccountCategory[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const loanAccountCategoryCollection: ILoanAccountCategory[] = [sampleWithRequiredData];
        expectedResult = service.addLoanAccountCategoryToCollectionIfMissing(loanAccountCategoryCollection, ...loanAccountCategoryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const loanAccountCategory: ILoanAccountCategory = sampleWithRequiredData;
        const loanAccountCategory2: ILoanAccountCategory = sampleWithPartialData;
        expectedResult = service.addLoanAccountCategoryToCollectionIfMissing([], loanAccountCategory, loanAccountCategory2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(loanAccountCategory);
        expect(expectedResult).toContain(loanAccountCategory2);
      });

      it('should accept null and undefined values', () => {
        const loanAccountCategory: ILoanAccountCategory = sampleWithRequiredData;
        expectedResult = service.addLoanAccountCategoryToCollectionIfMissing([], null, loanAccountCategory, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(loanAccountCategory);
      });

      it('should return initial array if no LoanAccountCategory is added', () => {
        const loanAccountCategoryCollection: ILoanAccountCategory[] = [sampleWithRequiredData];
        expectedResult = service.addLoanAccountCategoryToCollectionIfMissing(loanAccountCategoryCollection, undefined, null);
        expect(expectedResult).toEqual(loanAccountCategoryCollection);
      });
    });

    describe('compareLoanAccountCategory', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLoanAccountCategory(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareLoanAccountCategory(entity1, entity2);
        const compareResult2 = service.compareLoanAccountCategory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareLoanAccountCategory(entity1, entity2);
        const compareResult2 = service.compareLoanAccountCategory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareLoanAccountCategory(entity1, entity2);
        const compareResult2 = service.compareLoanAccountCategory(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ILoanProductType } from '../loan-product-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../loan-product-type.test-samples';

import { LoanProductTypeService } from './loan-product-type.service';

const requireRestSample: ILoanProductType = {
  ...sampleWithRequiredData,
};

describe('LoanProductType Service', () => {
  let service: LoanProductTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: ILoanProductType | ILoanProductType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LoanProductTypeService);
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

    it('should create a LoanProductType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const loanProductType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(loanProductType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LoanProductType', () => {
      const loanProductType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(loanProductType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LoanProductType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LoanProductType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LoanProductType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLoanProductTypeToCollectionIfMissing', () => {
      it('should add a LoanProductType to an empty array', () => {
        const loanProductType: ILoanProductType = sampleWithRequiredData;
        expectedResult = service.addLoanProductTypeToCollectionIfMissing([], loanProductType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(loanProductType);
      });

      it('should not add a LoanProductType to an array that contains it', () => {
        const loanProductType: ILoanProductType = sampleWithRequiredData;
        const loanProductTypeCollection: ILoanProductType[] = [
          {
            ...loanProductType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLoanProductTypeToCollectionIfMissing(loanProductTypeCollection, loanProductType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LoanProductType to an array that doesn't contain it", () => {
        const loanProductType: ILoanProductType = sampleWithRequiredData;
        const loanProductTypeCollection: ILoanProductType[] = [sampleWithPartialData];
        expectedResult = service.addLoanProductTypeToCollectionIfMissing(loanProductTypeCollection, loanProductType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(loanProductType);
      });

      it('should add only unique LoanProductType to an array', () => {
        const loanProductTypeArray: ILoanProductType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const loanProductTypeCollection: ILoanProductType[] = [sampleWithRequiredData];
        expectedResult = service.addLoanProductTypeToCollectionIfMissing(loanProductTypeCollection, ...loanProductTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const loanProductType: ILoanProductType = sampleWithRequiredData;
        const loanProductType2: ILoanProductType = sampleWithPartialData;
        expectedResult = service.addLoanProductTypeToCollectionIfMissing([], loanProductType, loanProductType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(loanProductType);
        expect(expectedResult).toContain(loanProductType2);
      });

      it('should accept null and undefined values', () => {
        const loanProductType: ILoanProductType = sampleWithRequiredData;
        expectedResult = service.addLoanProductTypeToCollectionIfMissing([], null, loanProductType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(loanProductType);
      });

      it('should return initial array if no LoanProductType is added', () => {
        const loanProductTypeCollection: ILoanProductType[] = [sampleWithRequiredData];
        expectedResult = service.addLoanProductTypeToCollectionIfMissing(loanProductTypeCollection, undefined, null);
        expect(expectedResult).toEqual(loanProductTypeCollection);
      });
    });

    describe('compareLoanProductType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLoanProductType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareLoanProductType(entity1, entity2);
        const compareResult2 = service.compareLoanProductType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareLoanProductType(entity1, entity2);
        const compareResult2 = service.compareLoanProductType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareLoanProductType(entity1, entity2);
        const compareResult2 = service.compareLoanProductType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

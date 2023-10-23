import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ILoanRestructureFlag } from '../loan-restructure-flag.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../loan-restructure-flag.test-samples';

import { LoanRestructureFlagService } from './loan-restructure-flag.service';

const requireRestSample: ILoanRestructureFlag = {
  ...sampleWithRequiredData,
};

describe('LoanRestructureFlag Service', () => {
  let service: LoanRestructureFlagService;
  let httpMock: HttpTestingController;
  let expectedResult: ILoanRestructureFlag | ILoanRestructureFlag[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LoanRestructureFlagService);
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

    it('should create a LoanRestructureFlag', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const loanRestructureFlag = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(loanRestructureFlag).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LoanRestructureFlag', () => {
      const loanRestructureFlag = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(loanRestructureFlag).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LoanRestructureFlag', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LoanRestructureFlag', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LoanRestructureFlag', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLoanRestructureFlagToCollectionIfMissing', () => {
      it('should add a LoanRestructureFlag to an empty array', () => {
        const loanRestructureFlag: ILoanRestructureFlag = sampleWithRequiredData;
        expectedResult = service.addLoanRestructureFlagToCollectionIfMissing([], loanRestructureFlag);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(loanRestructureFlag);
      });

      it('should not add a LoanRestructureFlag to an array that contains it', () => {
        const loanRestructureFlag: ILoanRestructureFlag = sampleWithRequiredData;
        const loanRestructureFlagCollection: ILoanRestructureFlag[] = [
          {
            ...loanRestructureFlag,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLoanRestructureFlagToCollectionIfMissing(loanRestructureFlagCollection, loanRestructureFlag);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LoanRestructureFlag to an array that doesn't contain it", () => {
        const loanRestructureFlag: ILoanRestructureFlag = sampleWithRequiredData;
        const loanRestructureFlagCollection: ILoanRestructureFlag[] = [sampleWithPartialData];
        expectedResult = service.addLoanRestructureFlagToCollectionIfMissing(loanRestructureFlagCollection, loanRestructureFlag);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(loanRestructureFlag);
      });

      it('should add only unique LoanRestructureFlag to an array', () => {
        const loanRestructureFlagArray: ILoanRestructureFlag[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const loanRestructureFlagCollection: ILoanRestructureFlag[] = [sampleWithRequiredData];
        expectedResult = service.addLoanRestructureFlagToCollectionIfMissing(loanRestructureFlagCollection, ...loanRestructureFlagArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const loanRestructureFlag: ILoanRestructureFlag = sampleWithRequiredData;
        const loanRestructureFlag2: ILoanRestructureFlag = sampleWithPartialData;
        expectedResult = service.addLoanRestructureFlagToCollectionIfMissing([], loanRestructureFlag, loanRestructureFlag2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(loanRestructureFlag);
        expect(expectedResult).toContain(loanRestructureFlag2);
      });

      it('should accept null and undefined values', () => {
        const loanRestructureFlag: ILoanRestructureFlag = sampleWithRequiredData;
        expectedResult = service.addLoanRestructureFlagToCollectionIfMissing([], null, loanRestructureFlag, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(loanRestructureFlag);
      });

      it('should return initial array if no LoanRestructureFlag is added', () => {
        const loanRestructureFlagCollection: ILoanRestructureFlag[] = [sampleWithRequiredData];
        expectedResult = service.addLoanRestructureFlagToCollectionIfMissing(loanRestructureFlagCollection, undefined, null);
        expect(expectedResult).toEqual(loanRestructureFlagCollection);
      });
    });

    describe('compareLoanRestructureFlag', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLoanRestructureFlag(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareLoanRestructureFlag(entity1, entity2);
        const compareResult2 = service.compareLoanRestructureFlag(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareLoanRestructureFlag(entity1, entity2);
        const compareResult2 = service.compareLoanRestructureFlag(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareLoanRestructureFlag(entity1, entity2);
        const compareResult2 = service.compareLoanRestructureFlag(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

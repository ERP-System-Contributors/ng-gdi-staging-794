import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ILoanDeclineReason } from '../loan-decline-reason.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../loan-decline-reason.test-samples';

import { LoanDeclineReasonService } from './loan-decline-reason.service';

const requireRestSample: ILoanDeclineReason = {
  ...sampleWithRequiredData,
};

describe('LoanDeclineReason Service', () => {
  let service: LoanDeclineReasonService;
  let httpMock: HttpTestingController;
  let expectedResult: ILoanDeclineReason | ILoanDeclineReason[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LoanDeclineReasonService);
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

    it('should create a LoanDeclineReason', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const loanDeclineReason = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(loanDeclineReason).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LoanDeclineReason', () => {
      const loanDeclineReason = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(loanDeclineReason).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LoanDeclineReason', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LoanDeclineReason', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LoanDeclineReason', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLoanDeclineReasonToCollectionIfMissing', () => {
      it('should add a LoanDeclineReason to an empty array', () => {
        const loanDeclineReason: ILoanDeclineReason = sampleWithRequiredData;
        expectedResult = service.addLoanDeclineReasonToCollectionIfMissing([], loanDeclineReason);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(loanDeclineReason);
      });

      it('should not add a LoanDeclineReason to an array that contains it', () => {
        const loanDeclineReason: ILoanDeclineReason = sampleWithRequiredData;
        const loanDeclineReasonCollection: ILoanDeclineReason[] = [
          {
            ...loanDeclineReason,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLoanDeclineReasonToCollectionIfMissing(loanDeclineReasonCollection, loanDeclineReason);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LoanDeclineReason to an array that doesn't contain it", () => {
        const loanDeclineReason: ILoanDeclineReason = sampleWithRequiredData;
        const loanDeclineReasonCollection: ILoanDeclineReason[] = [sampleWithPartialData];
        expectedResult = service.addLoanDeclineReasonToCollectionIfMissing(loanDeclineReasonCollection, loanDeclineReason);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(loanDeclineReason);
      });

      it('should add only unique LoanDeclineReason to an array', () => {
        const loanDeclineReasonArray: ILoanDeclineReason[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const loanDeclineReasonCollection: ILoanDeclineReason[] = [sampleWithRequiredData];
        expectedResult = service.addLoanDeclineReasonToCollectionIfMissing(loanDeclineReasonCollection, ...loanDeclineReasonArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const loanDeclineReason: ILoanDeclineReason = sampleWithRequiredData;
        const loanDeclineReason2: ILoanDeclineReason = sampleWithPartialData;
        expectedResult = service.addLoanDeclineReasonToCollectionIfMissing([], loanDeclineReason, loanDeclineReason2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(loanDeclineReason);
        expect(expectedResult).toContain(loanDeclineReason2);
      });

      it('should accept null and undefined values', () => {
        const loanDeclineReason: ILoanDeclineReason = sampleWithRequiredData;
        expectedResult = service.addLoanDeclineReasonToCollectionIfMissing([], null, loanDeclineReason, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(loanDeclineReason);
      });

      it('should return initial array if no LoanDeclineReason is added', () => {
        const loanDeclineReasonCollection: ILoanDeclineReason[] = [sampleWithRequiredData];
        expectedResult = service.addLoanDeclineReasonToCollectionIfMissing(loanDeclineReasonCollection, undefined, null);
        expect(expectedResult).toEqual(loanDeclineReasonCollection);
      });
    });

    describe('compareLoanDeclineReason', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLoanDeclineReason(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareLoanDeclineReason(entity1, entity2);
        const compareResult2 = service.compareLoanDeclineReason(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareLoanDeclineReason(entity1, entity2);
        const compareResult2 = service.compareLoanDeclineReason(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareLoanDeclineReason(entity1, entity2);
        const compareResult2 = service.compareLoanDeclineReason(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

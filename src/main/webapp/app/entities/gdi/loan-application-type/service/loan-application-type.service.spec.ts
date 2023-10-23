import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ILoanApplicationType } from '../loan-application-type.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../loan-application-type.test-samples';

import { LoanApplicationTypeService } from './loan-application-type.service';

const requireRestSample: ILoanApplicationType = {
  ...sampleWithRequiredData,
};

describe('LoanApplicationType Service', () => {
  let service: LoanApplicationTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: ILoanApplicationType | ILoanApplicationType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LoanApplicationTypeService);
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

    it('should create a LoanApplicationType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const loanApplicationType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(loanApplicationType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LoanApplicationType', () => {
      const loanApplicationType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(loanApplicationType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LoanApplicationType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LoanApplicationType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LoanApplicationType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLoanApplicationTypeToCollectionIfMissing', () => {
      it('should add a LoanApplicationType to an empty array', () => {
        const loanApplicationType: ILoanApplicationType = sampleWithRequiredData;
        expectedResult = service.addLoanApplicationTypeToCollectionIfMissing([], loanApplicationType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(loanApplicationType);
      });

      it('should not add a LoanApplicationType to an array that contains it', () => {
        const loanApplicationType: ILoanApplicationType = sampleWithRequiredData;
        const loanApplicationTypeCollection: ILoanApplicationType[] = [
          {
            ...loanApplicationType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLoanApplicationTypeToCollectionIfMissing(loanApplicationTypeCollection, loanApplicationType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LoanApplicationType to an array that doesn't contain it", () => {
        const loanApplicationType: ILoanApplicationType = sampleWithRequiredData;
        const loanApplicationTypeCollection: ILoanApplicationType[] = [sampleWithPartialData];
        expectedResult = service.addLoanApplicationTypeToCollectionIfMissing(loanApplicationTypeCollection, loanApplicationType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(loanApplicationType);
      });

      it('should add only unique LoanApplicationType to an array', () => {
        const loanApplicationTypeArray: ILoanApplicationType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const loanApplicationTypeCollection: ILoanApplicationType[] = [sampleWithRequiredData];
        expectedResult = service.addLoanApplicationTypeToCollectionIfMissing(loanApplicationTypeCollection, ...loanApplicationTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const loanApplicationType: ILoanApplicationType = sampleWithRequiredData;
        const loanApplicationType2: ILoanApplicationType = sampleWithPartialData;
        expectedResult = service.addLoanApplicationTypeToCollectionIfMissing([], loanApplicationType, loanApplicationType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(loanApplicationType);
        expect(expectedResult).toContain(loanApplicationType2);
      });

      it('should accept null and undefined values', () => {
        const loanApplicationType: ILoanApplicationType = sampleWithRequiredData;
        expectedResult = service.addLoanApplicationTypeToCollectionIfMissing([], null, loanApplicationType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(loanApplicationType);
      });

      it('should return initial array if no LoanApplicationType is added', () => {
        const loanApplicationTypeCollection: ILoanApplicationType[] = [sampleWithRequiredData];
        expectedResult = service.addLoanApplicationTypeToCollectionIfMissing(loanApplicationTypeCollection, undefined, null);
        expect(expectedResult).toEqual(loanApplicationTypeCollection);
      });
    });

    describe('compareLoanApplicationType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLoanApplicationType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareLoanApplicationType(entity1, entity2);
        const compareResult2 = service.compareLoanApplicationType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareLoanApplicationType(entity1, entity2);
        const compareResult2 = service.compareLoanApplicationType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareLoanApplicationType(entity1, entity2);
        const compareResult2 = service.compareLoanApplicationType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

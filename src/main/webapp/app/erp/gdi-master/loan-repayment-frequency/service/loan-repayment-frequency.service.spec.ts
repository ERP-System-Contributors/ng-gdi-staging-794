///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ILoanRepaymentFrequency } from '../loan-repayment-frequency.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../loan-repayment-frequency.test-samples';

import { LoanRepaymentFrequencyService } from './loan-repayment-frequency.service';

const requireRestSample: ILoanRepaymentFrequency = {
  ...sampleWithRequiredData,
};

describe('LoanRepaymentFrequency Service', () => {
  let service: LoanRepaymentFrequencyService;
  let httpMock: HttpTestingController;
  let expectedResult: ILoanRepaymentFrequency | ILoanRepaymentFrequency[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LoanRepaymentFrequencyService);
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

    it('should create a LoanRepaymentFrequency', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const loanRepaymentFrequency = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(loanRepaymentFrequency).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LoanRepaymentFrequency', () => {
      const loanRepaymentFrequency = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(loanRepaymentFrequency).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LoanRepaymentFrequency', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LoanRepaymentFrequency', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LoanRepaymentFrequency', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLoanRepaymentFrequencyToCollectionIfMissing', () => {
      it('should add a LoanRepaymentFrequency to an empty array', () => {
        const loanRepaymentFrequency: ILoanRepaymentFrequency = sampleWithRequiredData;
        expectedResult = service.addLoanRepaymentFrequencyToCollectionIfMissing([], loanRepaymentFrequency);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(loanRepaymentFrequency);
      });

      it('should not add a LoanRepaymentFrequency to an array that contains it', () => {
        const loanRepaymentFrequency: ILoanRepaymentFrequency = sampleWithRequiredData;
        const loanRepaymentFrequencyCollection: ILoanRepaymentFrequency[] = [
          {
            ...loanRepaymentFrequency,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLoanRepaymentFrequencyToCollectionIfMissing(loanRepaymentFrequencyCollection, loanRepaymentFrequency);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LoanRepaymentFrequency to an array that doesn't contain it", () => {
        const loanRepaymentFrequency: ILoanRepaymentFrequency = sampleWithRequiredData;
        const loanRepaymentFrequencyCollection: ILoanRepaymentFrequency[] = [sampleWithPartialData];
        expectedResult = service.addLoanRepaymentFrequencyToCollectionIfMissing(loanRepaymentFrequencyCollection, loanRepaymentFrequency);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(loanRepaymentFrequency);
      });

      it('should add only unique LoanRepaymentFrequency to an array', () => {
        const loanRepaymentFrequencyArray: ILoanRepaymentFrequency[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const loanRepaymentFrequencyCollection: ILoanRepaymentFrequency[] = [sampleWithRequiredData];
        expectedResult = service.addLoanRepaymentFrequencyToCollectionIfMissing(
          loanRepaymentFrequencyCollection,
          ...loanRepaymentFrequencyArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const loanRepaymentFrequency: ILoanRepaymentFrequency = sampleWithRequiredData;
        const loanRepaymentFrequency2: ILoanRepaymentFrequency = sampleWithPartialData;
        expectedResult = service.addLoanRepaymentFrequencyToCollectionIfMissing([], loanRepaymentFrequency, loanRepaymentFrequency2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(loanRepaymentFrequency);
        expect(expectedResult).toContain(loanRepaymentFrequency2);
      });

      it('should accept null and undefined values', () => {
        const loanRepaymentFrequency: ILoanRepaymentFrequency = sampleWithRequiredData;
        expectedResult = service.addLoanRepaymentFrequencyToCollectionIfMissing([], null, loanRepaymentFrequency, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(loanRepaymentFrequency);
      });

      it('should return initial array if no LoanRepaymentFrequency is added', () => {
        const loanRepaymentFrequencyCollection: ILoanRepaymentFrequency[] = [sampleWithRequiredData];
        expectedResult = service.addLoanRepaymentFrequencyToCollectionIfMissing(loanRepaymentFrequencyCollection, undefined, null);
        expect(expectedResult).toEqual(loanRepaymentFrequencyCollection);
      });
    });

    describe('compareLoanRepaymentFrequency', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLoanRepaymentFrequency(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareLoanRepaymentFrequency(entity1, entity2);
        const compareResult2 = service.compareLoanRepaymentFrequency(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareLoanRepaymentFrequency(entity1, entity2);
        const compareResult2 = service.compareLoanRepaymentFrequency(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareLoanRepaymentFrequency(entity1, entity2);
        const compareResult2 = service.compareLoanRepaymentFrequency(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

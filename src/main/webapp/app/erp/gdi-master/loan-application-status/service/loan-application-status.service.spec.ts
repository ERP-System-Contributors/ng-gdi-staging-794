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

import { ILoanApplicationStatus } from '../loan-application-status.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../loan-application-status.test-samples';

import { LoanApplicationStatusService } from './loan-application-status.service';

const requireRestSample: ILoanApplicationStatus = {
  ...sampleWithRequiredData,
};

describe('LoanApplicationStatus Service', () => {
  let service: LoanApplicationStatusService;
  let httpMock: HttpTestingController;
  let expectedResult: ILoanApplicationStatus | ILoanApplicationStatus[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LoanApplicationStatusService);
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

    it('should create a LoanApplicationStatus', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const loanApplicationStatus = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(loanApplicationStatus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LoanApplicationStatus', () => {
      const loanApplicationStatus = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(loanApplicationStatus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LoanApplicationStatus', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LoanApplicationStatus', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LoanApplicationStatus', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLoanApplicationStatusToCollectionIfMissing', () => {
      it('should add a LoanApplicationStatus to an empty array', () => {
        const loanApplicationStatus: ILoanApplicationStatus = sampleWithRequiredData;
        expectedResult = service.addLoanApplicationStatusToCollectionIfMissing([], loanApplicationStatus);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(loanApplicationStatus);
      });

      it('should not add a LoanApplicationStatus to an array that contains it', () => {
        const loanApplicationStatus: ILoanApplicationStatus = sampleWithRequiredData;
        const loanApplicationStatusCollection: ILoanApplicationStatus[] = [
          {
            ...loanApplicationStatus,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLoanApplicationStatusToCollectionIfMissing(loanApplicationStatusCollection, loanApplicationStatus);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LoanApplicationStatus to an array that doesn't contain it", () => {
        const loanApplicationStatus: ILoanApplicationStatus = sampleWithRequiredData;
        const loanApplicationStatusCollection: ILoanApplicationStatus[] = [sampleWithPartialData];
        expectedResult = service.addLoanApplicationStatusToCollectionIfMissing(loanApplicationStatusCollection, loanApplicationStatus);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(loanApplicationStatus);
      });

      it('should add only unique LoanApplicationStatus to an array', () => {
        const loanApplicationStatusArray: ILoanApplicationStatus[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const loanApplicationStatusCollection: ILoanApplicationStatus[] = [sampleWithRequiredData];
        expectedResult = service.addLoanApplicationStatusToCollectionIfMissing(
          loanApplicationStatusCollection,
          ...loanApplicationStatusArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const loanApplicationStatus: ILoanApplicationStatus = sampleWithRequiredData;
        const loanApplicationStatus2: ILoanApplicationStatus = sampleWithPartialData;
        expectedResult = service.addLoanApplicationStatusToCollectionIfMissing([], loanApplicationStatus, loanApplicationStatus2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(loanApplicationStatus);
        expect(expectedResult).toContain(loanApplicationStatus2);
      });

      it('should accept null and undefined values', () => {
        const loanApplicationStatus: ILoanApplicationStatus = sampleWithRequiredData;
        expectedResult = service.addLoanApplicationStatusToCollectionIfMissing([], null, loanApplicationStatus, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(loanApplicationStatus);
      });

      it('should return initial array if no LoanApplicationStatus is added', () => {
        const loanApplicationStatusCollection: ILoanApplicationStatus[] = [sampleWithRequiredData];
        expectedResult = service.addLoanApplicationStatusToCollectionIfMissing(loanApplicationStatusCollection, undefined, null);
        expect(expectedResult).toEqual(loanApplicationStatusCollection);
      });
    });

    describe('compareLoanApplicationStatus', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLoanApplicationStatus(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareLoanApplicationStatus(entity1, entity2);
        const compareResult2 = service.compareLoanApplicationStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareLoanApplicationStatus(entity1, entity2);
        const compareResult2 = service.compareLoanApplicationStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareLoanApplicationStatus(entity1, entity2);
        const compareResult2 = service.compareLoanApplicationStatus(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

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

import { ILoanPerformanceClassification } from '../loan-performance-classification.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../loan-performance-classification.test-samples';

import { LoanPerformanceClassificationService } from './loan-performance-classification.service';

const requireRestSample: ILoanPerformanceClassification = {
  ...sampleWithRequiredData,
};

describe('LoanPerformanceClassification Service', () => {
  let service: LoanPerformanceClassificationService;
  let httpMock: HttpTestingController;
  let expectedResult: ILoanPerformanceClassification | ILoanPerformanceClassification[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LoanPerformanceClassificationService);
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

    it('should create a LoanPerformanceClassification', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const loanPerformanceClassification = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(loanPerformanceClassification).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LoanPerformanceClassification', () => {
      const loanPerformanceClassification = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(loanPerformanceClassification).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LoanPerformanceClassification', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LoanPerformanceClassification', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LoanPerformanceClassification', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLoanPerformanceClassificationToCollectionIfMissing', () => {
      it('should add a LoanPerformanceClassification to an empty array', () => {
        const loanPerformanceClassification: ILoanPerformanceClassification = sampleWithRequiredData;
        expectedResult = service.addLoanPerformanceClassificationToCollectionIfMissing([], loanPerformanceClassification);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(loanPerformanceClassification);
      });

      it('should not add a LoanPerformanceClassification to an array that contains it', () => {
        const loanPerformanceClassification: ILoanPerformanceClassification = sampleWithRequiredData;
        const loanPerformanceClassificationCollection: ILoanPerformanceClassification[] = [
          {
            ...loanPerformanceClassification,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLoanPerformanceClassificationToCollectionIfMissing(
          loanPerformanceClassificationCollection,
          loanPerformanceClassification
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LoanPerformanceClassification to an array that doesn't contain it", () => {
        const loanPerformanceClassification: ILoanPerformanceClassification = sampleWithRequiredData;
        const loanPerformanceClassificationCollection: ILoanPerformanceClassification[] = [sampleWithPartialData];
        expectedResult = service.addLoanPerformanceClassificationToCollectionIfMissing(
          loanPerformanceClassificationCollection,
          loanPerformanceClassification
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(loanPerformanceClassification);
      });

      it('should add only unique LoanPerformanceClassification to an array', () => {
        const loanPerformanceClassificationArray: ILoanPerformanceClassification[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const loanPerformanceClassificationCollection: ILoanPerformanceClassification[] = [sampleWithRequiredData];
        expectedResult = service.addLoanPerformanceClassificationToCollectionIfMissing(
          loanPerformanceClassificationCollection,
          ...loanPerformanceClassificationArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const loanPerformanceClassification: ILoanPerformanceClassification = sampleWithRequiredData;
        const loanPerformanceClassification2: ILoanPerformanceClassification = sampleWithPartialData;
        expectedResult = service.addLoanPerformanceClassificationToCollectionIfMissing(
          [],
          loanPerformanceClassification,
          loanPerformanceClassification2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(loanPerformanceClassification);
        expect(expectedResult).toContain(loanPerformanceClassification2);
      });

      it('should accept null and undefined values', () => {
        const loanPerformanceClassification: ILoanPerformanceClassification = sampleWithRequiredData;
        expectedResult = service.addLoanPerformanceClassificationToCollectionIfMissing([], null, loanPerformanceClassification, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(loanPerformanceClassification);
      });

      it('should return initial array if no LoanPerformanceClassification is added', () => {
        const loanPerformanceClassificationCollection: ILoanPerformanceClassification[] = [sampleWithRequiredData];
        expectedResult = service.addLoanPerformanceClassificationToCollectionIfMissing(
          loanPerformanceClassificationCollection,
          undefined,
          null
        );
        expect(expectedResult).toEqual(loanPerformanceClassificationCollection);
      });
    });

    describe('compareLoanPerformanceClassification', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLoanPerformanceClassification(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareLoanPerformanceClassification(entity1, entity2);
        const compareResult2 = service.compareLoanPerformanceClassification(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareLoanPerformanceClassification(entity1, entity2);
        const compareResult2 = service.compareLoanPerformanceClassification(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareLoanPerformanceClassification(entity1, entity2);
        const compareResult2 = service.compareLoanPerformanceClassification(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

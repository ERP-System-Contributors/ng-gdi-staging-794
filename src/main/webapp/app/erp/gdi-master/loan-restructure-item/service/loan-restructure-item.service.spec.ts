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

import { ILoanRestructureItem } from '../loan-restructure-item.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../loan-restructure-item.test-samples';

import { LoanRestructureItemService } from './loan-restructure-item.service';

const requireRestSample: ILoanRestructureItem = {
  ...sampleWithRequiredData,
};

describe('LoanRestructureItem Service', () => {
  let service: LoanRestructureItemService;
  let httpMock: HttpTestingController;
  let expectedResult: ILoanRestructureItem | ILoanRestructureItem[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LoanRestructureItemService);
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

    it('should create a LoanRestructureItem', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const loanRestructureItem = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(loanRestructureItem).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LoanRestructureItem', () => {
      const loanRestructureItem = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(loanRestructureItem).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LoanRestructureItem', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LoanRestructureItem', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LoanRestructureItem', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLoanRestructureItemToCollectionIfMissing', () => {
      it('should add a LoanRestructureItem to an empty array', () => {
        const loanRestructureItem: ILoanRestructureItem = sampleWithRequiredData;
        expectedResult = service.addLoanRestructureItemToCollectionIfMissing([], loanRestructureItem);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(loanRestructureItem);
      });

      it('should not add a LoanRestructureItem to an array that contains it', () => {
        const loanRestructureItem: ILoanRestructureItem = sampleWithRequiredData;
        const loanRestructureItemCollection: ILoanRestructureItem[] = [
          {
            ...loanRestructureItem,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLoanRestructureItemToCollectionIfMissing(loanRestructureItemCollection, loanRestructureItem);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LoanRestructureItem to an array that doesn't contain it", () => {
        const loanRestructureItem: ILoanRestructureItem = sampleWithRequiredData;
        const loanRestructureItemCollection: ILoanRestructureItem[] = [sampleWithPartialData];
        expectedResult = service.addLoanRestructureItemToCollectionIfMissing(loanRestructureItemCollection, loanRestructureItem);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(loanRestructureItem);
      });

      it('should add only unique LoanRestructureItem to an array', () => {
        const loanRestructureItemArray: ILoanRestructureItem[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const loanRestructureItemCollection: ILoanRestructureItem[] = [sampleWithRequiredData];
        expectedResult = service.addLoanRestructureItemToCollectionIfMissing(loanRestructureItemCollection, ...loanRestructureItemArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const loanRestructureItem: ILoanRestructureItem = sampleWithRequiredData;
        const loanRestructureItem2: ILoanRestructureItem = sampleWithPartialData;
        expectedResult = service.addLoanRestructureItemToCollectionIfMissing([], loanRestructureItem, loanRestructureItem2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(loanRestructureItem);
        expect(expectedResult).toContain(loanRestructureItem2);
      });

      it('should accept null and undefined values', () => {
        const loanRestructureItem: ILoanRestructureItem = sampleWithRequiredData;
        expectedResult = service.addLoanRestructureItemToCollectionIfMissing([], null, loanRestructureItem, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(loanRestructureItem);
      });

      it('should return initial array if no LoanRestructureItem is added', () => {
        const loanRestructureItemCollection: ILoanRestructureItem[] = [sampleWithRequiredData];
        expectedResult = service.addLoanRestructureItemToCollectionIfMissing(loanRestructureItemCollection, undefined, null);
        expect(expectedResult).toEqual(loanRestructureItemCollection);
      });
    });

    describe('compareLoanRestructureItem', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLoanRestructureItem(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareLoanRestructureItem(entity1, entity2);
        const compareResult2 = service.compareLoanRestructureItem(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareLoanRestructureItem(entity1, entity2);
        const compareResult2 = service.compareLoanRestructureItem(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareLoanRestructureItem(entity1, entity2);
        const compareResult2 = service.compareLoanRestructureItem(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

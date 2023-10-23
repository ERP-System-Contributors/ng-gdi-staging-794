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

import { DATE_FORMAT } from 'app/config/input.constants';
import { ICardAcquiringTransaction } from '../card-acquiring-transaction.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../card-acquiring-transaction.test-samples';

import { CardAcquiringTransactionService, RestCardAcquiringTransaction } from './card-acquiring-transaction.service';

const requireRestSample: RestCardAcquiringTransaction = {
  ...sampleWithRequiredData,
  reportingDate: sampleWithRequiredData.reportingDate?.format(DATE_FORMAT),
};

describe('CardAcquiringTransaction Service', () => {
  let service: CardAcquiringTransactionService;
  let httpMock: HttpTestingController;
  let expectedResult: ICardAcquiringTransaction | ICardAcquiringTransaction[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CardAcquiringTransactionService);
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

    it('should create a CardAcquiringTransaction', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const cardAcquiringTransaction = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cardAcquiringTransaction).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CardAcquiringTransaction', () => {
      const cardAcquiringTransaction = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cardAcquiringTransaction).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CardAcquiringTransaction', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CardAcquiringTransaction', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CardAcquiringTransaction', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCardAcquiringTransactionToCollectionIfMissing', () => {
      it('should add a CardAcquiringTransaction to an empty array', () => {
        const cardAcquiringTransaction: ICardAcquiringTransaction = sampleWithRequiredData;
        expectedResult = service.addCardAcquiringTransactionToCollectionIfMissing([], cardAcquiringTransaction);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cardAcquiringTransaction);
      });

      it('should not add a CardAcquiringTransaction to an array that contains it', () => {
        const cardAcquiringTransaction: ICardAcquiringTransaction = sampleWithRequiredData;
        const cardAcquiringTransactionCollection: ICardAcquiringTransaction[] = [
          {
            ...cardAcquiringTransaction,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCardAcquiringTransactionToCollectionIfMissing(
          cardAcquiringTransactionCollection,
          cardAcquiringTransaction
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CardAcquiringTransaction to an array that doesn't contain it", () => {
        const cardAcquiringTransaction: ICardAcquiringTransaction = sampleWithRequiredData;
        const cardAcquiringTransactionCollection: ICardAcquiringTransaction[] = [sampleWithPartialData];
        expectedResult = service.addCardAcquiringTransactionToCollectionIfMissing(
          cardAcquiringTransactionCollection,
          cardAcquiringTransaction
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cardAcquiringTransaction);
      });

      it('should add only unique CardAcquiringTransaction to an array', () => {
        const cardAcquiringTransactionArray: ICardAcquiringTransaction[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const cardAcquiringTransactionCollection: ICardAcquiringTransaction[] = [sampleWithRequiredData];
        expectedResult = service.addCardAcquiringTransactionToCollectionIfMissing(
          cardAcquiringTransactionCollection,
          ...cardAcquiringTransactionArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cardAcquiringTransaction: ICardAcquiringTransaction = sampleWithRequiredData;
        const cardAcquiringTransaction2: ICardAcquiringTransaction = sampleWithPartialData;
        expectedResult = service.addCardAcquiringTransactionToCollectionIfMissing([], cardAcquiringTransaction, cardAcquiringTransaction2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cardAcquiringTransaction);
        expect(expectedResult).toContain(cardAcquiringTransaction2);
      });

      it('should accept null and undefined values', () => {
        const cardAcquiringTransaction: ICardAcquiringTransaction = sampleWithRequiredData;
        expectedResult = service.addCardAcquiringTransactionToCollectionIfMissing([], null, cardAcquiringTransaction, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cardAcquiringTransaction);
      });

      it('should return initial array if no CardAcquiringTransaction is added', () => {
        const cardAcquiringTransactionCollection: ICardAcquiringTransaction[] = [sampleWithRequiredData];
        expectedResult = service.addCardAcquiringTransactionToCollectionIfMissing(cardAcquiringTransactionCollection, undefined, null);
        expect(expectedResult).toEqual(cardAcquiringTransactionCollection);
      });
    });

    describe('compareCardAcquiringTransaction', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCardAcquiringTransaction(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCardAcquiringTransaction(entity1, entity2);
        const compareResult2 = service.compareCardAcquiringTransaction(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCardAcquiringTransaction(entity1, entity2);
        const compareResult2 = service.compareCardAcquiringTransaction(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCardAcquiringTransaction(entity1, entity2);
        const compareResult2 = service.compareCardAcquiringTransaction(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

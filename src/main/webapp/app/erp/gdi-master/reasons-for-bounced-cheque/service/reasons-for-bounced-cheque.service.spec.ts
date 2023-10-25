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

import { IReasonsForBouncedCheque } from '../reasons-for-bounced-cheque.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../reasons-for-bounced-cheque.test-samples';

import { ReasonsForBouncedChequeService } from './reasons-for-bounced-cheque.service';

const requireRestSample: IReasonsForBouncedCheque = {
  ...sampleWithRequiredData,
};

describe('ReasonsForBouncedCheque Service', () => {
  let service: ReasonsForBouncedChequeService;
  let httpMock: HttpTestingController;
  let expectedResult: IReasonsForBouncedCheque | IReasonsForBouncedCheque[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ReasonsForBouncedChequeService);
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

    it('should create a ReasonsForBouncedCheque', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const reasonsForBouncedCheque = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(reasonsForBouncedCheque).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ReasonsForBouncedCheque', () => {
      const reasonsForBouncedCheque = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(reasonsForBouncedCheque).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ReasonsForBouncedCheque', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ReasonsForBouncedCheque', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ReasonsForBouncedCheque', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addReasonsForBouncedChequeToCollectionIfMissing', () => {
      it('should add a ReasonsForBouncedCheque to an empty array', () => {
        const reasonsForBouncedCheque: IReasonsForBouncedCheque = sampleWithRequiredData;
        expectedResult = service.addReasonsForBouncedChequeToCollectionIfMissing([], reasonsForBouncedCheque);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reasonsForBouncedCheque);
      });

      it('should not add a ReasonsForBouncedCheque to an array that contains it', () => {
        const reasonsForBouncedCheque: IReasonsForBouncedCheque = sampleWithRequiredData;
        const reasonsForBouncedChequeCollection: IReasonsForBouncedCheque[] = [
          {
            ...reasonsForBouncedCheque,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addReasonsForBouncedChequeToCollectionIfMissing(
          reasonsForBouncedChequeCollection,
          reasonsForBouncedCheque
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ReasonsForBouncedCheque to an array that doesn't contain it", () => {
        const reasonsForBouncedCheque: IReasonsForBouncedCheque = sampleWithRequiredData;
        const reasonsForBouncedChequeCollection: IReasonsForBouncedCheque[] = [sampleWithPartialData];
        expectedResult = service.addReasonsForBouncedChequeToCollectionIfMissing(
          reasonsForBouncedChequeCollection,
          reasonsForBouncedCheque
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reasonsForBouncedCheque);
      });

      it('should add only unique ReasonsForBouncedCheque to an array', () => {
        const reasonsForBouncedChequeArray: IReasonsForBouncedCheque[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const reasonsForBouncedChequeCollection: IReasonsForBouncedCheque[] = [sampleWithRequiredData];
        expectedResult = service.addReasonsForBouncedChequeToCollectionIfMissing(
          reasonsForBouncedChequeCollection,
          ...reasonsForBouncedChequeArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const reasonsForBouncedCheque: IReasonsForBouncedCheque = sampleWithRequiredData;
        const reasonsForBouncedCheque2: IReasonsForBouncedCheque = sampleWithPartialData;
        expectedResult = service.addReasonsForBouncedChequeToCollectionIfMissing([], reasonsForBouncedCheque, reasonsForBouncedCheque2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reasonsForBouncedCheque);
        expect(expectedResult).toContain(reasonsForBouncedCheque2);
      });

      it('should accept null and undefined values', () => {
        const reasonsForBouncedCheque: IReasonsForBouncedCheque = sampleWithRequiredData;
        expectedResult = service.addReasonsForBouncedChequeToCollectionIfMissing([], null, reasonsForBouncedCheque, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reasonsForBouncedCheque);
      });

      it('should return initial array if no ReasonsForBouncedCheque is added', () => {
        const reasonsForBouncedChequeCollection: IReasonsForBouncedCheque[] = [sampleWithRequiredData];
        expectedResult = service.addReasonsForBouncedChequeToCollectionIfMissing(reasonsForBouncedChequeCollection, undefined, null);
        expect(expectedResult).toEqual(reasonsForBouncedChequeCollection);
      });
    });

    describe('compareReasonsForBouncedCheque', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareReasonsForBouncedCheque(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareReasonsForBouncedCheque(entity1, entity2);
        const compareResult2 = service.compareReasonsForBouncedCheque(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareReasonsForBouncedCheque(entity1, entity2);
        const compareResult2 = service.compareReasonsForBouncedCheque(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareReasonsForBouncedCheque(entity1, entity2);
        const compareResult2 = service.compareReasonsForBouncedCheque(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

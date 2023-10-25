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

import { ICreditCardOwnership } from '../credit-card-ownership.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../credit-card-ownership.test-samples';

import { CreditCardOwnershipService } from './credit-card-ownership.service';

const requireRestSample: ICreditCardOwnership = {
  ...sampleWithRequiredData,
};

describe('CreditCardOwnership Service', () => {
  let service: CreditCardOwnershipService;
  let httpMock: HttpTestingController;
  let expectedResult: ICreditCardOwnership | ICreditCardOwnership[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CreditCardOwnershipService);
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

    it('should create a CreditCardOwnership', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const creditCardOwnership = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(creditCardOwnership).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CreditCardOwnership', () => {
      const creditCardOwnership = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(creditCardOwnership).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CreditCardOwnership', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CreditCardOwnership', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CreditCardOwnership', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCreditCardOwnershipToCollectionIfMissing', () => {
      it('should add a CreditCardOwnership to an empty array', () => {
        const creditCardOwnership: ICreditCardOwnership = sampleWithRequiredData;
        expectedResult = service.addCreditCardOwnershipToCollectionIfMissing([], creditCardOwnership);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(creditCardOwnership);
      });

      it('should not add a CreditCardOwnership to an array that contains it', () => {
        const creditCardOwnership: ICreditCardOwnership = sampleWithRequiredData;
        const creditCardOwnershipCollection: ICreditCardOwnership[] = [
          {
            ...creditCardOwnership,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCreditCardOwnershipToCollectionIfMissing(creditCardOwnershipCollection, creditCardOwnership);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CreditCardOwnership to an array that doesn't contain it", () => {
        const creditCardOwnership: ICreditCardOwnership = sampleWithRequiredData;
        const creditCardOwnershipCollection: ICreditCardOwnership[] = [sampleWithPartialData];
        expectedResult = service.addCreditCardOwnershipToCollectionIfMissing(creditCardOwnershipCollection, creditCardOwnership);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(creditCardOwnership);
      });

      it('should add only unique CreditCardOwnership to an array', () => {
        const creditCardOwnershipArray: ICreditCardOwnership[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const creditCardOwnershipCollection: ICreditCardOwnership[] = [sampleWithRequiredData];
        expectedResult = service.addCreditCardOwnershipToCollectionIfMissing(creditCardOwnershipCollection, ...creditCardOwnershipArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const creditCardOwnership: ICreditCardOwnership = sampleWithRequiredData;
        const creditCardOwnership2: ICreditCardOwnership = sampleWithPartialData;
        expectedResult = service.addCreditCardOwnershipToCollectionIfMissing([], creditCardOwnership, creditCardOwnership2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(creditCardOwnership);
        expect(expectedResult).toContain(creditCardOwnership2);
      });

      it('should accept null and undefined values', () => {
        const creditCardOwnership: ICreditCardOwnership = sampleWithRequiredData;
        expectedResult = service.addCreditCardOwnershipToCollectionIfMissing([], null, creditCardOwnership, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(creditCardOwnership);
      });

      it('should return initial array if no CreditCardOwnership is added', () => {
        const creditCardOwnershipCollection: ICreditCardOwnership[] = [sampleWithRequiredData];
        expectedResult = service.addCreditCardOwnershipToCollectionIfMissing(creditCardOwnershipCollection, undefined, null);
        expect(expectedResult).toEqual(creditCardOwnershipCollection);
      });
    });

    describe('compareCreditCardOwnership', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCreditCardOwnership(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCreditCardOwnership(entity1, entity2);
        const compareResult2 = service.compareCreditCardOwnership(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCreditCardOwnership(entity1, entity2);
        const compareResult2 = service.compareCreditCardOwnership(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCreditCardOwnership(entity1, entity2);
        const compareResult2 = service.compareCreditCardOwnership(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

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
import { ICreditCardFacility } from '../credit-card-facility.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../credit-card-facility.test-samples';

import { CreditCardFacilityService, RestCreditCardFacility } from './credit-card-facility.service';

const requireRestSample: RestCreditCardFacility = {
  ...sampleWithRequiredData,
  reportingDate: sampleWithRequiredData.reportingDate?.format(DATE_FORMAT),
};

describe('CreditCardFacility Service', () => {
  let service: CreditCardFacilityService;
  let httpMock: HttpTestingController;
  let expectedResult: ICreditCardFacility | ICreditCardFacility[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CreditCardFacilityService);
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

    it('should create a CreditCardFacility', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const creditCardFacility = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(creditCardFacility).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CreditCardFacility', () => {
      const creditCardFacility = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(creditCardFacility).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CreditCardFacility', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CreditCardFacility', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CreditCardFacility', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCreditCardFacilityToCollectionIfMissing', () => {
      it('should add a CreditCardFacility to an empty array', () => {
        const creditCardFacility: ICreditCardFacility = sampleWithRequiredData;
        expectedResult = service.addCreditCardFacilityToCollectionIfMissing([], creditCardFacility);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(creditCardFacility);
      });

      it('should not add a CreditCardFacility to an array that contains it', () => {
        const creditCardFacility: ICreditCardFacility = sampleWithRequiredData;
        const creditCardFacilityCollection: ICreditCardFacility[] = [
          {
            ...creditCardFacility,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCreditCardFacilityToCollectionIfMissing(creditCardFacilityCollection, creditCardFacility);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CreditCardFacility to an array that doesn't contain it", () => {
        const creditCardFacility: ICreditCardFacility = sampleWithRequiredData;
        const creditCardFacilityCollection: ICreditCardFacility[] = [sampleWithPartialData];
        expectedResult = service.addCreditCardFacilityToCollectionIfMissing(creditCardFacilityCollection, creditCardFacility);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(creditCardFacility);
      });

      it('should add only unique CreditCardFacility to an array', () => {
        const creditCardFacilityArray: ICreditCardFacility[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const creditCardFacilityCollection: ICreditCardFacility[] = [sampleWithRequiredData];
        expectedResult = service.addCreditCardFacilityToCollectionIfMissing(creditCardFacilityCollection, ...creditCardFacilityArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const creditCardFacility: ICreditCardFacility = sampleWithRequiredData;
        const creditCardFacility2: ICreditCardFacility = sampleWithPartialData;
        expectedResult = service.addCreditCardFacilityToCollectionIfMissing([], creditCardFacility, creditCardFacility2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(creditCardFacility);
        expect(expectedResult).toContain(creditCardFacility2);
      });

      it('should accept null and undefined values', () => {
        const creditCardFacility: ICreditCardFacility = sampleWithRequiredData;
        expectedResult = service.addCreditCardFacilityToCollectionIfMissing([], null, creditCardFacility, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(creditCardFacility);
      });

      it('should return initial array if no CreditCardFacility is added', () => {
        const creditCardFacilityCollection: ICreditCardFacility[] = [sampleWithRequiredData];
        expectedResult = service.addCreditCardFacilityToCollectionIfMissing(creditCardFacilityCollection, undefined, null);
        expect(expectedResult).toEqual(creditCardFacilityCollection);
      });
    });

    describe('compareCreditCardFacility', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCreditCardFacility(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCreditCardFacility(entity1, entity2);
        const compareResult2 = service.compareCreditCardFacility(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCreditCardFacility(entity1, entity2);
        const compareResult2 = service.compareCreditCardFacility(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCreditCardFacility(entity1, entity2);
        const compareResult2 = service.compareCreditCardFacility(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

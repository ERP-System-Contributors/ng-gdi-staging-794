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
import { ICardIssuerCharges } from '../card-issuer-charges.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../card-issuer-charges.test-samples';

import { CardIssuerChargesService, RestCardIssuerCharges } from './card-issuer-charges.service';

const requireRestSample: RestCardIssuerCharges = {
  ...sampleWithRequiredData,
  reportingDate: sampleWithRequiredData.reportingDate?.format(DATE_FORMAT),
};

describe('CardIssuerCharges Service', () => {
  let service: CardIssuerChargesService;
  let httpMock: HttpTestingController;
  let expectedResult: ICardIssuerCharges | ICardIssuerCharges[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CardIssuerChargesService);
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

    it('should create a CardIssuerCharges', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const cardIssuerCharges = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cardIssuerCharges).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CardIssuerCharges', () => {
      const cardIssuerCharges = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cardIssuerCharges).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CardIssuerCharges', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CardIssuerCharges', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CardIssuerCharges', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCardIssuerChargesToCollectionIfMissing', () => {
      it('should add a CardIssuerCharges to an empty array', () => {
        const cardIssuerCharges: ICardIssuerCharges = sampleWithRequiredData;
        expectedResult = service.addCardIssuerChargesToCollectionIfMissing([], cardIssuerCharges);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cardIssuerCharges);
      });

      it('should not add a CardIssuerCharges to an array that contains it', () => {
        const cardIssuerCharges: ICardIssuerCharges = sampleWithRequiredData;
        const cardIssuerChargesCollection: ICardIssuerCharges[] = [
          {
            ...cardIssuerCharges,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCardIssuerChargesToCollectionIfMissing(cardIssuerChargesCollection, cardIssuerCharges);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CardIssuerCharges to an array that doesn't contain it", () => {
        const cardIssuerCharges: ICardIssuerCharges = sampleWithRequiredData;
        const cardIssuerChargesCollection: ICardIssuerCharges[] = [sampleWithPartialData];
        expectedResult = service.addCardIssuerChargesToCollectionIfMissing(cardIssuerChargesCollection, cardIssuerCharges);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cardIssuerCharges);
      });

      it('should add only unique CardIssuerCharges to an array', () => {
        const cardIssuerChargesArray: ICardIssuerCharges[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cardIssuerChargesCollection: ICardIssuerCharges[] = [sampleWithRequiredData];
        expectedResult = service.addCardIssuerChargesToCollectionIfMissing(cardIssuerChargesCollection, ...cardIssuerChargesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cardIssuerCharges: ICardIssuerCharges = sampleWithRequiredData;
        const cardIssuerCharges2: ICardIssuerCharges = sampleWithPartialData;
        expectedResult = service.addCardIssuerChargesToCollectionIfMissing([], cardIssuerCharges, cardIssuerCharges2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cardIssuerCharges);
        expect(expectedResult).toContain(cardIssuerCharges2);
      });

      it('should accept null and undefined values', () => {
        const cardIssuerCharges: ICardIssuerCharges = sampleWithRequiredData;
        expectedResult = service.addCardIssuerChargesToCollectionIfMissing([], null, cardIssuerCharges, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cardIssuerCharges);
      });

      it('should return initial array if no CardIssuerCharges is added', () => {
        const cardIssuerChargesCollection: ICardIssuerCharges[] = [sampleWithRequiredData];
        expectedResult = service.addCardIssuerChargesToCollectionIfMissing(cardIssuerChargesCollection, undefined, null);
        expect(expectedResult).toEqual(cardIssuerChargesCollection);
      });
    });

    describe('compareCardIssuerCharges', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCardIssuerCharges(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCardIssuerCharges(entity1, entity2);
        const compareResult2 = service.compareCardIssuerCharges(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCardIssuerCharges(entity1, entity2);
        const compareResult2 = service.compareCardIssuerCharges(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCardIssuerCharges(entity1, entity2);
        const compareResult2 = service.compareCardIssuerCharges(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

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

import { ICardCharges } from '../card-charges.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../card-charges.test-samples';

import { CardChargesService } from './card-charges.service';

const requireRestSample: ICardCharges = {
  ...sampleWithRequiredData,
};

describe('CardCharges Service', () => {
  let service: CardChargesService;
  let httpMock: HttpTestingController;
  let expectedResult: ICardCharges | ICardCharges[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CardChargesService);
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

    it('should create a CardCharges', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const cardCharges = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cardCharges).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CardCharges', () => {
      const cardCharges = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cardCharges).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CardCharges', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CardCharges', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CardCharges', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCardChargesToCollectionIfMissing', () => {
      it('should add a CardCharges to an empty array', () => {
        const cardCharges: ICardCharges = sampleWithRequiredData;
        expectedResult = service.addCardChargesToCollectionIfMissing([], cardCharges);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cardCharges);
      });

      it('should not add a CardCharges to an array that contains it', () => {
        const cardCharges: ICardCharges = sampleWithRequiredData;
        const cardChargesCollection: ICardCharges[] = [
          {
            ...cardCharges,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCardChargesToCollectionIfMissing(cardChargesCollection, cardCharges);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CardCharges to an array that doesn't contain it", () => {
        const cardCharges: ICardCharges = sampleWithRequiredData;
        const cardChargesCollection: ICardCharges[] = [sampleWithPartialData];
        expectedResult = service.addCardChargesToCollectionIfMissing(cardChargesCollection, cardCharges);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cardCharges);
      });

      it('should add only unique CardCharges to an array', () => {
        const cardChargesArray: ICardCharges[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cardChargesCollection: ICardCharges[] = [sampleWithRequiredData];
        expectedResult = service.addCardChargesToCollectionIfMissing(cardChargesCollection, ...cardChargesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cardCharges: ICardCharges = sampleWithRequiredData;
        const cardCharges2: ICardCharges = sampleWithPartialData;
        expectedResult = service.addCardChargesToCollectionIfMissing([], cardCharges, cardCharges2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cardCharges);
        expect(expectedResult).toContain(cardCharges2);
      });

      it('should accept null and undefined values', () => {
        const cardCharges: ICardCharges = sampleWithRequiredData;
        expectedResult = service.addCardChargesToCollectionIfMissing([], null, cardCharges, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cardCharges);
      });

      it('should return initial array if no CardCharges is added', () => {
        const cardChargesCollection: ICardCharges[] = [sampleWithRequiredData];
        expectedResult = service.addCardChargesToCollectionIfMissing(cardChargesCollection, undefined, null);
        expect(expectedResult).toEqual(cardChargesCollection);
      });
    });

    describe('compareCardCharges', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCardCharges(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCardCharges(entity1, entity2);
        const compareResult2 = service.compareCardCharges(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCardCharges(entity1, entity2);
        const compareResult2 = service.compareCardCharges(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCardCharges(entity1, entity2);
        const compareResult2 = service.compareCardCharges(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

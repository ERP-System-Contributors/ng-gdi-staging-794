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
import { ICardFraudInformation } from '../card-fraud-information.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../card-fraud-information.test-samples';

import { CardFraudInformationService, RestCardFraudInformation } from './card-fraud-information.service';

const requireRestSample: RestCardFraudInformation = {
  ...sampleWithRequiredData,
  reportingDate: sampleWithRequiredData.reportingDate?.format(DATE_FORMAT),
};

describe('CardFraudInformation Service', () => {
  let service: CardFraudInformationService;
  let httpMock: HttpTestingController;
  let expectedResult: ICardFraudInformation | ICardFraudInformation[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CardFraudInformationService);
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

    it('should create a CardFraudInformation', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const cardFraudInformation = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cardFraudInformation).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CardFraudInformation', () => {
      const cardFraudInformation = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cardFraudInformation).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CardFraudInformation', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CardFraudInformation', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CardFraudInformation', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCardFraudInformationToCollectionIfMissing', () => {
      it('should add a CardFraudInformation to an empty array', () => {
        const cardFraudInformation: ICardFraudInformation = sampleWithRequiredData;
        expectedResult = service.addCardFraudInformationToCollectionIfMissing([], cardFraudInformation);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cardFraudInformation);
      });

      it('should not add a CardFraudInformation to an array that contains it', () => {
        const cardFraudInformation: ICardFraudInformation = sampleWithRequiredData;
        const cardFraudInformationCollection: ICardFraudInformation[] = [
          {
            ...cardFraudInformation,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCardFraudInformationToCollectionIfMissing(cardFraudInformationCollection, cardFraudInformation);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CardFraudInformation to an array that doesn't contain it", () => {
        const cardFraudInformation: ICardFraudInformation = sampleWithRequiredData;
        const cardFraudInformationCollection: ICardFraudInformation[] = [sampleWithPartialData];
        expectedResult = service.addCardFraudInformationToCollectionIfMissing(cardFraudInformationCollection, cardFraudInformation);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cardFraudInformation);
      });

      it('should add only unique CardFraudInformation to an array', () => {
        const cardFraudInformationArray: ICardFraudInformation[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cardFraudInformationCollection: ICardFraudInformation[] = [sampleWithRequiredData];
        expectedResult = service.addCardFraudInformationToCollectionIfMissing(cardFraudInformationCollection, ...cardFraudInformationArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cardFraudInformation: ICardFraudInformation = sampleWithRequiredData;
        const cardFraudInformation2: ICardFraudInformation = sampleWithPartialData;
        expectedResult = service.addCardFraudInformationToCollectionIfMissing([], cardFraudInformation, cardFraudInformation2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cardFraudInformation);
        expect(expectedResult).toContain(cardFraudInformation2);
      });

      it('should accept null and undefined values', () => {
        const cardFraudInformation: ICardFraudInformation = sampleWithRequiredData;
        expectedResult = service.addCardFraudInformationToCollectionIfMissing([], null, cardFraudInformation, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cardFraudInformation);
      });

      it('should return initial array if no CardFraudInformation is added', () => {
        const cardFraudInformationCollection: ICardFraudInformation[] = [sampleWithRequiredData];
        expectedResult = service.addCardFraudInformationToCollectionIfMissing(cardFraudInformationCollection, undefined, null);
        expect(expectedResult).toEqual(cardFraudInformationCollection);
      });
    });

    describe('compareCardFraudInformation', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCardFraudInformation(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCardFraudInformation(entity1, entity2);
        const compareResult2 = service.compareCardFraudInformation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCardFraudInformation(entity1, entity2);
        const compareResult2 = service.compareCardFraudInformation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCardFraudInformation(entity1, entity2);
        const compareResult2 = service.compareCardFraudInformation(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

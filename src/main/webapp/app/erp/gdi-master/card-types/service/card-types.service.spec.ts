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

import { ICardTypes } from '../card-types.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../card-types.test-samples';

import { CardTypesService } from './card-types.service';

const requireRestSample: ICardTypes = {
  ...sampleWithRequiredData,
};

describe('CardTypes Service', () => {
  let service: CardTypesService;
  let httpMock: HttpTestingController;
  let expectedResult: ICardTypes | ICardTypes[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CardTypesService);
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

    it('should create a CardTypes', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const cardTypes = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cardTypes).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CardTypes', () => {
      const cardTypes = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cardTypes).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CardTypes', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CardTypes', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CardTypes', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCardTypesToCollectionIfMissing', () => {
      it('should add a CardTypes to an empty array', () => {
        const cardTypes: ICardTypes = sampleWithRequiredData;
        expectedResult = service.addCardTypesToCollectionIfMissing([], cardTypes);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cardTypes);
      });

      it('should not add a CardTypes to an array that contains it', () => {
        const cardTypes: ICardTypes = sampleWithRequiredData;
        const cardTypesCollection: ICardTypes[] = [
          {
            ...cardTypes,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCardTypesToCollectionIfMissing(cardTypesCollection, cardTypes);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CardTypes to an array that doesn't contain it", () => {
        const cardTypes: ICardTypes = sampleWithRequiredData;
        const cardTypesCollection: ICardTypes[] = [sampleWithPartialData];
        expectedResult = service.addCardTypesToCollectionIfMissing(cardTypesCollection, cardTypes);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cardTypes);
      });

      it('should add only unique CardTypes to an array', () => {
        const cardTypesArray: ICardTypes[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cardTypesCollection: ICardTypes[] = [sampleWithRequiredData];
        expectedResult = service.addCardTypesToCollectionIfMissing(cardTypesCollection, ...cardTypesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cardTypes: ICardTypes = sampleWithRequiredData;
        const cardTypes2: ICardTypes = sampleWithPartialData;
        expectedResult = service.addCardTypesToCollectionIfMissing([], cardTypes, cardTypes2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cardTypes);
        expect(expectedResult).toContain(cardTypes2);
      });

      it('should accept null and undefined values', () => {
        const cardTypes: ICardTypes = sampleWithRequiredData;
        expectedResult = service.addCardTypesToCollectionIfMissing([], null, cardTypes, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cardTypes);
      });

      it('should return initial array if no CardTypes is added', () => {
        const cardTypesCollection: ICardTypes[] = [sampleWithRequiredData];
        expectedResult = service.addCardTypesToCollectionIfMissing(cardTypesCollection, undefined, null);
        expect(expectedResult).toEqual(cardTypesCollection);
      });
    });

    describe('compareCardTypes', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCardTypes(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCardTypes(entity1, entity2);
        const compareResult2 = service.compareCardTypes(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCardTypes(entity1, entity2);
        const compareResult2 = service.compareCardTypes(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCardTypes(entity1, entity2);
        const compareResult2 = service.compareCardTypes(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

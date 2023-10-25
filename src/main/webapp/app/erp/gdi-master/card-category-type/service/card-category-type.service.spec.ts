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

import { ICardCategoryType } from '../card-category-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../card-category-type.test-samples';

import { CardCategoryTypeService } from './card-category-type.service';

const requireRestSample: ICardCategoryType = {
  ...sampleWithRequiredData,
};

describe('CardCategoryType Service', () => {
  let service: CardCategoryTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: ICardCategoryType | ICardCategoryType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CardCategoryTypeService);
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

    it('should create a CardCategoryType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const cardCategoryType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cardCategoryType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CardCategoryType', () => {
      const cardCategoryType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cardCategoryType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CardCategoryType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CardCategoryType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CardCategoryType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCardCategoryTypeToCollectionIfMissing', () => {
      it('should add a CardCategoryType to an empty array', () => {
        const cardCategoryType: ICardCategoryType = sampleWithRequiredData;
        expectedResult = service.addCardCategoryTypeToCollectionIfMissing([], cardCategoryType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cardCategoryType);
      });

      it('should not add a CardCategoryType to an array that contains it', () => {
        const cardCategoryType: ICardCategoryType = sampleWithRequiredData;
        const cardCategoryTypeCollection: ICardCategoryType[] = [
          {
            ...cardCategoryType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCardCategoryTypeToCollectionIfMissing(cardCategoryTypeCollection, cardCategoryType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CardCategoryType to an array that doesn't contain it", () => {
        const cardCategoryType: ICardCategoryType = sampleWithRequiredData;
        const cardCategoryTypeCollection: ICardCategoryType[] = [sampleWithPartialData];
        expectedResult = service.addCardCategoryTypeToCollectionIfMissing(cardCategoryTypeCollection, cardCategoryType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cardCategoryType);
      });

      it('should add only unique CardCategoryType to an array', () => {
        const cardCategoryTypeArray: ICardCategoryType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cardCategoryTypeCollection: ICardCategoryType[] = [sampleWithRequiredData];
        expectedResult = service.addCardCategoryTypeToCollectionIfMissing(cardCategoryTypeCollection, ...cardCategoryTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cardCategoryType: ICardCategoryType = sampleWithRequiredData;
        const cardCategoryType2: ICardCategoryType = sampleWithPartialData;
        expectedResult = service.addCardCategoryTypeToCollectionIfMissing([], cardCategoryType, cardCategoryType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cardCategoryType);
        expect(expectedResult).toContain(cardCategoryType2);
      });

      it('should accept null and undefined values', () => {
        const cardCategoryType: ICardCategoryType = sampleWithRequiredData;
        expectedResult = service.addCardCategoryTypeToCollectionIfMissing([], null, cardCategoryType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cardCategoryType);
      });

      it('should return initial array if no CardCategoryType is added', () => {
        const cardCategoryTypeCollection: ICardCategoryType[] = [sampleWithRequiredData];
        expectedResult = service.addCardCategoryTypeToCollectionIfMissing(cardCategoryTypeCollection, undefined, null);
        expect(expectedResult).toEqual(cardCategoryTypeCollection);
      });
    });

    describe('compareCardCategoryType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCardCategoryType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCardCategoryType(entity1, entity2);
        const compareResult2 = service.compareCardCategoryType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCardCategoryType(entity1, entity2);
        const compareResult2 = service.compareCardCategoryType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCardCategoryType(entity1, entity2);
        const compareResult2 = service.compareCardCategoryType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

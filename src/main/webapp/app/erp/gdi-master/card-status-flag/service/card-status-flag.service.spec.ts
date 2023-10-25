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

import { ICardStatusFlag } from '../card-status-flag.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../card-status-flag.test-samples';

import { CardStatusFlagService } from './card-status-flag.service';

const requireRestSample: ICardStatusFlag = {
  ...sampleWithRequiredData,
};

describe('CardStatusFlag Service', () => {
  let service: CardStatusFlagService;
  let httpMock: HttpTestingController;
  let expectedResult: ICardStatusFlag | ICardStatusFlag[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CardStatusFlagService);
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

    it('should create a CardStatusFlag', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const cardStatusFlag = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cardStatusFlag).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CardStatusFlag', () => {
      const cardStatusFlag = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cardStatusFlag).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CardStatusFlag', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CardStatusFlag', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CardStatusFlag', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCardStatusFlagToCollectionIfMissing', () => {
      it('should add a CardStatusFlag to an empty array', () => {
        const cardStatusFlag: ICardStatusFlag = sampleWithRequiredData;
        expectedResult = service.addCardStatusFlagToCollectionIfMissing([], cardStatusFlag);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cardStatusFlag);
      });

      it('should not add a CardStatusFlag to an array that contains it', () => {
        const cardStatusFlag: ICardStatusFlag = sampleWithRequiredData;
        const cardStatusFlagCollection: ICardStatusFlag[] = [
          {
            ...cardStatusFlag,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCardStatusFlagToCollectionIfMissing(cardStatusFlagCollection, cardStatusFlag);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CardStatusFlag to an array that doesn't contain it", () => {
        const cardStatusFlag: ICardStatusFlag = sampleWithRequiredData;
        const cardStatusFlagCollection: ICardStatusFlag[] = [sampleWithPartialData];
        expectedResult = service.addCardStatusFlagToCollectionIfMissing(cardStatusFlagCollection, cardStatusFlag);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cardStatusFlag);
      });

      it('should add only unique CardStatusFlag to an array', () => {
        const cardStatusFlagArray: ICardStatusFlag[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cardStatusFlagCollection: ICardStatusFlag[] = [sampleWithRequiredData];
        expectedResult = service.addCardStatusFlagToCollectionIfMissing(cardStatusFlagCollection, ...cardStatusFlagArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cardStatusFlag: ICardStatusFlag = sampleWithRequiredData;
        const cardStatusFlag2: ICardStatusFlag = sampleWithPartialData;
        expectedResult = service.addCardStatusFlagToCollectionIfMissing([], cardStatusFlag, cardStatusFlag2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cardStatusFlag);
        expect(expectedResult).toContain(cardStatusFlag2);
      });

      it('should accept null and undefined values', () => {
        const cardStatusFlag: ICardStatusFlag = sampleWithRequiredData;
        expectedResult = service.addCardStatusFlagToCollectionIfMissing([], null, cardStatusFlag, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cardStatusFlag);
      });

      it('should return initial array if no CardStatusFlag is added', () => {
        const cardStatusFlagCollection: ICardStatusFlag[] = [sampleWithRequiredData];
        expectedResult = service.addCardStatusFlagToCollectionIfMissing(cardStatusFlagCollection, undefined, null);
        expect(expectedResult).toEqual(cardStatusFlagCollection);
      });
    });

    describe('compareCardStatusFlag', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCardStatusFlag(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCardStatusFlag(entity1, entity2);
        const compareResult2 = service.compareCardStatusFlag(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCardStatusFlag(entity1, entity2);
        const compareResult2 = service.compareCardStatusFlag(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCardStatusFlag(entity1, entity2);
        const compareResult2 = service.compareCardStatusFlag(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

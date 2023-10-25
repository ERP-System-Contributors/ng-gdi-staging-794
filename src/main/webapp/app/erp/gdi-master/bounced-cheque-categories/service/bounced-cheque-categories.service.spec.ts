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

import { IBouncedChequeCategories } from '../bounced-cheque-categories.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../bounced-cheque-categories.test-samples';

import { BouncedChequeCategoriesService } from './bounced-cheque-categories.service';

const requireRestSample: IBouncedChequeCategories = {
  ...sampleWithRequiredData,
};

describe('BouncedChequeCategories Service', () => {
  let service: BouncedChequeCategoriesService;
  let httpMock: HttpTestingController;
  let expectedResult: IBouncedChequeCategories | IBouncedChequeCategories[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(BouncedChequeCategoriesService);
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

    it('should create a BouncedChequeCategories', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const bouncedChequeCategories = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(bouncedChequeCategories).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a BouncedChequeCategories', () => {
      const bouncedChequeCategories = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(bouncedChequeCategories).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a BouncedChequeCategories', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of BouncedChequeCategories', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a BouncedChequeCategories', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addBouncedChequeCategoriesToCollectionIfMissing', () => {
      it('should add a BouncedChequeCategories to an empty array', () => {
        const bouncedChequeCategories: IBouncedChequeCategories = sampleWithRequiredData;
        expectedResult = service.addBouncedChequeCategoriesToCollectionIfMissing([], bouncedChequeCategories);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(bouncedChequeCategories);
      });

      it('should not add a BouncedChequeCategories to an array that contains it', () => {
        const bouncedChequeCategories: IBouncedChequeCategories = sampleWithRequiredData;
        const bouncedChequeCategoriesCollection: IBouncedChequeCategories[] = [
          {
            ...bouncedChequeCategories,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addBouncedChequeCategoriesToCollectionIfMissing(
          bouncedChequeCategoriesCollection,
          bouncedChequeCategories
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a BouncedChequeCategories to an array that doesn't contain it", () => {
        const bouncedChequeCategories: IBouncedChequeCategories = sampleWithRequiredData;
        const bouncedChequeCategoriesCollection: IBouncedChequeCategories[] = [sampleWithPartialData];
        expectedResult = service.addBouncedChequeCategoriesToCollectionIfMissing(
          bouncedChequeCategoriesCollection,
          bouncedChequeCategories
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(bouncedChequeCategories);
      });

      it('should add only unique BouncedChequeCategories to an array', () => {
        const bouncedChequeCategoriesArray: IBouncedChequeCategories[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const bouncedChequeCategoriesCollection: IBouncedChequeCategories[] = [sampleWithRequiredData];
        expectedResult = service.addBouncedChequeCategoriesToCollectionIfMissing(
          bouncedChequeCategoriesCollection,
          ...bouncedChequeCategoriesArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const bouncedChequeCategories: IBouncedChequeCategories = sampleWithRequiredData;
        const bouncedChequeCategories2: IBouncedChequeCategories = sampleWithPartialData;
        expectedResult = service.addBouncedChequeCategoriesToCollectionIfMissing([], bouncedChequeCategories, bouncedChequeCategories2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(bouncedChequeCategories);
        expect(expectedResult).toContain(bouncedChequeCategories2);
      });

      it('should accept null and undefined values', () => {
        const bouncedChequeCategories: IBouncedChequeCategories = sampleWithRequiredData;
        expectedResult = service.addBouncedChequeCategoriesToCollectionIfMissing([], null, bouncedChequeCategories, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(bouncedChequeCategories);
      });

      it('should return initial array if no BouncedChequeCategories is added', () => {
        const bouncedChequeCategoriesCollection: IBouncedChequeCategories[] = [sampleWithRequiredData];
        expectedResult = service.addBouncedChequeCategoriesToCollectionIfMissing(bouncedChequeCategoriesCollection, undefined, null);
        expect(expectedResult).toEqual(bouncedChequeCategoriesCollection);
      });
    });

    describe('compareBouncedChequeCategories', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareBouncedChequeCategories(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareBouncedChequeCategories(entity1, entity2);
        const compareResult2 = service.compareBouncedChequeCategories(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareBouncedChequeCategories(entity1, entity2);
        const compareResult2 = service.compareBouncedChequeCategories(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareBouncedChequeCategories(entity1, entity2);
        const compareResult2 = service.compareBouncedChequeCategories(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

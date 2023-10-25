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

import { IInsiderCategoryTypes } from '../insider-category-types.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../insider-category-types.test-samples';

import { InsiderCategoryTypesService } from './insider-category-types.service';

const requireRestSample: IInsiderCategoryTypes = {
  ...sampleWithRequiredData,
};

describe('InsiderCategoryTypes Service', () => {
  let service: InsiderCategoryTypesService;
  let httpMock: HttpTestingController;
  let expectedResult: IInsiderCategoryTypes | IInsiderCategoryTypes[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(InsiderCategoryTypesService);
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

    it('should create a InsiderCategoryTypes', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const insiderCategoryTypes = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(insiderCategoryTypes).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a InsiderCategoryTypes', () => {
      const insiderCategoryTypes = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(insiderCategoryTypes).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a InsiderCategoryTypes', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of InsiderCategoryTypes', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a InsiderCategoryTypes', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addInsiderCategoryTypesToCollectionIfMissing', () => {
      it('should add a InsiderCategoryTypes to an empty array', () => {
        const insiderCategoryTypes: IInsiderCategoryTypes = sampleWithRequiredData;
        expectedResult = service.addInsiderCategoryTypesToCollectionIfMissing([], insiderCategoryTypes);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(insiderCategoryTypes);
      });

      it('should not add a InsiderCategoryTypes to an array that contains it', () => {
        const insiderCategoryTypes: IInsiderCategoryTypes = sampleWithRequiredData;
        const insiderCategoryTypesCollection: IInsiderCategoryTypes[] = [
          {
            ...insiderCategoryTypes,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addInsiderCategoryTypesToCollectionIfMissing(insiderCategoryTypesCollection, insiderCategoryTypes);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a InsiderCategoryTypes to an array that doesn't contain it", () => {
        const insiderCategoryTypes: IInsiderCategoryTypes = sampleWithRequiredData;
        const insiderCategoryTypesCollection: IInsiderCategoryTypes[] = [sampleWithPartialData];
        expectedResult = service.addInsiderCategoryTypesToCollectionIfMissing(insiderCategoryTypesCollection, insiderCategoryTypes);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(insiderCategoryTypes);
      });

      it('should add only unique InsiderCategoryTypes to an array', () => {
        const insiderCategoryTypesArray: IInsiderCategoryTypes[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const insiderCategoryTypesCollection: IInsiderCategoryTypes[] = [sampleWithRequiredData];
        expectedResult = service.addInsiderCategoryTypesToCollectionIfMissing(insiderCategoryTypesCollection, ...insiderCategoryTypesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const insiderCategoryTypes: IInsiderCategoryTypes = sampleWithRequiredData;
        const insiderCategoryTypes2: IInsiderCategoryTypes = sampleWithPartialData;
        expectedResult = service.addInsiderCategoryTypesToCollectionIfMissing([], insiderCategoryTypes, insiderCategoryTypes2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(insiderCategoryTypes);
        expect(expectedResult).toContain(insiderCategoryTypes2);
      });

      it('should accept null and undefined values', () => {
        const insiderCategoryTypes: IInsiderCategoryTypes = sampleWithRequiredData;
        expectedResult = service.addInsiderCategoryTypesToCollectionIfMissing([], null, insiderCategoryTypes, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(insiderCategoryTypes);
      });

      it('should return initial array if no InsiderCategoryTypes is added', () => {
        const insiderCategoryTypesCollection: IInsiderCategoryTypes[] = [sampleWithRequiredData];
        expectedResult = service.addInsiderCategoryTypesToCollectionIfMissing(insiderCategoryTypesCollection, undefined, null);
        expect(expectedResult).toEqual(insiderCategoryTypesCollection);
      });
    });

    describe('compareInsiderCategoryTypes', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareInsiderCategoryTypes(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareInsiderCategoryTypes(entity1, entity2);
        const compareResult2 = service.compareInsiderCategoryTypes(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareInsiderCategoryTypes(entity1, entity2);
        const compareResult2 = service.compareInsiderCategoryTypes(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareInsiderCategoryTypes(entity1, entity2);
        const compareResult2 = service.compareInsiderCategoryTypes(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

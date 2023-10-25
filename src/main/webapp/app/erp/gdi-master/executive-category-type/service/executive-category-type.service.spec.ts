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

import { IExecutiveCategoryType } from '../executive-category-type.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../executive-category-type.test-samples';

import { ExecutiveCategoryTypeService } from './executive-category-type.service';

const requireRestSample: IExecutiveCategoryType = {
  ...sampleWithRequiredData,
};

describe('ExecutiveCategoryType Service', () => {
  let service: ExecutiveCategoryTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IExecutiveCategoryType | IExecutiveCategoryType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ExecutiveCategoryTypeService);
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

    it('should create a ExecutiveCategoryType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const executiveCategoryType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(executiveCategoryType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ExecutiveCategoryType', () => {
      const executiveCategoryType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(executiveCategoryType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ExecutiveCategoryType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ExecutiveCategoryType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ExecutiveCategoryType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addExecutiveCategoryTypeToCollectionIfMissing', () => {
      it('should add a ExecutiveCategoryType to an empty array', () => {
        const executiveCategoryType: IExecutiveCategoryType = sampleWithRequiredData;
        expectedResult = service.addExecutiveCategoryTypeToCollectionIfMissing([], executiveCategoryType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(executiveCategoryType);
      });

      it('should not add a ExecutiveCategoryType to an array that contains it', () => {
        const executiveCategoryType: IExecutiveCategoryType = sampleWithRequiredData;
        const executiveCategoryTypeCollection: IExecutiveCategoryType[] = [
          {
            ...executiveCategoryType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addExecutiveCategoryTypeToCollectionIfMissing(executiveCategoryTypeCollection, executiveCategoryType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ExecutiveCategoryType to an array that doesn't contain it", () => {
        const executiveCategoryType: IExecutiveCategoryType = sampleWithRequiredData;
        const executiveCategoryTypeCollection: IExecutiveCategoryType[] = [sampleWithPartialData];
        expectedResult = service.addExecutiveCategoryTypeToCollectionIfMissing(executiveCategoryTypeCollection, executiveCategoryType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(executiveCategoryType);
      });

      it('should add only unique ExecutiveCategoryType to an array', () => {
        const executiveCategoryTypeArray: IExecutiveCategoryType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const executiveCategoryTypeCollection: IExecutiveCategoryType[] = [sampleWithRequiredData];
        expectedResult = service.addExecutiveCategoryTypeToCollectionIfMissing(
          executiveCategoryTypeCollection,
          ...executiveCategoryTypeArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const executiveCategoryType: IExecutiveCategoryType = sampleWithRequiredData;
        const executiveCategoryType2: IExecutiveCategoryType = sampleWithPartialData;
        expectedResult = service.addExecutiveCategoryTypeToCollectionIfMissing([], executiveCategoryType, executiveCategoryType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(executiveCategoryType);
        expect(expectedResult).toContain(executiveCategoryType2);
      });

      it('should accept null and undefined values', () => {
        const executiveCategoryType: IExecutiveCategoryType = sampleWithRequiredData;
        expectedResult = service.addExecutiveCategoryTypeToCollectionIfMissing([], null, executiveCategoryType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(executiveCategoryType);
      });

      it('should return initial array if no ExecutiveCategoryType is added', () => {
        const executiveCategoryTypeCollection: IExecutiveCategoryType[] = [sampleWithRequiredData];
        expectedResult = service.addExecutiveCategoryTypeToCollectionIfMissing(executiveCategoryTypeCollection, undefined, null);
        expect(expectedResult).toEqual(executiveCategoryTypeCollection);
      });
    });

    describe('compareExecutiveCategoryType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareExecutiveCategoryType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareExecutiveCategoryType(entity1, entity2);
        const compareResult2 = service.compareExecutiveCategoryType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareExecutiveCategoryType(entity1, entity2);
        const compareResult2 = service.compareExecutiveCategoryType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareExecutiveCategoryType(entity1, entity2);
        const compareResult2 = service.compareExecutiveCategoryType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

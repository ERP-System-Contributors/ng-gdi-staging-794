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

import { IUltimateBeneficiaryCategory } from '../ultimate-beneficiary-category.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../ultimate-beneficiary-category.test-samples';

import { UltimateBeneficiaryCategoryService } from './ultimate-beneficiary-category.service';

const requireRestSample: IUltimateBeneficiaryCategory = {
  ...sampleWithRequiredData,
};

describe('UltimateBeneficiaryCategory Service', () => {
  let service: UltimateBeneficiaryCategoryService;
  let httpMock: HttpTestingController;
  let expectedResult: IUltimateBeneficiaryCategory | IUltimateBeneficiaryCategory[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(UltimateBeneficiaryCategoryService);
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

    it('should create a UltimateBeneficiaryCategory', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const ultimateBeneficiaryCategory = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(ultimateBeneficiaryCategory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a UltimateBeneficiaryCategory', () => {
      const ultimateBeneficiaryCategory = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(ultimateBeneficiaryCategory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a UltimateBeneficiaryCategory', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of UltimateBeneficiaryCategory', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a UltimateBeneficiaryCategory', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addUltimateBeneficiaryCategoryToCollectionIfMissing', () => {
      it('should add a UltimateBeneficiaryCategory to an empty array', () => {
        const ultimateBeneficiaryCategory: IUltimateBeneficiaryCategory = sampleWithRequiredData;
        expectedResult = service.addUltimateBeneficiaryCategoryToCollectionIfMissing([], ultimateBeneficiaryCategory);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ultimateBeneficiaryCategory);
      });

      it('should not add a UltimateBeneficiaryCategory to an array that contains it', () => {
        const ultimateBeneficiaryCategory: IUltimateBeneficiaryCategory = sampleWithRequiredData;
        const ultimateBeneficiaryCategoryCollection: IUltimateBeneficiaryCategory[] = [
          {
            ...ultimateBeneficiaryCategory,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addUltimateBeneficiaryCategoryToCollectionIfMissing(
          ultimateBeneficiaryCategoryCollection,
          ultimateBeneficiaryCategory
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a UltimateBeneficiaryCategory to an array that doesn't contain it", () => {
        const ultimateBeneficiaryCategory: IUltimateBeneficiaryCategory = sampleWithRequiredData;
        const ultimateBeneficiaryCategoryCollection: IUltimateBeneficiaryCategory[] = [sampleWithPartialData];
        expectedResult = service.addUltimateBeneficiaryCategoryToCollectionIfMissing(
          ultimateBeneficiaryCategoryCollection,
          ultimateBeneficiaryCategory
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ultimateBeneficiaryCategory);
      });

      it('should add only unique UltimateBeneficiaryCategory to an array', () => {
        const ultimateBeneficiaryCategoryArray: IUltimateBeneficiaryCategory[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const ultimateBeneficiaryCategoryCollection: IUltimateBeneficiaryCategory[] = [sampleWithRequiredData];
        expectedResult = service.addUltimateBeneficiaryCategoryToCollectionIfMissing(
          ultimateBeneficiaryCategoryCollection,
          ...ultimateBeneficiaryCategoryArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const ultimateBeneficiaryCategory: IUltimateBeneficiaryCategory = sampleWithRequiredData;
        const ultimateBeneficiaryCategory2: IUltimateBeneficiaryCategory = sampleWithPartialData;
        expectedResult = service.addUltimateBeneficiaryCategoryToCollectionIfMissing(
          [],
          ultimateBeneficiaryCategory,
          ultimateBeneficiaryCategory2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ultimateBeneficiaryCategory);
        expect(expectedResult).toContain(ultimateBeneficiaryCategory2);
      });

      it('should accept null and undefined values', () => {
        const ultimateBeneficiaryCategory: IUltimateBeneficiaryCategory = sampleWithRequiredData;
        expectedResult = service.addUltimateBeneficiaryCategoryToCollectionIfMissing([], null, ultimateBeneficiaryCategory, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ultimateBeneficiaryCategory);
      });

      it('should return initial array if no UltimateBeneficiaryCategory is added', () => {
        const ultimateBeneficiaryCategoryCollection: IUltimateBeneficiaryCategory[] = [sampleWithRequiredData];
        expectedResult = service.addUltimateBeneficiaryCategoryToCollectionIfMissing(
          ultimateBeneficiaryCategoryCollection,
          undefined,
          null
        );
        expect(expectedResult).toEqual(ultimateBeneficiaryCategoryCollection);
      });
    });

    describe('compareUltimateBeneficiaryCategory', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareUltimateBeneficiaryCategory(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareUltimateBeneficiaryCategory(entity1, entity2);
        const compareResult2 = service.compareUltimateBeneficiaryCategory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareUltimateBeneficiaryCategory(entity1, entity2);
        const compareResult2 = service.compareUltimateBeneficiaryCategory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareUltimateBeneficiaryCategory(entity1, entity2);
        const compareResult2 = service.compareUltimateBeneficiaryCategory(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

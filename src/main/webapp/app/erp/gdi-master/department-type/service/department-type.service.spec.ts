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

import { IDepartmentType } from '../department-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../department-type.test-samples';

import { DepartmentTypeService } from './department-type.service';

const requireRestSample: IDepartmentType = {
  ...sampleWithRequiredData,
};

describe('DepartmentType Service', () => {
  let service: DepartmentTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IDepartmentType | IDepartmentType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DepartmentTypeService);
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

    it('should create a DepartmentType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const departmentType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(departmentType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DepartmentType', () => {
      const departmentType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(departmentType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DepartmentType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DepartmentType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DepartmentType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDepartmentTypeToCollectionIfMissing', () => {
      it('should add a DepartmentType to an empty array', () => {
        const departmentType: IDepartmentType = sampleWithRequiredData;
        expectedResult = service.addDepartmentTypeToCollectionIfMissing([], departmentType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(departmentType);
      });

      it('should not add a DepartmentType to an array that contains it', () => {
        const departmentType: IDepartmentType = sampleWithRequiredData;
        const departmentTypeCollection: IDepartmentType[] = [
          {
            ...departmentType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDepartmentTypeToCollectionIfMissing(departmentTypeCollection, departmentType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DepartmentType to an array that doesn't contain it", () => {
        const departmentType: IDepartmentType = sampleWithRequiredData;
        const departmentTypeCollection: IDepartmentType[] = [sampleWithPartialData];
        expectedResult = service.addDepartmentTypeToCollectionIfMissing(departmentTypeCollection, departmentType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(departmentType);
      });

      it('should add only unique DepartmentType to an array', () => {
        const departmentTypeArray: IDepartmentType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const departmentTypeCollection: IDepartmentType[] = [sampleWithRequiredData];
        expectedResult = service.addDepartmentTypeToCollectionIfMissing(departmentTypeCollection, ...departmentTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const departmentType: IDepartmentType = sampleWithRequiredData;
        const departmentType2: IDepartmentType = sampleWithPartialData;
        expectedResult = service.addDepartmentTypeToCollectionIfMissing([], departmentType, departmentType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(departmentType);
        expect(expectedResult).toContain(departmentType2);
      });

      it('should accept null and undefined values', () => {
        const departmentType: IDepartmentType = sampleWithRequiredData;
        expectedResult = service.addDepartmentTypeToCollectionIfMissing([], null, departmentType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(departmentType);
      });

      it('should return initial array if no DepartmentType is added', () => {
        const departmentTypeCollection: IDepartmentType[] = [sampleWithRequiredData];
        expectedResult = service.addDepartmentTypeToCollectionIfMissing(departmentTypeCollection, undefined, null);
        expect(expectedResult).toEqual(departmentTypeCollection);
      });
    });

    describe('compareDepartmentType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDepartmentType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDepartmentType(entity1, entity2);
        const compareResult2 = service.compareDepartmentType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDepartmentType(entity1, entity2);
        const compareResult2 = service.compareDepartmentType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDepartmentType(entity1, entity2);
        const compareResult2 = service.compareDepartmentType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

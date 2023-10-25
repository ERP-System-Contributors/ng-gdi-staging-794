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

import { IStaffRoleType } from '../staff-role-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../staff-role-type.test-samples';

import { StaffRoleTypeService } from './staff-role-type.service';

const requireRestSample: IStaffRoleType = {
  ...sampleWithRequiredData,
};

describe('StaffRoleType Service', () => {
  let service: StaffRoleTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IStaffRoleType | IStaffRoleType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(StaffRoleTypeService);
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

    it('should create a StaffRoleType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const staffRoleType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(staffRoleType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a StaffRoleType', () => {
      const staffRoleType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(staffRoleType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a StaffRoleType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of StaffRoleType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a StaffRoleType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addStaffRoleTypeToCollectionIfMissing', () => {
      it('should add a StaffRoleType to an empty array', () => {
        const staffRoleType: IStaffRoleType = sampleWithRequiredData;
        expectedResult = service.addStaffRoleTypeToCollectionIfMissing([], staffRoleType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(staffRoleType);
      });

      it('should not add a StaffRoleType to an array that contains it', () => {
        const staffRoleType: IStaffRoleType = sampleWithRequiredData;
        const staffRoleTypeCollection: IStaffRoleType[] = [
          {
            ...staffRoleType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addStaffRoleTypeToCollectionIfMissing(staffRoleTypeCollection, staffRoleType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a StaffRoleType to an array that doesn't contain it", () => {
        const staffRoleType: IStaffRoleType = sampleWithRequiredData;
        const staffRoleTypeCollection: IStaffRoleType[] = [sampleWithPartialData];
        expectedResult = service.addStaffRoleTypeToCollectionIfMissing(staffRoleTypeCollection, staffRoleType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(staffRoleType);
      });

      it('should add only unique StaffRoleType to an array', () => {
        const staffRoleTypeArray: IStaffRoleType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const staffRoleTypeCollection: IStaffRoleType[] = [sampleWithRequiredData];
        expectedResult = service.addStaffRoleTypeToCollectionIfMissing(staffRoleTypeCollection, ...staffRoleTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const staffRoleType: IStaffRoleType = sampleWithRequiredData;
        const staffRoleType2: IStaffRoleType = sampleWithPartialData;
        expectedResult = service.addStaffRoleTypeToCollectionIfMissing([], staffRoleType, staffRoleType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(staffRoleType);
        expect(expectedResult).toContain(staffRoleType2);
      });

      it('should accept null and undefined values', () => {
        const staffRoleType: IStaffRoleType = sampleWithRequiredData;
        expectedResult = service.addStaffRoleTypeToCollectionIfMissing([], null, staffRoleType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(staffRoleType);
      });

      it('should return initial array if no StaffRoleType is added', () => {
        const staffRoleTypeCollection: IStaffRoleType[] = [sampleWithRequiredData];
        expectedResult = service.addStaffRoleTypeToCollectionIfMissing(staffRoleTypeCollection, undefined, null);
        expect(expectedResult).toEqual(staffRoleTypeCollection);
      });
    });

    describe('compareStaffRoleType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareStaffRoleType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareStaffRoleType(entity1, entity2);
        const compareResult2 = service.compareStaffRoleType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareStaffRoleType(entity1, entity2);
        const compareResult2 = service.compareStaffRoleType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareStaffRoleType(entity1, entity2);
        const compareResult2 = service.compareStaffRoleType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

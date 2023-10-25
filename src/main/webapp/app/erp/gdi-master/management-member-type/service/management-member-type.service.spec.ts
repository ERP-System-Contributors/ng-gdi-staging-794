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

import { IManagementMemberType } from '../management-member-type.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../management-member-type.test-samples';

import { ManagementMemberTypeService } from './management-member-type.service';

const requireRestSample: IManagementMemberType = {
  ...sampleWithRequiredData,
};

describe('ManagementMemberType Service', () => {
  let service: ManagementMemberTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IManagementMemberType | IManagementMemberType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ManagementMemberTypeService);
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

    it('should create a ManagementMemberType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const managementMemberType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(managementMemberType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ManagementMemberType', () => {
      const managementMemberType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(managementMemberType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ManagementMemberType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ManagementMemberType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ManagementMemberType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addManagementMemberTypeToCollectionIfMissing', () => {
      it('should add a ManagementMemberType to an empty array', () => {
        const managementMemberType: IManagementMemberType = sampleWithRequiredData;
        expectedResult = service.addManagementMemberTypeToCollectionIfMissing([], managementMemberType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(managementMemberType);
      });

      it('should not add a ManagementMemberType to an array that contains it', () => {
        const managementMemberType: IManagementMemberType = sampleWithRequiredData;
        const managementMemberTypeCollection: IManagementMemberType[] = [
          {
            ...managementMemberType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addManagementMemberTypeToCollectionIfMissing(managementMemberTypeCollection, managementMemberType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ManagementMemberType to an array that doesn't contain it", () => {
        const managementMemberType: IManagementMemberType = sampleWithRequiredData;
        const managementMemberTypeCollection: IManagementMemberType[] = [sampleWithPartialData];
        expectedResult = service.addManagementMemberTypeToCollectionIfMissing(managementMemberTypeCollection, managementMemberType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(managementMemberType);
      });

      it('should add only unique ManagementMemberType to an array', () => {
        const managementMemberTypeArray: IManagementMemberType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const managementMemberTypeCollection: IManagementMemberType[] = [sampleWithRequiredData];
        expectedResult = service.addManagementMemberTypeToCollectionIfMissing(managementMemberTypeCollection, ...managementMemberTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const managementMemberType: IManagementMemberType = sampleWithRequiredData;
        const managementMemberType2: IManagementMemberType = sampleWithPartialData;
        expectedResult = service.addManagementMemberTypeToCollectionIfMissing([], managementMemberType, managementMemberType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(managementMemberType);
        expect(expectedResult).toContain(managementMemberType2);
      });

      it('should accept null and undefined values', () => {
        const managementMemberType: IManagementMemberType = sampleWithRequiredData;
        expectedResult = service.addManagementMemberTypeToCollectionIfMissing([], null, managementMemberType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(managementMemberType);
      });

      it('should return initial array if no ManagementMemberType is added', () => {
        const managementMemberTypeCollection: IManagementMemberType[] = [sampleWithRequiredData];
        expectedResult = service.addManagementMemberTypeToCollectionIfMissing(managementMemberTypeCollection, undefined, null);
        expect(expectedResult).toEqual(managementMemberTypeCollection);
      });
    });

    describe('compareManagementMemberType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareManagementMemberType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareManagementMemberType(entity1, entity2);
        const compareResult2 = service.compareManagementMemberType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareManagementMemberType(entity1, entity2);
        const compareResult2 = service.compareManagementMemberType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareManagementMemberType(entity1, entity2);
        const compareResult2 = service.compareManagementMemberType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

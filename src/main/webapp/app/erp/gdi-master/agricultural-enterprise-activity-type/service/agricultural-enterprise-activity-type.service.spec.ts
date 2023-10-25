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

import { IAgriculturalEnterpriseActivityType } from '../agricultural-enterprise-activity-type.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../agricultural-enterprise-activity-type.test-samples';

import { AgriculturalEnterpriseActivityTypeService } from './agricultural-enterprise-activity-type.service';

const requireRestSample: IAgriculturalEnterpriseActivityType = {
  ...sampleWithRequiredData,
};

describe('AgriculturalEnterpriseActivityType Service', () => {
  let service: AgriculturalEnterpriseActivityTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IAgriculturalEnterpriseActivityType | IAgriculturalEnterpriseActivityType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AgriculturalEnterpriseActivityTypeService);
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

    it('should create a AgriculturalEnterpriseActivityType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const agriculturalEnterpriseActivityType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(agriculturalEnterpriseActivityType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AgriculturalEnterpriseActivityType', () => {
      const agriculturalEnterpriseActivityType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(agriculturalEnterpriseActivityType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AgriculturalEnterpriseActivityType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AgriculturalEnterpriseActivityType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AgriculturalEnterpriseActivityType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAgriculturalEnterpriseActivityTypeToCollectionIfMissing', () => {
      it('should add a AgriculturalEnterpriseActivityType to an empty array', () => {
        const agriculturalEnterpriseActivityType: IAgriculturalEnterpriseActivityType = sampleWithRequiredData;
        expectedResult = service.addAgriculturalEnterpriseActivityTypeToCollectionIfMissing([], agriculturalEnterpriseActivityType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(agriculturalEnterpriseActivityType);
      });

      it('should not add a AgriculturalEnterpriseActivityType to an array that contains it', () => {
        const agriculturalEnterpriseActivityType: IAgriculturalEnterpriseActivityType = sampleWithRequiredData;
        const agriculturalEnterpriseActivityTypeCollection: IAgriculturalEnterpriseActivityType[] = [
          {
            ...agriculturalEnterpriseActivityType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAgriculturalEnterpriseActivityTypeToCollectionIfMissing(
          agriculturalEnterpriseActivityTypeCollection,
          agriculturalEnterpriseActivityType
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AgriculturalEnterpriseActivityType to an array that doesn't contain it", () => {
        const agriculturalEnterpriseActivityType: IAgriculturalEnterpriseActivityType = sampleWithRequiredData;
        const agriculturalEnterpriseActivityTypeCollection: IAgriculturalEnterpriseActivityType[] = [sampleWithPartialData];
        expectedResult = service.addAgriculturalEnterpriseActivityTypeToCollectionIfMissing(
          agriculturalEnterpriseActivityTypeCollection,
          agriculturalEnterpriseActivityType
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(agriculturalEnterpriseActivityType);
      });

      it('should add only unique AgriculturalEnterpriseActivityType to an array', () => {
        const agriculturalEnterpriseActivityTypeArray: IAgriculturalEnterpriseActivityType[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const agriculturalEnterpriseActivityTypeCollection: IAgriculturalEnterpriseActivityType[] = [sampleWithRequiredData];
        expectedResult = service.addAgriculturalEnterpriseActivityTypeToCollectionIfMissing(
          agriculturalEnterpriseActivityTypeCollection,
          ...agriculturalEnterpriseActivityTypeArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const agriculturalEnterpriseActivityType: IAgriculturalEnterpriseActivityType = sampleWithRequiredData;
        const agriculturalEnterpriseActivityType2: IAgriculturalEnterpriseActivityType = sampleWithPartialData;
        expectedResult = service.addAgriculturalEnterpriseActivityTypeToCollectionIfMissing(
          [],
          agriculturalEnterpriseActivityType,
          agriculturalEnterpriseActivityType2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(agriculturalEnterpriseActivityType);
        expect(expectedResult).toContain(agriculturalEnterpriseActivityType2);
      });

      it('should accept null and undefined values', () => {
        const agriculturalEnterpriseActivityType: IAgriculturalEnterpriseActivityType = sampleWithRequiredData;
        expectedResult = service.addAgriculturalEnterpriseActivityTypeToCollectionIfMissing(
          [],
          null,
          agriculturalEnterpriseActivityType,
          undefined
        );
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(agriculturalEnterpriseActivityType);
      });

      it('should return initial array if no AgriculturalEnterpriseActivityType is added', () => {
        const agriculturalEnterpriseActivityTypeCollection: IAgriculturalEnterpriseActivityType[] = [sampleWithRequiredData];
        expectedResult = service.addAgriculturalEnterpriseActivityTypeToCollectionIfMissing(
          agriculturalEnterpriseActivityTypeCollection,
          undefined,
          null
        );
        expect(expectedResult).toEqual(agriculturalEnterpriseActivityTypeCollection);
      });
    });

    describe('compareAgriculturalEnterpriseActivityType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAgriculturalEnterpriseActivityType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAgriculturalEnterpriseActivityType(entity1, entity2);
        const compareResult2 = service.compareAgriculturalEnterpriseActivityType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAgriculturalEnterpriseActivityType(entity1, entity2);
        const compareResult2 = service.compareAgriculturalEnterpriseActivityType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAgriculturalEnterpriseActivityType(entity1, entity2);
        const compareResult2 = service.compareAgriculturalEnterpriseActivityType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

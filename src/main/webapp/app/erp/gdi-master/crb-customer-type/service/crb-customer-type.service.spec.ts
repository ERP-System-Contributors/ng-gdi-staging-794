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

import { ICrbCustomerType } from '../crb-customer-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../crb-customer-type.test-samples';

import { CrbCustomerTypeService } from './crb-customer-type.service';

const requireRestSample: ICrbCustomerType = {
  ...sampleWithRequiredData,
};

describe('CrbCustomerType Service', () => {
  let service: CrbCustomerTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrbCustomerType | ICrbCustomerType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrbCustomerTypeService);
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

    it('should create a CrbCustomerType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crbCustomerType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crbCustomerType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrbCustomerType', () => {
      const crbCustomerType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crbCustomerType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrbCustomerType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrbCustomerType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrbCustomerType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrbCustomerTypeToCollectionIfMissing', () => {
      it('should add a CrbCustomerType to an empty array', () => {
        const crbCustomerType: ICrbCustomerType = sampleWithRequiredData;
        expectedResult = service.addCrbCustomerTypeToCollectionIfMissing([], crbCustomerType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbCustomerType);
      });

      it('should not add a CrbCustomerType to an array that contains it', () => {
        const crbCustomerType: ICrbCustomerType = sampleWithRequiredData;
        const crbCustomerTypeCollection: ICrbCustomerType[] = [
          {
            ...crbCustomerType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrbCustomerTypeToCollectionIfMissing(crbCustomerTypeCollection, crbCustomerType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrbCustomerType to an array that doesn't contain it", () => {
        const crbCustomerType: ICrbCustomerType = sampleWithRequiredData;
        const crbCustomerTypeCollection: ICrbCustomerType[] = [sampleWithPartialData];
        expectedResult = service.addCrbCustomerTypeToCollectionIfMissing(crbCustomerTypeCollection, crbCustomerType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbCustomerType);
      });

      it('should add only unique CrbCustomerType to an array', () => {
        const crbCustomerTypeArray: ICrbCustomerType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crbCustomerTypeCollection: ICrbCustomerType[] = [sampleWithRequiredData];
        expectedResult = service.addCrbCustomerTypeToCollectionIfMissing(crbCustomerTypeCollection, ...crbCustomerTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crbCustomerType: ICrbCustomerType = sampleWithRequiredData;
        const crbCustomerType2: ICrbCustomerType = sampleWithPartialData;
        expectedResult = service.addCrbCustomerTypeToCollectionIfMissing([], crbCustomerType, crbCustomerType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbCustomerType);
        expect(expectedResult).toContain(crbCustomerType2);
      });

      it('should accept null and undefined values', () => {
        const crbCustomerType: ICrbCustomerType = sampleWithRequiredData;
        expectedResult = service.addCrbCustomerTypeToCollectionIfMissing([], null, crbCustomerType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbCustomerType);
      });

      it('should return initial array if no CrbCustomerType is added', () => {
        const crbCustomerTypeCollection: ICrbCustomerType[] = [sampleWithRequiredData];
        expectedResult = service.addCrbCustomerTypeToCollectionIfMissing(crbCustomerTypeCollection, undefined, null);
        expect(expectedResult).toEqual(crbCustomerTypeCollection);
      });
    });

    describe('compareCrbCustomerType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrbCustomerType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrbCustomerType(entity1, entity2);
        const compareResult2 = service.compareCrbCustomerType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrbCustomerType(entity1, entity2);
        const compareResult2 = service.compareCrbCustomerType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrbCustomerType(entity1, entity2);
        const compareResult2 = service.compareCrbCustomerType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

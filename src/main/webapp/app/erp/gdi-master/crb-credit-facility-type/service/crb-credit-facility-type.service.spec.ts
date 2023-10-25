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

import { ICrbCreditFacilityType } from '../crb-credit-facility-type.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../crb-credit-facility-type.test-samples';

import { CrbCreditFacilityTypeService } from './crb-credit-facility-type.service';

const requireRestSample: ICrbCreditFacilityType = {
  ...sampleWithRequiredData,
};

describe('CrbCreditFacilityType Service', () => {
  let service: CrbCreditFacilityTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrbCreditFacilityType | ICrbCreditFacilityType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrbCreditFacilityTypeService);
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

    it('should create a CrbCreditFacilityType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crbCreditFacilityType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crbCreditFacilityType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrbCreditFacilityType', () => {
      const crbCreditFacilityType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crbCreditFacilityType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrbCreditFacilityType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrbCreditFacilityType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrbCreditFacilityType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrbCreditFacilityTypeToCollectionIfMissing', () => {
      it('should add a CrbCreditFacilityType to an empty array', () => {
        const crbCreditFacilityType: ICrbCreditFacilityType = sampleWithRequiredData;
        expectedResult = service.addCrbCreditFacilityTypeToCollectionIfMissing([], crbCreditFacilityType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbCreditFacilityType);
      });

      it('should not add a CrbCreditFacilityType to an array that contains it', () => {
        const crbCreditFacilityType: ICrbCreditFacilityType = sampleWithRequiredData;
        const crbCreditFacilityTypeCollection: ICrbCreditFacilityType[] = [
          {
            ...crbCreditFacilityType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrbCreditFacilityTypeToCollectionIfMissing(crbCreditFacilityTypeCollection, crbCreditFacilityType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrbCreditFacilityType to an array that doesn't contain it", () => {
        const crbCreditFacilityType: ICrbCreditFacilityType = sampleWithRequiredData;
        const crbCreditFacilityTypeCollection: ICrbCreditFacilityType[] = [sampleWithPartialData];
        expectedResult = service.addCrbCreditFacilityTypeToCollectionIfMissing(crbCreditFacilityTypeCollection, crbCreditFacilityType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbCreditFacilityType);
      });

      it('should add only unique CrbCreditFacilityType to an array', () => {
        const crbCreditFacilityTypeArray: ICrbCreditFacilityType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crbCreditFacilityTypeCollection: ICrbCreditFacilityType[] = [sampleWithRequiredData];
        expectedResult = service.addCrbCreditFacilityTypeToCollectionIfMissing(
          crbCreditFacilityTypeCollection,
          ...crbCreditFacilityTypeArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crbCreditFacilityType: ICrbCreditFacilityType = sampleWithRequiredData;
        const crbCreditFacilityType2: ICrbCreditFacilityType = sampleWithPartialData;
        expectedResult = service.addCrbCreditFacilityTypeToCollectionIfMissing([], crbCreditFacilityType, crbCreditFacilityType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbCreditFacilityType);
        expect(expectedResult).toContain(crbCreditFacilityType2);
      });

      it('should accept null and undefined values', () => {
        const crbCreditFacilityType: ICrbCreditFacilityType = sampleWithRequiredData;
        expectedResult = service.addCrbCreditFacilityTypeToCollectionIfMissing([], null, crbCreditFacilityType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbCreditFacilityType);
      });

      it('should return initial array if no CrbCreditFacilityType is added', () => {
        const crbCreditFacilityTypeCollection: ICrbCreditFacilityType[] = [sampleWithRequiredData];
        expectedResult = service.addCrbCreditFacilityTypeToCollectionIfMissing(crbCreditFacilityTypeCollection, undefined, null);
        expect(expectedResult).toEqual(crbCreditFacilityTypeCollection);
      });
    });

    describe('compareCrbCreditFacilityType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrbCreditFacilityType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrbCreditFacilityType(entity1, entity2);
        const compareResult2 = service.compareCrbCreditFacilityType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrbCreditFacilityType(entity1, entity2);
        const compareResult2 = service.compareCrbCreditFacilityType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrbCreditFacilityType(entity1, entity2);
        const compareResult2 = service.compareCrbCreditFacilityType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

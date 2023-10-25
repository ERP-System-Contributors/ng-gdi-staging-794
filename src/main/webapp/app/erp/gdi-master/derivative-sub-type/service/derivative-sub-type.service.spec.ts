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

import { IDerivativeSubType } from '../derivative-sub-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../derivative-sub-type.test-samples';

import { DerivativeSubTypeService } from './derivative-sub-type.service';

const requireRestSample: IDerivativeSubType = {
  ...sampleWithRequiredData,
};

describe('DerivativeSubType Service', () => {
  let service: DerivativeSubTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IDerivativeSubType | IDerivativeSubType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DerivativeSubTypeService);
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

    it('should create a DerivativeSubType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const derivativeSubType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(derivativeSubType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DerivativeSubType', () => {
      const derivativeSubType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(derivativeSubType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DerivativeSubType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DerivativeSubType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DerivativeSubType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDerivativeSubTypeToCollectionIfMissing', () => {
      it('should add a DerivativeSubType to an empty array', () => {
        const derivativeSubType: IDerivativeSubType = sampleWithRequiredData;
        expectedResult = service.addDerivativeSubTypeToCollectionIfMissing([], derivativeSubType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(derivativeSubType);
      });

      it('should not add a DerivativeSubType to an array that contains it', () => {
        const derivativeSubType: IDerivativeSubType = sampleWithRequiredData;
        const derivativeSubTypeCollection: IDerivativeSubType[] = [
          {
            ...derivativeSubType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDerivativeSubTypeToCollectionIfMissing(derivativeSubTypeCollection, derivativeSubType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DerivativeSubType to an array that doesn't contain it", () => {
        const derivativeSubType: IDerivativeSubType = sampleWithRequiredData;
        const derivativeSubTypeCollection: IDerivativeSubType[] = [sampleWithPartialData];
        expectedResult = service.addDerivativeSubTypeToCollectionIfMissing(derivativeSubTypeCollection, derivativeSubType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(derivativeSubType);
      });

      it('should add only unique DerivativeSubType to an array', () => {
        const derivativeSubTypeArray: IDerivativeSubType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const derivativeSubTypeCollection: IDerivativeSubType[] = [sampleWithRequiredData];
        expectedResult = service.addDerivativeSubTypeToCollectionIfMissing(derivativeSubTypeCollection, ...derivativeSubTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const derivativeSubType: IDerivativeSubType = sampleWithRequiredData;
        const derivativeSubType2: IDerivativeSubType = sampleWithPartialData;
        expectedResult = service.addDerivativeSubTypeToCollectionIfMissing([], derivativeSubType, derivativeSubType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(derivativeSubType);
        expect(expectedResult).toContain(derivativeSubType2);
      });

      it('should accept null and undefined values', () => {
        const derivativeSubType: IDerivativeSubType = sampleWithRequiredData;
        expectedResult = service.addDerivativeSubTypeToCollectionIfMissing([], null, derivativeSubType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(derivativeSubType);
      });

      it('should return initial array if no DerivativeSubType is added', () => {
        const derivativeSubTypeCollection: IDerivativeSubType[] = [sampleWithRequiredData];
        expectedResult = service.addDerivativeSubTypeToCollectionIfMissing(derivativeSubTypeCollection, undefined, null);
        expect(expectedResult).toEqual(derivativeSubTypeCollection);
      });
    });

    describe('compareDerivativeSubType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDerivativeSubType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDerivativeSubType(entity1, entity2);
        const compareResult2 = service.compareDerivativeSubType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDerivativeSubType(entity1, entity2);
        const compareResult2 = service.compareDerivativeSubType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDerivativeSubType(entity1, entity2);
        const compareResult2 = service.compareDerivativeSubType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

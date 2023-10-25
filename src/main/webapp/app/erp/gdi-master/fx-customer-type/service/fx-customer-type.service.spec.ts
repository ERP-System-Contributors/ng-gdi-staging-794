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

import { IFxCustomerType } from '../fx-customer-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../fx-customer-type.test-samples';

import { FxCustomerTypeService } from './fx-customer-type.service';

const requireRestSample: IFxCustomerType = {
  ...sampleWithRequiredData,
};

describe('FxCustomerType Service', () => {
  let service: FxCustomerTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IFxCustomerType | IFxCustomerType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FxCustomerTypeService);
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

    it('should create a FxCustomerType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const fxCustomerType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(fxCustomerType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FxCustomerType', () => {
      const fxCustomerType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(fxCustomerType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FxCustomerType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FxCustomerType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FxCustomerType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFxCustomerTypeToCollectionIfMissing', () => {
      it('should add a FxCustomerType to an empty array', () => {
        const fxCustomerType: IFxCustomerType = sampleWithRequiredData;
        expectedResult = service.addFxCustomerTypeToCollectionIfMissing([], fxCustomerType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fxCustomerType);
      });

      it('should not add a FxCustomerType to an array that contains it', () => {
        const fxCustomerType: IFxCustomerType = sampleWithRequiredData;
        const fxCustomerTypeCollection: IFxCustomerType[] = [
          {
            ...fxCustomerType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFxCustomerTypeToCollectionIfMissing(fxCustomerTypeCollection, fxCustomerType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FxCustomerType to an array that doesn't contain it", () => {
        const fxCustomerType: IFxCustomerType = sampleWithRequiredData;
        const fxCustomerTypeCollection: IFxCustomerType[] = [sampleWithPartialData];
        expectedResult = service.addFxCustomerTypeToCollectionIfMissing(fxCustomerTypeCollection, fxCustomerType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fxCustomerType);
      });

      it('should add only unique FxCustomerType to an array', () => {
        const fxCustomerTypeArray: IFxCustomerType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const fxCustomerTypeCollection: IFxCustomerType[] = [sampleWithRequiredData];
        expectedResult = service.addFxCustomerTypeToCollectionIfMissing(fxCustomerTypeCollection, ...fxCustomerTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const fxCustomerType: IFxCustomerType = sampleWithRequiredData;
        const fxCustomerType2: IFxCustomerType = sampleWithPartialData;
        expectedResult = service.addFxCustomerTypeToCollectionIfMissing([], fxCustomerType, fxCustomerType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fxCustomerType);
        expect(expectedResult).toContain(fxCustomerType2);
      });

      it('should accept null and undefined values', () => {
        const fxCustomerType: IFxCustomerType = sampleWithRequiredData;
        expectedResult = service.addFxCustomerTypeToCollectionIfMissing([], null, fxCustomerType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fxCustomerType);
      });

      it('should return initial array if no FxCustomerType is added', () => {
        const fxCustomerTypeCollection: IFxCustomerType[] = [sampleWithRequiredData];
        expectedResult = service.addFxCustomerTypeToCollectionIfMissing(fxCustomerTypeCollection, undefined, null);
        expect(expectedResult).toEqual(fxCustomerTypeCollection);
      });
    });

    describe('compareFxCustomerType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFxCustomerType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFxCustomerType(entity1, entity2);
        const compareResult2 = service.compareFxCustomerType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFxCustomerType(entity1, entity2);
        const compareResult2 = service.compareFxCustomerType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFxCustomerType(entity1, entity2);
        const compareResult2 = service.compareFxCustomerType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

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

import { IFxRateType } from '../fx-rate-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../fx-rate-type.test-samples';

import { FxRateTypeService } from './fx-rate-type.service';

const requireRestSample: IFxRateType = {
  ...sampleWithRequiredData,
};

describe('FxRateType Service', () => {
  let service: FxRateTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IFxRateType | IFxRateType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FxRateTypeService);
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

    it('should create a FxRateType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const fxRateType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(fxRateType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FxRateType', () => {
      const fxRateType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(fxRateType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FxRateType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FxRateType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FxRateType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFxRateTypeToCollectionIfMissing', () => {
      it('should add a FxRateType to an empty array', () => {
        const fxRateType: IFxRateType = sampleWithRequiredData;
        expectedResult = service.addFxRateTypeToCollectionIfMissing([], fxRateType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fxRateType);
      });

      it('should not add a FxRateType to an array that contains it', () => {
        const fxRateType: IFxRateType = sampleWithRequiredData;
        const fxRateTypeCollection: IFxRateType[] = [
          {
            ...fxRateType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFxRateTypeToCollectionIfMissing(fxRateTypeCollection, fxRateType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FxRateType to an array that doesn't contain it", () => {
        const fxRateType: IFxRateType = sampleWithRequiredData;
        const fxRateTypeCollection: IFxRateType[] = [sampleWithPartialData];
        expectedResult = service.addFxRateTypeToCollectionIfMissing(fxRateTypeCollection, fxRateType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fxRateType);
      });

      it('should add only unique FxRateType to an array', () => {
        const fxRateTypeArray: IFxRateType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const fxRateTypeCollection: IFxRateType[] = [sampleWithRequiredData];
        expectedResult = service.addFxRateTypeToCollectionIfMissing(fxRateTypeCollection, ...fxRateTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const fxRateType: IFxRateType = sampleWithRequiredData;
        const fxRateType2: IFxRateType = sampleWithPartialData;
        expectedResult = service.addFxRateTypeToCollectionIfMissing([], fxRateType, fxRateType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fxRateType);
        expect(expectedResult).toContain(fxRateType2);
      });

      it('should accept null and undefined values', () => {
        const fxRateType: IFxRateType = sampleWithRequiredData;
        expectedResult = service.addFxRateTypeToCollectionIfMissing([], null, fxRateType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fxRateType);
      });

      it('should return initial array if no FxRateType is added', () => {
        const fxRateTypeCollection: IFxRateType[] = [sampleWithRequiredData];
        expectedResult = service.addFxRateTypeToCollectionIfMissing(fxRateTypeCollection, undefined, null);
        expect(expectedResult).toEqual(fxRateTypeCollection);
      });
    });

    describe('compareFxRateType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFxRateType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFxRateType(entity1, entity2);
        const compareResult2 = service.compareFxRateType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFxRateType(entity1, entity2);
        const compareResult2 = service.compareFxRateType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFxRateType(entity1, entity2);
        const compareResult2 = service.compareFxRateType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

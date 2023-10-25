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

import { IGenderType } from '../gender-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../gender-type.test-samples';

import { GenderTypeService } from './gender-type.service';

const requireRestSample: IGenderType = {
  ...sampleWithRequiredData,
};

describe('GenderType Service', () => {
  let service: GenderTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IGenderType | IGenderType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(GenderTypeService);
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

    it('should create a GenderType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const genderType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(genderType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a GenderType', () => {
      const genderType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(genderType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a GenderType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of GenderType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a GenderType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addGenderTypeToCollectionIfMissing', () => {
      it('should add a GenderType to an empty array', () => {
        const genderType: IGenderType = sampleWithRequiredData;
        expectedResult = service.addGenderTypeToCollectionIfMissing([], genderType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(genderType);
      });

      it('should not add a GenderType to an array that contains it', () => {
        const genderType: IGenderType = sampleWithRequiredData;
        const genderTypeCollection: IGenderType[] = [
          {
            ...genderType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addGenderTypeToCollectionIfMissing(genderTypeCollection, genderType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a GenderType to an array that doesn't contain it", () => {
        const genderType: IGenderType = sampleWithRequiredData;
        const genderTypeCollection: IGenderType[] = [sampleWithPartialData];
        expectedResult = service.addGenderTypeToCollectionIfMissing(genderTypeCollection, genderType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(genderType);
      });

      it('should add only unique GenderType to an array', () => {
        const genderTypeArray: IGenderType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const genderTypeCollection: IGenderType[] = [sampleWithRequiredData];
        expectedResult = service.addGenderTypeToCollectionIfMissing(genderTypeCollection, ...genderTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const genderType: IGenderType = sampleWithRequiredData;
        const genderType2: IGenderType = sampleWithPartialData;
        expectedResult = service.addGenderTypeToCollectionIfMissing([], genderType, genderType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(genderType);
        expect(expectedResult).toContain(genderType2);
      });

      it('should accept null and undefined values', () => {
        const genderType: IGenderType = sampleWithRequiredData;
        expectedResult = service.addGenderTypeToCollectionIfMissing([], null, genderType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(genderType);
      });

      it('should return initial array if no GenderType is added', () => {
        const genderTypeCollection: IGenderType[] = [sampleWithRequiredData];
        expectedResult = service.addGenderTypeToCollectionIfMissing(genderTypeCollection, undefined, null);
        expect(expectedResult).toEqual(genderTypeCollection);
      });
    });

    describe('compareGenderType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareGenderType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareGenderType(entity1, entity2);
        const compareResult2 = service.compareGenderType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareGenderType(entity1, entity2);
        const compareResult2 = service.compareGenderType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareGenderType(entity1, entity2);
        const compareResult2 = service.compareGenderType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

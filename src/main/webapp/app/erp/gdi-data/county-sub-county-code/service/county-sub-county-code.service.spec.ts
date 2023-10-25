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

import { ICountySubCountyCode } from '../county-sub-county-code.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../county-sub-county-code.test-samples';

import { CountySubCountyCodeService } from './county-sub-county-code.service';

const requireRestSample: ICountySubCountyCode = {
  ...sampleWithRequiredData,
};

describe('CountySubCountyCode Service', () => {
  let service: CountySubCountyCodeService;
  let httpMock: HttpTestingController;
  let expectedResult: ICountySubCountyCode | ICountySubCountyCode[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CountySubCountyCodeService);
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

    it('should create a CountySubCountyCode', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const countySubCountyCode = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(countySubCountyCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CountySubCountyCode', () => {
      const countySubCountyCode = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(countySubCountyCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CountySubCountyCode', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CountySubCountyCode', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CountySubCountyCode', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCountySubCountyCodeToCollectionIfMissing', () => {
      it('should add a CountySubCountyCode to an empty array', () => {
        const countySubCountyCode: ICountySubCountyCode = sampleWithRequiredData;
        expectedResult = service.addCountySubCountyCodeToCollectionIfMissing([], countySubCountyCode);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(countySubCountyCode);
      });

      it('should not add a CountySubCountyCode to an array that contains it', () => {
        const countySubCountyCode: ICountySubCountyCode = sampleWithRequiredData;
        const countySubCountyCodeCollection: ICountySubCountyCode[] = [
          {
            ...countySubCountyCode,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCountySubCountyCodeToCollectionIfMissing(countySubCountyCodeCollection, countySubCountyCode);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CountySubCountyCode to an array that doesn't contain it", () => {
        const countySubCountyCode: ICountySubCountyCode = sampleWithRequiredData;
        const countySubCountyCodeCollection: ICountySubCountyCode[] = [sampleWithPartialData];
        expectedResult = service.addCountySubCountyCodeToCollectionIfMissing(countySubCountyCodeCollection, countySubCountyCode);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(countySubCountyCode);
      });

      it('should add only unique CountySubCountyCode to an array', () => {
        const countySubCountyCodeArray: ICountySubCountyCode[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const countySubCountyCodeCollection: ICountySubCountyCode[] = [sampleWithRequiredData];
        expectedResult = service.addCountySubCountyCodeToCollectionIfMissing(countySubCountyCodeCollection, ...countySubCountyCodeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const countySubCountyCode: ICountySubCountyCode = sampleWithRequiredData;
        const countySubCountyCode2: ICountySubCountyCode = sampleWithPartialData;
        expectedResult = service.addCountySubCountyCodeToCollectionIfMissing([], countySubCountyCode, countySubCountyCode2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(countySubCountyCode);
        expect(expectedResult).toContain(countySubCountyCode2);
      });

      it('should accept null and undefined values', () => {
        const countySubCountyCode: ICountySubCountyCode = sampleWithRequiredData;
        expectedResult = service.addCountySubCountyCodeToCollectionIfMissing([], null, countySubCountyCode, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(countySubCountyCode);
      });

      it('should return initial array if no CountySubCountyCode is added', () => {
        const countySubCountyCodeCollection: ICountySubCountyCode[] = [sampleWithRequiredData];
        expectedResult = service.addCountySubCountyCodeToCollectionIfMissing(countySubCountyCodeCollection, undefined, null);
        expect(expectedResult).toEqual(countySubCountyCodeCollection);
      });
    });

    describe('compareCountySubCountyCode', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCountySubCountyCode(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCountySubCountyCode(entity1, entity2);
        const compareResult2 = service.compareCountySubCountyCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCountySubCountyCode(entity1, entity2);
        const compareResult2 = service.compareCountySubCountyCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCountySubCountyCode(entity1, entity2);
        const compareResult2 = service.compareCountySubCountyCode(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

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

import { ISnaSectorCode } from '../sna-sector-code.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../sna-sector-code.test-samples';

import { SnaSectorCodeService } from './sna-sector-code.service';

const requireRestSample: ISnaSectorCode = {
  ...sampleWithRequiredData,
};

describe('SnaSectorCode Service', () => {
  let service: SnaSectorCodeService;
  let httpMock: HttpTestingController;
  let expectedResult: ISnaSectorCode | ISnaSectorCode[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SnaSectorCodeService);
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

    it('should create a SnaSectorCode', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const snaSectorCode = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(snaSectorCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SnaSectorCode', () => {
      const snaSectorCode = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(snaSectorCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SnaSectorCode', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SnaSectorCode', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SnaSectorCode', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSnaSectorCodeToCollectionIfMissing', () => {
      it('should add a SnaSectorCode to an empty array', () => {
        const snaSectorCode: ISnaSectorCode = sampleWithRequiredData;
        expectedResult = service.addSnaSectorCodeToCollectionIfMissing([], snaSectorCode);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(snaSectorCode);
      });

      it('should not add a SnaSectorCode to an array that contains it', () => {
        const snaSectorCode: ISnaSectorCode = sampleWithRequiredData;
        const snaSectorCodeCollection: ISnaSectorCode[] = [
          {
            ...snaSectorCode,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSnaSectorCodeToCollectionIfMissing(snaSectorCodeCollection, snaSectorCode);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SnaSectorCode to an array that doesn't contain it", () => {
        const snaSectorCode: ISnaSectorCode = sampleWithRequiredData;
        const snaSectorCodeCollection: ISnaSectorCode[] = [sampleWithPartialData];
        expectedResult = service.addSnaSectorCodeToCollectionIfMissing(snaSectorCodeCollection, snaSectorCode);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(snaSectorCode);
      });

      it('should add only unique SnaSectorCode to an array', () => {
        const snaSectorCodeArray: ISnaSectorCode[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const snaSectorCodeCollection: ISnaSectorCode[] = [sampleWithRequiredData];
        expectedResult = service.addSnaSectorCodeToCollectionIfMissing(snaSectorCodeCollection, ...snaSectorCodeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const snaSectorCode: ISnaSectorCode = sampleWithRequiredData;
        const snaSectorCode2: ISnaSectorCode = sampleWithPartialData;
        expectedResult = service.addSnaSectorCodeToCollectionIfMissing([], snaSectorCode, snaSectorCode2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(snaSectorCode);
        expect(expectedResult).toContain(snaSectorCode2);
      });

      it('should accept null and undefined values', () => {
        const snaSectorCode: ISnaSectorCode = sampleWithRequiredData;
        expectedResult = service.addSnaSectorCodeToCollectionIfMissing([], null, snaSectorCode, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(snaSectorCode);
      });

      it('should return initial array if no SnaSectorCode is added', () => {
        const snaSectorCodeCollection: ISnaSectorCode[] = [sampleWithRequiredData];
        expectedResult = service.addSnaSectorCodeToCollectionIfMissing(snaSectorCodeCollection, undefined, null);
        expect(expectedResult).toEqual(snaSectorCodeCollection);
      });
    });

    describe('compareSnaSectorCode', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSnaSectorCode(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSnaSectorCode(entity1, entity2);
        const compareResult2 = service.compareSnaSectorCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSnaSectorCode(entity1, entity2);
        const compareResult2 = service.compareSnaSectorCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSnaSectorCode(entity1, entity2);
        const compareResult2 = service.compareSnaSectorCode(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

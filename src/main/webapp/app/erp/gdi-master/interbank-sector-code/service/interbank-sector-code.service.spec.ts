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

import { IInterbankSectorCode } from '../interbank-sector-code.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../interbank-sector-code.test-samples';

import { InterbankSectorCodeService } from './interbank-sector-code.service';

const requireRestSample: IInterbankSectorCode = {
  ...sampleWithRequiredData,
};

describe('InterbankSectorCode Service', () => {
  let service: InterbankSectorCodeService;
  let httpMock: HttpTestingController;
  let expectedResult: IInterbankSectorCode | IInterbankSectorCode[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(InterbankSectorCodeService);
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

    it('should create a InterbankSectorCode', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const interbankSectorCode = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(interbankSectorCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a InterbankSectorCode', () => {
      const interbankSectorCode = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(interbankSectorCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a InterbankSectorCode', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of InterbankSectorCode', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a InterbankSectorCode', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addInterbankSectorCodeToCollectionIfMissing', () => {
      it('should add a InterbankSectorCode to an empty array', () => {
        const interbankSectorCode: IInterbankSectorCode = sampleWithRequiredData;
        expectedResult = service.addInterbankSectorCodeToCollectionIfMissing([], interbankSectorCode);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(interbankSectorCode);
      });

      it('should not add a InterbankSectorCode to an array that contains it', () => {
        const interbankSectorCode: IInterbankSectorCode = sampleWithRequiredData;
        const interbankSectorCodeCollection: IInterbankSectorCode[] = [
          {
            ...interbankSectorCode,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addInterbankSectorCodeToCollectionIfMissing(interbankSectorCodeCollection, interbankSectorCode);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a InterbankSectorCode to an array that doesn't contain it", () => {
        const interbankSectorCode: IInterbankSectorCode = sampleWithRequiredData;
        const interbankSectorCodeCollection: IInterbankSectorCode[] = [sampleWithPartialData];
        expectedResult = service.addInterbankSectorCodeToCollectionIfMissing(interbankSectorCodeCollection, interbankSectorCode);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(interbankSectorCode);
      });

      it('should add only unique InterbankSectorCode to an array', () => {
        const interbankSectorCodeArray: IInterbankSectorCode[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const interbankSectorCodeCollection: IInterbankSectorCode[] = [sampleWithRequiredData];
        expectedResult = service.addInterbankSectorCodeToCollectionIfMissing(interbankSectorCodeCollection, ...interbankSectorCodeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const interbankSectorCode: IInterbankSectorCode = sampleWithRequiredData;
        const interbankSectorCode2: IInterbankSectorCode = sampleWithPartialData;
        expectedResult = service.addInterbankSectorCodeToCollectionIfMissing([], interbankSectorCode, interbankSectorCode2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(interbankSectorCode);
        expect(expectedResult).toContain(interbankSectorCode2);
      });

      it('should accept null and undefined values', () => {
        const interbankSectorCode: IInterbankSectorCode = sampleWithRequiredData;
        expectedResult = service.addInterbankSectorCodeToCollectionIfMissing([], null, interbankSectorCode, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(interbankSectorCode);
      });

      it('should return initial array if no InterbankSectorCode is added', () => {
        const interbankSectorCodeCollection: IInterbankSectorCode[] = [sampleWithRequiredData];
        expectedResult = service.addInterbankSectorCodeToCollectionIfMissing(interbankSectorCodeCollection, undefined, null);
        expect(expectedResult).toEqual(interbankSectorCodeCollection);
      });
    });

    describe('compareInterbankSectorCode', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareInterbankSectorCode(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareInterbankSectorCode(entity1, entity2);
        const compareResult2 = service.compareInterbankSectorCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareInterbankSectorCode(entity1, entity2);
        const compareResult2 = service.compareInterbankSectorCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareInterbankSectorCode(entity1, entity2);
        const compareResult2 = service.compareInterbankSectorCode(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

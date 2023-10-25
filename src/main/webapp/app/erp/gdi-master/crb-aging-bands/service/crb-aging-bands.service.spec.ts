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

import { ICrbAgingBands } from '../crb-aging-bands.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../crb-aging-bands.test-samples';

import { CrbAgingBandsService } from './crb-aging-bands.service';

const requireRestSample: ICrbAgingBands = {
  ...sampleWithRequiredData,
};

describe('CrbAgingBands Service', () => {
  let service: CrbAgingBandsService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrbAgingBands | ICrbAgingBands[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrbAgingBandsService);
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

    it('should create a CrbAgingBands', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crbAgingBands = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crbAgingBands).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrbAgingBands', () => {
      const crbAgingBands = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crbAgingBands).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrbAgingBands', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrbAgingBands', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrbAgingBands', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrbAgingBandsToCollectionIfMissing', () => {
      it('should add a CrbAgingBands to an empty array', () => {
        const crbAgingBands: ICrbAgingBands = sampleWithRequiredData;
        expectedResult = service.addCrbAgingBandsToCollectionIfMissing([], crbAgingBands);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbAgingBands);
      });

      it('should not add a CrbAgingBands to an array that contains it', () => {
        const crbAgingBands: ICrbAgingBands = sampleWithRequiredData;
        const crbAgingBandsCollection: ICrbAgingBands[] = [
          {
            ...crbAgingBands,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrbAgingBandsToCollectionIfMissing(crbAgingBandsCollection, crbAgingBands);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrbAgingBands to an array that doesn't contain it", () => {
        const crbAgingBands: ICrbAgingBands = sampleWithRequiredData;
        const crbAgingBandsCollection: ICrbAgingBands[] = [sampleWithPartialData];
        expectedResult = service.addCrbAgingBandsToCollectionIfMissing(crbAgingBandsCollection, crbAgingBands);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbAgingBands);
      });

      it('should add only unique CrbAgingBands to an array', () => {
        const crbAgingBandsArray: ICrbAgingBands[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crbAgingBandsCollection: ICrbAgingBands[] = [sampleWithRequiredData];
        expectedResult = service.addCrbAgingBandsToCollectionIfMissing(crbAgingBandsCollection, ...crbAgingBandsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crbAgingBands: ICrbAgingBands = sampleWithRequiredData;
        const crbAgingBands2: ICrbAgingBands = sampleWithPartialData;
        expectedResult = service.addCrbAgingBandsToCollectionIfMissing([], crbAgingBands, crbAgingBands2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbAgingBands);
        expect(expectedResult).toContain(crbAgingBands2);
      });

      it('should accept null and undefined values', () => {
        const crbAgingBands: ICrbAgingBands = sampleWithRequiredData;
        expectedResult = service.addCrbAgingBandsToCollectionIfMissing([], null, crbAgingBands, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbAgingBands);
      });

      it('should return initial array if no CrbAgingBands is added', () => {
        const crbAgingBandsCollection: ICrbAgingBands[] = [sampleWithRequiredData];
        expectedResult = service.addCrbAgingBandsToCollectionIfMissing(crbAgingBandsCollection, undefined, null);
        expect(expectedResult).toEqual(crbAgingBandsCollection);
      });
    });

    describe('compareCrbAgingBands', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrbAgingBands(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrbAgingBands(entity1, entity2);
        const compareResult2 = service.compareCrbAgingBands(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrbAgingBands(entity1, entity2);
        const compareResult2 = service.compareCrbAgingBands(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrbAgingBands(entity1, entity2);
        const compareResult2 = service.compareCrbAgingBands(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

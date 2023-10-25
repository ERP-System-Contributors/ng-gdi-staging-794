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

import { ICrbReportRequestReasons } from '../crb-report-request-reasons.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../crb-report-request-reasons.test-samples';

import { CrbReportRequestReasonsService } from './crb-report-request-reasons.service';

const requireRestSample: ICrbReportRequestReasons = {
  ...sampleWithRequiredData,
};

describe('CrbReportRequestReasons Service', () => {
  let service: CrbReportRequestReasonsService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrbReportRequestReasons | ICrbReportRequestReasons[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrbReportRequestReasonsService);
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

    it('should create a CrbReportRequestReasons', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crbReportRequestReasons = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crbReportRequestReasons).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrbReportRequestReasons', () => {
      const crbReportRequestReasons = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crbReportRequestReasons).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrbReportRequestReasons', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrbReportRequestReasons', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrbReportRequestReasons', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrbReportRequestReasonsToCollectionIfMissing', () => {
      it('should add a CrbReportRequestReasons to an empty array', () => {
        const crbReportRequestReasons: ICrbReportRequestReasons = sampleWithRequiredData;
        expectedResult = service.addCrbReportRequestReasonsToCollectionIfMissing([], crbReportRequestReasons);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbReportRequestReasons);
      });

      it('should not add a CrbReportRequestReasons to an array that contains it', () => {
        const crbReportRequestReasons: ICrbReportRequestReasons = sampleWithRequiredData;
        const crbReportRequestReasonsCollection: ICrbReportRequestReasons[] = [
          {
            ...crbReportRequestReasons,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrbReportRequestReasonsToCollectionIfMissing(
          crbReportRequestReasonsCollection,
          crbReportRequestReasons
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrbReportRequestReasons to an array that doesn't contain it", () => {
        const crbReportRequestReasons: ICrbReportRequestReasons = sampleWithRequiredData;
        const crbReportRequestReasonsCollection: ICrbReportRequestReasons[] = [sampleWithPartialData];
        expectedResult = service.addCrbReportRequestReasonsToCollectionIfMissing(
          crbReportRequestReasonsCollection,
          crbReportRequestReasons
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbReportRequestReasons);
      });

      it('should add only unique CrbReportRequestReasons to an array', () => {
        const crbReportRequestReasonsArray: ICrbReportRequestReasons[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const crbReportRequestReasonsCollection: ICrbReportRequestReasons[] = [sampleWithRequiredData];
        expectedResult = service.addCrbReportRequestReasonsToCollectionIfMissing(
          crbReportRequestReasonsCollection,
          ...crbReportRequestReasonsArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crbReportRequestReasons: ICrbReportRequestReasons = sampleWithRequiredData;
        const crbReportRequestReasons2: ICrbReportRequestReasons = sampleWithPartialData;
        expectedResult = service.addCrbReportRequestReasonsToCollectionIfMissing([], crbReportRequestReasons, crbReportRequestReasons2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbReportRequestReasons);
        expect(expectedResult).toContain(crbReportRequestReasons2);
      });

      it('should accept null and undefined values', () => {
        const crbReportRequestReasons: ICrbReportRequestReasons = sampleWithRequiredData;
        expectedResult = service.addCrbReportRequestReasonsToCollectionIfMissing([], null, crbReportRequestReasons, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbReportRequestReasons);
      });

      it('should return initial array if no CrbReportRequestReasons is added', () => {
        const crbReportRequestReasonsCollection: ICrbReportRequestReasons[] = [sampleWithRequiredData];
        expectedResult = service.addCrbReportRequestReasonsToCollectionIfMissing(crbReportRequestReasonsCollection, undefined, null);
        expect(expectedResult).toEqual(crbReportRequestReasonsCollection);
      });
    });

    describe('compareCrbReportRequestReasons', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrbReportRequestReasons(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrbReportRequestReasons(entity1, entity2);
        const compareResult2 = service.compareCrbReportRequestReasons(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrbReportRequestReasons(entity1, entity2);
        const compareResult2 = service.compareCrbReportRequestReasons(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrbReportRequestReasons(entity1, entity2);
        const compareResult2 = service.compareCrbReportRequestReasons(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

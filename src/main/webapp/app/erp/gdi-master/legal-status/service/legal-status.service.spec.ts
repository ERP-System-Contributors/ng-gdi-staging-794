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

import { ILegalStatus } from '../legal-status.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../legal-status.test-samples';

import { LegalStatusService } from './legal-status.service';

const requireRestSample: ILegalStatus = {
  ...sampleWithRequiredData,
};

describe('LegalStatus Service', () => {
  let service: LegalStatusService;
  let httpMock: HttpTestingController;
  let expectedResult: ILegalStatus | ILegalStatus[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LegalStatusService);
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

    it('should create a LegalStatus', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const legalStatus = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(legalStatus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LegalStatus', () => {
      const legalStatus = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(legalStatus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LegalStatus', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LegalStatus', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LegalStatus', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLegalStatusToCollectionIfMissing', () => {
      it('should add a LegalStatus to an empty array', () => {
        const legalStatus: ILegalStatus = sampleWithRequiredData;
        expectedResult = service.addLegalStatusToCollectionIfMissing([], legalStatus);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(legalStatus);
      });

      it('should not add a LegalStatus to an array that contains it', () => {
        const legalStatus: ILegalStatus = sampleWithRequiredData;
        const legalStatusCollection: ILegalStatus[] = [
          {
            ...legalStatus,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLegalStatusToCollectionIfMissing(legalStatusCollection, legalStatus);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LegalStatus to an array that doesn't contain it", () => {
        const legalStatus: ILegalStatus = sampleWithRequiredData;
        const legalStatusCollection: ILegalStatus[] = [sampleWithPartialData];
        expectedResult = service.addLegalStatusToCollectionIfMissing(legalStatusCollection, legalStatus);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(legalStatus);
      });

      it('should add only unique LegalStatus to an array', () => {
        const legalStatusArray: ILegalStatus[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const legalStatusCollection: ILegalStatus[] = [sampleWithRequiredData];
        expectedResult = service.addLegalStatusToCollectionIfMissing(legalStatusCollection, ...legalStatusArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const legalStatus: ILegalStatus = sampleWithRequiredData;
        const legalStatus2: ILegalStatus = sampleWithPartialData;
        expectedResult = service.addLegalStatusToCollectionIfMissing([], legalStatus, legalStatus2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(legalStatus);
        expect(expectedResult).toContain(legalStatus2);
      });

      it('should accept null and undefined values', () => {
        const legalStatus: ILegalStatus = sampleWithRequiredData;
        expectedResult = service.addLegalStatusToCollectionIfMissing([], null, legalStatus, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(legalStatus);
      });

      it('should return initial array if no LegalStatus is added', () => {
        const legalStatusCollection: ILegalStatus[] = [sampleWithRequiredData];
        expectedResult = service.addLegalStatusToCollectionIfMissing(legalStatusCollection, undefined, null);
        expect(expectedResult).toEqual(legalStatusCollection);
      });
    });

    describe('compareLegalStatus', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLegalStatus(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareLegalStatus(entity1, entity2);
        const compareResult2 = service.compareLegalStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareLegalStatus(entity1, entity2);
        const compareResult2 = service.compareLegalStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareLegalStatus(entity1, entity2);
        const compareResult2 = service.compareLegalStatus(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

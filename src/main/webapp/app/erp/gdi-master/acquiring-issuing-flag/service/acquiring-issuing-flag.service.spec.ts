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

import { IAcquiringIssuingFlag } from '../acquiring-issuing-flag.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../acquiring-issuing-flag.test-samples';

import { AcquiringIssuingFlagService } from './acquiring-issuing-flag.service';

const requireRestSample: IAcquiringIssuingFlag = {
  ...sampleWithRequiredData,
};

describe('AcquiringIssuingFlag Service', () => {
  let service: AcquiringIssuingFlagService;
  let httpMock: HttpTestingController;
  let expectedResult: IAcquiringIssuingFlag | IAcquiringIssuingFlag[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AcquiringIssuingFlagService);
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

    it('should create a AcquiringIssuingFlag', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const acquiringIssuingFlag = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(acquiringIssuingFlag).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AcquiringIssuingFlag', () => {
      const acquiringIssuingFlag = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(acquiringIssuingFlag).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AcquiringIssuingFlag', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AcquiringIssuingFlag', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AcquiringIssuingFlag', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAcquiringIssuingFlagToCollectionIfMissing', () => {
      it('should add a AcquiringIssuingFlag to an empty array', () => {
        const acquiringIssuingFlag: IAcquiringIssuingFlag = sampleWithRequiredData;
        expectedResult = service.addAcquiringIssuingFlagToCollectionIfMissing([], acquiringIssuingFlag);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(acquiringIssuingFlag);
      });

      it('should not add a AcquiringIssuingFlag to an array that contains it', () => {
        const acquiringIssuingFlag: IAcquiringIssuingFlag = sampleWithRequiredData;
        const acquiringIssuingFlagCollection: IAcquiringIssuingFlag[] = [
          {
            ...acquiringIssuingFlag,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAcquiringIssuingFlagToCollectionIfMissing(acquiringIssuingFlagCollection, acquiringIssuingFlag);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AcquiringIssuingFlag to an array that doesn't contain it", () => {
        const acquiringIssuingFlag: IAcquiringIssuingFlag = sampleWithRequiredData;
        const acquiringIssuingFlagCollection: IAcquiringIssuingFlag[] = [sampleWithPartialData];
        expectedResult = service.addAcquiringIssuingFlagToCollectionIfMissing(acquiringIssuingFlagCollection, acquiringIssuingFlag);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(acquiringIssuingFlag);
      });

      it('should add only unique AcquiringIssuingFlag to an array', () => {
        const acquiringIssuingFlagArray: IAcquiringIssuingFlag[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const acquiringIssuingFlagCollection: IAcquiringIssuingFlag[] = [sampleWithRequiredData];
        expectedResult = service.addAcquiringIssuingFlagToCollectionIfMissing(acquiringIssuingFlagCollection, ...acquiringIssuingFlagArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const acquiringIssuingFlag: IAcquiringIssuingFlag = sampleWithRequiredData;
        const acquiringIssuingFlag2: IAcquiringIssuingFlag = sampleWithPartialData;
        expectedResult = service.addAcquiringIssuingFlagToCollectionIfMissing([], acquiringIssuingFlag, acquiringIssuingFlag2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(acquiringIssuingFlag);
        expect(expectedResult).toContain(acquiringIssuingFlag2);
      });

      it('should accept null and undefined values', () => {
        const acquiringIssuingFlag: IAcquiringIssuingFlag = sampleWithRequiredData;
        expectedResult = service.addAcquiringIssuingFlagToCollectionIfMissing([], null, acquiringIssuingFlag, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(acquiringIssuingFlag);
      });

      it('should return initial array if no AcquiringIssuingFlag is added', () => {
        const acquiringIssuingFlagCollection: IAcquiringIssuingFlag[] = [sampleWithRequiredData];
        expectedResult = service.addAcquiringIssuingFlagToCollectionIfMissing(acquiringIssuingFlagCollection, undefined, null);
        expect(expectedResult).toEqual(acquiringIssuingFlagCollection);
      });
    });

    describe('compareAcquiringIssuingFlag', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAcquiringIssuingFlag(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAcquiringIssuingFlag(entity1, entity2);
        const compareResult2 = service.compareAcquiringIssuingFlag(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAcquiringIssuingFlag(entity1, entity2);
        const compareResult2 = service.compareAcquiringIssuingFlag(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAcquiringIssuingFlag(entity1, entity2);
        const compareResult2 = service.compareAcquiringIssuingFlag(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

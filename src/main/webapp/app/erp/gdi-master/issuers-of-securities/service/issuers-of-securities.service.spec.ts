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

import { IIssuersOfSecurities } from '../issuers-of-securities.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../issuers-of-securities.test-samples';

import { IssuersOfSecuritiesService } from './issuers-of-securities.service';

const requireRestSample: IIssuersOfSecurities = {
  ...sampleWithRequiredData,
};

describe('IssuersOfSecurities Service', () => {
  let service: IssuersOfSecuritiesService;
  let httpMock: HttpTestingController;
  let expectedResult: IIssuersOfSecurities | IIssuersOfSecurities[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(IssuersOfSecuritiesService);
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

    it('should create a IssuersOfSecurities', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const issuersOfSecurities = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(issuersOfSecurities).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a IssuersOfSecurities', () => {
      const issuersOfSecurities = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(issuersOfSecurities).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a IssuersOfSecurities', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of IssuersOfSecurities', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a IssuersOfSecurities', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addIssuersOfSecuritiesToCollectionIfMissing', () => {
      it('should add a IssuersOfSecurities to an empty array', () => {
        const issuersOfSecurities: IIssuersOfSecurities = sampleWithRequiredData;
        expectedResult = service.addIssuersOfSecuritiesToCollectionIfMissing([], issuersOfSecurities);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(issuersOfSecurities);
      });

      it('should not add a IssuersOfSecurities to an array that contains it', () => {
        const issuersOfSecurities: IIssuersOfSecurities = sampleWithRequiredData;
        const issuersOfSecuritiesCollection: IIssuersOfSecurities[] = [
          {
            ...issuersOfSecurities,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addIssuersOfSecuritiesToCollectionIfMissing(issuersOfSecuritiesCollection, issuersOfSecurities);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a IssuersOfSecurities to an array that doesn't contain it", () => {
        const issuersOfSecurities: IIssuersOfSecurities = sampleWithRequiredData;
        const issuersOfSecuritiesCollection: IIssuersOfSecurities[] = [sampleWithPartialData];
        expectedResult = service.addIssuersOfSecuritiesToCollectionIfMissing(issuersOfSecuritiesCollection, issuersOfSecurities);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(issuersOfSecurities);
      });

      it('should add only unique IssuersOfSecurities to an array', () => {
        const issuersOfSecuritiesArray: IIssuersOfSecurities[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const issuersOfSecuritiesCollection: IIssuersOfSecurities[] = [sampleWithRequiredData];
        expectedResult = service.addIssuersOfSecuritiesToCollectionIfMissing(issuersOfSecuritiesCollection, ...issuersOfSecuritiesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const issuersOfSecurities: IIssuersOfSecurities = sampleWithRequiredData;
        const issuersOfSecurities2: IIssuersOfSecurities = sampleWithPartialData;
        expectedResult = service.addIssuersOfSecuritiesToCollectionIfMissing([], issuersOfSecurities, issuersOfSecurities2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(issuersOfSecurities);
        expect(expectedResult).toContain(issuersOfSecurities2);
      });

      it('should accept null and undefined values', () => {
        const issuersOfSecurities: IIssuersOfSecurities = sampleWithRequiredData;
        expectedResult = service.addIssuersOfSecuritiesToCollectionIfMissing([], null, issuersOfSecurities, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(issuersOfSecurities);
      });

      it('should return initial array if no IssuersOfSecurities is added', () => {
        const issuersOfSecuritiesCollection: IIssuersOfSecurities[] = [sampleWithRequiredData];
        expectedResult = service.addIssuersOfSecuritiesToCollectionIfMissing(issuersOfSecuritiesCollection, undefined, null);
        expect(expectedResult).toEqual(issuersOfSecuritiesCollection);
      });
    });

    describe('compareIssuersOfSecurities', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareIssuersOfSecurities(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareIssuersOfSecurities(entity1, entity2);
        const compareResult2 = service.compareIssuersOfSecurities(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareIssuersOfSecurities(entity1, entity2);
        const compareResult2 = service.compareIssuersOfSecurities(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareIssuersOfSecurities(entity1, entity2);
        const compareResult2 = service.compareIssuersOfSecurities(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

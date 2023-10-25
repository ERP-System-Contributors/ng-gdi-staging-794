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

import { DATE_FORMAT } from 'app/config/input.constants';
import { IWeeklyCounterfeitHolding } from '../weekly-counterfeit-holding.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../weekly-counterfeit-holding.test-samples';

import { WeeklyCounterfeitHoldingService, RestWeeklyCounterfeitHolding } from './weekly-counterfeit-holding.service';

const requireRestSample: RestWeeklyCounterfeitHolding = {
  ...sampleWithRequiredData,
  reportingDate: sampleWithRequiredData.reportingDate?.format(DATE_FORMAT),
  dateConfiscated: sampleWithRequiredData.dateConfiscated?.format(DATE_FORMAT),
  dateSubmittedToCBK: sampleWithRequiredData.dateSubmittedToCBK?.format(DATE_FORMAT),
};

describe('WeeklyCounterfeitHolding Service', () => {
  let service: WeeklyCounterfeitHoldingService;
  let httpMock: HttpTestingController;
  let expectedResult: IWeeklyCounterfeitHolding | IWeeklyCounterfeitHolding[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(WeeklyCounterfeitHoldingService);
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

    it('should create a WeeklyCounterfeitHolding', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const weeklyCounterfeitHolding = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(weeklyCounterfeitHolding).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a WeeklyCounterfeitHolding', () => {
      const weeklyCounterfeitHolding = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(weeklyCounterfeitHolding).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a WeeklyCounterfeitHolding', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of WeeklyCounterfeitHolding', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a WeeklyCounterfeitHolding', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addWeeklyCounterfeitHoldingToCollectionIfMissing', () => {
      it('should add a WeeklyCounterfeitHolding to an empty array', () => {
        const weeklyCounterfeitHolding: IWeeklyCounterfeitHolding = sampleWithRequiredData;
        expectedResult = service.addWeeklyCounterfeitHoldingToCollectionIfMissing([], weeklyCounterfeitHolding);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(weeklyCounterfeitHolding);
      });

      it('should not add a WeeklyCounterfeitHolding to an array that contains it', () => {
        const weeklyCounterfeitHolding: IWeeklyCounterfeitHolding = sampleWithRequiredData;
        const weeklyCounterfeitHoldingCollection: IWeeklyCounterfeitHolding[] = [
          {
            ...weeklyCounterfeitHolding,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addWeeklyCounterfeitHoldingToCollectionIfMissing(
          weeklyCounterfeitHoldingCollection,
          weeklyCounterfeitHolding
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a WeeklyCounterfeitHolding to an array that doesn't contain it", () => {
        const weeklyCounterfeitHolding: IWeeklyCounterfeitHolding = sampleWithRequiredData;
        const weeklyCounterfeitHoldingCollection: IWeeklyCounterfeitHolding[] = [sampleWithPartialData];
        expectedResult = service.addWeeklyCounterfeitHoldingToCollectionIfMissing(
          weeklyCounterfeitHoldingCollection,
          weeklyCounterfeitHolding
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(weeklyCounterfeitHolding);
      });

      it('should add only unique WeeklyCounterfeitHolding to an array', () => {
        const weeklyCounterfeitHoldingArray: IWeeklyCounterfeitHolding[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const weeklyCounterfeitHoldingCollection: IWeeklyCounterfeitHolding[] = [sampleWithRequiredData];
        expectedResult = service.addWeeklyCounterfeitHoldingToCollectionIfMissing(
          weeklyCounterfeitHoldingCollection,
          ...weeklyCounterfeitHoldingArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const weeklyCounterfeitHolding: IWeeklyCounterfeitHolding = sampleWithRequiredData;
        const weeklyCounterfeitHolding2: IWeeklyCounterfeitHolding = sampleWithPartialData;
        expectedResult = service.addWeeklyCounterfeitHoldingToCollectionIfMissing([], weeklyCounterfeitHolding, weeklyCounterfeitHolding2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(weeklyCounterfeitHolding);
        expect(expectedResult).toContain(weeklyCounterfeitHolding2);
      });

      it('should accept null and undefined values', () => {
        const weeklyCounterfeitHolding: IWeeklyCounterfeitHolding = sampleWithRequiredData;
        expectedResult = service.addWeeklyCounterfeitHoldingToCollectionIfMissing([], null, weeklyCounterfeitHolding, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(weeklyCounterfeitHolding);
      });

      it('should return initial array if no WeeklyCounterfeitHolding is added', () => {
        const weeklyCounterfeitHoldingCollection: IWeeklyCounterfeitHolding[] = [sampleWithRequiredData];
        expectedResult = service.addWeeklyCounterfeitHoldingToCollectionIfMissing(weeklyCounterfeitHoldingCollection, undefined, null);
        expect(expectedResult).toEqual(weeklyCounterfeitHoldingCollection);
      });
    });

    describe('compareWeeklyCounterfeitHolding', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareWeeklyCounterfeitHolding(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareWeeklyCounterfeitHolding(entity1, entity2);
        const compareResult2 = service.compareWeeklyCounterfeitHolding(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareWeeklyCounterfeitHolding(entity1, entity2);
        const compareResult2 = service.compareWeeklyCounterfeitHolding(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareWeeklyCounterfeitHolding(entity1, entity2);
        const compareResult2 = service.compareWeeklyCounterfeitHolding(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

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
import { IExchangeRate } from '../exchange-rate.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../exchange-rate.test-samples';

import { ExchangeRateService, RestExchangeRate } from './exchange-rate.service';

const requireRestSample: RestExchangeRate = {
  ...sampleWithRequiredData,
  businessReportingDay: sampleWithRequiredData.businessReportingDay?.format(DATE_FORMAT),
};

describe('ExchangeRate Service', () => {
  let service: ExchangeRateService;
  let httpMock: HttpTestingController;
  let expectedResult: IExchangeRate | IExchangeRate[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ExchangeRateService);
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

    it('should create a ExchangeRate', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const exchangeRate = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(exchangeRate).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ExchangeRate', () => {
      const exchangeRate = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(exchangeRate).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ExchangeRate', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ExchangeRate', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ExchangeRate', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addExchangeRateToCollectionIfMissing', () => {
      it('should add a ExchangeRate to an empty array', () => {
        const exchangeRate: IExchangeRate = sampleWithRequiredData;
        expectedResult = service.addExchangeRateToCollectionIfMissing([], exchangeRate);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(exchangeRate);
      });

      it('should not add a ExchangeRate to an array that contains it', () => {
        const exchangeRate: IExchangeRate = sampleWithRequiredData;
        const exchangeRateCollection: IExchangeRate[] = [
          {
            ...exchangeRate,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addExchangeRateToCollectionIfMissing(exchangeRateCollection, exchangeRate);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ExchangeRate to an array that doesn't contain it", () => {
        const exchangeRate: IExchangeRate = sampleWithRequiredData;
        const exchangeRateCollection: IExchangeRate[] = [sampleWithPartialData];
        expectedResult = service.addExchangeRateToCollectionIfMissing(exchangeRateCollection, exchangeRate);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(exchangeRate);
      });

      it('should add only unique ExchangeRate to an array', () => {
        const exchangeRateArray: IExchangeRate[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const exchangeRateCollection: IExchangeRate[] = [sampleWithRequiredData];
        expectedResult = service.addExchangeRateToCollectionIfMissing(exchangeRateCollection, ...exchangeRateArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const exchangeRate: IExchangeRate = sampleWithRequiredData;
        const exchangeRate2: IExchangeRate = sampleWithPartialData;
        expectedResult = service.addExchangeRateToCollectionIfMissing([], exchangeRate, exchangeRate2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(exchangeRate);
        expect(expectedResult).toContain(exchangeRate2);
      });

      it('should accept null and undefined values', () => {
        const exchangeRate: IExchangeRate = sampleWithRequiredData;
        expectedResult = service.addExchangeRateToCollectionIfMissing([], null, exchangeRate, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(exchangeRate);
      });

      it('should return initial array if no ExchangeRate is added', () => {
        const exchangeRateCollection: IExchangeRate[] = [sampleWithRequiredData];
        expectedResult = service.addExchangeRateToCollectionIfMissing(exchangeRateCollection, undefined, null);
        expect(expectedResult).toEqual(exchangeRateCollection);
      });
    });

    describe('compareExchangeRate', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareExchangeRate(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareExchangeRate(entity1, entity2);
        const compareResult2 = service.compareExchangeRate(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareExchangeRate(entity1, entity2);
        const compareResult2 = service.compareExchangeRate(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareExchangeRate(entity1, entity2);
        const compareResult2 = service.compareExchangeRate(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

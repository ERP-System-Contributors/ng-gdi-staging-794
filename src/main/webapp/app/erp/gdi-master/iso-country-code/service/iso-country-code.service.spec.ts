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

import { IIsoCountryCode } from '../iso-country-code.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../iso-country-code.test-samples';

import { IsoCountryCodeService } from './iso-country-code.service';

const requireRestSample: IIsoCountryCode = {
  ...sampleWithRequiredData,
};

describe('IsoCountryCode Service', () => {
  let service: IsoCountryCodeService;
  let httpMock: HttpTestingController;
  let expectedResult: IIsoCountryCode | IIsoCountryCode[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(IsoCountryCodeService);
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

    it('should create a IsoCountryCode', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const isoCountryCode = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(isoCountryCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a IsoCountryCode', () => {
      const isoCountryCode = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(isoCountryCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a IsoCountryCode', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of IsoCountryCode', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a IsoCountryCode', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addIsoCountryCodeToCollectionIfMissing', () => {
      it('should add a IsoCountryCode to an empty array', () => {
        const isoCountryCode: IIsoCountryCode = sampleWithRequiredData;
        expectedResult = service.addIsoCountryCodeToCollectionIfMissing([], isoCountryCode);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(isoCountryCode);
      });

      it('should not add a IsoCountryCode to an array that contains it', () => {
        const isoCountryCode: IIsoCountryCode = sampleWithRequiredData;
        const isoCountryCodeCollection: IIsoCountryCode[] = [
          {
            ...isoCountryCode,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addIsoCountryCodeToCollectionIfMissing(isoCountryCodeCollection, isoCountryCode);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a IsoCountryCode to an array that doesn't contain it", () => {
        const isoCountryCode: IIsoCountryCode = sampleWithRequiredData;
        const isoCountryCodeCollection: IIsoCountryCode[] = [sampleWithPartialData];
        expectedResult = service.addIsoCountryCodeToCollectionIfMissing(isoCountryCodeCollection, isoCountryCode);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(isoCountryCode);
      });

      it('should add only unique IsoCountryCode to an array', () => {
        const isoCountryCodeArray: IIsoCountryCode[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const isoCountryCodeCollection: IIsoCountryCode[] = [sampleWithRequiredData];
        expectedResult = service.addIsoCountryCodeToCollectionIfMissing(isoCountryCodeCollection, ...isoCountryCodeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const isoCountryCode: IIsoCountryCode = sampleWithRequiredData;
        const isoCountryCode2: IIsoCountryCode = sampleWithPartialData;
        expectedResult = service.addIsoCountryCodeToCollectionIfMissing([], isoCountryCode, isoCountryCode2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(isoCountryCode);
        expect(expectedResult).toContain(isoCountryCode2);
      });

      it('should accept null and undefined values', () => {
        const isoCountryCode: IIsoCountryCode = sampleWithRequiredData;
        expectedResult = service.addIsoCountryCodeToCollectionIfMissing([], null, isoCountryCode, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(isoCountryCode);
      });

      it('should return initial array if no IsoCountryCode is added', () => {
        const isoCountryCodeCollection: IIsoCountryCode[] = [sampleWithRequiredData];
        expectedResult = service.addIsoCountryCodeToCollectionIfMissing(isoCountryCodeCollection, undefined, null);
        expect(expectedResult).toEqual(isoCountryCodeCollection);
      });
    });

    describe('compareIsoCountryCode', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareIsoCountryCode(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareIsoCountryCode(entity1, entity2);
        const compareResult2 = service.compareIsoCountryCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareIsoCountryCode(entity1, entity2);
        const compareResult2 = service.compareIsoCountryCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareIsoCountryCode(entity1, entity2);
        const compareResult2 = service.compareIsoCountryCode(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

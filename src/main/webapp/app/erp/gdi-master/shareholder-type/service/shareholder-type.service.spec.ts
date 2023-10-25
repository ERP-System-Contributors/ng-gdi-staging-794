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

import { IShareholderType } from '../shareholder-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../shareholder-type.test-samples';

import { ShareholderTypeService } from './shareholder-type.service';

const requireRestSample: IShareholderType = {
  ...sampleWithRequiredData,
};

describe('ShareholderType Service', () => {
  let service: ShareholderTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IShareholderType | IShareholderType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ShareholderTypeService);
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

    it('should create a ShareholderType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const shareholderType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(shareholderType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ShareholderType', () => {
      const shareholderType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(shareholderType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ShareholderType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ShareholderType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ShareholderType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addShareholderTypeToCollectionIfMissing', () => {
      it('should add a ShareholderType to an empty array', () => {
        const shareholderType: IShareholderType = sampleWithRequiredData;
        expectedResult = service.addShareholderTypeToCollectionIfMissing([], shareholderType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(shareholderType);
      });

      it('should not add a ShareholderType to an array that contains it', () => {
        const shareholderType: IShareholderType = sampleWithRequiredData;
        const shareholderTypeCollection: IShareholderType[] = [
          {
            ...shareholderType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addShareholderTypeToCollectionIfMissing(shareholderTypeCollection, shareholderType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ShareholderType to an array that doesn't contain it", () => {
        const shareholderType: IShareholderType = sampleWithRequiredData;
        const shareholderTypeCollection: IShareholderType[] = [sampleWithPartialData];
        expectedResult = service.addShareholderTypeToCollectionIfMissing(shareholderTypeCollection, shareholderType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(shareholderType);
      });

      it('should add only unique ShareholderType to an array', () => {
        const shareholderTypeArray: IShareholderType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const shareholderTypeCollection: IShareholderType[] = [sampleWithRequiredData];
        expectedResult = service.addShareholderTypeToCollectionIfMissing(shareholderTypeCollection, ...shareholderTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const shareholderType: IShareholderType = sampleWithRequiredData;
        const shareholderType2: IShareholderType = sampleWithPartialData;
        expectedResult = service.addShareholderTypeToCollectionIfMissing([], shareholderType, shareholderType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(shareholderType);
        expect(expectedResult).toContain(shareholderType2);
      });

      it('should accept null and undefined values', () => {
        const shareholderType: IShareholderType = sampleWithRequiredData;
        expectedResult = service.addShareholderTypeToCollectionIfMissing([], null, shareholderType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(shareholderType);
      });

      it('should return initial array if no ShareholderType is added', () => {
        const shareholderTypeCollection: IShareholderType[] = [sampleWithRequiredData];
        expectedResult = service.addShareholderTypeToCollectionIfMissing(shareholderTypeCollection, undefined, null);
        expect(expectedResult).toEqual(shareholderTypeCollection);
      });
    });

    describe('compareShareholderType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareShareholderType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareShareholderType(entity1, entity2);
        const compareResult2 = service.compareShareholderType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareShareholderType(entity1, entity2);
        const compareResult2 = service.compareShareholderType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareShareholderType(entity1, entity2);
        const compareResult2 = service.compareShareholderType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

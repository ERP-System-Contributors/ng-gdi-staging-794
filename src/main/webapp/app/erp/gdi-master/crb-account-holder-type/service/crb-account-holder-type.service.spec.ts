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

import { ICrbAccountHolderType } from '../crb-account-holder-type.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../crb-account-holder-type.test-samples';

import { CrbAccountHolderTypeService } from './crb-account-holder-type.service';

const requireRestSample: ICrbAccountHolderType = {
  ...sampleWithRequiredData,
};

describe('CrbAccountHolderType Service', () => {
  let service: CrbAccountHolderTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrbAccountHolderType | ICrbAccountHolderType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrbAccountHolderTypeService);
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

    it('should create a CrbAccountHolderType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crbAccountHolderType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crbAccountHolderType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrbAccountHolderType', () => {
      const crbAccountHolderType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crbAccountHolderType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrbAccountHolderType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrbAccountHolderType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrbAccountHolderType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrbAccountHolderTypeToCollectionIfMissing', () => {
      it('should add a CrbAccountHolderType to an empty array', () => {
        const crbAccountHolderType: ICrbAccountHolderType = sampleWithRequiredData;
        expectedResult = service.addCrbAccountHolderTypeToCollectionIfMissing([], crbAccountHolderType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbAccountHolderType);
      });

      it('should not add a CrbAccountHolderType to an array that contains it', () => {
        const crbAccountHolderType: ICrbAccountHolderType = sampleWithRequiredData;
        const crbAccountHolderTypeCollection: ICrbAccountHolderType[] = [
          {
            ...crbAccountHolderType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrbAccountHolderTypeToCollectionIfMissing(crbAccountHolderTypeCollection, crbAccountHolderType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrbAccountHolderType to an array that doesn't contain it", () => {
        const crbAccountHolderType: ICrbAccountHolderType = sampleWithRequiredData;
        const crbAccountHolderTypeCollection: ICrbAccountHolderType[] = [sampleWithPartialData];
        expectedResult = service.addCrbAccountHolderTypeToCollectionIfMissing(crbAccountHolderTypeCollection, crbAccountHolderType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbAccountHolderType);
      });

      it('should add only unique CrbAccountHolderType to an array', () => {
        const crbAccountHolderTypeArray: ICrbAccountHolderType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crbAccountHolderTypeCollection: ICrbAccountHolderType[] = [sampleWithRequiredData];
        expectedResult = service.addCrbAccountHolderTypeToCollectionIfMissing(crbAccountHolderTypeCollection, ...crbAccountHolderTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crbAccountHolderType: ICrbAccountHolderType = sampleWithRequiredData;
        const crbAccountHolderType2: ICrbAccountHolderType = sampleWithPartialData;
        expectedResult = service.addCrbAccountHolderTypeToCollectionIfMissing([], crbAccountHolderType, crbAccountHolderType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbAccountHolderType);
        expect(expectedResult).toContain(crbAccountHolderType2);
      });

      it('should accept null and undefined values', () => {
        const crbAccountHolderType: ICrbAccountHolderType = sampleWithRequiredData;
        expectedResult = service.addCrbAccountHolderTypeToCollectionIfMissing([], null, crbAccountHolderType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbAccountHolderType);
      });

      it('should return initial array if no CrbAccountHolderType is added', () => {
        const crbAccountHolderTypeCollection: ICrbAccountHolderType[] = [sampleWithRequiredData];
        expectedResult = service.addCrbAccountHolderTypeToCollectionIfMissing(crbAccountHolderTypeCollection, undefined, null);
        expect(expectedResult).toEqual(crbAccountHolderTypeCollection);
      });
    });

    describe('compareCrbAccountHolderType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrbAccountHolderType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrbAccountHolderType(entity1, entity2);
        const compareResult2 = service.compareCrbAccountHolderType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrbAccountHolderType(entity1, entity2);
        const compareResult2 = service.compareCrbAccountHolderType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrbAccountHolderType(entity1, entity2);
        const compareResult2 = service.compareCrbAccountHolderType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

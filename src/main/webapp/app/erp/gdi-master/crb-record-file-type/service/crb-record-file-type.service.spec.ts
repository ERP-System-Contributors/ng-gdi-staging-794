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

import { ICrbRecordFileType } from '../crb-record-file-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../crb-record-file-type.test-samples';

import { CrbRecordFileTypeService } from './crb-record-file-type.service';

const requireRestSample: ICrbRecordFileType = {
  ...sampleWithRequiredData,
};

describe('CrbRecordFileType Service', () => {
  let service: CrbRecordFileTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrbRecordFileType | ICrbRecordFileType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrbRecordFileTypeService);
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

    it('should create a CrbRecordFileType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crbRecordFileType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crbRecordFileType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrbRecordFileType', () => {
      const crbRecordFileType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crbRecordFileType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrbRecordFileType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrbRecordFileType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrbRecordFileType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrbRecordFileTypeToCollectionIfMissing', () => {
      it('should add a CrbRecordFileType to an empty array', () => {
        const crbRecordFileType: ICrbRecordFileType = sampleWithRequiredData;
        expectedResult = service.addCrbRecordFileTypeToCollectionIfMissing([], crbRecordFileType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbRecordFileType);
      });

      it('should not add a CrbRecordFileType to an array that contains it', () => {
        const crbRecordFileType: ICrbRecordFileType = sampleWithRequiredData;
        const crbRecordFileTypeCollection: ICrbRecordFileType[] = [
          {
            ...crbRecordFileType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrbRecordFileTypeToCollectionIfMissing(crbRecordFileTypeCollection, crbRecordFileType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrbRecordFileType to an array that doesn't contain it", () => {
        const crbRecordFileType: ICrbRecordFileType = sampleWithRequiredData;
        const crbRecordFileTypeCollection: ICrbRecordFileType[] = [sampleWithPartialData];
        expectedResult = service.addCrbRecordFileTypeToCollectionIfMissing(crbRecordFileTypeCollection, crbRecordFileType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbRecordFileType);
      });

      it('should add only unique CrbRecordFileType to an array', () => {
        const crbRecordFileTypeArray: ICrbRecordFileType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crbRecordFileTypeCollection: ICrbRecordFileType[] = [sampleWithRequiredData];
        expectedResult = service.addCrbRecordFileTypeToCollectionIfMissing(crbRecordFileTypeCollection, ...crbRecordFileTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crbRecordFileType: ICrbRecordFileType = sampleWithRequiredData;
        const crbRecordFileType2: ICrbRecordFileType = sampleWithPartialData;
        expectedResult = service.addCrbRecordFileTypeToCollectionIfMissing([], crbRecordFileType, crbRecordFileType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbRecordFileType);
        expect(expectedResult).toContain(crbRecordFileType2);
      });

      it('should accept null and undefined values', () => {
        const crbRecordFileType: ICrbRecordFileType = sampleWithRequiredData;
        expectedResult = service.addCrbRecordFileTypeToCollectionIfMissing([], null, crbRecordFileType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbRecordFileType);
      });

      it('should return initial array if no CrbRecordFileType is added', () => {
        const crbRecordFileTypeCollection: ICrbRecordFileType[] = [sampleWithRequiredData];
        expectedResult = service.addCrbRecordFileTypeToCollectionIfMissing(crbRecordFileTypeCollection, undefined, null);
        expect(expectedResult).toEqual(crbRecordFileTypeCollection);
      });
    });

    describe('compareCrbRecordFileType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrbRecordFileType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrbRecordFileType(entity1, entity2);
        const compareResult2 = service.compareCrbRecordFileType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrbRecordFileType(entity1, entity2);
        const compareResult2 = service.compareCrbRecordFileType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrbRecordFileType(entity1, entity2);
        const compareResult2 = service.compareCrbRecordFileType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

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

import { ICrbAgentServiceType } from '../crb-agent-service-type.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../crb-agent-service-type.test-samples';

import { CrbAgentServiceTypeService } from './crb-agent-service-type.service';

const requireRestSample: ICrbAgentServiceType = {
  ...sampleWithRequiredData,
};

describe('CrbAgentServiceType Service', () => {
  let service: CrbAgentServiceTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrbAgentServiceType | ICrbAgentServiceType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrbAgentServiceTypeService);
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

    it('should create a CrbAgentServiceType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crbAgentServiceType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crbAgentServiceType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrbAgentServiceType', () => {
      const crbAgentServiceType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crbAgentServiceType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrbAgentServiceType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrbAgentServiceType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrbAgentServiceType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrbAgentServiceTypeToCollectionIfMissing', () => {
      it('should add a CrbAgentServiceType to an empty array', () => {
        const crbAgentServiceType: ICrbAgentServiceType = sampleWithRequiredData;
        expectedResult = service.addCrbAgentServiceTypeToCollectionIfMissing([], crbAgentServiceType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbAgentServiceType);
      });

      it('should not add a CrbAgentServiceType to an array that contains it', () => {
        const crbAgentServiceType: ICrbAgentServiceType = sampleWithRequiredData;
        const crbAgentServiceTypeCollection: ICrbAgentServiceType[] = [
          {
            ...crbAgentServiceType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrbAgentServiceTypeToCollectionIfMissing(crbAgentServiceTypeCollection, crbAgentServiceType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrbAgentServiceType to an array that doesn't contain it", () => {
        const crbAgentServiceType: ICrbAgentServiceType = sampleWithRequiredData;
        const crbAgentServiceTypeCollection: ICrbAgentServiceType[] = [sampleWithPartialData];
        expectedResult = service.addCrbAgentServiceTypeToCollectionIfMissing(crbAgentServiceTypeCollection, crbAgentServiceType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbAgentServiceType);
      });

      it('should add only unique CrbAgentServiceType to an array', () => {
        const crbAgentServiceTypeArray: ICrbAgentServiceType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crbAgentServiceTypeCollection: ICrbAgentServiceType[] = [sampleWithRequiredData];
        expectedResult = service.addCrbAgentServiceTypeToCollectionIfMissing(crbAgentServiceTypeCollection, ...crbAgentServiceTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crbAgentServiceType: ICrbAgentServiceType = sampleWithRequiredData;
        const crbAgentServiceType2: ICrbAgentServiceType = sampleWithPartialData;
        expectedResult = service.addCrbAgentServiceTypeToCollectionIfMissing([], crbAgentServiceType, crbAgentServiceType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbAgentServiceType);
        expect(expectedResult).toContain(crbAgentServiceType2);
      });

      it('should accept null and undefined values', () => {
        const crbAgentServiceType: ICrbAgentServiceType = sampleWithRequiredData;
        expectedResult = service.addCrbAgentServiceTypeToCollectionIfMissing([], null, crbAgentServiceType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbAgentServiceType);
      });

      it('should return initial array if no CrbAgentServiceType is added', () => {
        const crbAgentServiceTypeCollection: ICrbAgentServiceType[] = [sampleWithRequiredData];
        expectedResult = service.addCrbAgentServiceTypeToCollectionIfMissing(crbAgentServiceTypeCollection, undefined, null);
        expect(expectedResult).toEqual(crbAgentServiceTypeCollection);
      });
    });

    describe('compareCrbAgentServiceType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrbAgentServiceType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrbAgentServiceType(entity1, entity2);
        const compareResult2 = service.compareCrbAgentServiceType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrbAgentServiceType(entity1, entity2);
        const compareResult2 = service.compareCrbAgentServiceType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrbAgentServiceType(entity1, entity2);
        const compareResult2 = service.compareCrbAgentServiceType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

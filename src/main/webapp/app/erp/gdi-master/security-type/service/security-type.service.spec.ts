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

import { ISecurityType } from '../security-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../security-type.test-samples';

import { SecurityTypeService } from './security-type.service';

const requireRestSample: ISecurityType = {
  ...sampleWithRequiredData,
};

describe('SecurityType Service', () => {
  let service: SecurityTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: ISecurityType | ISecurityType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SecurityTypeService);
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

    it('should create a SecurityType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const securityType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(securityType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SecurityType', () => {
      const securityType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(securityType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SecurityType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SecurityType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SecurityType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSecurityTypeToCollectionIfMissing', () => {
      it('should add a SecurityType to an empty array', () => {
        const securityType: ISecurityType = sampleWithRequiredData;
        expectedResult = service.addSecurityTypeToCollectionIfMissing([], securityType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(securityType);
      });

      it('should not add a SecurityType to an array that contains it', () => {
        const securityType: ISecurityType = sampleWithRequiredData;
        const securityTypeCollection: ISecurityType[] = [
          {
            ...securityType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSecurityTypeToCollectionIfMissing(securityTypeCollection, securityType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SecurityType to an array that doesn't contain it", () => {
        const securityType: ISecurityType = sampleWithRequiredData;
        const securityTypeCollection: ISecurityType[] = [sampleWithPartialData];
        expectedResult = service.addSecurityTypeToCollectionIfMissing(securityTypeCollection, securityType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(securityType);
      });

      it('should add only unique SecurityType to an array', () => {
        const securityTypeArray: ISecurityType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const securityTypeCollection: ISecurityType[] = [sampleWithRequiredData];
        expectedResult = service.addSecurityTypeToCollectionIfMissing(securityTypeCollection, ...securityTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const securityType: ISecurityType = sampleWithRequiredData;
        const securityType2: ISecurityType = sampleWithPartialData;
        expectedResult = service.addSecurityTypeToCollectionIfMissing([], securityType, securityType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(securityType);
        expect(expectedResult).toContain(securityType2);
      });

      it('should accept null and undefined values', () => {
        const securityType: ISecurityType = sampleWithRequiredData;
        expectedResult = service.addSecurityTypeToCollectionIfMissing([], null, securityType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(securityType);
      });

      it('should return initial array if no SecurityType is added', () => {
        const securityTypeCollection: ISecurityType[] = [sampleWithRequiredData];
        expectedResult = service.addSecurityTypeToCollectionIfMissing(securityTypeCollection, undefined, null);
        expect(expectedResult).toEqual(securityTypeCollection);
      });
    });

    describe('compareSecurityType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSecurityType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSecurityType(entity1, entity2);
        const compareResult2 = service.compareSecurityType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSecurityType(entity1, entity2);
        const compareResult2 = service.compareSecurityType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSecurityType(entity1, entity2);
        const compareResult2 = service.compareSecurityType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

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

import { ICommitteeType } from '../committee-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../committee-type.test-samples';

import { CommitteeTypeService } from './committee-type.service';

const requireRestSample: ICommitteeType = {
  ...sampleWithRequiredData,
};

describe('CommitteeType Service', () => {
  let service: CommitteeTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: ICommitteeType | ICommitteeType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CommitteeTypeService);
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

    it('should create a CommitteeType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const committeeType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(committeeType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CommitteeType', () => {
      const committeeType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(committeeType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CommitteeType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CommitteeType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CommitteeType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCommitteeTypeToCollectionIfMissing', () => {
      it('should add a CommitteeType to an empty array', () => {
        const committeeType: ICommitteeType = sampleWithRequiredData;
        expectedResult = service.addCommitteeTypeToCollectionIfMissing([], committeeType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(committeeType);
      });

      it('should not add a CommitteeType to an array that contains it', () => {
        const committeeType: ICommitteeType = sampleWithRequiredData;
        const committeeTypeCollection: ICommitteeType[] = [
          {
            ...committeeType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCommitteeTypeToCollectionIfMissing(committeeTypeCollection, committeeType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CommitteeType to an array that doesn't contain it", () => {
        const committeeType: ICommitteeType = sampleWithRequiredData;
        const committeeTypeCollection: ICommitteeType[] = [sampleWithPartialData];
        expectedResult = service.addCommitteeTypeToCollectionIfMissing(committeeTypeCollection, committeeType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(committeeType);
      });

      it('should add only unique CommitteeType to an array', () => {
        const committeeTypeArray: ICommitteeType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const committeeTypeCollection: ICommitteeType[] = [sampleWithRequiredData];
        expectedResult = service.addCommitteeTypeToCollectionIfMissing(committeeTypeCollection, ...committeeTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const committeeType: ICommitteeType = sampleWithRequiredData;
        const committeeType2: ICommitteeType = sampleWithPartialData;
        expectedResult = service.addCommitteeTypeToCollectionIfMissing([], committeeType, committeeType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(committeeType);
        expect(expectedResult).toContain(committeeType2);
      });

      it('should accept null and undefined values', () => {
        const committeeType: ICommitteeType = sampleWithRequiredData;
        expectedResult = service.addCommitteeTypeToCollectionIfMissing([], null, committeeType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(committeeType);
      });

      it('should return initial array if no CommitteeType is added', () => {
        const committeeTypeCollection: ICommitteeType[] = [sampleWithRequiredData];
        expectedResult = service.addCommitteeTypeToCollectionIfMissing(committeeTypeCollection, undefined, null);
        expect(expectedResult).toEqual(committeeTypeCollection);
      });
    });

    describe('compareCommitteeType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCommitteeType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCommitteeType(entity1, entity2);
        const compareResult2 = service.compareCommitteeType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCommitteeType(entity1, entity2);
        const compareResult2 = service.compareCommitteeType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCommitteeType(entity1, entity2);
        const compareResult2 = service.compareCommitteeType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

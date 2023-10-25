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
import { IRelatedPartyRelationship } from '../related-party-relationship.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../related-party-relationship.test-samples';

import { RelatedPartyRelationshipService, RestRelatedPartyRelationship } from './related-party-relationship.service';

const requireRestSample: RestRelatedPartyRelationship = {
  ...sampleWithRequiredData,
  reportingDate: sampleWithRequiredData.reportingDate?.format(DATE_FORMAT),
};

describe('RelatedPartyRelationship Service', () => {
  let service: RelatedPartyRelationshipService;
  let httpMock: HttpTestingController;
  let expectedResult: IRelatedPartyRelationship | IRelatedPartyRelationship[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RelatedPartyRelationshipService);
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

    it('should create a RelatedPartyRelationship', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const relatedPartyRelationship = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(relatedPartyRelationship).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a RelatedPartyRelationship', () => {
      const relatedPartyRelationship = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(relatedPartyRelationship).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a RelatedPartyRelationship', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of RelatedPartyRelationship', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a RelatedPartyRelationship', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addRelatedPartyRelationshipToCollectionIfMissing', () => {
      it('should add a RelatedPartyRelationship to an empty array', () => {
        const relatedPartyRelationship: IRelatedPartyRelationship = sampleWithRequiredData;
        expectedResult = service.addRelatedPartyRelationshipToCollectionIfMissing([], relatedPartyRelationship);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(relatedPartyRelationship);
      });

      it('should not add a RelatedPartyRelationship to an array that contains it', () => {
        const relatedPartyRelationship: IRelatedPartyRelationship = sampleWithRequiredData;
        const relatedPartyRelationshipCollection: IRelatedPartyRelationship[] = [
          {
            ...relatedPartyRelationship,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addRelatedPartyRelationshipToCollectionIfMissing(
          relatedPartyRelationshipCollection,
          relatedPartyRelationship
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a RelatedPartyRelationship to an array that doesn't contain it", () => {
        const relatedPartyRelationship: IRelatedPartyRelationship = sampleWithRequiredData;
        const relatedPartyRelationshipCollection: IRelatedPartyRelationship[] = [sampleWithPartialData];
        expectedResult = service.addRelatedPartyRelationshipToCollectionIfMissing(
          relatedPartyRelationshipCollection,
          relatedPartyRelationship
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(relatedPartyRelationship);
      });

      it('should add only unique RelatedPartyRelationship to an array', () => {
        const relatedPartyRelationshipArray: IRelatedPartyRelationship[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const relatedPartyRelationshipCollection: IRelatedPartyRelationship[] = [sampleWithRequiredData];
        expectedResult = service.addRelatedPartyRelationshipToCollectionIfMissing(
          relatedPartyRelationshipCollection,
          ...relatedPartyRelationshipArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const relatedPartyRelationship: IRelatedPartyRelationship = sampleWithRequiredData;
        const relatedPartyRelationship2: IRelatedPartyRelationship = sampleWithPartialData;
        expectedResult = service.addRelatedPartyRelationshipToCollectionIfMissing([], relatedPartyRelationship, relatedPartyRelationship2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(relatedPartyRelationship);
        expect(expectedResult).toContain(relatedPartyRelationship2);
      });

      it('should accept null and undefined values', () => {
        const relatedPartyRelationship: IRelatedPartyRelationship = sampleWithRequiredData;
        expectedResult = service.addRelatedPartyRelationshipToCollectionIfMissing([], null, relatedPartyRelationship, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(relatedPartyRelationship);
      });

      it('should return initial array if no RelatedPartyRelationship is added', () => {
        const relatedPartyRelationshipCollection: IRelatedPartyRelationship[] = [sampleWithRequiredData];
        expectedResult = service.addRelatedPartyRelationshipToCollectionIfMissing(relatedPartyRelationshipCollection, undefined, null);
        expect(expectedResult).toEqual(relatedPartyRelationshipCollection);
      });
    });

    describe('compareRelatedPartyRelationship', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareRelatedPartyRelationship(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareRelatedPartyRelationship(entity1, entity2);
        const compareResult2 = service.compareRelatedPartyRelationship(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareRelatedPartyRelationship(entity1, entity2);
        const compareResult2 = service.compareRelatedPartyRelationship(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareRelatedPartyRelationship(entity1, entity2);
        const compareResult2 = service.compareRelatedPartyRelationship(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

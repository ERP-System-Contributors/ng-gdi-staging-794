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

import { IInstitutionContactDetails } from '../institution-contact-details.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../institution-contact-details.test-samples';

import { InstitutionContactDetailsService } from './institution-contact-details.service';

const requireRestSample: IInstitutionContactDetails = {
  ...sampleWithRequiredData,
};

describe('InstitutionContactDetails Service', () => {
  let service: InstitutionContactDetailsService;
  let httpMock: HttpTestingController;
  let expectedResult: IInstitutionContactDetails | IInstitutionContactDetails[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(InstitutionContactDetailsService);
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

    it('should create a InstitutionContactDetails', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const institutionContactDetails = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(institutionContactDetails).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a InstitutionContactDetails', () => {
      const institutionContactDetails = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(institutionContactDetails).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a InstitutionContactDetails', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of InstitutionContactDetails', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a InstitutionContactDetails', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addInstitutionContactDetailsToCollectionIfMissing', () => {
      it('should add a InstitutionContactDetails to an empty array', () => {
        const institutionContactDetails: IInstitutionContactDetails = sampleWithRequiredData;
        expectedResult = service.addInstitutionContactDetailsToCollectionIfMissing([], institutionContactDetails);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(institutionContactDetails);
      });

      it('should not add a InstitutionContactDetails to an array that contains it', () => {
        const institutionContactDetails: IInstitutionContactDetails = sampleWithRequiredData;
        const institutionContactDetailsCollection: IInstitutionContactDetails[] = [
          {
            ...institutionContactDetails,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addInstitutionContactDetailsToCollectionIfMissing(
          institutionContactDetailsCollection,
          institutionContactDetails
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a InstitutionContactDetails to an array that doesn't contain it", () => {
        const institutionContactDetails: IInstitutionContactDetails = sampleWithRequiredData;
        const institutionContactDetailsCollection: IInstitutionContactDetails[] = [sampleWithPartialData];
        expectedResult = service.addInstitutionContactDetailsToCollectionIfMissing(
          institutionContactDetailsCollection,
          institutionContactDetails
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(institutionContactDetails);
      });

      it('should add only unique InstitutionContactDetails to an array', () => {
        const institutionContactDetailsArray: IInstitutionContactDetails[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const institutionContactDetailsCollection: IInstitutionContactDetails[] = [sampleWithRequiredData];
        expectedResult = service.addInstitutionContactDetailsToCollectionIfMissing(
          institutionContactDetailsCollection,
          ...institutionContactDetailsArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const institutionContactDetails: IInstitutionContactDetails = sampleWithRequiredData;
        const institutionContactDetails2: IInstitutionContactDetails = sampleWithPartialData;
        expectedResult = service.addInstitutionContactDetailsToCollectionIfMissing(
          [],
          institutionContactDetails,
          institutionContactDetails2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(institutionContactDetails);
        expect(expectedResult).toContain(institutionContactDetails2);
      });

      it('should accept null and undefined values', () => {
        const institutionContactDetails: IInstitutionContactDetails = sampleWithRequiredData;
        expectedResult = service.addInstitutionContactDetailsToCollectionIfMissing([], null, institutionContactDetails, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(institutionContactDetails);
      });

      it('should return initial array if no InstitutionContactDetails is added', () => {
        const institutionContactDetailsCollection: IInstitutionContactDetails[] = [sampleWithRequiredData];
        expectedResult = service.addInstitutionContactDetailsToCollectionIfMissing(institutionContactDetailsCollection, undefined, null);
        expect(expectedResult).toEqual(institutionContactDetailsCollection);
      });
    });

    describe('compareInstitutionContactDetails', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareInstitutionContactDetails(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareInstitutionContactDetails(entity1, entity2);
        const compareResult2 = service.compareInstitutionContactDetails(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareInstitutionContactDetails(entity1, entity2);
        const compareResult2 = service.compareInstitutionContactDetails(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareInstitutionContactDetails(entity1, entity2);
        const compareResult2 = service.compareInstitutionContactDetails(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

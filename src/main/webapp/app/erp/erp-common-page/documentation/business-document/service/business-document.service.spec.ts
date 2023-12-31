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

import { IBusinessDocument } from '../business-document.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../business-document.test-samples';

import { BusinessDocumentService, RestBusinessDocument } from './business-document.service';

const requireRestSample: RestBusinessDocument = {
  ...sampleWithRequiredData,
  lastModified: sampleWithRequiredData.lastModified?.toJSON(),
};

describe('BusinessDocument Service', () => {
  let service: BusinessDocumentService;
  let httpMock: HttpTestingController;
  let expectedResult: IBusinessDocument | IBusinessDocument[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(BusinessDocumentService);
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

    it('should create a BusinessDocument', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const businessDocument = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(businessDocument).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a BusinessDocument', () => {
      const businessDocument = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(businessDocument).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a BusinessDocument', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of BusinessDocument', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a BusinessDocument', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addBusinessDocumentToCollectionIfMissing', () => {
      it('should add a BusinessDocument to an empty array', () => {
        const businessDocument: IBusinessDocument = sampleWithRequiredData;
        expectedResult = service.addBusinessDocumentToCollectionIfMissing([], businessDocument);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(businessDocument);
      });

      it('should not add a BusinessDocument to an array that contains it', () => {
        const businessDocument: IBusinessDocument = sampleWithRequiredData;
        const businessDocumentCollection: IBusinessDocument[] = [
          {
            ...businessDocument,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addBusinessDocumentToCollectionIfMissing(businessDocumentCollection, businessDocument);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a BusinessDocument to an array that doesn't contain it", () => {
        const businessDocument: IBusinessDocument = sampleWithRequiredData;
        const businessDocumentCollection: IBusinessDocument[] = [sampleWithPartialData];
        expectedResult = service.addBusinessDocumentToCollectionIfMissing(businessDocumentCollection, businessDocument);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(businessDocument);
      });

      it('should add only unique BusinessDocument to an array', () => {
        const businessDocumentArray: IBusinessDocument[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const businessDocumentCollection: IBusinessDocument[] = [sampleWithRequiredData];
        expectedResult = service.addBusinessDocumentToCollectionIfMissing(businessDocumentCollection, ...businessDocumentArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const businessDocument: IBusinessDocument = sampleWithRequiredData;
        const businessDocument2: IBusinessDocument = sampleWithPartialData;
        expectedResult = service.addBusinessDocumentToCollectionIfMissing([], businessDocument, businessDocument2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(businessDocument);
        expect(expectedResult).toContain(businessDocument2);
      });

      it('should accept null and undefined values', () => {
        const businessDocument: IBusinessDocument = sampleWithRequiredData;
        expectedResult = service.addBusinessDocumentToCollectionIfMissing([], null, businessDocument, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(businessDocument);
      });

      it('should return initial array if no BusinessDocument is added', () => {
        const businessDocumentCollection: IBusinessDocument[] = [sampleWithRequiredData];
        expectedResult = service.addBusinessDocumentToCollectionIfMissing(businessDocumentCollection, undefined, null);
        expect(expectedResult).toEqual(businessDocumentCollection);
      });
    });

    describe('compareBusinessDocument', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareBusinessDocument(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareBusinessDocument(entity1, entity2);
        const compareResult2 = service.compareBusinessDocument(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareBusinessDocument(entity1, entity2);
        const compareResult2 = service.compareBusinessDocument(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareBusinessDocument(entity1, entity2);
        const compareResult2 = service.compareBusinessDocument(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrbDataSubmittingInstitutions } from '../crb-data-submitting-institutions.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../crb-data-submitting-institutions.test-samples';

import { CrbDataSubmittingInstitutionsService } from './crb-data-submitting-institutions.service';

const requireRestSample: ICrbDataSubmittingInstitutions = {
  ...sampleWithRequiredData,
};

describe('CrbDataSubmittingInstitutions Service', () => {
  let service: CrbDataSubmittingInstitutionsService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrbDataSubmittingInstitutions | ICrbDataSubmittingInstitutions[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrbDataSubmittingInstitutionsService);
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

    it('should create a CrbDataSubmittingInstitutions', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crbDataSubmittingInstitutions = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crbDataSubmittingInstitutions).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrbDataSubmittingInstitutions', () => {
      const crbDataSubmittingInstitutions = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crbDataSubmittingInstitutions).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrbDataSubmittingInstitutions', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrbDataSubmittingInstitutions', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrbDataSubmittingInstitutions', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrbDataSubmittingInstitutionsToCollectionIfMissing', () => {
      it('should add a CrbDataSubmittingInstitutions to an empty array', () => {
        const crbDataSubmittingInstitutions: ICrbDataSubmittingInstitutions = sampleWithRequiredData;
        expectedResult = service.addCrbDataSubmittingInstitutionsToCollectionIfMissing([], crbDataSubmittingInstitutions);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbDataSubmittingInstitutions);
      });

      it('should not add a CrbDataSubmittingInstitutions to an array that contains it', () => {
        const crbDataSubmittingInstitutions: ICrbDataSubmittingInstitutions = sampleWithRequiredData;
        const crbDataSubmittingInstitutionsCollection: ICrbDataSubmittingInstitutions[] = [
          {
            ...crbDataSubmittingInstitutions,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrbDataSubmittingInstitutionsToCollectionIfMissing(
          crbDataSubmittingInstitutionsCollection,
          crbDataSubmittingInstitutions
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrbDataSubmittingInstitutions to an array that doesn't contain it", () => {
        const crbDataSubmittingInstitutions: ICrbDataSubmittingInstitutions = sampleWithRequiredData;
        const crbDataSubmittingInstitutionsCollection: ICrbDataSubmittingInstitutions[] = [sampleWithPartialData];
        expectedResult = service.addCrbDataSubmittingInstitutionsToCollectionIfMissing(
          crbDataSubmittingInstitutionsCollection,
          crbDataSubmittingInstitutions
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbDataSubmittingInstitutions);
      });

      it('should add only unique CrbDataSubmittingInstitutions to an array', () => {
        const crbDataSubmittingInstitutionsArray: ICrbDataSubmittingInstitutions[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const crbDataSubmittingInstitutionsCollection: ICrbDataSubmittingInstitutions[] = [sampleWithRequiredData];
        expectedResult = service.addCrbDataSubmittingInstitutionsToCollectionIfMissing(
          crbDataSubmittingInstitutionsCollection,
          ...crbDataSubmittingInstitutionsArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crbDataSubmittingInstitutions: ICrbDataSubmittingInstitutions = sampleWithRequiredData;
        const crbDataSubmittingInstitutions2: ICrbDataSubmittingInstitutions = sampleWithPartialData;
        expectedResult = service.addCrbDataSubmittingInstitutionsToCollectionIfMissing(
          [],
          crbDataSubmittingInstitutions,
          crbDataSubmittingInstitutions2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbDataSubmittingInstitutions);
        expect(expectedResult).toContain(crbDataSubmittingInstitutions2);
      });

      it('should accept null and undefined values', () => {
        const crbDataSubmittingInstitutions: ICrbDataSubmittingInstitutions = sampleWithRequiredData;
        expectedResult = service.addCrbDataSubmittingInstitutionsToCollectionIfMissing([], null, crbDataSubmittingInstitutions, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbDataSubmittingInstitutions);
      });

      it('should return initial array if no CrbDataSubmittingInstitutions is added', () => {
        const crbDataSubmittingInstitutionsCollection: ICrbDataSubmittingInstitutions[] = [sampleWithRequiredData];
        expectedResult = service.addCrbDataSubmittingInstitutionsToCollectionIfMissing(
          crbDataSubmittingInstitutionsCollection,
          undefined,
          null
        );
        expect(expectedResult).toEqual(crbDataSubmittingInstitutionsCollection);
      });
    });

    describe('compareCrbDataSubmittingInstitutions', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrbDataSubmittingInstitutions(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrbDataSubmittingInstitutions(entity1, entity2);
        const compareResult2 = service.compareCrbDataSubmittingInstitutions(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrbDataSubmittingInstitutions(entity1, entity2);
        const compareResult2 = service.compareCrbDataSubmittingInstitutions(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrbDataSubmittingInstitutions(entity1, entity2);
        const compareResult2 = service.compareCrbDataSubmittingInstitutions(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

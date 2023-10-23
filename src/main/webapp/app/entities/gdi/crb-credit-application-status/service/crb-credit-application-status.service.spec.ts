import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrbCreditApplicationStatus } from '../crb-credit-application-status.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../crb-credit-application-status.test-samples';

import { CrbCreditApplicationStatusService } from './crb-credit-application-status.service';

const requireRestSample: ICrbCreditApplicationStatus = {
  ...sampleWithRequiredData,
};

describe('CrbCreditApplicationStatus Service', () => {
  let service: CrbCreditApplicationStatusService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrbCreditApplicationStatus | ICrbCreditApplicationStatus[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrbCreditApplicationStatusService);
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

    it('should create a CrbCreditApplicationStatus', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crbCreditApplicationStatus = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crbCreditApplicationStatus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrbCreditApplicationStatus', () => {
      const crbCreditApplicationStatus = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crbCreditApplicationStatus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrbCreditApplicationStatus', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrbCreditApplicationStatus', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrbCreditApplicationStatus', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrbCreditApplicationStatusToCollectionIfMissing', () => {
      it('should add a CrbCreditApplicationStatus to an empty array', () => {
        const crbCreditApplicationStatus: ICrbCreditApplicationStatus = sampleWithRequiredData;
        expectedResult = service.addCrbCreditApplicationStatusToCollectionIfMissing([], crbCreditApplicationStatus);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbCreditApplicationStatus);
      });

      it('should not add a CrbCreditApplicationStatus to an array that contains it', () => {
        const crbCreditApplicationStatus: ICrbCreditApplicationStatus = sampleWithRequiredData;
        const crbCreditApplicationStatusCollection: ICrbCreditApplicationStatus[] = [
          {
            ...crbCreditApplicationStatus,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrbCreditApplicationStatusToCollectionIfMissing(
          crbCreditApplicationStatusCollection,
          crbCreditApplicationStatus
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrbCreditApplicationStatus to an array that doesn't contain it", () => {
        const crbCreditApplicationStatus: ICrbCreditApplicationStatus = sampleWithRequiredData;
        const crbCreditApplicationStatusCollection: ICrbCreditApplicationStatus[] = [sampleWithPartialData];
        expectedResult = service.addCrbCreditApplicationStatusToCollectionIfMissing(
          crbCreditApplicationStatusCollection,
          crbCreditApplicationStatus
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbCreditApplicationStatus);
      });

      it('should add only unique CrbCreditApplicationStatus to an array', () => {
        const crbCreditApplicationStatusArray: ICrbCreditApplicationStatus[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const crbCreditApplicationStatusCollection: ICrbCreditApplicationStatus[] = [sampleWithRequiredData];
        expectedResult = service.addCrbCreditApplicationStatusToCollectionIfMissing(
          crbCreditApplicationStatusCollection,
          ...crbCreditApplicationStatusArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crbCreditApplicationStatus: ICrbCreditApplicationStatus = sampleWithRequiredData;
        const crbCreditApplicationStatus2: ICrbCreditApplicationStatus = sampleWithPartialData;
        expectedResult = service.addCrbCreditApplicationStatusToCollectionIfMissing(
          [],
          crbCreditApplicationStatus,
          crbCreditApplicationStatus2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbCreditApplicationStatus);
        expect(expectedResult).toContain(crbCreditApplicationStatus2);
      });

      it('should accept null and undefined values', () => {
        const crbCreditApplicationStatus: ICrbCreditApplicationStatus = sampleWithRequiredData;
        expectedResult = service.addCrbCreditApplicationStatusToCollectionIfMissing([], null, crbCreditApplicationStatus, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbCreditApplicationStatus);
      });

      it('should return initial array if no CrbCreditApplicationStatus is added', () => {
        const crbCreditApplicationStatusCollection: ICrbCreditApplicationStatus[] = [sampleWithRequiredData];
        expectedResult = service.addCrbCreditApplicationStatusToCollectionIfMissing(crbCreditApplicationStatusCollection, undefined, null);
        expect(expectedResult).toEqual(crbCreditApplicationStatusCollection);
      });
    });

    describe('compareCrbCreditApplicationStatus', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrbCreditApplicationStatus(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrbCreditApplicationStatus(entity1, entity2);
        const compareResult2 = service.compareCrbCreditApplicationStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrbCreditApplicationStatus(entity1, entity2);
        const compareResult2 = service.compareCrbCreditApplicationStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrbCreditApplicationStatus(entity1, entity2);
        const compareResult2 = service.compareCrbCreditApplicationStatus(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

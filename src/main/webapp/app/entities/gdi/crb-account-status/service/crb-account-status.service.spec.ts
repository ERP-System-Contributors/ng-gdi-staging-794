import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrbAccountStatus } from '../crb-account-status.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../crb-account-status.test-samples';

import { CrbAccountStatusService } from './crb-account-status.service';

const requireRestSample: ICrbAccountStatus = {
  ...sampleWithRequiredData,
};

describe('CrbAccountStatus Service', () => {
  let service: CrbAccountStatusService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrbAccountStatus | ICrbAccountStatus[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrbAccountStatusService);
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

    it('should create a CrbAccountStatus', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crbAccountStatus = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crbAccountStatus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrbAccountStatus', () => {
      const crbAccountStatus = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crbAccountStatus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrbAccountStatus', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrbAccountStatus', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrbAccountStatus', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrbAccountStatusToCollectionIfMissing', () => {
      it('should add a CrbAccountStatus to an empty array', () => {
        const crbAccountStatus: ICrbAccountStatus = sampleWithRequiredData;
        expectedResult = service.addCrbAccountStatusToCollectionIfMissing([], crbAccountStatus);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbAccountStatus);
      });

      it('should not add a CrbAccountStatus to an array that contains it', () => {
        const crbAccountStatus: ICrbAccountStatus = sampleWithRequiredData;
        const crbAccountStatusCollection: ICrbAccountStatus[] = [
          {
            ...crbAccountStatus,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrbAccountStatusToCollectionIfMissing(crbAccountStatusCollection, crbAccountStatus);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrbAccountStatus to an array that doesn't contain it", () => {
        const crbAccountStatus: ICrbAccountStatus = sampleWithRequiredData;
        const crbAccountStatusCollection: ICrbAccountStatus[] = [sampleWithPartialData];
        expectedResult = service.addCrbAccountStatusToCollectionIfMissing(crbAccountStatusCollection, crbAccountStatus);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbAccountStatus);
      });

      it('should add only unique CrbAccountStatus to an array', () => {
        const crbAccountStatusArray: ICrbAccountStatus[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crbAccountStatusCollection: ICrbAccountStatus[] = [sampleWithRequiredData];
        expectedResult = service.addCrbAccountStatusToCollectionIfMissing(crbAccountStatusCollection, ...crbAccountStatusArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crbAccountStatus: ICrbAccountStatus = sampleWithRequiredData;
        const crbAccountStatus2: ICrbAccountStatus = sampleWithPartialData;
        expectedResult = service.addCrbAccountStatusToCollectionIfMissing([], crbAccountStatus, crbAccountStatus2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbAccountStatus);
        expect(expectedResult).toContain(crbAccountStatus2);
      });

      it('should accept null and undefined values', () => {
        const crbAccountStatus: ICrbAccountStatus = sampleWithRequiredData;
        expectedResult = service.addCrbAccountStatusToCollectionIfMissing([], null, crbAccountStatus, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbAccountStatus);
      });

      it('should return initial array if no CrbAccountStatus is added', () => {
        const crbAccountStatusCollection: ICrbAccountStatus[] = [sampleWithRequiredData];
        expectedResult = service.addCrbAccountStatusToCollectionIfMissing(crbAccountStatusCollection, undefined, null);
        expect(expectedResult).toEqual(crbAccountStatusCollection);
      });
    });

    describe('compareCrbAccountStatus', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrbAccountStatus(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrbAccountStatus(entity1, entity2);
        const compareResult2 = service.compareCrbAccountStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrbAccountStatus(entity1, entity2);
        const compareResult2 = service.compareCrbAccountStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrbAccountStatus(entity1, entity2);
        const compareResult2 = service.compareCrbAccountStatus(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

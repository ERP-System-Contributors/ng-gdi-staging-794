import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrbSubscriptionStatusTypeCode } from '../crb-subscription-status-type-code.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../crb-subscription-status-type-code.test-samples';

import { CrbSubscriptionStatusTypeCodeService } from './crb-subscription-status-type-code.service';

const requireRestSample: ICrbSubscriptionStatusTypeCode = {
  ...sampleWithRequiredData,
};

describe('CrbSubscriptionStatusTypeCode Service', () => {
  let service: CrbSubscriptionStatusTypeCodeService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrbSubscriptionStatusTypeCode | ICrbSubscriptionStatusTypeCode[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrbSubscriptionStatusTypeCodeService);
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

    it('should create a CrbSubscriptionStatusTypeCode', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crbSubscriptionStatusTypeCode = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crbSubscriptionStatusTypeCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrbSubscriptionStatusTypeCode', () => {
      const crbSubscriptionStatusTypeCode = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crbSubscriptionStatusTypeCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrbSubscriptionStatusTypeCode', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrbSubscriptionStatusTypeCode', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrbSubscriptionStatusTypeCode', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrbSubscriptionStatusTypeCodeToCollectionIfMissing', () => {
      it('should add a CrbSubscriptionStatusTypeCode to an empty array', () => {
        const crbSubscriptionStatusTypeCode: ICrbSubscriptionStatusTypeCode = sampleWithRequiredData;
        expectedResult = service.addCrbSubscriptionStatusTypeCodeToCollectionIfMissing([], crbSubscriptionStatusTypeCode);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbSubscriptionStatusTypeCode);
      });

      it('should not add a CrbSubscriptionStatusTypeCode to an array that contains it', () => {
        const crbSubscriptionStatusTypeCode: ICrbSubscriptionStatusTypeCode = sampleWithRequiredData;
        const crbSubscriptionStatusTypeCodeCollection: ICrbSubscriptionStatusTypeCode[] = [
          {
            ...crbSubscriptionStatusTypeCode,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrbSubscriptionStatusTypeCodeToCollectionIfMissing(
          crbSubscriptionStatusTypeCodeCollection,
          crbSubscriptionStatusTypeCode
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrbSubscriptionStatusTypeCode to an array that doesn't contain it", () => {
        const crbSubscriptionStatusTypeCode: ICrbSubscriptionStatusTypeCode = sampleWithRequiredData;
        const crbSubscriptionStatusTypeCodeCollection: ICrbSubscriptionStatusTypeCode[] = [sampleWithPartialData];
        expectedResult = service.addCrbSubscriptionStatusTypeCodeToCollectionIfMissing(
          crbSubscriptionStatusTypeCodeCollection,
          crbSubscriptionStatusTypeCode
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbSubscriptionStatusTypeCode);
      });

      it('should add only unique CrbSubscriptionStatusTypeCode to an array', () => {
        const crbSubscriptionStatusTypeCodeArray: ICrbSubscriptionStatusTypeCode[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const crbSubscriptionStatusTypeCodeCollection: ICrbSubscriptionStatusTypeCode[] = [sampleWithRequiredData];
        expectedResult = service.addCrbSubscriptionStatusTypeCodeToCollectionIfMissing(
          crbSubscriptionStatusTypeCodeCollection,
          ...crbSubscriptionStatusTypeCodeArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crbSubscriptionStatusTypeCode: ICrbSubscriptionStatusTypeCode = sampleWithRequiredData;
        const crbSubscriptionStatusTypeCode2: ICrbSubscriptionStatusTypeCode = sampleWithPartialData;
        expectedResult = service.addCrbSubscriptionStatusTypeCodeToCollectionIfMissing(
          [],
          crbSubscriptionStatusTypeCode,
          crbSubscriptionStatusTypeCode2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbSubscriptionStatusTypeCode);
        expect(expectedResult).toContain(crbSubscriptionStatusTypeCode2);
      });

      it('should accept null and undefined values', () => {
        const crbSubscriptionStatusTypeCode: ICrbSubscriptionStatusTypeCode = sampleWithRequiredData;
        expectedResult = service.addCrbSubscriptionStatusTypeCodeToCollectionIfMissing([], null, crbSubscriptionStatusTypeCode, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbSubscriptionStatusTypeCode);
      });

      it('should return initial array if no CrbSubscriptionStatusTypeCode is added', () => {
        const crbSubscriptionStatusTypeCodeCollection: ICrbSubscriptionStatusTypeCode[] = [sampleWithRequiredData];
        expectedResult = service.addCrbSubscriptionStatusTypeCodeToCollectionIfMissing(
          crbSubscriptionStatusTypeCodeCollection,
          undefined,
          null
        );
        expect(expectedResult).toEqual(crbSubscriptionStatusTypeCodeCollection);
      });
    });

    describe('compareCrbSubscriptionStatusTypeCode', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrbSubscriptionStatusTypeCode(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrbSubscriptionStatusTypeCode(entity1, entity2);
        const compareResult2 = service.compareCrbSubscriptionStatusTypeCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrbSubscriptionStatusTypeCode(entity1, entity2);
        const compareResult2 = service.compareCrbSubscriptionStatusTypeCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrbSubscriptionStatusTypeCode(entity1, entity2);
        const compareResult2 = service.compareCrbSubscriptionStatusTypeCode(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

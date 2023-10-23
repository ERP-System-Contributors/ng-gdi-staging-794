import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrbComplaintStatusType } from '../crb-complaint-status-type.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../crb-complaint-status-type.test-samples';

import { CrbComplaintStatusTypeService } from './crb-complaint-status-type.service';

const requireRestSample: ICrbComplaintStatusType = {
  ...sampleWithRequiredData,
};

describe('CrbComplaintStatusType Service', () => {
  let service: CrbComplaintStatusTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrbComplaintStatusType | ICrbComplaintStatusType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrbComplaintStatusTypeService);
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

    it('should create a CrbComplaintStatusType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crbComplaintStatusType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crbComplaintStatusType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrbComplaintStatusType', () => {
      const crbComplaintStatusType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crbComplaintStatusType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrbComplaintStatusType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrbComplaintStatusType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrbComplaintStatusType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrbComplaintStatusTypeToCollectionIfMissing', () => {
      it('should add a CrbComplaintStatusType to an empty array', () => {
        const crbComplaintStatusType: ICrbComplaintStatusType = sampleWithRequiredData;
        expectedResult = service.addCrbComplaintStatusTypeToCollectionIfMissing([], crbComplaintStatusType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbComplaintStatusType);
      });

      it('should not add a CrbComplaintStatusType to an array that contains it', () => {
        const crbComplaintStatusType: ICrbComplaintStatusType = sampleWithRequiredData;
        const crbComplaintStatusTypeCollection: ICrbComplaintStatusType[] = [
          {
            ...crbComplaintStatusType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrbComplaintStatusTypeToCollectionIfMissing(crbComplaintStatusTypeCollection, crbComplaintStatusType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrbComplaintStatusType to an array that doesn't contain it", () => {
        const crbComplaintStatusType: ICrbComplaintStatusType = sampleWithRequiredData;
        const crbComplaintStatusTypeCollection: ICrbComplaintStatusType[] = [sampleWithPartialData];
        expectedResult = service.addCrbComplaintStatusTypeToCollectionIfMissing(crbComplaintStatusTypeCollection, crbComplaintStatusType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbComplaintStatusType);
      });

      it('should add only unique CrbComplaintStatusType to an array', () => {
        const crbComplaintStatusTypeArray: ICrbComplaintStatusType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crbComplaintStatusTypeCollection: ICrbComplaintStatusType[] = [sampleWithRequiredData];
        expectedResult = service.addCrbComplaintStatusTypeToCollectionIfMissing(
          crbComplaintStatusTypeCollection,
          ...crbComplaintStatusTypeArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crbComplaintStatusType: ICrbComplaintStatusType = sampleWithRequiredData;
        const crbComplaintStatusType2: ICrbComplaintStatusType = sampleWithPartialData;
        expectedResult = service.addCrbComplaintStatusTypeToCollectionIfMissing([], crbComplaintStatusType, crbComplaintStatusType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbComplaintStatusType);
        expect(expectedResult).toContain(crbComplaintStatusType2);
      });

      it('should accept null and undefined values', () => {
        const crbComplaintStatusType: ICrbComplaintStatusType = sampleWithRequiredData;
        expectedResult = service.addCrbComplaintStatusTypeToCollectionIfMissing([], null, crbComplaintStatusType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbComplaintStatusType);
      });

      it('should return initial array if no CrbComplaintStatusType is added', () => {
        const crbComplaintStatusTypeCollection: ICrbComplaintStatusType[] = [sampleWithRequiredData];
        expectedResult = service.addCrbComplaintStatusTypeToCollectionIfMissing(crbComplaintStatusTypeCollection, undefined, null);
        expect(expectedResult).toEqual(crbComplaintStatusTypeCollection);
      });
    });

    describe('compareCrbComplaintStatusType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrbComplaintStatusType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrbComplaintStatusType(entity1, entity2);
        const compareResult2 = service.compareCrbComplaintStatusType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrbComplaintStatusType(entity1, entity2);
        const compareResult2 = service.compareCrbComplaintStatusType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrbComplaintStatusType(entity1, entity2);
        const compareResult2 = service.compareCrbComplaintStatusType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

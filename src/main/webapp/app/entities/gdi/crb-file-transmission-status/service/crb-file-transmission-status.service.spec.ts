import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrbFileTransmissionStatus } from '../crb-file-transmission-status.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../crb-file-transmission-status.test-samples';

import { CrbFileTransmissionStatusService } from './crb-file-transmission-status.service';

const requireRestSample: ICrbFileTransmissionStatus = {
  ...sampleWithRequiredData,
};

describe('CrbFileTransmissionStatus Service', () => {
  let service: CrbFileTransmissionStatusService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrbFileTransmissionStatus | ICrbFileTransmissionStatus[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrbFileTransmissionStatusService);
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

    it('should create a CrbFileTransmissionStatus', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crbFileTransmissionStatus = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crbFileTransmissionStatus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrbFileTransmissionStatus', () => {
      const crbFileTransmissionStatus = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crbFileTransmissionStatus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrbFileTransmissionStatus', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrbFileTransmissionStatus', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrbFileTransmissionStatus', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrbFileTransmissionStatusToCollectionIfMissing', () => {
      it('should add a CrbFileTransmissionStatus to an empty array', () => {
        const crbFileTransmissionStatus: ICrbFileTransmissionStatus = sampleWithRequiredData;
        expectedResult = service.addCrbFileTransmissionStatusToCollectionIfMissing([], crbFileTransmissionStatus);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbFileTransmissionStatus);
      });

      it('should not add a CrbFileTransmissionStatus to an array that contains it', () => {
        const crbFileTransmissionStatus: ICrbFileTransmissionStatus = sampleWithRequiredData;
        const crbFileTransmissionStatusCollection: ICrbFileTransmissionStatus[] = [
          {
            ...crbFileTransmissionStatus,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrbFileTransmissionStatusToCollectionIfMissing(
          crbFileTransmissionStatusCollection,
          crbFileTransmissionStatus
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrbFileTransmissionStatus to an array that doesn't contain it", () => {
        const crbFileTransmissionStatus: ICrbFileTransmissionStatus = sampleWithRequiredData;
        const crbFileTransmissionStatusCollection: ICrbFileTransmissionStatus[] = [sampleWithPartialData];
        expectedResult = service.addCrbFileTransmissionStatusToCollectionIfMissing(
          crbFileTransmissionStatusCollection,
          crbFileTransmissionStatus
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbFileTransmissionStatus);
      });

      it('should add only unique CrbFileTransmissionStatus to an array', () => {
        const crbFileTransmissionStatusArray: ICrbFileTransmissionStatus[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const crbFileTransmissionStatusCollection: ICrbFileTransmissionStatus[] = [sampleWithRequiredData];
        expectedResult = service.addCrbFileTransmissionStatusToCollectionIfMissing(
          crbFileTransmissionStatusCollection,
          ...crbFileTransmissionStatusArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crbFileTransmissionStatus: ICrbFileTransmissionStatus = sampleWithRequiredData;
        const crbFileTransmissionStatus2: ICrbFileTransmissionStatus = sampleWithPartialData;
        expectedResult = service.addCrbFileTransmissionStatusToCollectionIfMissing(
          [],
          crbFileTransmissionStatus,
          crbFileTransmissionStatus2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbFileTransmissionStatus);
        expect(expectedResult).toContain(crbFileTransmissionStatus2);
      });

      it('should accept null and undefined values', () => {
        const crbFileTransmissionStatus: ICrbFileTransmissionStatus = sampleWithRequiredData;
        expectedResult = service.addCrbFileTransmissionStatusToCollectionIfMissing([], null, crbFileTransmissionStatus, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbFileTransmissionStatus);
      });

      it('should return initial array if no CrbFileTransmissionStatus is added', () => {
        const crbFileTransmissionStatusCollection: ICrbFileTransmissionStatus[] = [sampleWithRequiredData];
        expectedResult = service.addCrbFileTransmissionStatusToCollectionIfMissing(crbFileTransmissionStatusCollection, undefined, null);
        expect(expectedResult).toEqual(crbFileTransmissionStatusCollection);
      });
    });

    describe('compareCrbFileTransmissionStatus', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrbFileTransmissionStatus(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrbFileTransmissionStatus(entity1, entity2);
        const compareResult2 = service.compareCrbFileTransmissionStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrbFileTransmissionStatus(entity1, entity2);
        const compareResult2 = service.compareCrbFileTransmissionStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrbFileTransmissionStatus(entity1, entity2);
        const compareResult2 = service.compareCrbFileTransmissionStatus(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

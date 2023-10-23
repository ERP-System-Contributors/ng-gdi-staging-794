import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrbComplaintType } from '../crb-complaint-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../crb-complaint-type.test-samples';

import { CrbComplaintTypeService } from './crb-complaint-type.service';

const requireRestSample: ICrbComplaintType = {
  ...sampleWithRequiredData,
};

describe('CrbComplaintType Service', () => {
  let service: CrbComplaintTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrbComplaintType | ICrbComplaintType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrbComplaintTypeService);
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

    it('should create a CrbComplaintType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crbComplaintType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crbComplaintType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrbComplaintType', () => {
      const crbComplaintType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crbComplaintType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrbComplaintType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrbComplaintType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrbComplaintType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrbComplaintTypeToCollectionIfMissing', () => {
      it('should add a CrbComplaintType to an empty array', () => {
        const crbComplaintType: ICrbComplaintType = sampleWithRequiredData;
        expectedResult = service.addCrbComplaintTypeToCollectionIfMissing([], crbComplaintType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbComplaintType);
      });

      it('should not add a CrbComplaintType to an array that contains it', () => {
        const crbComplaintType: ICrbComplaintType = sampleWithRequiredData;
        const crbComplaintTypeCollection: ICrbComplaintType[] = [
          {
            ...crbComplaintType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrbComplaintTypeToCollectionIfMissing(crbComplaintTypeCollection, crbComplaintType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrbComplaintType to an array that doesn't contain it", () => {
        const crbComplaintType: ICrbComplaintType = sampleWithRequiredData;
        const crbComplaintTypeCollection: ICrbComplaintType[] = [sampleWithPartialData];
        expectedResult = service.addCrbComplaintTypeToCollectionIfMissing(crbComplaintTypeCollection, crbComplaintType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbComplaintType);
      });

      it('should add only unique CrbComplaintType to an array', () => {
        const crbComplaintTypeArray: ICrbComplaintType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crbComplaintTypeCollection: ICrbComplaintType[] = [sampleWithRequiredData];
        expectedResult = service.addCrbComplaintTypeToCollectionIfMissing(crbComplaintTypeCollection, ...crbComplaintTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crbComplaintType: ICrbComplaintType = sampleWithRequiredData;
        const crbComplaintType2: ICrbComplaintType = sampleWithPartialData;
        expectedResult = service.addCrbComplaintTypeToCollectionIfMissing([], crbComplaintType, crbComplaintType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbComplaintType);
        expect(expectedResult).toContain(crbComplaintType2);
      });

      it('should accept null and undefined values', () => {
        const crbComplaintType: ICrbComplaintType = sampleWithRequiredData;
        expectedResult = service.addCrbComplaintTypeToCollectionIfMissing([], null, crbComplaintType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbComplaintType);
      });

      it('should return initial array if no CrbComplaintType is added', () => {
        const crbComplaintTypeCollection: ICrbComplaintType[] = [sampleWithRequiredData];
        expectedResult = service.addCrbComplaintTypeToCollectionIfMissing(crbComplaintTypeCollection, undefined, null);
        expect(expectedResult).toEqual(crbComplaintTypeCollection);
      });
    });

    describe('compareCrbComplaintType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrbComplaintType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrbComplaintType(entity1, entity2);
        const compareResult2 = service.compareCrbComplaintType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrbComplaintType(entity1, entity2);
        const compareResult2 = service.compareCrbComplaintType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrbComplaintType(entity1, entity2);
        const compareResult2 = service.compareCrbComplaintType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

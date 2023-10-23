import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISourcesOfFundsTypeCode } from '../sources-of-funds-type-code.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../sources-of-funds-type-code.test-samples';

import { SourcesOfFundsTypeCodeService } from './sources-of-funds-type-code.service';

const requireRestSample: ISourcesOfFundsTypeCode = {
  ...sampleWithRequiredData,
};

describe('SourcesOfFundsTypeCode Service', () => {
  let service: SourcesOfFundsTypeCodeService;
  let httpMock: HttpTestingController;
  let expectedResult: ISourcesOfFundsTypeCode | ISourcesOfFundsTypeCode[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SourcesOfFundsTypeCodeService);
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

    it('should create a SourcesOfFundsTypeCode', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const sourcesOfFundsTypeCode = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(sourcesOfFundsTypeCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SourcesOfFundsTypeCode', () => {
      const sourcesOfFundsTypeCode = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(sourcesOfFundsTypeCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SourcesOfFundsTypeCode', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SourcesOfFundsTypeCode', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SourcesOfFundsTypeCode', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSourcesOfFundsTypeCodeToCollectionIfMissing', () => {
      it('should add a SourcesOfFundsTypeCode to an empty array', () => {
        const sourcesOfFundsTypeCode: ISourcesOfFundsTypeCode = sampleWithRequiredData;
        expectedResult = service.addSourcesOfFundsTypeCodeToCollectionIfMissing([], sourcesOfFundsTypeCode);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(sourcesOfFundsTypeCode);
      });

      it('should not add a SourcesOfFundsTypeCode to an array that contains it', () => {
        const sourcesOfFundsTypeCode: ISourcesOfFundsTypeCode = sampleWithRequiredData;
        const sourcesOfFundsTypeCodeCollection: ISourcesOfFundsTypeCode[] = [
          {
            ...sourcesOfFundsTypeCode,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSourcesOfFundsTypeCodeToCollectionIfMissing(sourcesOfFundsTypeCodeCollection, sourcesOfFundsTypeCode);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SourcesOfFundsTypeCode to an array that doesn't contain it", () => {
        const sourcesOfFundsTypeCode: ISourcesOfFundsTypeCode = sampleWithRequiredData;
        const sourcesOfFundsTypeCodeCollection: ISourcesOfFundsTypeCode[] = [sampleWithPartialData];
        expectedResult = service.addSourcesOfFundsTypeCodeToCollectionIfMissing(sourcesOfFundsTypeCodeCollection, sourcesOfFundsTypeCode);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(sourcesOfFundsTypeCode);
      });

      it('should add only unique SourcesOfFundsTypeCode to an array', () => {
        const sourcesOfFundsTypeCodeArray: ISourcesOfFundsTypeCode[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const sourcesOfFundsTypeCodeCollection: ISourcesOfFundsTypeCode[] = [sampleWithRequiredData];
        expectedResult = service.addSourcesOfFundsTypeCodeToCollectionIfMissing(
          sourcesOfFundsTypeCodeCollection,
          ...sourcesOfFundsTypeCodeArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const sourcesOfFundsTypeCode: ISourcesOfFundsTypeCode = sampleWithRequiredData;
        const sourcesOfFundsTypeCode2: ISourcesOfFundsTypeCode = sampleWithPartialData;
        expectedResult = service.addSourcesOfFundsTypeCodeToCollectionIfMissing([], sourcesOfFundsTypeCode, sourcesOfFundsTypeCode2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(sourcesOfFundsTypeCode);
        expect(expectedResult).toContain(sourcesOfFundsTypeCode2);
      });

      it('should accept null and undefined values', () => {
        const sourcesOfFundsTypeCode: ISourcesOfFundsTypeCode = sampleWithRequiredData;
        expectedResult = service.addSourcesOfFundsTypeCodeToCollectionIfMissing([], null, sourcesOfFundsTypeCode, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(sourcesOfFundsTypeCode);
      });

      it('should return initial array if no SourcesOfFundsTypeCode is added', () => {
        const sourcesOfFundsTypeCodeCollection: ISourcesOfFundsTypeCode[] = [sampleWithRequiredData];
        expectedResult = service.addSourcesOfFundsTypeCodeToCollectionIfMissing(sourcesOfFundsTypeCodeCollection, undefined, null);
        expect(expectedResult).toEqual(sourcesOfFundsTypeCodeCollection);
      });
    });

    describe('compareSourcesOfFundsTypeCode', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSourcesOfFundsTypeCode(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSourcesOfFundsTypeCode(entity1, entity2);
        const compareResult2 = service.compareSourcesOfFundsTypeCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSourcesOfFundsTypeCode(entity1, entity2);
        const compareResult2 = service.compareSourcesOfFundsTypeCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSourcesOfFundsTypeCode(entity1, entity2);
        const compareResult2 = service.compareSourcesOfFundsTypeCode(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

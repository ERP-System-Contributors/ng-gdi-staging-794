import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrbGlCode } from '../crb-gl-code.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../crb-gl-code.test-samples';

import { CrbGlCodeService } from './crb-gl-code.service';

const requireRestSample: ICrbGlCode = {
  ...sampleWithRequiredData,
};

describe('CrbGlCode Service', () => {
  let service: CrbGlCodeService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrbGlCode | ICrbGlCode[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrbGlCodeService);
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

    it('should create a CrbGlCode', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crbGlCode = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crbGlCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrbGlCode', () => {
      const crbGlCode = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crbGlCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrbGlCode', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrbGlCode', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrbGlCode', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrbGlCodeToCollectionIfMissing', () => {
      it('should add a CrbGlCode to an empty array', () => {
        const crbGlCode: ICrbGlCode = sampleWithRequiredData;
        expectedResult = service.addCrbGlCodeToCollectionIfMissing([], crbGlCode);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbGlCode);
      });

      it('should not add a CrbGlCode to an array that contains it', () => {
        const crbGlCode: ICrbGlCode = sampleWithRequiredData;
        const crbGlCodeCollection: ICrbGlCode[] = [
          {
            ...crbGlCode,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrbGlCodeToCollectionIfMissing(crbGlCodeCollection, crbGlCode);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrbGlCode to an array that doesn't contain it", () => {
        const crbGlCode: ICrbGlCode = sampleWithRequiredData;
        const crbGlCodeCollection: ICrbGlCode[] = [sampleWithPartialData];
        expectedResult = service.addCrbGlCodeToCollectionIfMissing(crbGlCodeCollection, crbGlCode);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbGlCode);
      });

      it('should add only unique CrbGlCode to an array', () => {
        const crbGlCodeArray: ICrbGlCode[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crbGlCodeCollection: ICrbGlCode[] = [sampleWithRequiredData];
        expectedResult = service.addCrbGlCodeToCollectionIfMissing(crbGlCodeCollection, ...crbGlCodeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crbGlCode: ICrbGlCode = sampleWithRequiredData;
        const crbGlCode2: ICrbGlCode = sampleWithPartialData;
        expectedResult = service.addCrbGlCodeToCollectionIfMissing([], crbGlCode, crbGlCode2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbGlCode);
        expect(expectedResult).toContain(crbGlCode2);
      });

      it('should accept null and undefined values', () => {
        const crbGlCode: ICrbGlCode = sampleWithRequiredData;
        expectedResult = service.addCrbGlCodeToCollectionIfMissing([], null, crbGlCode, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbGlCode);
      });

      it('should return initial array if no CrbGlCode is added', () => {
        const crbGlCodeCollection: ICrbGlCode[] = [sampleWithRequiredData];
        expectedResult = service.addCrbGlCodeToCollectionIfMissing(crbGlCodeCollection, undefined, null);
        expect(expectedResult).toEqual(crbGlCodeCollection);
      });
    });

    describe('compareCrbGlCode', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrbGlCode(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrbGlCode(entity1, entity2);
        const compareResult2 = service.compareCrbGlCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrbGlCode(entity1, entity2);
        const compareResult2 = service.compareCrbGlCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrbGlCode(entity1, entity2);
        const compareResult2 = service.compareCrbGlCode(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

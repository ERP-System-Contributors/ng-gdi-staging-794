import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrbReportViewBand } from '../crb-report-view-band.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../crb-report-view-band.test-samples';

import { CrbReportViewBandService } from './crb-report-view-band.service';

const requireRestSample: ICrbReportViewBand = {
  ...sampleWithRequiredData,
};

describe('CrbReportViewBand Service', () => {
  let service: CrbReportViewBandService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrbReportViewBand | ICrbReportViewBand[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrbReportViewBandService);
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

    it('should create a CrbReportViewBand', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crbReportViewBand = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crbReportViewBand).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrbReportViewBand', () => {
      const crbReportViewBand = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crbReportViewBand).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrbReportViewBand', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrbReportViewBand', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrbReportViewBand', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrbReportViewBandToCollectionIfMissing', () => {
      it('should add a CrbReportViewBand to an empty array', () => {
        const crbReportViewBand: ICrbReportViewBand = sampleWithRequiredData;
        expectedResult = service.addCrbReportViewBandToCollectionIfMissing([], crbReportViewBand);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbReportViewBand);
      });

      it('should not add a CrbReportViewBand to an array that contains it', () => {
        const crbReportViewBand: ICrbReportViewBand = sampleWithRequiredData;
        const crbReportViewBandCollection: ICrbReportViewBand[] = [
          {
            ...crbReportViewBand,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrbReportViewBandToCollectionIfMissing(crbReportViewBandCollection, crbReportViewBand);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrbReportViewBand to an array that doesn't contain it", () => {
        const crbReportViewBand: ICrbReportViewBand = sampleWithRequiredData;
        const crbReportViewBandCollection: ICrbReportViewBand[] = [sampleWithPartialData];
        expectedResult = service.addCrbReportViewBandToCollectionIfMissing(crbReportViewBandCollection, crbReportViewBand);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbReportViewBand);
      });

      it('should add only unique CrbReportViewBand to an array', () => {
        const crbReportViewBandArray: ICrbReportViewBand[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crbReportViewBandCollection: ICrbReportViewBand[] = [sampleWithRequiredData];
        expectedResult = service.addCrbReportViewBandToCollectionIfMissing(crbReportViewBandCollection, ...crbReportViewBandArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crbReportViewBand: ICrbReportViewBand = sampleWithRequiredData;
        const crbReportViewBand2: ICrbReportViewBand = sampleWithPartialData;
        expectedResult = service.addCrbReportViewBandToCollectionIfMissing([], crbReportViewBand, crbReportViewBand2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbReportViewBand);
        expect(expectedResult).toContain(crbReportViewBand2);
      });

      it('should accept null and undefined values', () => {
        const crbReportViewBand: ICrbReportViewBand = sampleWithRequiredData;
        expectedResult = service.addCrbReportViewBandToCollectionIfMissing([], null, crbReportViewBand, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbReportViewBand);
      });

      it('should return initial array if no CrbReportViewBand is added', () => {
        const crbReportViewBandCollection: ICrbReportViewBand[] = [sampleWithRequiredData];
        expectedResult = service.addCrbReportViewBandToCollectionIfMissing(crbReportViewBandCollection, undefined, null);
        expect(expectedResult).toEqual(crbReportViewBandCollection);
      });
    });

    describe('compareCrbReportViewBand', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrbReportViewBand(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrbReportViewBand(entity1, entity2);
        const compareResult2 = service.compareCrbReportViewBand(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrbReportViewBand(entity1, entity2);
        const compareResult2 = service.compareCrbReportViewBand(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrbReportViewBand(entity1, entity2);
        const compareResult2 = service.compareCrbReportViewBand(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

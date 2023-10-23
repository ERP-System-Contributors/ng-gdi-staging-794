import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IChartOfAccountsCode } from '../chart-of-accounts-code.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../chart-of-accounts-code.test-samples';

import { ChartOfAccountsCodeService } from './chart-of-accounts-code.service';

const requireRestSample: IChartOfAccountsCode = {
  ...sampleWithRequiredData,
};

describe('ChartOfAccountsCode Service', () => {
  let service: ChartOfAccountsCodeService;
  let httpMock: HttpTestingController;
  let expectedResult: IChartOfAccountsCode | IChartOfAccountsCode[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ChartOfAccountsCodeService);
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

    it('should create a ChartOfAccountsCode', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const chartOfAccountsCode = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(chartOfAccountsCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ChartOfAccountsCode', () => {
      const chartOfAccountsCode = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(chartOfAccountsCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ChartOfAccountsCode', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ChartOfAccountsCode', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ChartOfAccountsCode', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addChartOfAccountsCodeToCollectionIfMissing', () => {
      it('should add a ChartOfAccountsCode to an empty array', () => {
        const chartOfAccountsCode: IChartOfAccountsCode = sampleWithRequiredData;
        expectedResult = service.addChartOfAccountsCodeToCollectionIfMissing([], chartOfAccountsCode);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(chartOfAccountsCode);
      });

      it('should not add a ChartOfAccountsCode to an array that contains it', () => {
        const chartOfAccountsCode: IChartOfAccountsCode = sampleWithRequiredData;
        const chartOfAccountsCodeCollection: IChartOfAccountsCode[] = [
          {
            ...chartOfAccountsCode,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addChartOfAccountsCodeToCollectionIfMissing(chartOfAccountsCodeCollection, chartOfAccountsCode);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ChartOfAccountsCode to an array that doesn't contain it", () => {
        const chartOfAccountsCode: IChartOfAccountsCode = sampleWithRequiredData;
        const chartOfAccountsCodeCollection: IChartOfAccountsCode[] = [sampleWithPartialData];
        expectedResult = service.addChartOfAccountsCodeToCollectionIfMissing(chartOfAccountsCodeCollection, chartOfAccountsCode);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(chartOfAccountsCode);
      });

      it('should add only unique ChartOfAccountsCode to an array', () => {
        const chartOfAccountsCodeArray: IChartOfAccountsCode[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const chartOfAccountsCodeCollection: IChartOfAccountsCode[] = [sampleWithRequiredData];
        expectedResult = service.addChartOfAccountsCodeToCollectionIfMissing(chartOfAccountsCodeCollection, ...chartOfAccountsCodeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const chartOfAccountsCode: IChartOfAccountsCode = sampleWithRequiredData;
        const chartOfAccountsCode2: IChartOfAccountsCode = sampleWithPartialData;
        expectedResult = service.addChartOfAccountsCodeToCollectionIfMissing([], chartOfAccountsCode, chartOfAccountsCode2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(chartOfAccountsCode);
        expect(expectedResult).toContain(chartOfAccountsCode2);
      });

      it('should accept null and undefined values', () => {
        const chartOfAccountsCode: IChartOfAccountsCode = sampleWithRequiredData;
        expectedResult = service.addChartOfAccountsCodeToCollectionIfMissing([], null, chartOfAccountsCode, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(chartOfAccountsCode);
      });

      it('should return initial array if no ChartOfAccountsCode is added', () => {
        const chartOfAccountsCodeCollection: IChartOfAccountsCode[] = [sampleWithRequiredData];
        expectedResult = service.addChartOfAccountsCodeToCollectionIfMissing(chartOfAccountsCodeCollection, undefined, null);
        expect(expectedResult).toEqual(chartOfAccountsCodeCollection);
      });
    });

    describe('compareChartOfAccountsCode', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareChartOfAccountsCode(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareChartOfAccountsCode(entity1, entity2);
        const compareResult2 = service.compareChartOfAccountsCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareChartOfAccountsCode(entity1, entity2);
        const compareResult2 = service.compareChartOfAccountsCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareChartOfAccountsCode(entity1, entity2);
        const compareResult2 = service.compareChartOfAccountsCode(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

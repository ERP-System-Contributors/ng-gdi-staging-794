import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFinancialDerivativeTypeCode } from '../financial-derivative-type-code.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../financial-derivative-type-code.test-samples';

import { FinancialDerivativeTypeCodeService } from './financial-derivative-type-code.service';

const requireRestSample: IFinancialDerivativeTypeCode = {
  ...sampleWithRequiredData,
};

describe('FinancialDerivativeTypeCode Service', () => {
  let service: FinancialDerivativeTypeCodeService;
  let httpMock: HttpTestingController;
  let expectedResult: IFinancialDerivativeTypeCode | IFinancialDerivativeTypeCode[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FinancialDerivativeTypeCodeService);
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

    it('should create a FinancialDerivativeTypeCode', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const financialDerivativeTypeCode = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(financialDerivativeTypeCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FinancialDerivativeTypeCode', () => {
      const financialDerivativeTypeCode = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(financialDerivativeTypeCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FinancialDerivativeTypeCode', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FinancialDerivativeTypeCode', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FinancialDerivativeTypeCode', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFinancialDerivativeTypeCodeToCollectionIfMissing', () => {
      it('should add a FinancialDerivativeTypeCode to an empty array', () => {
        const financialDerivativeTypeCode: IFinancialDerivativeTypeCode = sampleWithRequiredData;
        expectedResult = service.addFinancialDerivativeTypeCodeToCollectionIfMissing([], financialDerivativeTypeCode);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(financialDerivativeTypeCode);
      });

      it('should not add a FinancialDerivativeTypeCode to an array that contains it', () => {
        const financialDerivativeTypeCode: IFinancialDerivativeTypeCode = sampleWithRequiredData;
        const financialDerivativeTypeCodeCollection: IFinancialDerivativeTypeCode[] = [
          {
            ...financialDerivativeTypeCode,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFinancialDerivativeTypeCodeToCollectionIfMissing(
          financialDerivativeTypeCodeCollection,
          financialDerivativeTypeCode
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FinancialDerivativeTypeCode to an array that doesn't contain it", () => {
        const financialDerivativeTypeCode: IFinancialDerivativeTypeCode = sampleWithRequiredData;
        const financialDerivativeTypeCodeCollection: IFinancialDerivativeTypeCode[] = [sampleWithPartialData];
        expectedResult = service.addFinancialDerivativeTypeCodeToCollectionIfMissing(
          financialDerivativeTypeCodeCollection,
          financialDerivativeTypeCode
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(financialDerivativeTypeCode);
      });

      it('should add only unique FinancialDerivativeTypeCode to an array', () => {
        const financialDerivativeTypeCodeArray: IFinancialDerivativeTypeCode[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const financialDerivativeTypeCodeCollection: IFinancialDerivativeTypeCode[] = [sampleWithRequiredData];
        expectedResult = service.addFinancialDerivativeTypeCodeToCollectionIfMissing(
          financialDerivativeTypeCodeCollection,
          ...financialDerivativeTypeCodeArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const financialDerivativeTypeCode: IFinancialDerivativeTypeCode = sampleWithRequiredData;
        const financialDerivativeTypeCode2: IFinancialDerivativeTypeCode = sampleWithPartialData;
        expectedResult = service.addFinancialDerivativeTypeCodeToCollectionIfMissing(
          [],
          financialDerivativeTypeCode,
          financialDerivativeTypeCode2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(financialDerivativeTypeCode);
        expect(expectedResult).toContain(financialDerivativeTypeCode2);
      });

      it('should accept null and undefined values', () => {
        const financialDerivativeTypeCode: IFinancialDerivativeTypeCode = sampleWithRequiredData;
        expectedResult = service.addFinancialDerivativeTypeCodeToCollectionIfMissing([], null, financialDerivativeTypeCode, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(financialDerivativeTypeCode);
      });

      it('should return initial array if no FinancialDerivativeTypeCode is added', () => {
        const financialDerivativeTypeCodeCollection: IFinancialDerivativeTypeCode[] = [sampleWithRequiredData];
        expectedResult = service.addFinancialDerivativeTypeCodeToCollectionIfMissing(
          financialDerivativeTypeCodeCollection,
          undefined,
          null
        );
        expect(expectedResult).toEqual(financialDerivativeTypeCodeCollection);
      });
    });

    describe('compareFinancialDerivativeTypeCode', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFinancialDerivativeTypeCode(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFinancialDerivativeTypeCode(entity1, entity2);
        const compareResult2 = service.compareFinancialDerivativeTypeCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFinancialDerivativeTypeCode(entity1, entity2);
        const compareResult2 = service.compareFinancialDerivativeTypeCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFinancialDerivativeTypeCode(entity1, entity2);
        const compareResult2 = service.compareFinancialDerivativeTypeCode(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

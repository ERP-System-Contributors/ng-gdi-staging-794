import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IIsoCurrencyCode } from '../iso-currency-code.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../iso-currency-code.test-samples';

import { IsoCurrencyCodeService } from './iso-currency-code.service';

const requireRestSample: IIsoCurrencyCode = {
  ...sampleWithRequiredData,
};

describe('IsoCurrencyCode Service', () => {
  let service: IsoCurrencyCodeService;
  let httpMock: HttpTestingController;
  let expectedResult: IIsoCurrencyCode | IIsoCurrencyCode[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(IsoCurrencyCodeService);
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

    it('should create a IsoCurrencyCode', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const isoCurrencyCode = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(isoCurrencyCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a IsoCurrencyCode', () => {
      const isoCurrencyCode = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(isoCurrencyCode).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a IsoCurrencyCode', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of IsoCurrencyCode', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a IsoCurrencyCode', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addIsoCurrencyCodeToCollectionIfMissing', () => {
      it('should add a IsoCurrencyCode to an empty array', () => {
        const isoCurrencyCode: IIsoCurrencyCode = sampleWithRequiredData;
        expectedResult = service.addIsoCurrencyCodeToCollectionIfMissing([], isoCurrencyCode);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(isoCurrencyCode);
      });

      it('should not add a IsoCurrencyCode to an array that contains it', () => {
        const isoCurrencyCode: IIsoCurrencyCode = sampleWithRequiredData;
        const isoCurrencyCodeCollection: IIsoCurrencyCode[] = [
          {
            ...isoCurrencyCode,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addIsoCurrencyCodeToCollectionIfMissing(isoCurrencyCodeCollection, isoCurrencyCode);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a IsoCurrencyCode to an array that doesn't contain it", () => {
        const isoCurrencyCode: IIsoCurrencyCode = sampleWithRequiredData;
        const isoCurrencyCodeCollection: IIsoCurrencyCode[] = [sampleWithPartialData];
        expectedResult = service.addIsoCurrencyCodeToCollectionIfMissing(isoCurrencyCodeCollection, isoCurrencyCode);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(isoCurrencyCode);
      });

      it('should add only unique IsoCurrencyCode to an array', () => {
        const isoCurrencyCodeArray: IIsoCurrencyCode[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const isoCurrencyCodeCollection: IIsoCurrencyCode[] = [sampleWithRequiredData];
        expectedResult = service.addIsoCurrencyCodeToCollectionIfMissing(isoCurrencyCodeCollection, ...isoCurrencyCodeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const isoCurrencyCode: IIsoCurrencyCode = sampleWithRequiredData;
        const isoCurrencyCode2: IIsoCurrencyCode = sampleWithPartialData;
        expectedResult = service.addIsoCurrencyCodeToCollectionIfMissing([], isoCurrencyCode, isoCurrencyCode2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(isoCurrencyCode);
        expect(expectedResult).toContain(isoCurrencyCode2);
      });

      it('should accept null and undefined values', () => {
        const isoCurrencyCode: IIsoCurrencyCode = sampleWithRequiredData;
        expectedResult = service.addIsoCurrencyCodeToCollectionIfMissing([], null, isoCurrencyCode, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(isoCurrencyCode);
      });

      it('should return initial array if no IsoCurrencyCode is added', () => {
        const isoCurrencyCodeCollection: IIsoCurrencyCode[] = [sampleWithRequiredData];
        expectedResult = service.addIsoCurrencyCodeToCollectionIfMissing(isoCurrencyCodeCollection, undefined, null);
        expect(expectedResult).toEqual(isoCurrencyCodeCollection);
      });
    });

    describe('compareIsoCurrencyCode', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareIsoCurrencyCode(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareIsoCurrencyCode(entity1, entity2);
        const compareResult2 = service.compareIsoCurrencyCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareIsoCurrencyCode(entity1, entity2);
        const compareResult2 = service.compareIsoCurrencyCode(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareIsoCurrencyCode(entity1, entity2);
        const compareResult2 = service.compareIsoCurrencyCode(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

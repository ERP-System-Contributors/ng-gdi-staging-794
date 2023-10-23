import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrbAmountCategoryBand } from '../crb-amount-category-band.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../crb-amount-category-band.test-samples';

import { CrbAmountCategoryBandService } from './crb-amount-category-band.service';

const requireRestSample: ICrbAmountCategoryBand = {
  ...sampleWithRequiredData,
};

describe('CrbAmountCategoryBand Service', () => {
  let service: CrbAmountCategoryBandService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrbAmountCategoryBand | ICrbAmountCategoryBand[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrbAmountCategoryBandService);
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

    it('should create a CrbAmountCategoryBand', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crbAmountCategoryBand = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crbAmountCategoryBand).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrbAmountCategoryBand', () => {
      const crbAmountCategoryBand = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crbAmountCategoryBand).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrbAmountCategoryBand', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrbAmountCategoryBand', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrbAmountCategoryBand', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrbAmountCategoryBandToCollectionIfMissing', () => {
      it('should add a CrbAmountCategoryBand to an empty array', () => {
        const crbAmountCategoryBand: ICrbAmountCategoryBand = sampleWithRequiredData;
        expectedResult = service.addCrbAmountCategoryBandToCollectionIfMissing([], crbAmountCategoryBand);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbAmountCategoryBand);
      });

      it('should not add a CrbAmountCategoryBand to an array that contains it', () => {
        const crbAmountCategoryBand: ICrbAmountCategoryBand = sampleWithRequiredData;
        const crbAmountCategoryBandCollection: ICrbAmountCategoryBand[] = [
          {
            ...crbAmountCategoryBand,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrbAmountCategoryBandToCollectionIfMissing(crbAmountCategoryBandCollection, crbAmountCategoryBand);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrbAmountCategoryBand to an array that doesn't contain it", () => {
        const crbAmountCategoryBand: ICrbAmountCategoryBand = sampleWithRequiredData;
        const crbAmountCategoryBandCollection: ICrbAmountCategoryBand[] = [sampleWithPartialData];
        expectedResult = service.addCrbAmountCategoryBandToCollectionIfMissing(crbAmountCategoryBandCollection, crbAmountCategoryBand);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbAmountCategoryBand);
      });

      it('should add only unique CrbAmountCategoryBand to an array', () => {
        const crbAmountCategoryBandArray: ICrbAmountCategoryBand[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crbAmountCategoryBandCollection: ICrbAmountCategoryBand[] = [sampleWithRequiredData];
        expectedResult = service.addCrbAmountCategoryBandToCollectionIfMissing(
          crbAmountCategoryBandCollection,
          ...crbAmountCategoryBandArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crbAmountCategoryBand: ICrbAmountCategoryBand = sampleWithRequiredData;
        const crbAmountCategoryBand2: ICrbAmountCategoryBand = sampleWithPartialData;
        expectedResult = service.addCrbAmountCategoryBandToCollectionIfMissing([], crbAmountCategoryBand, crbAmountCategoryBand2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbAmountCategoryBand);
        expect(expectedResult).toContain(crbAmountCategoryBand2);
      });

      it('should accept null and undefined values', () => {
        const crbAmountCategoryBand: ICrbAmountCategoryBand = sampleWithRequiredData;
        expectedResult = service.addCrbAmountCategoryBandToCollectionIfMissing([], null, crbAmountCategoryBand, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbAmountCategoryBand);
      });

      it('should return initial array if no CrbAmountCategoryBand is added', () => {
        const crbAmountCategoryBandCollection: ICrbAmountCategoryBand[] = [sampleWithRequiredData];
        expectedResult = service.addCrbAmountCategoryBandToCollectionIfMissing(crbAmountCategoryBandCollection, undefined, null);
        expect(expectedResult).toEqual(crbAmountCategoryBandCollection);
      });
    });

    describe('compareCrbAmountCategoryBand', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrbAmountCategoryBand(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrbAmountCategoryBand(entity1, entity2);
        const compareResult2 = service.compareCrbAmountCategoryBand(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrbAmountCategoryBand(entity1, entity2);
        const compareResult2 = service.compareCrbAmountCategoryBand(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrbAmountCategoryBand(entity1, entity2);
        const compareResult2 = service.compareCrbAmountCategoryBand(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

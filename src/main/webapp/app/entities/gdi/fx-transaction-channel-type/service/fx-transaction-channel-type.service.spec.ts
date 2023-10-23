import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFxTransactionChannelType } from '../fx-transaction-channel-type.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../fx-transaction-channel-type.test-samples';

import { FxTransactionChannelTypeService } from './fx-transaction-channel-type.service';

const requireRestSample: IFxTransactionChannelType = {
  ...sampleWithRequiredData,
};

describe('FxTransactionChannelType Service', () => {
  let service: FxTransactionChannelTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IFxTransactionChannelType | IFxTransactionChannelType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FxTransactionChannelTypeService);
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

    it('should create a FxTransactionChannelType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const fxTransactionChannelType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(fxTransactionChannelType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FxTransactionChannelType', () => {
      const fxTransactionChannelType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(fxTransactionChannelType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FxTransactionChannelType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FxTransactionChannelType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FxTransactionChannelType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFxTransactionChannelTypeToCollectionIfMissing', () => {
      it('should add a FxTransactionChannelType to an empty array', () => {
        const fxTransactionChannelType: IFxTransactionChannelType = sampleWithRequiredData;
        expectedResult = service.addFxTransactionChannelTypeToCollectionIfMissing([], fxTransactionChannelType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fxTransactionChannelType);
      });

      it('should not add a FxTransactionChannelType to an array that contains it', () => {
        const fxTransactionChannelType: IFxTransactionChannelType = sampleWithRequiredData;
        const fxTransactionChannelTypeCollection: IFxTransactionChannelType[] = [
          {
            ...fxTransactionChannelType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFxTransactionChannelTypeToCollectionIfMissing(
          fxTransactionChannelTypeCollection,
          fxTransactionChannelType
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FxTransactionChannelType to an array that doesn't contain it", () => {
        const fxTransactionChannelType: IFxTransactionChannelType = sampleWithRequiredData;
        const fxTransactionChannelTypeCollection: IFxTransactionChannelType[] = [sampleWithPartialData];
        expectedResult = service.addFxTransactionChannelTypeToCollectionIfMissing(
          fxTransactionChannelTypeCollection,
          fxTransactionChannelType
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fxTransactionChannelType);
      });

      it('should add only unique FxTransactionChannelType to an array', () => {
        const fxTransactionChannelTypeArray: IFxTransactionChannelType[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const fxTransactionChannelTypeCollection: IFxTransactionChannelType[] = [sampleWithRequiredData];
        expectedResult = service.addFxTransactionChannelTypeToCollectionIfMissing(
          fxTransactionChannelTypeCollection,
          ...fxTransactionChannelTypeArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const fxTransactionChannelType: IFxTransactionChannelType = sampleWithRequiredData;
        const fxTransactionChannelType2: IFxTransactionChannelType = sampleWithPartialData;
        expectedResult = service.addFxTransactionChannelTypeToCollectionIfMissing([], fxTransactionChannelType, fxTransactionChannelType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fxTransactionChannelType);
        expect(expectedResult).toContain(fxTransactionChannelType2);
      });

      it('should accept null and undefined values', () => {
        const fxTransactionChannelType: IFxTransactionChannelType = sampleWithRequiredData;
        expectedResult = service.addFxTransactionChannelTypeToCollectionIfMissing([], null, fxTransactionChannelType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fxTransactionChannelType);
      });

      it('should return initial array if no FxTransactionChannelType is added', () => {
        const fxTransactionChannelTypeCollection: IFxTransactionChannelType[] = [sampleWithRequiredData];
        expectedResult = service.addFxTransactionChannelTypeToCollectionIfMissing(fxTransactionChannelTypeCollection, undefined, null);
        expect(expectedResult).toEqual(fxTransactionChannelTypeCollection);
      });
    });

    describe('compareFxTransactionChannelType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFxTransactionChannelType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFxTransactionChannelType(entity1, entity2);
        const compareResult2 = service.compareFxTransactionChannelType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFxTransactionChannelType(entity1, entity2);
        const compareResult2 = service.compareFxTransactionChannelType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFxTransactionChannelType(entity1, entity2);
        const compareResult2 = service.compareFxTransactionChannelType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

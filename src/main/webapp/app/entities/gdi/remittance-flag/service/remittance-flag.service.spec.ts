import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRemittanceFlag } from '../remittance-flag.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../remittance-flag.test-samples';

import { RemittanceFlagService } from './remittance-flag.service';

const requireRestSample: IRemittanceFlag = {
  ...sampleWithRequiredData,
};

describe('RemittanceFlag Service', () => {
  let service: RemittanceFlagService;
  let httpMock: HttpTestingController;
  let expectedResult: IRemittanceFlag | IRemittanceFlag[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RemittanceFlagService);
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

    it('should create a RemittanceFlag', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const remittanceFlag = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(remittanceFlag).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a RemittanceFlag', () => {
      const remittanceFlag = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(remittanceFlag).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a RemittanceFlag', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of RemittanceFlag', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a RemittanceFlag', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addRemittanceFlagToCollectionIfMissing', () => {
      it('should add a RemittanceFlag to an empty array', () => {
        const remittanceFlag: IRemittanceFlag = sampleWithRequiredData;
        expectedResult = service.addRemittanceFlagToCollectionIfMissing([], remittanceFlag);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(remittanceFlag);
      });

      it('should not add a RemittanceFlag to an array that contains it', () => {
        const remittanceFlag: IRemittanceFlag = sampleWithRequiredData;
        const remittanceFlagCollection: IRemittanceFlag[] = [
          {
            ...remittanceFlag,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addRemittanceFlagToCollectionIfMissing(remittanceFlagCollection, remittanceFlag);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a RemittanceFlag to an array that doesn't contain it", () => {
        const remittanceFlag: IRemittanceFlag = sampleWithRequiredData;
        const remittanceFlagCollection: IRemittanceFlag[] = [sampleWithPartialData];
        expectedResult = service.addRemittanceFlagToCollectionIfMissing(remittanceFlagCollection, remittanceFlag);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(remittanceFlag);
      });

      it('should add only unique RemittanceFlag to an array', () => {
        const remittanceFlagArray: IRemittanceFlag[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const remittanceFlagCollection: IRemittanceFlag[] = [sampleWithRequiredData];
        expectedResult = service.addRemittanceFlagToCollectionIfMissing(remittanceFlagCollection, ...remittanceFlagArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const remittanceFlag: IRemittanceFlag = sampleWithRequiredData;
        const remittanceFlag2: IRemittanceFlag = sampleWithPartialData;
        expectedResult = service.addRemittanceFlagToCollectionIfMissing([], remittanceFlag, remittanceFlag2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(remittanceFlag);
        expect(expectedResult).toContain(remittanceFlag2);
      });

      it('should accept null and undefined values', () => {
        const remittanceFlag: IRemittanceFlag = sampleWithRequiredData;
        expectedResult = service.addRemittanceFlagToCollectionIfMissing([], null, remittanceFlag, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(remittanceFlag);
      });

      it('should return initial array if no RemittanceFlag is added', () => {
        const remittanceFlagCollection: IRemittanceFlag[] = [sampleWithRequiredData];
        expectedResult = service.addRemittanceFlagToCollectionIfMissing(remittanceFlagCollection, undefined, null);
        expect(expectedResult).toEqual(remittanceFlagCollection);
      });
    });

    describe('compareRemittanceFlag', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareRemittanceFlag(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareRemittanceFlag(entity1, entity2);
        const compareResult2 = service.compareRemittanceFlag(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareRemittanceFlag(entity1, entity2);
        const compareResult2 = service.compareRemittanceFlag(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareRemittanceFlag(entity1, entity2);
        const compareResult2 = service.compareRemittanceFlag(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

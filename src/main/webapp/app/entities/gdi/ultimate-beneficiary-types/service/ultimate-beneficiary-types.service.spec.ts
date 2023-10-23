import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IUltimateBeneficiaryTypes } from '../ultimate-beneficiary-types.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../ultimate-beneficiary-types.test-samples';

import { UltimateBeneficiaryTypesService } from './ultimate-beneficiary-types.service';

const requireRestSample: IUltimateBeneficiaryTypes = {
  ...sampleWithRequiredData,
};

describe('UltimateBeneficiaryTypes Service', () => {
  let service: UltimateBeneficiaryTypesService;
  let httpMock: HttpTestingController;
  let expectedResult: IUltimateBeneficiaryTypes | IUltimateBeneficiaryTypes[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(UltimateBeneficiaryTypesService);
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

    it('should create a UltimateBeneficiaryTypes', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const ultimateBeneficiaryTypes = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(ultimateBeneficiaryTypes).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a UltimateBeneficiaryTypes', () => {
      const ultimateBeneficiaryTypes = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(ultimateBeneficiaryTypes).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a UltimateBeneficiaryTypes', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of UltimateBeneficiaryTypes', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a UltimateBeneficiaryTypes', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addUltimateBeneficiaryTypesToCollectionIfMissing', () => {
      it('should add a UltimateBeneficiaryTypes to an empty array', () => {
        const ultimateBeneficiaryTypes: IUltimateBeneficiaryTypes = sampleWithRequiredData;
        expectedResult = service.addUltimateBeneficiaryTypesToCollectionIfMissing([], ultimateBeneficiaryTypes);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ultimateBeneficiaryTypes);
      });

      it('should not add a UltimateBeneficiaryTypes to an array that contains it', () => {
        const ultimateBeneficiaryTypes: IUltimateBeneficiaryTypes = sampleWithRequiredData;
        const ultimateBeneficiaryTypesCollection: IUltimateBeneficiaryTypes[] = [
          {
            ...ultimateBeneficiaryTypes,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addUltimateBeneficiaryTypesToCollectionIfMissing(
          ultimateBeneficiaryTypesCollection,
          ultimateBeneficiaryTypes
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a UltimateBeneficiaryTypes to an array that doesn't contain it", () => {
        const ultimateBeneficiaryTypes: IUltimateBeneficiaryTypes = sampleWithRequiredData;
        const ultimateBeneficiaryTypesCollection: IUltimateBeneficiaryTypes[] = [sampleWithPartialData];
        expectedResult = service.addUltimateBeneficiaryTypesToCollectionIfMissing(
          ultimateBeneficiaryTypesCollection,
          ultimateBeneficiaryTypes
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ultimateBeneficiaryTypes);
      });

      it('should add only unique UltimateBeneficiaryTypes to an array', () => {
        const ultimateBeneficiaryTypesArray: IUltimateBeneficiaryTypes[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const ultimateBeneficiaryTypesCollection: IUltimateBeneficiaryTypes[] = [sampleWithRequiredData];
        expectedResult = service.addUltimateBeneficiaryTypesToCollectionIfMissing(
          ultimateBeneficiaryTypesCollection,
          ...ultimateBeneficiaryTypesArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const ultimateBeneficiaryTypes: IUltimateBeneficiaryTypes = sampleWithRequiredData;
        const ultimateBeneficiaryTypes2: IUltimateBeneficiaryTypes = sampleWithPartialData;
        expectedResult = service.addUltimateBeneficiaryTypesToCollectionIfMissing([], ultimateBeneficiaryTypes, ultimateBeneficiaryTypes2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ultimateBeneficiaryTypes);
        expect(expectedResult).toContain(ultimateBeneficiaryTypes2);
      });

      it('should accept null and undefined values', () => {
        const ultimateBeneficiaryTypes: IUltimateBeneficiaryTypes = sampleWithRequiredData;
        expectedResult = service.addUltimateBeneficiaryTypesToCollectionIfMissing([], null, ultimateBeneficiaryTypes, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ultimateBeneficiaryTypes);
      });

      it('should return initial array if no UltimateBeneficiaryTypes is added', () => {
        const ultimateBeneficiaryTypesCollection: IUltimateBeneficiaryTypes[] = [sampleWithRequiredData];
        expectedResult = service.addUltimateBeneficiaryTypesToCollectionIfMissing(ultimateBeneficiaryTypesCollection, undefined, null);
        expect(expectedResult).toEqual(ultimateBeneficiaryTypesCollection);
      });
    });

    describe('compareUltimateBeneficiaryTypes', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareUltimateBeneficiaryTypes(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareUltimateBeneficiaryTypes(entity1, entity2);
        const compareResult2 = service.compareUltimateBeneficiaryTypes(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareUltimateBeneficiaryTypes(entity1, entity2);
        const compareResult2 = service.compareUltimateBeneficiaryTypes(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareUltimateBeneficiaryTypes(entity1, entity2);
        const compareResult2 = service.compareUltimateBeneficiaryTypes(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

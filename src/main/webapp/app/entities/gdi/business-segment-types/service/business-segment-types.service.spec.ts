import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IBusinessSegmentTypes } from '../business-segment-types.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../business-segment-types.test-samples';

import { BusinessSegmentTypesService } from './business-segment-types.service';

const requireRestSample: IBusinessSegmentTypes = {
  ...sampleWithRequiredData,
};

describe('BusinessSegmentTypes Service', () => {
  let service: BusinessSegmentTypesService;
  let httpMock: HttpTestingController;
  let expectedResult: IBusinessSegmentTypes | IBusinessSegmentTypes[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(BusinessSegmentTypesService);
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

    it('should create a BusinessSegmentTypes', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const businessSegmentTypes = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(businessSegmentTypes).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a BusinessSegmentTypes', () => {
      const businessSegmentTypes = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(businessSegmentTypes).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a BusinessSegmentTypes', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of BusinessSegmentTypes', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a BusinessSegmentTypes', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addBusinessSegmentTypesToCollectionIfMissing', () => {
      it('should add a BusinessSegmentTypes to an empty array', () => {
        const businessSegmentTypes: IBusinessSegmentTypes = sampleWithRequiredData;
        expectedResult = service.addBusinessSegmentTypesToCollectionIfMissing([], businessSegmentTypes);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(businessSegmentTypes);
      });

      it('should not add a BusinessSegmentTypes to an array that contains it', () => {
        const businessSegmentTypes: IBusinessSegmentTypes = sampleWithRequiredData;
        const businessSegmentTypesCollection: IBusinessSegmentTypes[] = [
          {
            ...businessSegmentTypes,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addBusinessSegmentTypesToCollectionIfMissing(businessSegmentTypesCollection, businessSegmentTypes);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a BusinessSegmentTypes to an array that doesn't contain it", () => {
        const businessSegmentTypes: IBusinessSegmentTypes = sampleWithRequiredData;
        const businessSegmentTypesCollection: IBusinessSegmentTypes[] = [sampleWithPartialData];
        expectedResult = service.addBusinessSegmentTypesToCollectionIfMissing(businessSegmentTypesCollection, businessSegmentTypes);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(businessSegmentTypes);
      });

      it('should add only unique BusinessSegmentTypes to an array', () => {
        const businessSegmentTypesArray: IBusinessSegmentTypes[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const businessSegmentTypesCollection: IBusinessSegmentTypes[] = [sampleWithRequiredData];
        expectedResult = service.addBusinessSegmentTypesToCollectionIfMissing(businessSegmentTypesCollection, ...businessSegmentTypesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const businessSegmentTypes: IBusinessSegmentTypes = sampleWithRequiredData;
        const businessSegmentTypes2: IBusinessSegmentTypes = sampleWithPartialData;
        expectedResult = service.addBusinessSegmentTypesToCollectionIfMissing([], businessSegmentTypes, businessSegmentTypes2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(businessSegmentTypes);
        expect(expectedResult).toContain(businessSegmentTypes2);
      });

      it('should accept null and undefined values', () => {
        const businessSegmentTypes: IBusinessSegmentTypes = sampleWithRequiredData;
        expectedResult = service.addBusinessSegmentTypesToCollectionIfMissing([], null, businessSegmentTypes, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(businessSegmentTypes);
      });

      it('should return initial array if no BusinessSegmentTypes is added', () => {
        const businessSegmentTypesCollection: IBusinessSegmentTypes[] = [sampleWithRequiredData];
        expectedResult = service.addBusinessSegmentTypesToCollectionIfMissing(businessSegmentTypesCollection, undefined, null);
        expect(expectedResult).toEqual(businessSegmentTypesCollection);
      });
    });

    describe('compareBusinessSegmentTypes', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareBusinessSegmentTypes(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareBusinessSegmentTypes(entity1, entity2);
        const compareResult2 = service.compareBusinessSegmentTypes(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareBusinessSegmentTypes(entity1, entity2);
        const compareResult2 = service.compareBusinessSegmentTypes(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareBusinessSegmentTypes(entity1, entity2);
        const compareResult2 = service.compareBusinessSegmentTypes(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

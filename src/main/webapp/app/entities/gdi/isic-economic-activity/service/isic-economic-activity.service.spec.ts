import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IIsicEconomicActivity } from '../isic-economic-activity.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../isic-economic-activity.test-samples';

import { IsicEconomicActivityService } from './isic-economic-activity.service';

const requireRestSample: IIsicEconomicActivity = {
  ...sampleWithRequiredData,
};

describe('IsicEconomicActivity Service', () => {
  let service: IsicEconomicActivityService;
  let httpMock: HttpTestingController;
  let expectedResult: IIsicEconomicActivity | IIsicEconomicActivity[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(IsicEconomicActivityService);
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

    it('should create a IsicEconomicActivity', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const isicEconomicActivity = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(isicEconomicActivity).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a IsicEconomicActivity', () => {
      const isicEconomicActivity = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(isicEconomicActivity).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a IsicEconomicActivity', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of IsicEconomicActivity', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a IsicEconomicActivity', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addIsicEconomicActivityToCollectionIfMissing', () => {
      it('should add a IsicEconomicActivity to an empty array', () => {
        const isicEconomicActivity: IIsicEconomicActivity = sampleWithRequiredData;
        expectedResult = service.addIsicEconomicActivityToCollectionIfMissing([], isicEconomicActivity);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(isicEconomicActivity);
      });

      it('should not add a IsicEconomicActivity to an array that contains it', () => {
        const isicEconomicActivity: IIsicEconomicActivity = sampleWithRequiredData;
        const isicEconomicActivityCollection: IIsicEconomicActivity[] = [
          {
            ...isicEconomicActivity,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addIsicEconomicActivityToCollectionIfMissing(isicEconomicActivityCollection, isicEconomicActivity);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a IsicEconomicActivity to an array that doesn't contain it", () => {
        const isicEconomicActivity: IIsicEconomicActivity = sampleWithRequiredData;
        const isicEconomicActivityCollection: IIsicEconomicActivity[] = [sampleWithPartialData];
        expectedResult = service.addIsicEconomicActivityToCollectionIfMissing(isicEconomicActivityCollection, isicEconomicActivity);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(isicEconomicActivity);
      });

      it('should add only unique IsicEconomicActivity to an array', () => {
        const isicEconomicActivityArray: IIsicEconomicActivity[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const isicEconomicActivityCollection: IIsicEconomicActivity[] = [sampleWithRequiredData];
        expectedResult = service.addIsicEconomicActivityToCollectionIfMissing(isicEconomicActivityCollection, ...isicEconomicActivityArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const isicEconomicActivity: IIsicEconomicActivity = sampleWithRequiredData;
        const isicEconomicActivity2: IIsicEconomicActivity = sampleWithPartialData;
        expectedResult = service.addIsicEconomicActivityToCollectionIfMissing([], isicEconomicActivity, isicEconomicActivity2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(isicEconomicActivity);
        expect(expectedResult).toContain(isicEconomicActivity2);
      });

      it('should accept null and undefined values', () => {
        const isicEconomicActivity: IIsicEconomicActivity = sampleWithRequiredData;
        expectedResult = service.addIsicEconomicActivityToCollectionIfMissing([], null, isicEconomicActivity, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(isicEconomicActivity);
      });

      it('should return initial array if no IsicEconomicActivity is added', () => {
        const isicEconomicActivityCollection: IIsicEconomicActivity[] = [sampleWithRequiredData];
        expectedResult = service.addIsicEconomicActivityToCollectionIfMissing(isicEconomicActivityCollection, undefined, null);
        expect(expectedResult).toEqual(isicEconomicActivityCollection);
      });
    });

    describe('compareIsicEconomicActivity', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareIsicEconomicActivity(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareIsicEconomicActivity(entity1, entity2);
        const compareResult2 = service.compareIsicEconomicActivity(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareIsicEconomicActivity(entity1, entity2);
        const compareResult2 = service.compareIsicEconomicActivity(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareIsicEconomicActivity(entity1, entity2);
        const compareResult2 = service.compareIsicEconomicActivity(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

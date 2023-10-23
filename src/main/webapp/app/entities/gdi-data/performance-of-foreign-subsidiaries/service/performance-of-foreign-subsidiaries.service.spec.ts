import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IPerformanceOfForeignSubsidiaries } from '../performance-of-foreign-subsidiaries.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../performance-of-foreign-subsidiaries.test-samples';

import {
  PerformanceOfForeignSubsidiariesService,
  RestPerformanceOfForeignSubsidiaries,
} from './performance-of-foreign-subsidiaries.service';

const requireRestSample: RestPerformanceOfForeignSubsidiaries = {
  ...sampleWithRequiredData,
  reportingDate: sampleWithRequiredData.reportingDate?.format(DATE_FORMAT),
};

describe('PerformanceOfForeignSubsidiaries Service', () => {
  let service: PerformanceOfForeignSubsidiariesService;
  let httpMock: HttpTestingController;
  let expectedResult: IPerformanceOfForeignSubsidiaries | IPerformanceOfForeignSubsidiaries[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PerformanceOfForeignSubsidiariesService);
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

    it('should create a PerformanceOfForeignSubsidiaries', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const performanceOfForeignSubsidiaries = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(performanceOfForeignSubsidiaries).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PerformanceOfForeignSubsidiaries', () => {
      const performanceOfForeignSubsidiaries = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(performanceOfForeignSubsidiaries).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PerformanceOfForeignSubsidiaries', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PerformanceOfForeignSubsidiaries', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PerformanceOfForeignSubsidiaries', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPerformanceOfForeignSubsidiariesToCollectionIfMissing', () => {
      it('should add a PerformanceOfForeignSubsidiaries to an empty array', () => {
        const performanceOfForeignSubsidiaries: IPerformanceOfForeignSubsidiaries = sampleWithRequiredData;
        expectedResult = service.addPerformanceOfForeignSubsidiariesToCollectionIfMissing([], performanceOfForeignSubsidiaries);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(performanceOfForeignSubsidiaries);
      });

      it('should not add a PerformanceOfForeignSubsidiaries to an array that contains it', () => {
        const performanceOfForeignSubsidiaries: IPerformanceOfForeignSubsidiaries = sampleWithRequiredData;
        const performanceOfForeignSubsidiariesCollection: IPerformanceOfForeignSubsidiaries[] = [
          {
            ...performanceOfForeignSubsidiaries,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPerformanceOfForeignSubsidiariesToCollectionIfMissing(
          performanceOfForeignSubsidiariesCollection,
          performanceOfForeignSubsidiaries
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PerformanceOfForeignSubsidiaries to an array that doesn't contain it", () => {
        const performanceOfForeignSubsidiaries: IPerformanceOfForeignSubsidiaries = sampleWithRequiredData;
        const performanceOfForeignSubsidiariesCollection: IPerformanceOfForeignSubsidiaries[] = [sampleWithPartialData];
        expectedResult = service.addPerformanceOfForeignSubsidiariesToCollectionIfMissing(
          performanceOfForeignSubsidiariesCollection,
          performanceOfForeignSubsidiaries
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(performanceOfForeignSubsidiaries);
      });

      it('should add only unique PerformanceOfForeignSubsidiaries to an array', () => {
        const performanceOfForeignSubsidiariesArray: IPerformanceOfForeignSubsidiaries[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const performanceOfForeignSubsidiariesCollection: IPerformanceOfForeignSubsidiaries[] = [sampleWithRequiredData];
        expectedResult = service.addPerformanceOfForeignSubsidiariesToCollectionIfMissing(
          performanceOfForeignSubsidiariesCollection,
          ...performanceOfForeignSubsidiariesArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const performanceOfForeignSubsidiaries: IPerformanceOfForeignSubsidiaries = sampleWithRequiredData;
        const performanceOfForeignSubsidiaries2: IPerformanceOfForeignSubsidiaries = sampleWithPartialData;
        expectedResult = service.addPerformanceOfForeignSubsidiariesToCollectionIfMissing(
          [],
          performanceOfForeignSubsidiaries,
          performanceOfForeignSubsidiaries2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(performanceOfForeignSubsidiaries);
        expect(expectedResult).toContain(performanceOfForeignSubsidiaries2);
      });

      it('should accept null and undefined values', () => {
        const performanceOfForeignSubsidiaries: IPerformanceOfForeignSubsidiaries = sampleWithRequiredData;
        expectedResult = service.addPerformanceOfForeignSubsidiariesToCollectionIfMissing(
          [],
          null,
          performanceOfForeignSubsidiaries,
          undefined
        );
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(performanceOfForeignSubsidiaries);
      });

      it('should return initial array if no PerformanceOfForeignSubsidiaries is added', () => {
        const performanceOfForeignSubsidiariesCollection: IPerformanceOfForeignSubsidiaries[] = [sampleWithRequiredData];
        expectedResult = service.addPerformanceOfForeignSubsidiariesToCollectionIfMissing(
          performanceOfForeignSubsidiariesCollection,
          undefined,
          null
        );
        expect(expectedResult).toEqual(performanceOfForeignSubsidiariesCollection);
      });
    });

    describe('comparePerformanceOfForeignSubsidiaries', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePerformanceOfForeignSubsidiaries(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePerformanceOfForeignSubsidiaries(entity1, entity2);
        const compareResult2 = service.comparePerformanceOfForeignSubsidiaries(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePerformanceOfForeignSubsidiaries(entity1, entity2);
        const compareResult2 = service.comparePerformanceOfForeignSubsidiaries(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePerformanceOfForeignSubsidiaries(entity1, entity2);
        const compareResult2 = service.comparePerformanceOfForeignSubsidiaries(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

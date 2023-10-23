import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAnticipatedMaturityPeriood } from '../anticipated-maturity-periood.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../anticipated-maturity-periood.test-samples';

import { AnticipatedMaturityPerioodService } from './anticipated-maturity-periood.service';

const requireRestSample: IAnticipatedMaturityPeriood = {
  ...sampleWithRequiredData,
};

describe('AnticipatedMaturityPeriood Service', () => {
  let service: AnticipatedMaturityPerioodService;
  let httpMock: HttpTestingController;
  let expectedResult: IAnticipatedMaturityPeriood | IAnticipatedMaturityPeriood[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AnticipatedMaturityPerioodService);
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

    it('should create a AnticipatedMaturityPeriood', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const anticipatedMaturityPeriood = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(anticipatedMaturityPeriood).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AnticipatedMaturityPeriood', () => {
      const anticipatedMaturityPeriood = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(anticipatedMaturityPeriood).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AnticipatedMaturityPeriood', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AnticipatedMaturityPeriood', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AnticipatedMaturityPeriood', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAnticipatedMaturityPerioodToCollectionIfMissing', () => {
      it('should add a AnticipatedMaturityPeriood to an empty array', () => {
        const anticipatedMaturityPeriood: IAnticipatedMaturityPeriood = sampleWithRequiredData;
        expectedResult = service.addAnticipatedMaturityPerioodToCollectionIfMissing([], anticipatedMaturityPeriood);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(anticipatedMaturityPeriood);
      });

      it('should not add a AnticipatedMaturityPeriood to an array that contains it', () => {
        const anticipatedMaturityPeriood: IAnticipatedMaturityPeriood = sampleWithRequiredData;
        const anticipatedMaturityPerioodCollection: IAnticipatedMaturityPeriood[] = [
          {
            ...anticipatedMaturityPeriood,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAnticipatedMaturityPerioodToCollectionIfMissing(
          anticipatedMaturityPerioodCollection,
          anticipatedMaturityPeriood
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AnticipatedMaturityPeriood to an array that doesn't contain it", () => {
        const anticipatedMaturityPeriood: IAnticipatedMaturityPeriood = sampleWithRequiredData;
        const anticipatedMaturityPerioodCollection: IAnticipatedMaturityPeriood[] = [sampleWithPartialData];
        expectedResult = service.addAnticipatedMaturityPerioodToCollectionIfMissing(
          anticipatedMaturityPerioodCollection,
          anticipatedMaturityPeriood
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(anticipatedMaturityPeriood);
      });

      it('should add only unique AnticipatedMaturityPeriood to an array', () => {
        const anticipatedMaturityPerioodArray: IAnticipatedMaturityPeriood[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const anticipatedMaturityPerioodCollection: IAnticipatedMaturityPeriood[] = [sampleWithRequiredData];
        expectedResult = service.addAnticipatedMaturityPerioodToCollectionIfMissing(
          anticipatedMaturityPerioodCollection,
          ...anticipatedMaturityPerioodArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const anticipatedMaturityPeriood: IAnticipatedMaturityPeriood = sampleWithRequiredData;
        const anticipatedMaturityPeriood2: IAnticipatedMaturityPeriood = sampleWithPartialData;
        expectedResult = service.addAnticipatedMaturityPerioodToCollectionIfMissing(
          [],
          anticipatedMaturityPeriood,
          anticipatedMaturityPeriood2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(anticipatedMaturityPeriood);
        expect(expectedResult).toContain(anticipatedMaturityPeriood2);
      });

      it('should accept null and undefined values', () => {
        const anticipatedMaturityPeriood: IAnticipatedMaturityPeriood = sampleWithRequiredData;
        expectedResult = service.addAnticipatedMaturityPerioodToCollectionIfMissing([], null, anticipatedMaturityPeriood, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(anticipatedMaturityPeriood);
      });

      it('should return initial array if no AnticipatedMaturityPeriood is added', () => {
        const anticipatedMaturityPerioodCollection: IAnticipatedMaturityPeriood[] = [sampleWithRequiredData];
        expectedResult = service.addAnticipatedMaturityPerioodToCollectionIfMissing(anticipatedMaturityPerioodCollection, undefined, null);
        expect(expectedResult).toEqual(anticipatedMaturityPerioodCollection);
      });
    });

    describe('compareAnticipatedMaturityPeriood', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAnticipatedMaturityPeriood(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAnticipatedMaturityPeriood(entity1, entity2);
        const compareResult2 = service.compareAnticipatedMaturityPeriood(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAnticipatedMaturityPeriood(entity1, entity2);
        const compareResult2 = service.compareAnticipatedMaturityPeriood(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAnticipatedMaturityPeriood(entity1, entity2);
        const compareResult2 = service.compareAnticipatedMaturityPeriood(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

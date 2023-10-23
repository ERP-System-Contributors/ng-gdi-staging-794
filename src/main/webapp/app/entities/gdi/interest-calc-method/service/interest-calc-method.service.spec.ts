import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IInterestCalcMethod } from '../interest-calc-method.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../interest-calc-method.test-samples';

import { InterestCalcMethodService } from './interest-calc-method.service';

const requireRestSample: IInterestCalcMethod = {
  ...sampleWithRequiredData,
};

describe('InterestCalcMethod Service', () => {
  let service: InterestCalcMethodService;
  let httpMock: HttpTestingController;
  let expectedResult: IInterestCalcMethod | IInterestCalcMethod[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(InterestCalcMethodService);
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

    it('should create a InterestCalcMethod', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const interestCalcMethod = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(interestCalcMethod).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a InterestCalcMethod', () => {
      const interestCalcMethod = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(interestCalcMethod).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a InterestCalcMethod', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of InterestCalcMethod', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a InterestCalcMethod', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addInterestCalcMethodToCollectionIfMissing', () => {
      it('should add a InterestCalcMethod to an empty array', () => {
        const interestCalcMethod: IInterestCalcMethod = sampleWithRequiredData;
        expectedResult = service.addInterestCalcMethodToCollectionIfMissing([], interestCalcMethod);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(interestCalcMethod);
      });

      it('should not add a InterestCalcMethod to an array that contains it', () => {
        const interestCalcMethod: IInterestCalcMethod = sampleWithRequiredData;
        const interestCalcMethodCollection: IInterestCalcMethod[] = [
          {
            ...interestCalcMethod,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addInterestCalcMethodToCollectionIfMissing(interestCalcMethodCollection, interestCalcMethod);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a InterestCalcMethod to an array that doesn't contain it", () => {
        const interestCalcMethod: IInterestCalcMethod = sampleWithRequiredData;
        const interestCalcMethodCollection: IInterestCalcMethod[] = [sampleWithPartialData];
        expectedResult = service.addInterestCalcMethodToCollectionIfMissing(interestCalcMethodCollection, interestCalcMethod);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(interestCalcMethod);
      });

      it('should add only unique InterestCalcMethod to an array', () => {
        const interestCalcMethodArray: IInterestCalcMethod[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const interestCalcMethodCollection: IInterestCalcMethod[] = [sampleWithRequiredData];
        expectedResult = service.addInterestCalcMethodToCollectionIfMissing(interestCalcMethodCollection, ...interestCalcMethodArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const interestCalcMethod: IInterestCalcMethod = sampleWithRequiredData;
        const interestCalcMethod2: IInterestCalcMethod = sampleWithPartialData;
        expectedResult = service.addInterestCalcMethodToCollectionIfMissing([], interestCalcMethod, interestCalcMethod2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(interestCalcMethod);
        expect(expectedResult).toContain(interestCalcMethod2);
      });

      it('should accept null and undefined values', () => {
        const interestCalcMethod: IInterestCalcMethod = sampleWithRequiredData;
        expectedResult = service.addInterestCalcMethodToCollectionIfMissing([], null, interestCalcMethod, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(interestCalcMethod);
      });

      it('should return initial array if no InterestCalcMethod is added', () => {
        const interestCalcMethodCollection: IInterestCalcMethod[] = [sampleWithRequiredData];
        expectedResult = service.addInterestCalcMethodToCollectionIfMissing(interestCalcMethodCollection, undefined, null);
        expect(expectedResult).toEqual(interestCalcMethodCollection);
      });
    });

    describe('compareInterestCalcMethod', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareInterestCalcMethod(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareInterestCalcMethod(entity1, entity2);
        const compareResult2 = service.compareInterestCalcMethod(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareInterestCalcMethod(entity1, entity2);
        const compareResult2 = service.compareInterestCalcMethod(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareInterestCalcMethod(entity1, entity2);
        const compareResult2 = service.compareInterestCalcMethod(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

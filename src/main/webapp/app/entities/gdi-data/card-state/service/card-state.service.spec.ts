import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICardState } from '../card-state.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../card-state.test-samples';

import { CardStateService } from './card-state.service';

const requireRestSample: ICardState = {
  ...sampleWithRequiredData,
};

describe('CardState Service', () => {
  let service: CardStateService;
  let httpMock: HttpTestingController;
  let expectedResult: ICardState | ICardState[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CardStateService);
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

    it('should create a CardState', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const cardState = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cardState).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CardState', () => {
      const cardState = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cardState).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CardState', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CardState', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CardState', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCardStateToCollectionIfMissing', () => {
      it('should add a CardState to an empty array', () => {
        const cardState: ICardState = sampleWithRequiredData;
        expectedResult = service.addCardStateToCollectionIfMissing([], cardState);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cardState);
      });

      it('should not add a CardState to an array that contains it', () => {
        const cardState: ICardState = sampleWithRequiredData;
        const cardStateCollection: ICardState[] = [
          {
            ...cardState,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCardStateToCollectionIfMissing(cardStateCollection, cardState);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CardState to an array that doesn't contain it", () => {
        const cardState: ICardState = sampleWithRequiredData;
        const cardStateCollection: ICardState[] = [sampleWithPartialData];
        expectedResult = service.addCardStateToCollectionIfMissing(cardStateCollection, cardState);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cardState);
      });

      it('should add only unique CardState to an array', () => {
        const cardStateArray: ICardState[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cardStateCollection: ICardState[] = [sampleWithRequiredData];
        expectedResult = service.addCardStateToCollectionIfMissing(cardStateCollection, ...cardStateArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cardState: ICardState = sampleWithRequiredData;
        const cardState2: ICardState = sampleWithPartialData;
        expectedResult = service.addCardStateToCollectionIfMissing([], cardState, cardState2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cardState);
        expect(expectedResult).toContain(cardState2);
      });

      it('should accept null and undefined values', () => {
        const cardState: ICardState = sampleWithRequiredData;
        expectedResult = service.addCardStateToCollectionIfMissing([], null, cardState, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cardState);
      });

      it('should return initial array if no CardState is added', () => {
        const cardStateCollection: ICardState[] = [sampleWithRequiredData];
        expectedResult = service.addCardStateToCollectionIfMissing(cardStateCollection, undefined, null);
        expect(expectedResult).toEqual(cardStateCollection);
      });
    });

    describe('compareCardState', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCardState(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCardState(entity1, entity2);
        const compareResult2 = service.compareCardState(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCardState(entity1, entity2);
        const compareResult2 = service.compareCardState(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCardState(entity1, entity2);
        const compareResult2 = service.compareCardState(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

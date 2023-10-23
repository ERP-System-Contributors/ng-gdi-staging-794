import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMoratoriumItem } from '../moratorium-item.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../moratorium-item.test-samples';

import { MoratoriumItemService } from './moratorium-item.service';

const requireRestSample: IMoratoriumItem = {
  ...sampleWithRequiredData,
};

describe('MoratoriumItem Service', () => {
  let service: MoratoriumItemService;
  let httpMock: HttpTestingController;
  let expectedResult: IMoratoriumItem | IMoratoriumItem[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MoratoriumItemService);
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

    it('should create a MoratoriumItem', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const moratoriumItem = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(moratoriumItem).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MoratoriumItem', () => {
      const moratoriumItem = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(moratoriumItem).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MoratoriumItem', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MoratoriumItem', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a MoratoriumItem', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMoratoriumItemToCollectionIfMissing', () => {
      it('should add a MoratoriumItem to an empty array', () => {
        const moratoriumItem: IMoratoriumItem = sampleWithRequiredData;
        expectedResult = service.addMoratoriumItemToCollectionIfMissing([], moratoriumItem);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(moratoriumItem);
      });

      it('should not add a MoratoriumItem to an array that contains it', () => {
        const moratoriumItem: IMoratoriumItem = sampleWithRequiredData;
        const moratoriumItemCollection: IMoratoriumItem[] = [
          {
            ...moratoriumItem,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMoratoriumItemToCollectionIfMissing(moratoriumItemCollection, moratoriumItem);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MoratoriumItem to an array that doesn't contain it", () => {
        const moratoriumItem: IMoratoriumItem = sampleWithRequiredData;
        const moratoriumItemCollection: IMoratoriumItem[] = [sampleWithPartialData];
        expectedResult = service.addMoratoriumItemToCollectionIfMissing(moratoriumItemCollection, moratoriumItem);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(moratoriumItem);
      });

      it('should add only unique MoratoriumItem to an array', () => {
        const moratoriumItemArray: IMoratoriumItem[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const moratoriumItemCollection: IMoratoriumItem[] = [sampleWithRequiredData];
        expectedResult = service.addMoratoriumItemToCollectionIfMissing(moratoriumItemCollection, ...moratoriumItemArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const moratoriumItem: IMoratoriumItem = sampleWithRequiredData;
        const moratoriumItem2: IMoratoriumItem = sampleWithPartialData;
        expectedResult = service.addMoratoriumItemToCollectionIfMissing([], moratoriumItem, moratoriumItem2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(moratoriumItem);
        expect(expectedResult).toContain(moratoriumItem2);
      });

      it('should accept null and undefined values', () => {
        const moratoriumItem: IMoratoriumItem = sampleWithRequiredData;
        expectedResult = service.addMoratoriumItemToCollectionIfMissing([], null, moratoriumItem, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(moratoriumItem);
      });

      it('should return initial array if no MoratoriumItem is added', () => {
        const moratoriumItemCollection: IMoratoriumItem[] = [sampleWithRequiredData];
        expectedResult = service.addMoratoriumItemToCollectionIfMissing(moratoriumItemCollection, undefined, null);
        expect(expectedResult).toEqual(moratoriumItemCollection);
      });
    });

    describe('compareMoratoriumItem', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMoratoriumItem(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareMoratoriumItem(entity1, entity2);
        const compareResult2 = service.compareMoratoriumItem(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareMoratoriumItem(entity1, entity2);
        const compareResult2 = service.compareMoratoriumItem(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareMoratoriumItem(entity1, entity2);
        const compareResult2 = service.compareMoratoriumItem(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

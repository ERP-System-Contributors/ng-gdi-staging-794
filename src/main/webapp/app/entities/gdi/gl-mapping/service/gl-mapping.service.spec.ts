import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IGlMapping } from '../gl-mapping.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../gl-mapping.test-samples';

import { GlMappingService } from './gl-mapping.service';

const requireRestSample: IGlMapping = {
  ...sampleWithRequiredData,
};

describe('GlMapping Service', () => {
  let service: GlMappingService;
  let httpMock: HttpTestingController;
  let expectedResult: IGlMapping | IGlMapping[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(GlMappingService);
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

    it('should create a GlMapping', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const glMapping = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(glMapping).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a GlMapping', () => {
      const glMapping = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(glMapping).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a GlMapping', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of GlMapping', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a GlMapping', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addGlMappingToCollectionIfMissing', () => {
      it('should add a GlMapping to an empty array', () => {
        const glMapping: IGlMapping = sampleWithRequiredData;
        expectedResult = service.addGlMappingToCollectionIfMissing([], glMapping);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(glMapping);
      });

      it('should not add a GlMapping to an array that contains it', () => {
        const glMapping: IGlMapping = sampleWithRequiredData;
        const glMappingCollection: IGlMapping[] = [
          {
            ...glMapping,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addGlMappingToCollectionIfMissing(glMappingCollection, glMapping);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a GlMapping to an array that doesn't contain it", () => {
        const glMapping: IGlMapping = sampleWithRequiredData;
        const glMappingCollection: IGlMapping[] = [sampleWithPartialData];
        expectedResult = service.addGlMappingToCollectionIfMissing(glMappingCollection, glMapping);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(glMapping);
      });

      it('should add only unique GlMapping to an array', () => {
        const glMappingArray: IGlMapping[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const glMappingCollection: IGlMapping[] = [sampleWithRequiredData];
        expectedResult = service.addGlMappingToCollectionIfMissing(glMappingCollection, ...glMappingArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const glMapping: IGlMapping = sampleWithRequiredData;
        const glMapping2: IGlMapping = sampleWithPartialData;
        expectedResult = service.addGlMappingToCollectionIfMissing([], glMapping, glMapping2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(glMapping);
        expect(expectedResult).toContain(glMapping2);
      });

      it('should accept null and undefined values', () => {
        const glMapping: IGlMapping = sampleWithRequiredData;
        expectedResult = service.addGlMappingToCollectionIfMissing([], null, glMapping, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(glMapping);
      });

      it('should return initial array if no GlMapping is added', () => {
        const glMappingCollection: IGlMapping[] = [sampleWithRequiredData];
        expectedResult = service.addGlMappingToCollectionIfMissing(glMappingCollection, undefined, null);
        expect(expectedResult).toEqual(glMappingCollection);
      });
    });

    describe('compareGlMapping', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareGlMapping(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareGlMapping(entity1, entity2);
        const compareResult2 = service.compareGlMapping(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareGlMapping(entity1, entity2);
        const compareResult2 = service.compareGlMapping(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareGlMapping(entity1, entity2);
        const compareResult2 = service.compareGlMapping(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

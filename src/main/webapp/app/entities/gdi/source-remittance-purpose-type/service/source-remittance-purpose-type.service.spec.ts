import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISourceRemittancePurposeType } from '../source-remittance-purpose-type.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../source-remittance-purpose-type.test-samples';

import { SourceRemittancePurposeTypeService } from './source-remittance-purpose-type.service';

const requireRestSample: ISourceRemittancePurposeType = {
  ...sampleWithRequiredData,
};

describe('SourceRemittancePurposeType Service', () => {
  let service: SourceRemittancePurposeTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: ISourceRemittancePurposeType | ISourceRemittancePurposeType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SourceRemittancePurposeTypeService);
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

    it('should create a SourceRemittancePurposeType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const sourceRemittancePurposeType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(sourceRemittancePurposeType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SourceRemittancePurposeType', () => {
      const sourceRemittancePurposeType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(sourceRemittancePurposeType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SourceRemittancePurposeType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SourceRemittancePurposeType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SourceRemittancePurposeType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSourceRemittancePurposeTypeToCollectionIfMissing', () => {
      it('should add a SourceRemittancePurposeType to an empty array', () => {
        const sourceRemittancePurposeType: ISourceRemittancePurposeType = sampleWithRequiredData;
        expectedResult = service.addSourceRemittancePurposeTypeToCollectionIfMissing([], sourceRemittancePurposeType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(sourceRemittancePurposeType);
      });

      it('should not add a SourceRemittancePurposeType to an array that contains it', () => {
        const sourceRemittancePurposeType: ISourceRemittancePurposeType = sampleWithRequiredData;
        const sourceRemittancePurposeTypeCollection: ISourceRemittancePurposeType[] = [
          {
            ...sourceRemittancePurposeType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSourceRemittancePurposeTypeToCollectionIfMissing(
          sourceRemittancePurposeTypeCollection,
          sourceRemittancePurposeType
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SourceRemittancePurposeType to an array that doesn't contain it", () => {
        const sourceRemittancePurposeType: ISourceRemittancePurposeType = sampleWithRequiredData;
        const sourceRemittancePurposeTypeCollection: ISourceRemittancePurposeType[] = [sampleWithPartialData];
        expectedResult = service.addSourceRemittancePurposeTypeToCollectionIfMissing(
          sourceRemittancePurposeTypeCollection,
          sourceRemittancePurposeType
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(sourceRemittancePurposeType);
      });

      it('should add only unique SourceRemittancePurposeType to an array', () => {
        const sourceRemittancePurposeTypeArray: ISourceRemittancePurposeType[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const sourceRemittancePurposeTypeCollection: ISourceRemittancePurposeType[] = [sampleWithRequiredData];
        expectedResult = service.addSourceRemittancePurposeTypeToCollectionIfMissing(
          sourceRemittancePurposeTypeCollection,
          ...sourceRemittancePurposeTypeArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const sourceRemittancePurposeType: ISourceRemittancePurposeType = sampleWithRequiredData;
        const sourceRemittancePurposeType2: ISourceRemittancePurposeType = sampleWithPartialData;
        expectedResult = service.addSourceRemittancePurposeTypeToCollectionIfMissing(
          [],
          sourceRemittancePurposeType,
          sourceRemittancePurposeType2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(sourceRemittancePurposeType);
        expect(expectedResult).toContain(sourceRemittancePurposeType2);
      });

      it('should accept null and undefined values', () => {
        const sourceRemittancePurposeType: ISourceRemittancePurposeType = sampleWithRequiredData;
        expectedResult = service.addSourceRemittancePurposeTypeToCollectionIfMissing([], null, sourceRemittancePurposeType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(sourceRemittancePurposeType);
      });

      it('should return initial array if no SourceRemittancePurposeType is added', () => {
        const sourceRemittancePurposeTypeCollection: ISourceRemittancePurposeType[] = [sampleWithRequiredData];
        expectedResult = service.addSourceRemittancePurposeTypeToCollectionIfMissing(
          sourceRemittancePurposeTypeCollection,
          undefined,
          null
        );
        expect(expectedResult).toEqual(sourceRemittancePurposeTypeCollection);
      });
    });

    describe('compareSourceRemittancePurposeType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSourceRemittancePurposeType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSourceRemittancePurposeType(entity1, entity2);
        const compareResult2 = service.compareSourceRemittancePurposeType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSourceRemittancePurposeType(entity1, entity2);
        const compareResult2 = service.compareSourceRemittancePurposeType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSourceRemittancePurposeType(entity1, entity2);
        const compareResult2 = service.compareSourceRemittancePurposeType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

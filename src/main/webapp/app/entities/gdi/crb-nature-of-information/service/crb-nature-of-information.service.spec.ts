import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrbNatureOfInformation } from '../crb-nature-of-information.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../crb-nature-of-information.test-samples';

import { CrbNatureOfInformationService } from './crb-nature-of-information.service';

const requireRestSample: ICrbNatureOfInformation = {
  ...sampleWithRequiredData,
};

describe('CrbNatureOfInformation Service', () => {
  let service: CrbNatureOfInformationService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrbNatureOfInformation | ICrbNatureOfInformation[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrbNatureOfInformationService);
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

    it('should create a CrbNatureOfInformation', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crbNatureOfInformation = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crbNatureOfInformation).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrbNatureOfInformation', () => {
      const crbNatureOfInformation = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crbNatureOfInformation).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrbNatureOfInformation', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrbNatureOfInformation', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrbNatureOfInformation', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrbNatureOfInformationToCollectionIfMissing', () => {
      it('should add a CrbNatureOfInformation to an empty array', () => {
        const crbNatureOfInformation: ICrbNatureOfInformation = sampleWithRequiredData;
        expectedResult = service.addCrbNatureOfInformationToCollectionIfMissing([], crbNatureOfInformation);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbNatureOfInformation);
      });

      it('should not add a CrbNatureOfInformation to an array that contains it', () => {
        const crbNatureOfInformation: ICrbNatureOfInformation = sampleWithRequiredData;
        const crbNatureOfInformationCollection: ICrbNatureOfInformation[] = [
          {
            ...crbNatureOfInformation,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrbNatureOfInformationToCollectionIfMissing(crbNatureOfInformationCollection, crbNatureOfInformation);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrbNatureOfInformation to an array that doesn't contain it", () => {
        const crbNatureOfInformation: ICrbNatureOfInformation = sampleWithRequiredData;
        const crbNatureOfInformationCollection: ICrbNatureOfInformation[] = [sampleWithPartialData];
        expectedResult = service.addCrbNatureOfInformationToCollectionIfMissing(crbNatureOfInformationCollection, crbNatureOfInformation);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbNatureOfInformation);
      });

      it('should add only unique CrbNatureOfInformation to an array', () => {
        const crbNatureOfInformationArray: ICrbNatureOfInformation[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crbNatureOfInformationCollection: ICrbNatureOfInformation[] = [sampleWithRequiredData];
        expectedResult = service.addCrbNatureOfInformationToCollectionIfMissing(
          crbNatureOfInformationCollection,
          ...crbNatureOfInformationArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crbNatureOfInformation: ICrbNatureOfInformation = sampleWithRequiredData;
        const crbNatureOfInformation2: ICrbNatureOfInformation = sampleWithPartialData;
        expectedResult = service.addCrbNatureOfInformationToCollectionIfMissing([], crbNatureOfInformation, crbNatureOfInformation2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crbNatureOfInformation);
        expect(expectedResult).toContain(crbNatureOfInformation2);
      });

      it('should accept null and undefined values', () => {
        const crbNatureOfInformation: ICrbNatureOfInformation = sampleWithRequiredData;
        expectedResult = service.addCrbNatureOfInformationToCollectionIfMissing([], null, crbNatureOfInformation, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crbNatureOfInformation);
      });

      it('should return initial array if no CrbNatureOfInformation is added', () => {
        const crbNatureOfInformationCollection: ICrbNatureOfInformation[] = [sampleWithRequiredData];
        expectedResult = service.addCrbNatureOfInformationToCollectionIfMissing(crbNatureOfInformationCollection, undefined, null);
        expect(expectedResult).toEqual(crbNatureOfInformationCollection);
      });
    });

    describe('compareCrbNatureOfInformation', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrbNatureOfInformation(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrbNatureOfInformation(entity1, entity2);
        const compareResult2 = service.compareCrbNatureOfInformation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrbNatureOfInformation(entity1, entity2);
        const compareResult2 = service.compareCrbNatureOfInformation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrbNatureOfInformation(entity1, entity2);
        const compareResult2 = service.compareCrbNatureOfInformation(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { INatureOfCustomerComplaints } from '../nature-of-customer-complaints.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../nature-of-customer-complaints.test-samples';

import { NatureOfCustomerComplaintsService } from './nature-of-customer-complaints.service';

const requireRestSample: INatureOfCustomerComplaints = {
  ...sampleWithRequiredData,
};

describe('NatureOfCustomerComplaints Service', () => {
  let service: NatureOfCustomerComplaintsService;
  let httpMock: HttpTestingController;
  let expectedResult: INatureOfCustomerComplaints | INatureOfCustomerComplaints[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(NatureOfCustomerComplaintsService);
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

    it('should create a NatureOfCustomerComplaints', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const natureOfCustomerComplaints = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(natureOfCustomerComplaints).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a NatureOfCustomerComplaints', () => {
      const natureOfCustomerComplaints = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(natureOfCustomerComplaints).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a NatureOfCustomerComplaints', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of NatureOfCustomerComplaints', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a NatureOfCustomerComplaints', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addNatureOfCustomerComplaintsToCollectionIfMissing', () => {
      it('should add a NatureOfCustomerComplaints to an empty array', () => {
        const natureOfCustomerComplaints: INatureOfCustomerComplaints = sampleWithRequiredData;
        expectedResult = service.addNatureOfCustomerComplaintsToCollectionIfMissing([], natureOfCustomerComplaints);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(natureOfCustomerComplaints);
      });

      it('should not add a NatureOfCustomerComplaints to an array that contains it', () => {
        const natureOfCustomerComplaints: INatureOfCustomerComplaints = sampleWithRequiredData;
        const natureOfCustomerComplaintsCollection: INatureOfCustomerComplaints[] = [
          {
            ...natureOfCustomerComplaints,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addNatureOfCustomerComplaintsToCollectionIfMissing(
          natureOfCustomerComplaintsCollection,
          natureOfCustomerComplaints
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a NatureOfCustomerComplaints to an array that doesn't contain it", () => {
        const natureOfCustomerComplaints: INatureOfCustomerComplaints = sampleWithRequiredData;
        const natureOfCustomerComplaintsCollection: INatureOfCustomerComplaints[] = [sampleWithPartialData];
        expectedResult = service.addNatureOfCustomerComplaintsToCollectionIfMissing(
          natureOfCustomerComplaintsCollection,
          natureOfCustomerComplaints
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(natureOfCustomerComplaints);
      });

      it('should add only unique NatureOfCustomerComplaints to an array', () => {
        const natureOfCustomerComplaintsArray: INatureOfCustomerComplaints[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const natureOfCustomerComplaintsCollection: INatureOfCustomerComplaints[] = [sampleWithRequiredData];
        expectedResult = service.addNatureOfCustomerComplaintsToCollectionIfMissing(
          natureOfCustomerComplaintsCollection,
          ...natureOfCustomerComplaintsArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const natureOfCustomerComplaints: INatureOfCustomerComplaints = sampleWithRequiredData;
        const natureOfCustomerComplaints2: INatureOfCustomerComplaints = sampleWithPartialData;
        expectedResult = service.addNatureOfCustomerComplaintsToCollectionIfMissing(
          [],
          natureOfCustomerComplaints,
          natureOfCustomerComplaints2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(natureOfCustomerComplaints);
        expect(expectedResult).toContain(natureOfCustomerComplaints2);
      });

      it('should accept null and undefined values', () => {
        const natureOfCustomerComplaints: INatureOfCustomerComplaints = sampleWithRequiredData;
        expectedResult = service.addNatureOfCustomerComplaintsToCollectionIfMissing([], null, natureOfCustomerComplaints, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(natureOfCustomerComplaints);
      });

      it('should return initial array if no NatureOfCustomerComplaints is added', () => {
        const natureOfCustomerComplaintsCollection: INatureOfCustomerComplaints[] = [sampleWithRequiredData];
        expectedResult = service.addNatureOfCustomerComplaintsToCollectionIfMissing(natureOfCustomerComplaintsCollection, undefined, null);
        expect(expectedResult).toEqual(natureOfCustomerComplaintsCollection);
      });
    });

    describe('compareNatureOfCustomerComplaints', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareNatureOfCustomerComplaints(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareNatureOfCustomerComplaints(entity1, entity2);
        const compareResult2 = service.compareNatureOfCustomerComplaints(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareNatureOfCustomerComplaints(entity1, entity2);
        const compareResult2 = service.compareNatureOfCustomerComplaints(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareNatureOfCustomerComplaints(entity1, entity2);
        const compareResult2 = service.compareNatureOfCustomerComplaints(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

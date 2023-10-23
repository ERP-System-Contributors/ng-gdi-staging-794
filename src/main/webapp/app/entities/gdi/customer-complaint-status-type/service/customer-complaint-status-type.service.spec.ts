import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICustomerComplaintStatusType } from '../customer-complaint-status-type.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../customer-complaint-status-type.test-samples';

import { CustomerComplaintStatusTypeService } from './customer-complaint-status-type.service';

const requireRestSample: ICustomerComplaintStatusType = {
  ...sampleWithRequiredData,
};

describe('CustomerComplaintStatusType Service', () => {
  let service: CustomerComplaintStatusTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: ICustomerComplaintStatusType | ICustomerComplaintStatusType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CustomerComplaintStatusTypeService);
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

    it('should create a CustomerComplaintStatusType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const customerComplaintStatusType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(customerComplaintStatusType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CustomerComplaintStatusType', () => {
      const customerComplaintStatusType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(customerComplaintStatusType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CustomerComplaintStatusType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CustomerComplaintStatusType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CustomerComplaintStatusType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCustomerComplaintStatusTypeToCollectionIfMissing', () => {
      it('should add a CustomerComplaintStatusType to an empty array', () => {
        const customerComplaintStatusType: ICustomerComplaintStatusType = sampleWithRequiredData;
        expectedResult = service.addCustomerComplaintStatusTypeToCollectionIfMissing([], customerComplaintStatusType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(customerComplaintStatusType);
      });

      it('should not add a CustomerComplaintStatusType to an array that contains it', () => {
        const customerComplaintStatusType: ICustomerComplaintStatusType = sampleWithRequiredData;
        const customerComplaintStatusTypeCollection: ICustomerComplaintStatusType[] = [
          {
            ...customerComplaintStatusType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCustomerComplaintStatusTypeToCollectionIfMissing(
          customerComplaintStatusTypeCollection,
          customerComplaintStatusType
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CustomerComplaintStatusType to an array that doesn't contain it", () => {
        const customerComplaintStatusType: ICustomerComplaintStatusType = sampleWithRequiredData;
        const customerComplaintStatusTypeCollection: ICustomerComplaintStatusType[] = [sampleWithPartialData];
        expectedResult = service.addCustomerComplaintStatusTypeToCollectionIfMissing(
          customerComplaintStatusTypeCollection,
          customerComplaintStatusType
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(customerComplaintStatusType);
      });

      it('should add only unique CustomerComplaintStatusType to an array', () => {
        const customerComplaintStatusTypeArray: ICustomerComplaintStatusType[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const customerComplaintStatusTypeCollection: ICustomerComplaintStatusType[] = [sampleWithRequiredData];
        expectedResult = service.addCustomerComplaintStatusTypeToCollectionIfMissing(
          customerComplaintStatusTypeCollection,
          ...customerComplaintStatusTypeArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const customerComplaintStatusType: ICustomerComplaintStatusType = sampleWithRequiredData;
        const customerComplaintStatusType2: ICustomerComplaintStatusType = sampleWithPartialData;
        expectedResult = service.addCustomerComplaintStatusTypeToCollectionIfMissing(
          [],
          customerComplaintStatusType,
          customerComplaintStatusType2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(customerComplaintStatusType);
        expect(expectedResult).toContain(customerComplaintStatusType2);
      });

      it('should accept null and undefined values', () => {
        const customerComplaintStatusType: ICustomerComplaintStatusType = sampleWithRequiredData;
        expectedResult = service.addCustomerComplaintStatusTypeToCollectionIfMissing([], null, customerComplaintStatusType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(customerComplaintStatusType);
      });

      it('should return initial array if no CustomerComplaintStatusType is added', () => {
        const customerComplaintStatusTypeCollection: ICustomerComplaintStatusType[] = [sampleWithRequiredData];
        expectedResult = service.addCustomerComplaintStatusTypeToCollectionIfMissing(
          customerComplaintStatusTypeCollection,
          undefined,
          null
        );
        expect(expectedResult).toEqual(customerComplaintStatusTypeCollection);
      });
    });

    describe('compareCustomerComplaintStatusType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCustomerComplaintStatusType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCustomerComplaintStatusType(entity1, entity2);
        const compareResult2 = service.compareCustomerComplaintStatusType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCustomerComplaintStatusType(entity1, entity2);
        const compareResult2 = service.compareCustomerComplaintStatusType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCustomerComplaintStatusType(entity1, entity2);
        const compareResult2 = service.compareCustomerComplaintStatusType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

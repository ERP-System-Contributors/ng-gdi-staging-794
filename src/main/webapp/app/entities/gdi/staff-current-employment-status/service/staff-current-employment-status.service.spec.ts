import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IStaffCurrentEmploymentStatus } from '../staff-current-employment-status.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../staff-current-employment-status.test-samples';

import { StaffCurrentEmploymentStatusService } from './staff-current-employment-status.service';

const requireRestSample: IStaffCurrentEmploymentStatus = {
  ...sampleWithRequiredData,
};

describe('StaffCurrentEmploymentStatus Service', () => {
  let service: StaffCurrentEmploymentStatusService;
  let httpMock: HttpTestingController;
  let expectedResult: IStaffCurrentEmploymentStatus | IStaffCurrentEmploymentStatus[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(StaffCurrentEmploymentStatusService);
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

    it('should create a StaffCurrentEmploymentStatus', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const staffCurrentEmploymentStatus = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(staffCurrentEmploymentStatus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a StaffCurrentEmploymentStatus', () => {
      const staffCurrentEmploymentStatus = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(staffCurrentEmploymentStatus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a StaffCurrentEmploymentStatus', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of StaffCurrentEmploymentStatus', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a StaffCurrentEmploymentStatus', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addStaffCurrentEmploymentStatusToCollectionIfMissing', () => {
      it('should add a StaffCurrentEmploymentStatus to an empty array', () => {
        const staffCurrentEmploymentStatus: IStaffCurrentEmploymentStatus = sampleWithRequiredData;
        expectedResult = service.addStaffCurrentEmploymentStatusToCollectionIfMissing([], staffCurrentEmploymentStatus);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(staffCurrentEmploymentStatus);
      });

      it('should not add a StaffCurrentEmploymentStatus to an array that contains it', () => {
        const staffCurrentEmploymentStatus: IStaffCurrentEmploymentStatus = sampleWithRequiredData;
        const staffCurrentEmploymentStatusCollection: IStaffCurrentEmploymentStatus[] = [
          {
            ...staffCurrentEmploymentStatus,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addStaffCurrentEmploymentStatusToCollectionIfMissing(
          staffCurrentEmploymentStatusCollection,
          staffCurrentEmploymentStatus
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a StaffCurrentEmploymentStatus to an array that doesn't contain it", () => {
        const staffCurrentEmploymentStatus: IStaffCurrentEmploymentStatus = sampleWithRequiredData;
        const staffCurrentEmploymentStatusCollection: IStaffCurrentEmploymentStatus[] = [sampleWithPartialData];
        expectedResult = service.addStaffCurrentEmploymentStatusToCollectionIfMissing(
          staffCurrentEmploymentStatusCollection,
          staffCurrentEmploymentStatus
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(staffCurrentEmploymentStatus);
      });

      it('should add only unique StaffCurrentEmploymentStatus to an array', () => {
        const staffCurrentEmploymentStatusArray: IStaffCurrentEmploymentStatus[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const staffCurrentEmploymentStatusCollection: IStaffCurrentEmploymentStatus[] = [sampleWithRequiredData];
        expectedResult = service.addStaffCurrentEmploymentStatusToCollectionIfMissing(
          staffCurrentEmploymentStatusCollection,
          ...staffCurrentEmploymentStatusArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const staffCurrentEmploymentStatus: IStaffCurrentEmploymentStatus = sampleWithRequiredData;
        const staffCurrentEmploymentStatus2: IStaffCurrentEmploymentStatus = sampleWithPartialData;
        expectedResult = service.addStaffCurrentEmploymentStatusToCollectionIfMissing(
          [],
          staffCurrentEmploymentStatus,
          staffCurrentEmploymentStatus2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(staffCurrentEmploymentStatus);
        expect(expectedResult).toContain(staffCurrentEmploymentStatus2);
      });

      it('should accept null and undefined values', () => {
        const staffCurrentEmploymentStatus: IStaffCurrentEmploymentStatus = sampleWithRequiredData;
        expectedResult = service.addStaffCurrentEmploymentStatusToCollectionIfMissing([], null, staffCurrentEmploymentStatus, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(staffCurrentEmploymentStatus);
      });

      it('should return initial array if no StaffCurrentEmploymentStatus is added', () => {
        const staffCurrentEmploymentStatusCollection: IStaffCurrentEmploymentStatus[] = [sampleWithRequiredData];
        expectedResult = service.addStaffCurrentEmploymentStatusToCollectionIfMissing(
          staffCurrentEmploymentStatusCollection,
          undefined,
          null
        );
        expect(expectedResult).toEqual(staffCurrentEmploymentStatusCollection);
      });
    });

    describe('compareStaffCurrentEmploymentStatus', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareStaffCurrentEmploymentStatus(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareStaffCurrentEmploymentStatus(entity1, entity2);
        const compareResult2 = service.compareStaffCurrentEmploymentStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareStaffCurrentEmploymentStatus(entity1, entity2);
        const compareResult2 = service.compareStaffCurrentEmploymentStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareStaffCurrentEmploymentStatus(entity1, entity2);
        const compareResult2 = service.compareStaffCurrentEmploymentStatus(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

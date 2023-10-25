///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IContractStatus } from '../contract-status.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../contract-status.test-samples';

import { ContractStatusService } from './contract-status.service';

const requireRestSample: IContractStatus = {
  ...sampleWithRequiredData,
};

describe('ContractStatus Service', () => {
  let service: ContractStatusService;
  let httpMock: HttpTestingController;
  let expectedResult: IContractStatus | IContractStatus[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ContractStatusService);
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

    it('should create a ContractStatus', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const contractStatus = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(contractStatus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ContractStatus', () => {
      const contractStatus = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(contractStatus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ContractStatus', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ContractStatus', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ContractStatus', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addContractStatusToCollectionIfMissing', () => {
      it('should add a ContractStatus to an empty array', () => {
        const contractStatus: IContractStatus = sampleWithRequiredData;
        expectedResult = service.addContractStatusToCollectionIfMissing([], contractStatus);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(contractStatus);
      });

      it('should not add a ContractStatus to an array that contains it', () => {
        const contractStatus: IContractStatus = sampleWithRequiredData;
        const contractStatusCollection: IContractStatus[] = [
          {
            ...contractStatus,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addContractStatusToCollectionIfMissing(contractStatusCollection, contractStatus);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ContractStatus to an array that doesn't contain it", () => {
        const contractStatus: IContractStatus = sampleWithRequiredData;
        const contractStatusCollection: IContractStatus[] = [sampleWithPartialData];
        expectedResult = service.addContractStatusToCollectionIfMissing(contractStatusCollection, contractStatus);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(contractStatus);
      });

      it('should add only unique ContractStatus to an array', () => {
        const contractStatusArray: IContractStatus[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const contractStatusCollection: IContractStatus[] = [sampleWithRequiredData];
        expectedResult = service.addContractStatusToCollectionIfMissing(contractStatusCollection, ...contractStatusArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const contractStatus: IContractStatus = sampleWithRequiredData;
        const contractStatus2: IContractStatus = sampleWithPartialData;
        expectedResult = service.addContractStatusToCollectionIfMissing([], contractStatus, contractStatus2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(contractStatus);
        expect(expectedResult).toContain(contractStatus2);
      });

      it('should accept null and undefined values', () => {
        const contractStatus: IContractStatus = sampleWithRequiredData;
        expectedResult = service.addContractStatusToCollectionIfMissing([], null, contractStatus, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(contractStatus);
      });

      it('should return initial array if no ContractStatus is added', () => {
        const contractStatusCollection: IContractStatus[] = [sampleWithRequiredData];
        expectedResult = service.addContractStatusToCollectionIfMissing(contractStatusCollection, undefined, null);
        expect(expectedResult).toEqual(contractStatusCollection);
      });
    });

    describe('compareContractStatus', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareContractStatus(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareContractStatus(entity1, entity2);
        const compareResult2 = service.compareContractStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareContractStatus(entity1, entity2);
        const compareResult2 = service.compareContractStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareContractStatus(entity1, entity2);
        const compareResult2 = service.compareContractStatus(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

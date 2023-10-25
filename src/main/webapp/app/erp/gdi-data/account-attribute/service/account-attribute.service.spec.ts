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

import { DATE_FORMAT } from 'app/config/input.constants';
import { IAccountAttribute } from '../account-attribute.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../account-attribute.test-samples';

import { AccountAttributeService, RestAccountAttribute } from './account-attribute.service';

const requireRestSample: RestAccountAttribute = {
  ...sampleWithRequiredData,
  reportingDate: sampleWithRequiredData.reportingDate?.format(DATE_FORMAT),
  accountOpeningDate: sampleWithRequiredData.accountOpeningDate?.format(DATE_FORMAT),
  accountClosingDate: sampleWithRequiredData.accountClosingDate?.format(DATE_FORMAT),
  accountStatusChangeDate: sampleWithRequiredData.accountStatusChangeDate?.format(DATE_FORMAT),
  expiryDate: sampleWithRequiredData.expiryDate?.format(DATE_FORMAT),
};

describe('AccountAttribute Service', () => {
  let service: AccountAttributeService;
  let httpMock: HttpTestingController;
  let expectedResult: IAccountAttribute | IAccountAttribute[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AccountAttributeService);
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

    it('should create a AccountAttribute', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const accountAttribute = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(accountAttribute).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AccountAttribute', () => {
      const accountAttribute = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(accountAttribute).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AccountAttribute', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AccountAttribute', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AccountAttribute', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAccountAttributeToCollectionIfMissing', () => {
      it('should add a AccountAttribute to an empty array', () => {
        const accountAttribute: IAccountAttribute = sampleWithRequiredData;
        expectedResult = service.addAccountAttributeToCollectionIfMissing([], accountAttribute);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(accountAttribute);
      });

      it('should not add a AccountAttribute to an array that contains it', () => {
        const accountAttribute: IAccountAttribute = sampleWithRequiredData;
        const accountAttributeCollection: IAccountAttribute[] = [
          {
            ...accountAttribute,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAccountAttributeToCollectionIfMissing(accountAttributeCollection, accountAttribute);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AccountAttribute to an array that doesn't contain it", () => {
        const accountAttribute: IAccountAttribute = sampleWithRequiredData;
        const accountAttributeCollection: IAccountAttribute[] = [sampleWithPartialData];
        expectedResult = service.addAccountAttributeToCollectionIfMissing(accountAttributeCollection, accountAttribute);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(accountAttribute);
      });

      it('should add only unique AccountAttribute to an array', () => {
        const accountAttributeArray: IAccountAttribute[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const accountAttributeCollection: IAccountAttribute[] = [sampleWithRequiredData];
        expectedResult = service.addAccountAttributeToCollectionIfMissing(accountAttributeCollection, ...accountAttributeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const accountAttribute: IAccountAttribute = sampleWithRequiredData;
        const accountAttribute2: IAccountAttribute = sampleWithPartialData;
        expectedResult = service.addAccountAttributeToCollectionIfMissing([], accountAttribute, accountAttribute2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(accountAttribute);
        expect(expectedResult).toContain(accountAttribute2);
      });

      it('should accept null and undefined values', () => {
        const accountAttribute: IAccountAttribute = sampleWithRequiredData;
        expectedResult = service.addAccountAttributeToCollectionIfMissing([], null, accountAttribute, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(accountAttribute);
      });

      it('should return initial array if no AccountAttribute is added', () => {
        const accountAttributeCollection: IAccountAttribute[] = [sampleWithRequiredData];
        expectedResult = service.addAccountAttributeToCollectionIfMissing(accountAttributeCollection, undefined, null);
        expect(expectedResult).toEqual(accountAttributeCollection);
      });
    });

    describe('compareAccountAttribute', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAccountAttribute(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAccountAttribute(entity1, entity2);
        const compareResult2 = service.compareAccountAttribute(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAccountAttribute(entity1, entity2);
        const compareResult2 = service.compareAccountAttribute(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAccountAttribute(entity1, entity2);
        const compareResult2 = service.compareAccountAttribute(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

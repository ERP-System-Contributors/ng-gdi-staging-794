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
import { ICollateralInformation } from '../collateral-information.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../collateral-information.test-samples';

import { CollateralInformationService, RestCollateralInformation } from './collateral-information.service';

const requireRestSample: RestCollateralInformation = {
  ...sampleWithRequiredData,
  reportingDate: sampleWithRequiredData.reportingDate?.format(DATE_FORMAT),
  collateralLastValuationDate: sampleWithRequiredData.collateralLastValuationDate?.format(DATE_FORMAT),
  insuranceExpiryDate: sampleWithRequiredData.insuranceExpiryDate?.format(DATE_FORMAT),
};

describe('CollateralInformation Service', () => {
  let service: CollateralInformationService;
  let httpMock: HttpTestingController;
  let expectedResult: ICollateralInformation | ICollateralInformation[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CollateralInformationService);
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

    it('should create a CollateralInformation', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const collateralInformation = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(collateralInformation).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CollateralInformation', () => {
      const collateralInformation = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(collateralInformation).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CollateralInformation', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CollateralInformation', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CollateralInformation', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCollateralInformationToCollectionIfMissing', () => {
      it('should add a CollateralInformation to an empty array', () => {
        const collateralInformation: ICollateralInformation = sampleWithRequiredData;
        expectedResult = service.addCollateralInformationToCollectionIfMissing([], collateralInformation);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(collateralInformation);
      });

      it('should not add a CollateralInformation to an array that contains it', () => {
        const collateralInformation: ICollateralInformation = sampleWithRequiredData;
        const collateralInformationCollection: ICollateralInformation[] = [
          {
            ...collateralInformation,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCollateralInformationToCollectionIfMissing(collateralInformationCollection, collateralInformation);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CollateralInformation to an array that doesn't contain it", () => {
        const collateralInformation: ICollateralInformation = sampleWithRequiredData;
        const collateralInformationCollection: ICollateralInformation[] = [sampleWithPartialData];
        expectedResult = service.addCollateralInformationToCollectionIfMissing(collateralInformationCollection, collateralInformation);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(collateralInformation);
      });

      it('should add only unique CollateralInformation to an array', () => {
        const collateralInformationArray: ICollateralInformation[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const collateralInformationCollection: ICollateralInformation[] = [sampleWithRequiredData];
        expectedResult = service.addCollateralInformationToCollectionIfMissing(
          collateralInformationCollection,
          ...collateralInformationArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const collateralInformation: ICollateralInformation = sampleWithRequiredData;
        const collateralInformation2: ICollateralInformation = sampleWithPartialData;
        expectedResult = service.addCollateralInformationToCollectionIfMissing([], collateralInformation, collateralInformation2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(collateralInformation);
        expect(expectedResult).toContain(collateralInformation2);
      });

      it('should accept null and undefined values', () => {
        const collateralInformation: ICollateralInformation = sampleWithRequiredData;
        expectedResult = service.addCollateralInformationToCollectionIfMissing([], null, collateralInformation, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(collateralInformation);
      });

      it('should return initial array if no CollateralInformation is added', () => {
        const collateralInformationCollection: ICollateralInformation[] = [sampleWithRequiredData];
        expectedResult = service.addCollateralInformationToCollectionIfMissing(collateralInformationCollection, undefined, null);
        expect(expectedResult).toEqual(collateralInformationCollection);
      });
    });

    describe('compareCollateralInformation', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCollateralInformation(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCollateralInformation(entity1, entity2);
        const compareResult2 = service.compareCollateralInformation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCollateralInformation(entity1, entity2);
        const compareResult2 = service.compareCollateralInformation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCollateralInformation(entity1, entity2);
        const compareResult2 = service.compareCollateralInformation(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

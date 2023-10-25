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

import { IChannelType } from '../channel-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../channel-type.test-samples';

import { ChannelTypeService } from './channel-type.service';

const requireRestSample: IChannelType = {
  ...sampleWithRequiredData,
};

describe('ChannelType Service', () => {
  let service: ChannelTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IChannelType | IChannelType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ChannelTypeService);
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

    it('should create a ChannelType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const channelType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(channelType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ChannelType', () => {
      const channelType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(channelType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ChannelType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ChannelType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ChannelType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addChannelTypeToCollectionIfMissing', () => {
      it('should add a ChannelType to an empty array', () => {
        const channelType: IChannelType = sampleWithRequiredData;
        expectedResult = service.addChannelTypeToCollectionIfMissing([], channelType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(channelType);
      });

      it('should not add a ChannelType to an array that contains it', () => {
        const channelType: IChannelType = sampleWithRequiredData;
        const channelTypeCollection: IChannelType[] = [
          {
            ...channelType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addChannelTypeToCollectionIfMissing(channelTypeCollection, channelType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ChannelType to an array that doesn't contain it", () => {
        const channelType: IChannelType = sampleWithRequiredData;
        const channelTypeCollection: IChannelType[] = [sampleWithPartialData];
        expectedResult = service.addChannelTypeToCollectionIfMissing(channelTypeCollection, channelType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(channelType);
      });

      it('should add only unique ChannelType to an array', () => {
        const channelTypeArray: IChannelType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const channelTypeCollection: IChannelType[] = [sampleWithRequiredData];
        expectedResult = service.addChannelTypeToCollectionIfMissing(channelTypeCollection, ...channelTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const channelType: IChannelType = sampleWithRequiredData;
        const channelType2: IChannelType = sampleWithPartialData;
        expectedResult = service.addChannelTypeToCollectionIfMissing([], channelType, channelType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(channelType);
        expect(expectedResult).toContain(channelType2);
      });

      it('should accept null and undefined values', () => {
        const channelType: IChannelType = sampleWithRequiredData;
        expectedResult = service.addChannelTypeToCollectionIfMissing([], null, channelType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(channelType);
      });

      it('should return initial array if no ChannelType is added', () => {
        const channelTypeCollection: IChannelType[] = [sampleWithRequiredData];
        expectedResult = service.addChannelTypeToCollectionIfMissing(channelTypeCollection, undefined, null);
        expect(expectedResult).toEqual(channelTypeCollection);
      });
    });

    describe('compareChannelType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareChannelType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareChannelType(entity1, entity2);
        const compareResult2 = service.compareChannelType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareChannelType(entity1, entity2);
        const compareResult2 = service.compareChannelType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareChannelType(entity1, entity2);
        const compareResult2 = service.compareChannelType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

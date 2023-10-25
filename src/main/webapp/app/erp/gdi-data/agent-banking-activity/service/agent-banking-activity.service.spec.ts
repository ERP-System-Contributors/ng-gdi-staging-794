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
import { IAgentBankingActivity } from '../agent-banking-activity.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../agent-banking-activity.test-samples';

import { AgentBankingActivityService, RestAgentBankingActivity } from './agent-banking-activity.service';

const requireRestSample: RestAgentBankingActivity = {
  ...sampleWithRequiredData,
  reportingDate: sampleWithRequiredData.reportingDate?.format(DATE_FORMAT),
};

describe('AgentBankingActivity Service', () => {
  let service: AgentBankingActivityService;
  let httpMock: HttpTestingController;
  let expectedResult: IAgentBankingActivity | IAgentBankingActivity[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AgentBankingActivityService);
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

    it('should create a AgentBankingActivity', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const agentBankingActivity = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(agentBankingActivity).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AgentBankingActivity', () => {
      const agentBankingActivity = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(agentBankingActivity).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AgentBankingActivity', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AgentBankingActivity', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AgentBankingActivity', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAgentBankingActivityToCollectionIfMissing', () => {
      it('should add a AgentBankingActivity to an empty array', () => {
        const agentBankingActivity: IAgentBankingActivity = sampleWithRequiredData;
        expectedResult = service.addAgentBankingActivityToCollectionIfMissing([], agentBankingActivity);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(agentBankingActivity);
      });

      it('should not add a AgentBankingActivity to an array that contains it', () => {
        const agentBankingActivity: IAgentBankingActivity = sampleWithRequiredData;
        const agentBankingActivityCollection: IAgentBankingActivity[] = [
          {
            ...agentBankingActivity,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAgentBankingActivityToCollectionIfMissing(agentBankingActivityCollection, agentBankingActivity);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AgentBankingActivity to an array that doesn't contain it", () => {
        const agentBankingActivity: IAgentBankingActivity = sampleWithRequiredData;
        const agentBankingActivityCollection: IAgentBankingActivity[] = [sampleWithPartialData];
        expectedResult = service.addAgentBankingActivityToCollectionIfMissing(agentBankingActivityCollection, agentBankingActivity);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(agentBankingActivity);
      });

      it('should add only unique AgentBankingActivity to an array', () => {
        const agentBankingActivityArray: IAgentBankingActivity[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const agentBankingActivityCollection: IAgentBankingActivity[] = [sampleWithRequiredData];
        expectedResult = service.addAgentBankingActivityToCollectionIfMissing(agentBankingActivityCollection, ...agentBankingActivityArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const agentBankingActivity: IAgentBankingActivity = sampleWithRequiredData;
        const agentBankingActivity2: IAgentBankingActivity = sampleWithPartialData;
        expectedResult = service.addAgentBankingActivityToCollectionIfMissing([], agentBankingActivity, agentBankingActivity2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(agentBankingActivity);
        expect(expectedResult).toContain(agentBankingActivity2);
      });

      it('should accept null and undefined values', () => {
        const agentBankingActivity: IAgentBankingActivity = sampleWithRequiredData;
        expectedResult = service.addAgentBankingActivityToCollectionIfMissing([], null, agentBankingActivity, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(agentBankingActivity);
      });

      it('should return initial array if no AgentBankingActivity is added', () => {
        const agentBankingActivityCollection: IAgentBankingActivity[] = [sampleWithRequiredData];
        expectedResult = service.addAgentBankingActivityToCollectionIfMissing(agentBankingActivityCollection, undefined, null);
        expect(expectedResult).toEqual(agentBankingActivityCollection);
      });
    });

    describe('compareAgentBankingActivity', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAgentBankingActivity(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAgentBankingActivity(entity1, entity2);
        const compareResult2 = service.compareAgentBankingActivity(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAgentBankingActivity(entity1, entity2);
        const compareResult2 = service.compareAgentBankingActivity(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAgentBankingActivity(entity1, entity2);
        const compareResult2 = service.compareAgentBankingActivity(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

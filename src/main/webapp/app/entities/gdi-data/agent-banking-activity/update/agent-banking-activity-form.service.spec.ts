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

import { sampleWithRequiredData, sampleWithNewData } from '../agent-banking-activity.test-samples';

import { AgentBankingActivityFormService } from './agent-banking-activity-form.service';

describe('AgentBankingActivity Form Service', () => {
  let service: AgentBankingActivityFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentBankingActivityFormService);
  });

  describe('Service methods', () => {
    describe('createAgentBankingActivityFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAgentBankingActivityFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            agentUniqueId: expect.any(Object),
            terminalUniqueId: expect.any(Object),
            totalCountOfTransactions: expect.any(Object),
            totalValueOfTransactionsInLCY: expect.any(Object),
            bankCode: expect.any(Object),
            branchCode: expect.any(Object),
            transactionType: expect.any(Object),
          })
        );
      });

      it('passing IAgentBankingActivity should create a new form with FormGroup', () => {
        const formGroup = service.createAgentBankingActivityFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingDate: expect.any(Object),
            agentUniqueId: expect.any(Object),
            terminalUniqueId: expect.any(Object),
            totalCountOfTransactions: expect.any(Object),
            totalValueOfTransactionsInLCY: expect.any(Object),
            bankCode: expect.any(Object),
            branchCode: expect.any(Object),
            transactionType: expect.any(Object),
          })
        );
      });
    });

    describe('getAgentBankingActivity', () => {
      it('should return NewAgentBankingActivity for default AgentBankingActivity initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAgentBankingActivityFormGroup(sampleWithNewData);

        const agentBankingActivity = service.getAgentBankingActivity(formGroup) as any;

        expect(agentBankingActivity).toMatchObject(sampleWithNewData);
      });

      it('should return NewAgentBankingActivity for empty AgentBankingActivity initial value', () => {
        const formGroup = service.createAgentBankingActivityFormGroup();

        const agentBankingActivity = service.getAgentBankingActivity(formGroup) as any;

        expect(agentBankingActivity).toMatchObject({});
      });

      it('should return IAgentBankingActivity', () => {
        const formGroup = service.createAgentBankingActivityFormGroup(sampleWithRequiredData);

        const agentBankingActivity = service.getAgentBankingActivity(formGroup) as any;

        expect(agentBankingActivity).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAgentBankingActivity should not enable id FormControl', () => {
        const formGroup = service.createAgentBankingActivityFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAgentBankingActivity should disable id FormControl', () => {
        const formGroup = service.createAgentBankingActivityFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

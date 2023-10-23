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

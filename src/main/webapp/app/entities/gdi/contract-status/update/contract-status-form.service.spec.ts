import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../contract-status.test-samples';

import { ContractStatusFormService } from './contract-status-form.service';

describe('ContractStatus Form Service', () => {
  let service: ContractStatusFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractStatusFormService);
  });

  describe('Service methods', () => {
    describe('createContractStatusFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createContractStatusFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            contractStatusCode: expect.any(Object),
            contractStatusType: expect.any(Object),
            contractStatusTypeDescription: expect.any(Object),
          })
        );
      });

      it('passing IContractStatus should create a new form with FormGroup', () => {
        const formGroup = service.createContractStatusFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            contractStatusCode: expect.any(Object),
            contractStatusType: expect.any(Object),
            contractStatusTypeDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getContractStatus', () => {
      it('should return NewContractStatus for default ContractStatus initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createContractStatusFormGroup(sampleWithNewData);

        const contractStatus = service.getContractStatus(formGroup) as any;

        expect(contractStatus).toMatchObject(sampleWithNewData);
      });

      it('should return NewContractStatus for empty ContractStatus initial value', () => {
        const formGroup = service.createContractStatusFormGroup();

        const contractStatus = service.getContractStatus(formGroup) as any;

        expect(contractStatus).toMatchObject({});
      });

      it('should return IContractStatus', () => {
        const formGroup = service.createContractStatusFormGroup(sampleWithRequiredData);

        const contractStatus = service.getContractStatus(formGroup) as any;

        expect(contractStatus).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IContractStatus should not enable id FormControl', () => {
        const formGroup = service.createContractStatusFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewContractStatus should disable id FormControl', () => {
        const formGroup = service.createContractStatusFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

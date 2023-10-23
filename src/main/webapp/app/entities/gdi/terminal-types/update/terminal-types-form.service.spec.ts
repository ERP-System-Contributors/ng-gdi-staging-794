import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../terminal-types.test-samples';

import { TerminalTypesFormService } from './terminal-types-form.service';

describe('TerminalTypes Form Service', () => {
  let service: TerminalTypesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerminalTypesFormService);
  });

  describe('Service methods', () => {
    describe('createTerminalTypesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTerminalTypesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            txnTerminalTypeCode: expect.any(Object),
            txnChannelType: expect.any(Object),
            txnChannelTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing ITerminalTypes should create a new form with FormGroup', () => {
        const formGroup = service.createTerminalTypesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            txnTerminalTypeCode: expect.any(Object),
            txnChannelType: expect.any(Object),
            txnChannelTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getTerminalTypes', () => {
      it('should return NewTerminalTypes for default TerminalTypes initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTerminalTypesFormGroup(sampleWithNewData);

        const terminalTypes = service.getTerminalTypes(formGroup) as any;

        expect(terminalTypes).toMatchObject(sampleWithNewData);
      });

      it('should return NewTerminalTypes for empty TerminalTypes initial value', () => {
        const formGroup = service.createTerminalTypesFormGroup();

        const terminalTypes = service.getTerminalTypes(formGroup) as any;

        expect(terminalTypes).toMatchObject({});
      });

      it('should return ITerminalTypes', () => {
        const formGroup = service.createTerminalTypesFormGroup(sampleWithRequiredData);

        const terminalTypes = service.getTerminalTypes(formGroup) as any;

        expect(terminalTypes).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITerminalTypes should not enable id FormControl', () => {
        const formGroup = service.createTerminalTypesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTerminalTypes should disable id FormControl', () => {
        const formGroup = service.createTerminalTypesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

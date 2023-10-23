import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../customer-complaint-status-type.test-samples';

import { CustomerComplaintStatusTypeFormService } from './customer-complaint-status-type-form.service';

describe('CustomerComplaintStatusType Form Service', () => {
  let service: CustomerComplaintStatusTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerComplaintStatusTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCustomerComplaintStatusTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCustomerComplaintStatusTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            customerComplaintStatusTypeCode: expect.any(Object),
            customerComplaintStatusType: expect.any(Object),
            customerComplaintStatusTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing ICustomerComplaintStatusType should create a new form with FormGroup', () => {
        const formGroup = service.createCustomerComplaintStatusTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            customerComplaintStatusTypeCode: expect.any(Object),
            customerComplaintStatusType: expect.any(Object),
            customerComplaintStatusTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getCustomerComplaintStatusType', () => {
      it('should return NewCustomerComplaintStatusType for default CustomerComplaintStatusType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCustomerComplaintStatusTypeFormGroup(sampleWithNewData);

        const customerComplaintStatusType = service.getCustomerComplaintStatusType(formGroup) as any;

        expect(customerComplaintStatusType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCustomerComplaintStatusType for empty CustomerComplaintStatusType initial value', () => {
        const formGroup = service.createCustomerComplaintStatusTypeFormGroup();

        const customerComplaintStatusType = service.getCustomerComplaintStatusType(formGroup) as any;

        expect(customerComplaintStatusType).toMatchObject({});
      });

      it('should return ICustomerComplaintStatusType', () => {
        const formGroup = service.createCustomerComplaintStatusTypeFormGroup(sampleWithRequiredData);

        const customerComplaintStatusType = service.getCustomerComplaintStatusType(formGroup) as any;

        expect(customerComplaintStatusType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICustomerComplaintStatusType should not enable id FormControl', () => {
        const formGroup = service.createCustomerComplaintStatusTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCustomerComplaintStatusType should disable id FormControl', () => {
        const formGroup = service.createCustomerComplaintStatusTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

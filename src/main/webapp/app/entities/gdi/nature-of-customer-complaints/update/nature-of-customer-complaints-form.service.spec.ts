import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../nature-of-customer-complaints.test-samples';

import { NatureOfCustomerComplaintsFormService } from './nature-of-customer-complaints-form.service';

describe('NatureOfCustomerComplaints Form Service', () => {
  let service: NatureOfCustomerComplaintsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NatureOfCustomerComplaintsFormService);
  });

  describe('Service methods', () => {
    describe('createNatureOfCustomerComplaintsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createNatureOfCustomerComplaintsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            natureOfComplaintTypeCode: expect.any(Object),
            natureOfComplaintType: expect.any(Object),
            natureOfComplaintTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing INatureOfCustomerComplaints should create a new form with FormGroup', () => {
        const formGroup = service.createNatureOfCustomerComplaintsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            natureOfComplaintTypeCode: expect.any(Object),
            natureOfComplaintType: expect.any(Object),
            natureOfComplaintTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getNatureOfCustomerComplaints', () => {
      it('should return NewNatureOfCustomerComplaints for default NatureOfCustomerComplaints initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createNatureOfCustomerComplaintsFormGroup(sampleWithNewData);

        const natureOfCustomerComplaints = service.getNatureOfCustomerComplaints(formGroup) as any;

        expect(natureOfCustomerComplaints).toMatchObject(sampleWithNewData);
      });

      it('should return NewNatureOfCustomerComplaints for empty NatureOfCustomerComplaints initial value', () => {
        const formGroup = service.createNatureOfCustomerComplaintsFormGroup();

        const natureOfCustomerComplaints = service.getNatureOfCustomerComplaints(formGroup) as any;

        expect(natureOfCustomerComplaints).toMatchObject({});
      });

      it('should return INatureOfCustomerComplaints', () => {
        const formGroup = service.createNatureOfCustomerComplaintsFormGroup(sampleWithRequiredData);

        const natureOfCustomerComplaints = service.getNatureOfCustomerComplaints(formGroup) as any;

        expect(natureOfCustomerComplaints).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing INatureOfCustomerComplaints should not enable id FormControl', () => {
        const formGroup = service.createNatureOfCustomerComplaintsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewNatureOfCustomerComplaints should disable id FormControl', () => {
        const formGroup = service.createNatureOfCustomerComplaintsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

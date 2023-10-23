import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../staff-current-employment-status.test-samples';

import { StaffCurrentEmploymentStatusFormService } from './staff-current-employment-status-form.service';

describe('StaffCurrentEmploymentStatus Form Service', () => {
  let service: StaffCurrentEmploymentStatusFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffCurrentEmploymentStatusFormService);
  });

  describe('Service methods', () => {
    describe('createStaffCurrentEmploymentStatusFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createStaffCurrentEmploymentStatusFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            staffCurrentEmploymentStatusTypeCode: expect.any(Object),
            staffCurrentEmploymentStatusType: expect.any(Object),
            staffCurrentEmploymentStatusTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing IStaffCurrentEmploymentStatus should create a new form with FormGroup', () => {
        const formGroup = service.createStaffCurrentEmploymentStatusFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            staffCurrentEmploymentStatusTypeCode: expect.any(Object),
            staffCurrentEmploymentStatusType: expect.any(Object),
            staffCurrentEmploymentStatusTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getStaffCurrentEmploymentStatus', () => {
      it('should return NewStaffCurrentEmploymentStatus for default StaffCurrentEmploymentStatus initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createStaffCurrentEmploymentStatusFormGroup(sampleWithNewData);

        const staffCurrentEmploymentStatus = service.getStaffCurrentEmploymentStatus(formGroup) as any;

        expect(staffCurrentEmploymentStatus).toMatchObject(sampleWithNewData);
      });

      it('should return NewStaffCurrentEmploymentStatus for empty StaffCurrentEmploymentStatus initial value', () => {
        const formGroup = service.createStaffCurrentEmploymentStatusFormGroup();

        const staffCurrentEmploymentStatus = service.getStaffCurrentEmploymentStatus(formGroup) as any;

        expect(staffCurrentEmploymentStatus).toMatchObject({});
      });

      it('should return IStaffCurrentEmploymentStatus', () => {
        const formGroup = service.createStaffCurrentEmploymentStatusFormGroup(sampleWithRequiredData);

        const staffCurrentEmploymentStatus = service.getStaffCurrentEmploymentStatus(formGroup) as any;

        expect(staffCurrentEmploymentStatus).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IStaffCurrentEmploymentStatus should not enable id FormControl', () => {
        const formGroup = service.createStaffCurrentEmploymentStatusFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewStaffCurrentEmploymentStatus should disable id FormControl', () => {
        const formGroup = service.createStaffCurrentEmploymentStatusFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

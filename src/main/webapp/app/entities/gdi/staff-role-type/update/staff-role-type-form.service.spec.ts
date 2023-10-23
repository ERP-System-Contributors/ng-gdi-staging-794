import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../staff-role-type.test-samples';

import { StaffRoleTypeFormService } from './staff-role-type-form.service';

describe('StaffRoleType Form Service', () => {
  let service: StaffRoleTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffRoleTypeFormService);
  });

  describe('Service methods', () => {
    describe('createStaffRoleTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createStaffRoleTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            staffRoleTypeCode: expect.any(Object),
            staffRoleType: expect.any(Object),
            staffRoleTypeDetails: expect.any(Object),
          })
        );
      });

      it('passing IStaffRoleType should create a new form with FormGroup', () => {
        const formGroup = service.createStaffRoleTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            staffRoleTypeCode: expect.any(Object),
            staffRoleType: expect.any(Object),
            staffRoleTypeDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getStaffRoleType', () => {
      it('should return NewStaffRoleType for default StaffRoleType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createStaffRoleTypeFormGroup(sampleWithNewData);

        const staffRoleType = service.getStaffRoleType(formGroup) as any;

        expect(staffRoleType).toMatchObject(sampleWithNewData);
      });

      it('should return NewStaffRoleType for empty StaffRoleType initial value', () => {
        const formGroup = service.createStaffRoleTypeFormGroup();

        const staffRoleType = service.getStaffRoleType(formGroup) as any;

        expect(staffRoleType).toMatchObject({});
      });

      it('should return IStaffRoleType', () => {
        const formGroup = service.createStaffRoleTypeFormGroup(sampleWithRequiredData);

        const staffRoleType = service.getStaffRoleType(formGroup) as any;

        expect(staffRoleType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IStaffRoleType should not enable id FormControl', () => {
        const formGroup = service.createStaffRoleTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewStaffRoleType should disable id FormControl', () => {
        const formGroup = service.createStaffRoleTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

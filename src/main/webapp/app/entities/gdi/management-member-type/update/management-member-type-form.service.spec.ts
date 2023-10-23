import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../management-member-type.test-samples';

import { ManagementMemberTypeFormService } from './management-member-type-form.service';

describe('ManagementMemberType Form Service', () => {
  let service: ManagementMemberTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagementMemberTypeFormService);
  });

  describe('Service methods', () => {
    describe('createManagementMemberTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createManagementMemberTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            managementMemberTypeCode: expect.any(Object),
            managementMemberType: expect.any(Object),
          })
        );
      });

      it('passing IManagementMemberType should create a new form with FormGroup', () => {
        const formGroup = service.createManagementMemberTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            managementMemberTypeCode: expect.any(Object),
            managementMemberType: expect.any(Object),
          })
        );
      });
    });

    describe('getManagementMemberType', () => {
      it('should return NewManagementMemberType for default ManagementMemberType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createManagementMemberTypeFormGroup(sampleWithNewData);

        const managementMemberType = service.getManagementMemberType(formGroup) as any;

        expect(managementMemberType).toMatchObject(sampleWithNewData);
      });

      it('should return NewManagementMemberType for empty ManagementMemberType initial value', () => {
        const formGroup = service.createManagementMemberTypeFormGroup();

        const managementMemberType = service.getManagementMemberType(formGroup) as any;

        expect(managementMemberType).toMatchObject({});
      });

      it('should return IManagementMemberType', () => {
        const formGroup = service.createManagementMemberTypeFormGroup(sampleWithRequiredData);

        const managementMemberType = service.getManagementMemberType(formGroup) as any;

        expect(managementMemberType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IManagementMemberType should not enable id FormControl', () => {
        const formGroup = service.createManagementMemberTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewManagementMemberType should disable id FormControl', () => {
        const formGroup = service.createManagementMemberTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

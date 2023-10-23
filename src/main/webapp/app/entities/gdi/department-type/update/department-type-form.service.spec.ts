import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../department-type.test-samples';

import { DepartmentTypeFormService } from './department-type-form.service';

describe('DepartmentType Form Service', () => {
  let service: DepartmentTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentTypeFormService);
  });

  describe('Service methods', () => {
    describe('createDepartmentTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDepartmentTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            departmentTypeCode: expect.any(Object),
            departmentType: expect.any(Object),
            departmentTypeDetails: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IDepartmentType should create a new form with FormGroup', () => {
        const formGroup = service.createDepartmentTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            departmentTypeCode: expect.any(Object),
            departmentType: expect.any(Object),
            departmentTypeDetails: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getDepartmentType', () => {
      it('should return NewDepartmentType for default DepartmentType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDepartmentTypeFormGroup(sampleWithNewData);

        const departmentType = service.getDepartmentType(formGroup) as any;

        expect(departmentType).toMatchObject(sampleWithNewData);
      });

      it('should return NewDepartmentType for empty DepartmentType initial value', () => {
        const formGroup = service.createDepartmentTypeFormGroup();

        const departmentType = service.getDepartmentType(formGroup) as any;

        expect(departmentType).toMatchObject({});
      });

      it('should return IDepartmentType', () => {
        const formGroup = service.createDepartmentTypeFormGroup(sampleWithRequiredData);

        const departmentType = service.getDepartmentType(formGroup) as any;

        expect(departmentType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDepartmentType should not enable id FormControl', () => {
        const formGroup = service.createDepartmentTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDepartmentType should disable id FormControl', () => {
        const formGroup = service.createDepartmentTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

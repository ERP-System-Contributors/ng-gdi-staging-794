import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IStaffRoleType, NewStaffRoleType } from '../staff-role-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IStaffRoleType for edit and NewStaffRoleTypeFormGroupInput for create.
 */
type StaffRoleTypeFormGroupInput = IStaffRoleType | PartialWithRequiredKeyOf<NewStaffRoleType>;

type StaffRoleTypeFormDefaults = Pick<NewStaffRoleType, 'id'>;

type StaffRoleTypeFormGroupContent = {
  id: FormControl<IStaffRoleType['id'] | NewStaffRoleType['id']>;
  staffRoleTypeCode: FormControl<IStaffRoleType['staffRoleTypeCode']>;
  staffRoleType: FormControl<IStaffRoleType['staffRoleType']>;
  staffRoleTypeDetails: FormControl<IStaffRoleType['staffRoleTypeDetails']>;
};

export type StaffRoleTypeFormGroup = FormGroup<StaffRoleTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class StaffRoleTypeFormService {
  createStaffRoleTypeFormGroup(staffRoleType: StaffRoleTypeFormGroupInput = { id: null }): StaffRoleTypeFormGroup {
    const staffRoleTypeRawValue = {
      ...this.getFormDefaults(),
      ...staffRoleType,
    };
    return new FormGroup<StaffRoleTypeFormGroupContent>({
      id: new FormControl(
        { value: staffRoleTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      staffRoleTypeCode: new FormControl(staffRoleTypeRawValue.staffRoleTypeCode, {
        validators: [Validators.required],
      }),
      staffRoleType: new FormControl(staffRoleTypeRawValue.staffRoleType, {
        validators: [Validators.required],
      }),
      staffRoleTypeDetails: new FormControl(staffRoleTypeRawValue.staffRoleTypeDetails),
    });
  }

  getStaffRoleType(form: StaffRoleTypeFormGroup): IStaffRoleType | NewStaffRoleType {
    return form.getRawValue() as IStaffRoleType | NewStaffRoleType;
  }

  resetForm(form: StaffRoleTypeFormGroup, staffRoleType: StaffRoleTypeFormGroupInput): void {
    const staffRoleTypeRawValue = { ...this.getFormDefaults(), ...staffRoleType };
    form.reset(
      {
        ...staffRoleTypeRawValue,
        id: { value: staffRoleTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): StaffRoleTypeFormDefaults {
    return {
      id: null,
    };
  }
}

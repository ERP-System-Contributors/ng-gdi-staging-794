///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IStaffCurrentEmploymentStatus, NewStaffCurrentEmploymentStatus } from '../staff-current-employment-status.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IStaffCurrentEmploymentStatus for edit and NewStaffCurrentEmploymentStatusFormGroupInput for create.
 */
type StaffCurrentEmploymentStatusFormGroupInput = IStaffCurrentEmploymentStatus | PartialWithRequiredKeyOf<NewStaffCurrentEmploymentStatus>;

type StaffCurrentEmploymentStatusFormDefaults = Pick<NewStaffCurrentEmploymentStatus, 'id'>;

type StaffCurrentEmploymentStatusFormGroupContent = {
  id: FormControl<IStaffCurrentEmploymentStatus['id'] | NewStaffCurrentEmploymentStatus['id']>;
  staffCurrentEmploymentStatusTypeCode: FormControl<IStaffCurrentEmploymentStatus['staffCurrentEmploymentStatusTypeCode']>;
  staffCurrentEmploymentStatusType: FormControl<IStaffCurrentEmploymentStatus['staffCurrentEmploymentStatusType']>;
  staffCurrentEmploymentStatusTypeDetails: FormControl<IStaffCurrentEmploymentStatus['staffCurrentEmploymentStatusTypeDetails']>;
};

export type StaffCurrentEmploymentStatusFormGroup = FormGroup<StaffCurrentEmploymentStatusFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class StaffCurrentEmploymentStatusFormService {
  createStaffCurrentEmploymentStatusFormGroup(
    staffCurrentEmploymentStatus: StaffCurrentEmploymentStatusFormGroupInput = { id: null }
  ): StaffCurrentEmploymentStatusFormGroup {
    const staffCurrentEmploymentStatusRawValue = {
      ...this.getFormDefaults(),
      ...staffCurrentEmploymentStatus,
    };
    return new FormGroup<StaffCurrentEmploymentStatusFormGroupContent>({
      id: new FormControl(
        { value: staffCurrentEmploymentStatusRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      staffCurrentEmploymentStatusTypeCode: new FormControl(staffCurrentEmploymentStatusRawValue.staffCurrentEmploymentStatusTypeCode, {
        validators: [Validators.required],
      }),
      staffCurrentEmploymentStatusType: new FormControl(staffCurrentEmploymentStatusRawValue.staffCurrentEmploymentStatusType, {
        validators: [Validators.required],
      }),
      staffCurrentEmploymentStatusTypeDetails: new FormControl(
        staffCurrentEmploymentStatusRawValue.staffCurrentEmploymentStatusTypeDetails
      ),
    });
  }

  getStaffCurrentEmploymentStatus(
    form: StaffCurrentEmploymentStatusFormGroup
  ): IStaffCurrentEmploymentStatus | NewStaffCurrentEmploymentStatus {
    return form.getRawValue() as IStaffCurrentEmploymentStatus | NewStaffCurrentEmploymentStatus;
  }

  resetForm(form: StaffCurrentEmploymentStatusFormGroup, staffCurrentEmploymentStatus: StaffCurrentEmploymentStatusFormGroupInput): void {
    const staffCurrentEmploymentStatusRawValue = { ...this.getFormDefaults(), ...staffCurrentEmploymentStatus };
    form.reset(
      {
        ...staffCurrentEmploymentStatusRawValue,
        id: { value: staffCurrentEmploymentStatusRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): StaffCurrentEmploymentStatusFormDefaults {
    return {
      id: null,
    };
  }
}

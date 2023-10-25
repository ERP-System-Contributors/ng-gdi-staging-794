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

import { INatureOfCustomerComplaints, NewNatureOfCustomerComplaints } from '../nature-of-customer-complaints.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts INatureOfCustomerComplaints for edit and NewNatureOfCustomerComplaintsFormGroupInput for create.
 */
type NatureOfCustomerComplaintsFormGroupInput = INatureOfCustomerComplaints | PartialWithRequiredKeyOf<NewNatureOfCustomerComplaints>;

type NatureOfCustomerComplaintsFormDefaults = Pick<NewNatureOfCustomerComplaints, 'id'>;

type NatureOfCustomerComplaintsFormGroupContent = {
  id: FormControl<INatureOfCustomerComplaints['id'] | NewNatureOfCustomerComplaints['id']>;
  natureOfComplaintTypeCode: FormControl<INatureOfCustomerComplaints['natureOfComplaintTypeCode']>;
  natureOfComplaintType: FormControl<INatureOfCustomerComplaints['natureOfComplaintType']>;
  natureOfComplaintTypeDetails: FormControl<INatureOfCustomerComplaints['natureOfComplaintTypeDetails']>;
};

export type NatureOfCustomerComplaintsFormGroup = FormGroup<NatureOfCustomerComplaintsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class NatureOfCustomerComplaintsFormService {
  createNatureOfCustomerComplaintsFormGroup(
    natureOfCustomerComplaints: NatureOfCustomerComplaintsFormGroupInput = { id: null }
  ): NatureOfCustomerComplaintsFormGroup {
    const natureOfCustomerComplaintsRawValue = {
      ...this.getFormDefaults(),
      ...natureOfCustomerComplaints,
    };
    return new FormGroup<NatureOfCustomerComplaintsFormGroupContent>({
      id: new FormControl(
        { value: natureOfCustomerComplaintsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      natureOfComplaintTypeCode: new FormControl(natureOfCustomerComplaintsRawValue.natureOfComplaintTypeCode, {
        validators: [Validators.required],
      }),
      natureOfComplaintType: new FormControl(natureOfCustomerComplaintsRawValue.natureOfComplaintType, {
        validators: [Validators.required],
      }),
      natureOfComplaintTypeDetails: new FormControl(natureOfCustomerComplaintsRawValue.natureOfComplaintTypeDetails),
    });
  }

  getNatureOfCustomerComplaints(form: NatureOfCustomerComplaintsFormGroup): INatureOfCustomerComplaints | NewNatureOfCustomerComplaints {
    return form.getRawValue() as INatureOfCustomerComplaints | NewNatureOfCustomerComplaints;
  }

  resetForm(form: NatureOfCustomerComplaintsFormGroup, natureOfCustomerComplaints: NatureOfCustomerComplaintsFormGroupInput): void {
    const natureOfCustomerComplaintsRawValue = { ...this.getFormDefaults(), ...natureOfCustomerComplaints };
    form.reset(
      {
        ...natureOfCustomerComplaintsRawValue,
        id: { value: natureOfCustomerComplaintsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): NatureOfCustomerComplaintsFormDefaults {
    return {
      id: null,
    };
  }
}

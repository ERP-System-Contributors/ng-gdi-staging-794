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

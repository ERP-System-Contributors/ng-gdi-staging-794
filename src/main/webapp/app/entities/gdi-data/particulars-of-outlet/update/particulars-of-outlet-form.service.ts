import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IParticularsOfOutlet, NewParticularsOfOutlet } from '../particulars-of-outlet.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IParticularsOfOutlet for edit and NewParticularsOfOutletFormGroupInput for create.
 */
type ParticularsOfOutletFormGroupInput = IParticularsOfOutlet | PartialWithRequiredKeyOf<NewParticularsOfOutlet>;

type ParticularsOfOutletFormDefaults = Pick<NewParticularsOfOutlet, 'id'>;

type ParticularsOfOutletFormGroupContent = {
  id: FormControl<IParticularsOfOutlet['id'] | NewParticularsOfOutlet['id']>;
  businessReportingDate: FormControl<IParticularsOfOutlet['businessReportingDate']>;
  outletName: FormControl<IParticularsOfOutlet['outletName']>;
  town: FormControl<IParticularsOfOutlet['town']>;
  iso6709Latitute: FormControl<IParticularsOfOutlet['iso6709Latitute']>;
  iso6709Longitude: FormControl<IParticularsOfOutlet['iso6709Longitude']>;
  cbkApprovalDate: FormControl<IParticularsOfOutlet['cbkApprovalDate']>;
  outletOpeningDate: FormControl<IParticularsOfOutlet['outletOpeningDate']>;
  outletClosureDate: FormControl<IParticularsOfOutlet['outletClosureDate']>;
  licenseFeePayable: FormControl<IParticularsOfOutlet['licenseFeePayable']>;
  subCountyCode: FormControl<IParticularsOfOutlet['subCountyCode']>;
  bankCode: FormControl<IParticularsOfOutlet['bankCode']>;
  outletId: FormControl<IParticularsOfOutlet['outletId']>;
  typeOfOutlet: FormControl<IParticularsOfOutlet['typeOfOutlet']>;
  outletStatus: FormControl<IParticularsOfOutlet['outletStatus']>;
};

export type ParticularsOfOutletFormGroup = FormGroup<ParticularsOfOutletFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ParticularsOfOutletFormService {
  createParticularsOfOutletFormGroup(particularsOfOutlet: ParticularsOfOutletFormGroupInput = { id: null }): ParticularsOfOutletFormGroup {
    const particularsOfOutletRawValue = {
      ...this.getFormDefaults(),
      ...particularsOfOutlet,
    };
    return new FormGroup<ParticularsOfOutletFormGroupContent>({
      id: new FormControl(
        { value: particularsOfOutletRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      businessReportingDate: new FormControl(particularsOfOutletRawValue.businessReportingDate, {
        validators: [Validators.required],
      }),
      outletName: new FormControl(particularsOfOutletRawValue.outletName, {
        validators: [Validators.required],
      }),
      town: new FormControl(particularsOfOutletRawValue.town, {
        validators: [Validators.required],
      }),
      iso6709Latitute: new FormControl(particularsOfOutletRawValue.iso6709Latitute, {
        validators: [Validators.required],
      }),
      iso6709Longitude: new FormControl(particularsOfOutletRawValue.iso6709Longitude, {
        validators: [Validators.required],
      }),
      cbkApprovalDate: new FormControl(particularsOfOutletRawValue.cbkApprovalDate, {
        validators: [Validators.required],
      }),
      outletOpeningDate: new FormControl(particularsOfOutletRawValue.outletOpeningDate, {
        validators: [Validators.required],
      }),
      outletClosureDate: new FormControl(particularsOfOutletRawValue.outletClosureDate),
      licenseFeePayable: new FormControl(particularsOfOutletRawValue.licenseFeePayable, {
        validators: [Validators.required],
      }),
      subCountyCode: new FormControl(particularsOfOutletRawValue.subCountyCode, {
        validators: [Validators.required],
      }),
      bankCode: new FormControl(particularsOfOutletRawValue.bankCode, {
        validators: [Validators.required],
      }),
      outletId: new FormControl(particularsOfOutletRawValue.outletId, {
        validators: [Validators.required],
      }),
      typeOfOutlet: new FormControl(particularsOfOutletRawValue.typeOfOutlet, {
        validators: [Validators.required],
      }),
      outletStatus: new FormControl(particularsOfOutletRawValue.outletStatus, {
        validators: [Validators.required],
      }),
    });
  }

  getParticularsOfOutlet(form: ParticularsOfOutletFormGroup): IParticularsOfOutlet | NewParticularsOfOutlet {
    return form.getRawValue() as IParticularsOfOutlet | NewParticularsOfOutlet;
  }

  resetForm(form: ParticularsOfOutletFormGroup, particularsOfOutlet: ParticularsOfOutletFormGroupInput): void {
    const particularsOfOutletRawValue = { ...this.getFormDefaults(), ...particularsOfOutlet };
    form.reset(
      {
        ...particularsOfOutletRawValue,
        id: { value: particularsOfOutletRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ParticularsOfOutletFormDefaults {
    return {
      id: null,
    };
  }
}

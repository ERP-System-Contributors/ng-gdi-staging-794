import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IInstitutionContactDetails, NewInstitutionContactDetails } from '../institution-contact-details.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInstitutionContactDetails for edit and NewInstitutionContactDetailsFormGroupInput for create.
 */
type InstitutionContactDetailsFormGroupInput = IInstitutionContactDetails | PartialWithRequiredKeyOf<NewInstitutionContactDetails>;

type InstitutionContactDetailsFormDefaults = Pick<NewInstitutionContactDetails, 'id'>;

type InstitutionContactDetailsFormGroupContent = {
  id: FormControl<IInstitutionContactDetails['id'] | NewInstitutionContactDetails['id']>;
  entityId: FormControl<IInstitutionContactDetails['entityId']>;
  entityName: FormControl<IInstitutionContactDetails['entityName']>;
  contactType: FormControl<IInstitutionContactDetails['contactType']>;
  contactLevel: FormControl<IInstitutionContactDetails['contactLevel']>;
  contactValue: FormControl<IInstitutionContactDetails['contactValue']>;
  contactName: FormControl<IInstitutionContactDetails['contactName']>;
  contactDesignation: FormControl<IInstitutionContactDetails['contactDesignation']>;
};

export type InstitutionContactDetailsFormGroup = FormGroup<InstitutionContactDetailsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InstitutionContactDetailsFormService {
  createInstitutionContactDetailsFormGroup(
    institutionContactDetails: InstitutionContactDetailsFormGroupInput = { id: null }
  ): InstitutionContactDetailsFormGroup {
    const institutionContactDetailsRawValue = {
      ...this.getFormDefaults(),
      ...institutionContactDetails,
    };
    return new FormGroup<InstitutionContactDetailsFormGroupContent>({
      id: new FormControl(
        { value: institutionContactDetailsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      entityId: new FormControl(institutionContactDetailsRawValue.entityId, {
        validators: [Validators.required],
      }),
      entityName: new FormControl(institutionContactDetailsRawValue.entityName, {
        validators: [Validators.required],
      }),
      contactType: new FormControl(institutionContactDetailsRawValue.contactType, {
        validators: [Validators.required],
      }),
      contactLevel: new FormControl(institutionContactDetailsRawValue.contactLevel),
      contactValue: new FormControl(institutionContactDetailsRawValue.contactValue),
      contactName: new FormControl(institutionContactDetailsRawValue.contactName),
      contactDesignation: new FormControl(institutionContactDetailsRawValue.contactDesignation),
    });
  }

  getInstitutionContactDetails(form: InstitutionContactDetailsFormGroup): IInstitutionContactDetails | NewInstitutionContactDetails {
    return form.getRawValue() as IInstitutionContactDetails | NewInstitutionContactDetails;
  }

  resetForm(form: InstitutionContactDetailsFormGroup, institutionContactDetails: InstitutionContactDetailsFormGroupInput): void {
    const institutionContactDetailsRawValue = { ...this.getFormDefaults(), ...institutionContactDetails };
    form.reset(
      {
        ...institutionContactDetailsRawValue,
        id: { value: institutionContactDetailsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): InstitutionContactDetailsFormDefaults {
    return {
      id: null,
    };
  }
}

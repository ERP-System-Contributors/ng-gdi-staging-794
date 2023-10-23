import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IIssuersOfSecurities, NewIssuersOfSecurities } from '../issuers-of-securities.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IIssuersOfSecurities for edit and NewIssuersOfSecuritiesFormGroupInput for create.
 */
type IssuersOfSecuritiesFormGroupInput = IIssuersOfSecurities | PartialWithRequiredKeyOf<NewIssuersOfSecurities>;

type IssuersOfSecuritiesFormDefaults = Pick<NewIssuersOfSecurities, 'id'>;

type IssuersOfSecuritiesFormGroupContent = {
  id: FormControl<IIssuersOfSecurities['id'] | NewIssuersOfSecurities['id']>;
  issuerOfSecuritiesCode: FormControl<IIssuersOfSecurities['issuerOfSecuritiesCode']>;
  issuerOfSecurities: FormControl<IIssuersOfSecurities['issuerOfSecurities']>;
  issuerOfSecuritiesDescription: FormControl<IIssuersOfSecurities['issuerOfSecuritiesDescription']>;
};

export type IssuersOfSecuritiesFormGroup = FormGroup<IssuersOfSecuritiesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class IssuersOfSecuritiesFormService {
  createIssuersOfSecuritiesFormGroup(issuersOfSecurities: IssuersOfSecuritiesFormGroupInput = { id: null }): IssuersOfSecuritiesFormGroup {
    const issuersOfSecuritiesRawValue = {
      ...this.getFormDefaults(),
      ...issuersOfSecurities,
    };
    return new FormGroup<IssuersOfSecuritiesFormGroupContent>({
      id: new FormControl(
        { value: issuersOfSecuritiesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      issuerOfSecuritiesCode: new FormControl(issuersOfSecuritiesRawValue.issuerOfSecuritiesCode, {
        validators: [Validators.required],
      }),
      issuerOfSecurities: new FormControl(issuersOfSecuritiesRawValue.issuerOfSecurities, {
        validators: [Validators.required],
      }),
      issuerOfSecuritiesDescription: new FormControl(issuersOfSecuritiesRawValue.issuerOfSecuritiesDescription),
    });
  }

  getIssuersOfSecurities(form: IssuersOfSecuritiesFormGroup): IIssuersOfSecurities | NewIssuersOfSecurities {
    return form.getRawValue() as IIssuersOfSecurities | NewIssuersOfSecurities;
  }

  resetForm(form: IssuersOfSecuritiesFormGroup, issuersOfSecurities: IssuersOfSecuritiesFormGroupInput): void {
    const issuersOfSecuritiesRawValue = { ...this.getFormDefaults(), ...issuersOfSecurities };
    form.reset(
      {
        ...issuersOfSecuritiesRawValue,
        id: { value: issuersOfSecuritiesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): IssuersOfSecuritiesFormDefaults {
    return {
      id: null,
    };
  }
}

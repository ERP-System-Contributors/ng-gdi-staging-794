import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrbAccountStatus, NewCrbAccountStatus } from '../crb-account-status.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbAccountStatus for edit and NewCrbAccountStatusFormGroupInput for create.
 */
type CrbAccountStatusFormGroupInput = ICrbAccountStatus | PartialWithRequiredKeyOf<NewCrbAccountStatus>;

type CrbAccountStatusFormDefaults = Pick<NewCrbAccountStatus, 'id'>;

type CrbAccountStatusFormGroupContent = {
  id: FormControl<ICrbAccountStatus['id'] | NewCrbAccountStatus['id']>;
  accountStatusTypeCode: FormControl<ICrbAccountStatus['accountStatusTypeCode']>;
  accountStatusType: FormControl<ICrbAccountStatus['accountStatusType']>;
  accountStatusTypeDetails: FormControl<ICrbAccountStatus['accountStatusTypeDetails']>;
};

export type CrbAccountStatusFormGroup = FormGroup<CrbAccountStatusFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbAccountStatusFormService {
  createCrbAccountStatusFormGroup(crbAccountStatus: CrbAccountStatusFormGroupInput = { id: null }): CrbAccountStatusFormGroup {
    const crbAccountStatusRawValue = {
      ...this.getFormDefaults(),
      ...crbAccountStatus,
    };
    return new FormGroup<CrbAccountStatusFormGroupContent>({
      id: new FormControl(
        { value: crbAccountStatusRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      accountStatusTypeCode: new FormControl(crbAccountStatusRawValue.accountStatusTypeCode, {
        validators: [Validators.required],
      }),
      accountStatusType: new FormControl(crbAccountStatusRawValue.accountStatusType, {
        validators: [Validators.required],
      }),
      accountStatusTypeDetails: new FormControl(crbAccountStatusRawValue.accountStatusTypeDetails),
    });
  }

  getCrbAccountStatus(form: CrbAccountStatusFormGroup): ICrbAccountStatus | NewCrbAccountStatus {
    return form.getRawValue() as ICrbAccountStatus | NewCrbAccountStatus;
  }

  resetForm(form: CrbAccountStatusFormGroup, crbAccountStatus: CrbAccountStatusFormGroupInput): void {
    const crbAccountStatusRawValue = { ...this.getFormDefaults(), ...crbAccountStatus };
    form.reset(
      {
        ...crbAccountStatusRawValue,
        id: { value: crbAccountStatusRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbAccountStatusFormDefaults {
    return {
      id: null,
    };
  }
}

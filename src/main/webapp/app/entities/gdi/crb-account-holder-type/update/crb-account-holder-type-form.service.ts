import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrbAccountHolderType, NewCrbAccountHolderType } from '../crb-account-holder-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbAccountHolderType for edit and NewCrbAccountHolderTypeFormGroupInput for create.
 */
type CrbAccountHolderTypeFormGroupInput = ICrbAccountHolderType | PartialWithRequiredKeyOf<NewCrbAccountHolderType>;

type CrbAccountHolderTypeFormDefaults = Pick<NewCrbAccountHolderType, 'id'>;

type CrbAccountHolderTypeFormGroupContent = {
  id: FormControl<ICrbAccountHolderType['id'] | NewCrbAccountHolderType['id']>;
  accountHolderCategoryTypeCode: FormControl<ICrbAccountHolderType['accountHolderCategoryTypeCode']>;
  accountHolderCategoryType: FormControl<ICrbAccountHolderType['accountHolderCategoryType']>;
};

export type CrbAccountHolderTypeFormGroup = FormGroup<CrbAccountHolderTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbAccountHolderTypeFormService {
  createCrbAccountHolderTypeFormGroup(
    crbAccountHolderType: CrbAccountHolderTypeFormGroupInput = { id: null }
  ): CrbAccountHolderTypeFormGroup {
    const crbAccountHolderTypeRawValue = {
      ...this.getFormDefaults(),
      ...crbAccountHolderType,
    };
    return new FormGroup<CrbAccountHolderTypeFormGroupContent>({
      id: new FormControl(
        { value: crbAccountHolderTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      accountHolderCategoryTypeCode: new FormControl(crbAccountHolderTypeRawValue.accountHolderCategoryTypeCode, {
        validators: [Validators.required],
      }),
      accountHolderCategoryType: new FormControl(crbAccountHolderTypeRawValue.accountHolderCategoryType, {
        validators: [Validators.required],
      }),
    });
  }

  getCrbAccountHolderType(form: CrbAccountHolderTypeFormGroup): ICrbAccountHolderType | NewCrbAccountHolderType {
    return form.getRawValue() as ICrbAccountHolderType | NewCrbAccountHolderType;
  }

  resetForm(form: CrbAccountHolderTypeFormGroup, crbAccountHolderType: CrbAccountHolderTypeFormGroupInput): void {
    const crbAccountHolderTypeRawValue = { ...this.getFormDefaults(), ...crbAccountHolderType };
    form.reset(
      {
        ...crbAccountHolderTypeRawValue,
        id: { value: crbAccountHolderTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbAccountHolderTypeFormDefaults {
    return {
      id: null,
    };
  }
}

import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IMerchantType, NewMerchantType } from '../merchant-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMerchantType for edit and NewMerchantTypeFormGroupInput for create.
 */
type MerchantTypeFormGroupInput = IMerchantType | PartialWithRequiredKeyOf<NewMerchantType>;

type MerchantTypeFormDefaults = Pick<NewMerchantType, 'id'>;

type MerchantTypeFormGroupContent = {
  id: FormControl<IMerchantType['id'] | NewMerchantType['id']>;
  merchantTypeCode: FormControl<IMerchantType['merchantTypeCode']>;
  merchantType: FormControl<IMerchantType['merchantType']>;
  merchantTypeDetails: FormControl<IMerchantType['merchantTypeDetails']>;
};

export type MerchantTypeFormGroup = FormGroup<MerchantTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MerchantTypeFormService {
  createMerchantTypeFormGroup(merchantType: MerchantTypeFormGroupInput = { id: null }): MerchantTypeFormGroup {
    const merchantTypeRawValue = {
      ...this.getFormDefaults(),
      ...merchantType,
    };
    return new FormGroup<MerchantTypeFormGroupContent>({
      id: new FormControl(
        { value: merchantTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      merchantTypeCode: new FormControl(merchantTypeRawValue.merchantTypeCode, {
        validators: [Validators.required],
      }),
      merchantType: new FormControl(merchantTypeRawValue.merchantType, {
        validators: [Validators.required],
      }),
      merchantTypeDetails: new FormControl(merchantTypeRawValue.merchantTypeDetails),
    });
  }

  getMerchantType(form: MerchantTypeFormGroup): IMerchantType | NewMerchantType {
    return form.getRawValue() as IMerchantType | NewMerchantType;
  }

  resetForm(form: MerchantTypeFormGroup, merchantType: MerchantTypeFormGroupInput): void {
    const merchantTypeRawValue = { ...this.getFormDefaults(), ...merchantType };
    form.reset(
      {
        ...merchantTypeRawValue,
        id: { value: merchantTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): MerchantTypeFormDefaults {
    return {
      id: null,
    };
  }
}

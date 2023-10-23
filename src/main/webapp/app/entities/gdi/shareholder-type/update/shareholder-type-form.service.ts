import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IShareholderType, NewShareholderType } from '../shareholder-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IShareholderType for edit and NewShareholderTypeFormGroupInput for create.
 */
type ShareholderTypeFormGroupInput = IShareholderType | PartialWithRequiredKeyOf<NewShareholderType>;

type ShareholderTypeFormDefaults = Pick<NewShareholderType, 'id'>;

type ShareholderTypeFormGroupContent = {
  id: FormControl<IShareholderType['id'] | NewShareholderType['id']>;
  shareHolderTypeCode: FormControl<IShareholderType['shareHolderTypeCode']>;
  shareHolderType: FormControl<IShareholderType['shareHolderType']>;
};

export type ShareholderTypeFormGroup = FormGroup<ShareholderTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ShareholderTypeFormService {
  createShareholderTypeFormGroup(shareholderType: ShareholderTypeFormGroupInput = { id: null }): ShareholderTypeFormGroup {
    const shareholderTypeRawValue = {
      ...this.getFormDefaults(),
      ...shareholderType,
    };
    return new FormGroup<ShareholderTypeFormGroupContent>({
      id: new FormControl(
        { value: shareholderTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      shareHolderTypeCode: new FormControl(shareholderTypeRawValue.shareHolderTypeCode, {
        validators: [Validators.required],
      }),
      shareHolderType: new FormControl(shareholderTypeRawValue.shareHolderType, {
        validators: [Validators.required],
      }),
    });
  }

  getShareholderType(form: ShareholderTypeFormGroup): IShareholderType | NewShareholderType {
    return form.getRawValue() as IShareholderType | NewShareholderType;
  }

  resetForm(form: ShareholderTypeFormGroup, shareholderType: ShareholderTypeFormGroupInput): void {
    const shareholderTypeRawValue = { ...this.getFormDefaults(), ...shareholderType };
    form.reset(
      {
        ...shareholderTypeRawValue,
        id: { value: shareholderTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ShareholderTypeFormDefaults {
    return {
      id: null,
    };
  }
}

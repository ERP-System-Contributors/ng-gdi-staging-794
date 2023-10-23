import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IShareHoldingFlag, NewShareHoldingFlag } from '../share-holding-flag.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IShareHoldingFlag for edit and NewShareHoldingFlagFormGroupInput for create.
 */
type ShareHoldingFlagFormGroupInput = IShareHoldingFlag | PartialWithRequiredKeyOf<NewShareHoldingFlag>;

type ShareHoldingFlagFormDefaults = Pick<NewShareHoldingFlag, 'id'>;

type ShareHoldingFlagFormGroupContent = {
  id: FormControl<IShareHoldingFlag['id'] | NewShareHoldingFlag['id']>;
  shareholdingFlagTypeCode: FormControl<IShareHoldingFlag['shareholdingFlagTypeCode']>;
  shareholdingFlagType: FormControl<IShareHoldingFlag['shareholdingFlagType']>;
  shareholdingTypeDescription: FormControl<IShareHoldingFlag['shareholdingTypeDescription']>;
};

export type ShareHoldingFlagFormGroup = FormGroup<ShareHoldingFlagFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ShareHoldingFlagFormService {
  createShareHoldingFlagFormGroup(shareHoldingFlag: ShareHoldingFlagFormGroupInput = { id: null }): ShareHoldingFlagFormGroup {
    const shareHoldingFlagRawValue = {
      ...this.getFormDefaults(),
      ...shareHoldingFlag,
    };
    return new FormGroup<ShareHoldingFlagFormGroupContent>({
      id: new FormControl(
        { value: shareHoldingFlagRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      shareholdingFlagTypeCode: new FormControl(shareHoldingFlagRawValue.shareholdingFlagTypeCode, {
        validators: [Validators.required],
      }),
      shareholdingFlagType: new FormControl(shareHoldingFlagRawValue.shareholdingFlagType, {
        validators: [Validators.required],
      }),
      shareholdingTypeDescription: new FormControl(shareHoldingFlagRawValue.shareholdingTypeDescription),
    });
  }

  getShareHoldingFlag(form: ShareHoldingFlagFormGroup): IShareHoldingFlag | NewShareHoldingFlag {
    return form.getRawValue() as IShareHoldingFlag | NewShareHoldingFlag;
  }

  resetForm(form: ShareHoldingFlagFormGroup, shareHoldingFlag: ShareHoldingFlagFormGroupInput): void {
    const shareHoldingFlagRawValue = { ...this.getFormDefaults(), ...shareHoldingFlag };
    form.reset(
      {
        ...shareHoldingFlagRawValue,
        id: { value: shareHoldingFlagRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ShareHoldingFlagFormDefaults {
    return {
      id: null,
    };
  }
}

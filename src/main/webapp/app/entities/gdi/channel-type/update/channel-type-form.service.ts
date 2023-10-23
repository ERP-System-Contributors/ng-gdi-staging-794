import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IChannelType, NewChannelType } from '../channel-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IChannelType for edit and NewChannelTypeFormGroupInput for create.
 */
type ChannelTypeFormGroupInput = IChannelType | PartialWithRequiredKeyOf<NewChannelType>;

type ChannelTypeFormDefaults = Pick<NewChannelType, 'id'>;

type ChannelTypeFormGroupContent = {
  id: FormControl<IChannelType['id'] | NewChannelType['id']>;
  channelsTypeCode: FormControl<IChannelType['channelsTypeCode']>;
  channelTypes: FormControl<IChannelType['channelTypes']>;
  channelTypeDetails: FormControl<IChannelType['channelTypeDetails']>;
};

export type ChannelTypeFormGroup = FormGroup<ChannelTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ChannelTypeFormService {
  createChannelTypeFormGroup(channelType: ChannelTypeFormGroupInput = { id: null }): ChannelTypeFormGroup {
    const channelTypeRawValue = {
      ...this.getFormDefaults(),
      ...channelType,
    };
    return new FormGroup<ChannelTypeFormGroupContent>({
      id: new FormControl(
        { value: channelTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      channelsTypeCode: new FormControl(channelTypeRawValue.channelsTypeCode, {
        validators: [Validators.required],
      }),
      channelTypes: new FormControl(channelTypeRawValue.channelTypes, {
        validators: [Validators.required],
      }),
      channelTypeDetails: new FormControl(channelTypeRawValue.channelTypeDetails),
    });
  }

  getChannelType(form: ChannelTypeFormGroup): IChannelType | NewChannelType {
    return form.getRawValue() as IChannelType | NewChannelType;
  }

  resetForm(form: ChannelTypeFormGroup, channelType: ChannelTypeFormGroupInput): void {
    const channelTypeRawValue = { ...this.getFormDefaults(), ...channelType };
    form.reset(
      {
        ...channelTypeRawValue,
        id: { value: channelTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ChannelTypeFormDefaults {
    return {
      id: null,
    };
  }
}

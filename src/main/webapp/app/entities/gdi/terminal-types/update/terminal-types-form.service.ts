import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITerminalTypes, NewTerminalTypes } from '../terminal-types.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITerminalTypes for edit and NewTerminalTypesFormGroupInput for create.
 */
type TerminalTypesFormGroupInput = ITerminalTypes | PartialWithRequiredKeyOf<NewTerminalTypes>;

type TerminalTypesFormDefaults = Pick<NewTerminalTypes, 'id'>;

type TerminalTypesFormGroupContent = {
  id: FormControl<ITerminalTypes['id'] | NewTerminalTypes['id']>;
  txnTerminalTypeCode: FormControl<ITerminalTypes['txnTerminalTypeCode']>;
  txnChannelType: FormControl<ITerminalTypes['txnChannelType']>;
  txnChannelTypeDetails: FormControl<ITerminalTypes['txnChannelTypeDetails']>;
};

export type TerminalTypesFormGroup = FormGroup<TerminalTypesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TerminalTypesFormService {
  createTerminalTypesFormGroup(terminalTypes: TerminalTypesFormGroupInput = { id: null }): TerminalTypesFormGroup {
    const terminalTypesRawValue = {
      ...this.getFormDefaults(),
      ...terminalTypes,
    };
    return new FormGroup<TerminalTypesFormGroupContent>({
      id: new FormControl(
        { value: terminalTypesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      txnTerminalTypeCode: new FormControl(terminalTypesRawValue.txnTerminalTypeCode, {
        validators: [Validators.required],
      }),
      txnChannelType: new FormControl(terminalTypesRawValue.txnChannelType, {
        validators: [Validators.required],
      }),
      txnChannelTypeDetails: new FormControl(terminalTypesRawValue.txnChannelTypeDetails),
    });
  }

  getTerminalTypes(form: TerminalTypesFormGroup): ITerminalTypes | NewTerminalTypes {
    return form.getRawValue() as ITerminalTypes | NewTerminalTypes;
  }

  resetForm(form: TerminalTypesFormGroup, terminalTypes: TerminalTypesFormGroupInput): void {
    const terminalTypesRawValue = { ...this.getFormDefaults(), ...terminalTypes };
    form.reset(
      {
        ...terminalTypesRawValue,
        id: { value: terminalTypesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TerminalTypesFormDefaults {
    return {
      id: null,
    };
  }
}

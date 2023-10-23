import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITerminalFunctions, NewTerminalFunctions } from '../terminal-functions.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITerminalFunctions for edit and NewTerminalFunctionsFormGroupInput for create.
 */
type TerminalFunctionsFormGroupInput = ITerminalFunctions | PartialWithRequiredKeyOf<NewTerminalFunctions>;

type TerminalFunctionsFormDefaults = Pick<NewTerminalFunctions, 'id'>;

type TerminalFunctionsFormGroupContent = {
  id: FormControl<ITerminalFunctions['id'] | NewTerminalFunctions['id']>;
  functionCode: FormControl<ITerminalFunctions['functionCode']>;
  terminalFunctionality: FormControl<ITerminalFunctions['terminalFunctionality']>;
};

export type TerminalFunctionsFormGroup = FormGroup<TerminalFunctionsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TerminalFunctionsFormService {
  createTerminalFunctionsFormGroup(terminalFunctions: TerminalFunctionsFormGroupInput = { id: null }): TerminalFunctionsFormGroup {
    const terminalFunctionsRawValue = {
      ...this.getFormDefaults(),
      ...terminalFunctions,
    };
    return new FormGroup<TerminalFunctionsFormGroupContent>({
      id: new FormControl(
        { value: terminalFunctionsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      functionCode: new FormControl(terminalFunctionsRawValue.functionCode, {
        validators: [Validators.required],
      }),
      terminalFunctionality: new FormControl(terminalFunctionsRawValue.terminalFunctionality, {
        validators: [Validators.required],
      }),
    });
  }

  getTerminalFunctions(form: TerminalFunctionsFormGroup): ITerminalFunctions | NewTerminalFunctions {
    return form.getRawValue() as ITerminalFunctions | NewTerminalFunctions;
  }

  resetForm(form: TerminalFunctionsFormGroup, terminalFunctions: TerminalFunctionsFormGroupInput): void {
    const terminalFunctionsRawValue = { ...this.getFormDefaults(), ...terminalFunctions };
    form.reset(
      {
        ...terminalFunctionsRawValue,
        id: { value: terminalFunctionsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TerminalFunctionsFormDefaults {
    return {
      id: null,
    };
  }
}

import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISourcesOfFundsTypeCode, NewSourcesOfFundsTypeCode } from '../sources-of-funds-type-code.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISourcesOfFundsTypeCode for edit and NewSourcesOfFundsTypeCodeFormGroupInput for create.
 */
type SourcesOfFundsTypeCodeFormGroupInput = ISourcesOfFundsTypeCode | PartialWithRequiredKeyOf<NewSourcesOfFundsTypeCode>;

type SourcesOfFundsTypeCodeFormDefaults = Pick<NewSourcesOfFundsTypeCode, 'id'>;

type SourcesOfFundsTypeCodeFormGroupContent = {
  id: FormControl<ISourcesOfFundsTypeCode['id'] | NewSourcesOfFundsTypeCode['id']>;
  sourceOfFundsTypeCode: FormControl<ISourcesOfFundsTypeCode['sourceOfFundsTypeCode']>;
  sourceOfFundsType: FormControl<ISourcesOfFundsTypeCode['sourceOfFundsType']>;
  sourceOfFundsTypeDetails: FormControl<ISourcesOfFundsTypeCode['sourceOfFundsTypeDetails']>;
};

export type SourcesOfFundsTypeCodeFormGroup = FormGroup<SourcesOfFundsTypeCodeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SourcesOfFundsTypeCodeFormService {
  createSourcesOfFundsTypeCodeFormGroup(
    sourcesOfFundsTypeCode: SourcesOfFundsTypeCodeFormGroupInput = { id: null }
  ): SourcesOfFundsTypeCodeFormGroup {
    const sourcesOfFundsTypeCodeRawValue = {
      ...this.getFormDefaults(),
      ...sourcesOfFundsTypeCode,
    };
    return new FormGroup<SourcesOfFundsTypeCodeFormGroupContent>({
      id: new FormControl(
        { value: sourcesOfFundsTypeCodeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      sourceOfFundsTypeCode: new FormControl(sourcesOfFundsTypeCodeRawValue.sourceOfFundsTypeCode, {
        validators: [Validators.required],
      }),
      sourceOfFundsType: new FormControl(sourcesOfFundsTypeCodeRawValue.sourceOfFundsType, {
        validators: [Validators.required],
      }),
      sourceOfFundsTypeDetails: new FormControl(sourcesOfFundsTypeCodeRawValue.sourceOfFundsTypeDetails),
    });
  }

  getSourcesOfFundsTypeCode(form: SourcesOfFundsTypeCodeFormGroup): ISourcesOfFundsTypeCode | NewSourcesOfFundsTypeCode {
    return form.getRawValue() as ISourcesOfFundsTypeCode | NewSourcesOfFundsTypeCode;
  }

  resetForm(form: SourcesOfFundsTypeCodeFormGroup, sourcesOfFundsTypeCode: SourcesOfFundsTypeCodeFormGroupInput): void {
    const sourcesOfFundsTypeCodeRawValue = { ...this.getFormDefaults(), ...sourcesOfFundsTypeCode };
    form.reset(
      {
        ...sourcesOfFundsTypeCodeRawValue,
        id: { value: sourcesOfFundsTypeCodeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SourcesOfFundsTypeCodeFormDefaults {
    return {
      id: null,
    };
  }
}

import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISourceRemittancePurposeType, NewSourceRemittancePurposeType } from '../source-remittance-purpose-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISourceRemittancePurposeType for edit and NewSourceRemittancePurposeTypeFormGroupInput for create.
 */
type SourceRemittancePurposeTypeFormGroupInput = ISourceRemittancePurposeType | PartialWithRequiredKeyOf<NewSourceRemittancePurposeType>;

type SourceRemittancePurposeTypeFormDefaults = Pick<NewSourceRemittancePurposeType, 'id'>;

type SourceRemittancePurposeTypeFormGroupContent = {
  id: FormControl<ISourceRemittancePurposeType['id'] | NewSourceRemittancePurposeType['id']>;
  sourceOrPurposeTypeCode: FormControl<ISourceRemittancePurposeType['sourceOrPurposeTypeCode']>;
  sourceOrPurposeOfRemittanceFlag: FormControl<ISourceRemittancePurposeType['sourceOrPurposeOfRemittanceFlag']>;
  sourceOrPurposeOfRemittanceType: FormControl<ISourceRemittancePurposeType['sourceOrPurposeOfRemittanceType']>;
  remittancePurposeTypeDetails: FormControl<ISourceRemittancePurposeType['remittancePurposeTypeDetails']>;
};

export type SourceRemittancePurposeTypeFormGroup = FormGroup<SourceRemittancePurposeTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SourceRemittancePurposeTypeFormService {
  createSourceRemittancePurposeTypeFormGroup(
    sourceRemittancePurposeType: SourceRemittancePurposeTypeFormGroupInput = { id: null }
  ): SourceRemittancePurposeTypeFormGroup {
    const sourceRemittancePurposeTypeRawValue = {
      ...this.getFormDefaults(),
      ...sourceRemittancePurposeType,
    };
    return new FormGroup<SourceRemittancePurposeTypeFormGroupContent>({
      id: new FormControl(
        { value: sourceRemittancePurposeTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      sourceOrPurposeTypeCode: new FormControl(sourceRemittancePurposeTypeRawValue.sourceOrPurposeTypeCode, {
        validators: [Validators.required],
      }),
      sourceOrPurposeOfRemittanceFlag: new FormControl(sourceRemittancePurposeTypeRawValue.sourceOrPurposeOfRemittanceFlag, {
        validators: [Validators.required],
      }),
      sourceOrPurposeOfRemittanceType: new FormControl(sourceRemittancePurposeTypeRawValue.sourceOrPurposeOfRemittanceType, {
        validators: [Validators.required],
      }),
      remittancePurposeTypeDetails: new FormControl(sourceRemittancePurposeTypeRawValue.remittancePurposeTypeDetails),
    });
  }

  getSourceRemittancePurposeType(
    form: SourceRemittancePurposeTypeFormGroup
  ): ISourceRemittancePurposeType | NewSourceRemittancePurposeType {
    return form.getRawValue() as ISourceRemittancePurposeType | NewSourceRemittancePurposeType;
  }

  resetForm(form: SourceRemittancePurposeTypeFormGroup, sourceRemittancePurposeType: SourceRemittancePurposeTypeFormGroupInput): void {
    const sourceRemittancePurposeTypeRawValue = { ...this.getFormDefaults(), ...sourceRemittancePurposeType };
    form.reset(
      {
        ...sourceRemittancePurposeTypeRawValue,
        id: { value: sourceRemittancePurposeTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SourceRemittancePurposeTypeFormDefaults {
    return {
      id: null,
    };
  }
}

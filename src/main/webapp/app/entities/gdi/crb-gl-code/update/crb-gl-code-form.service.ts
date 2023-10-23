import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrbGlCode, NewCrbGlCode } from '../crb-gl-code.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbGlCode for edit and NewCrbGlCodeFormGroupInput for create.
 */
type CrbGlCodeFormGroupInput = ICrbGlCode | PartialWithRequiredKeyOf<NewCrbGlCode>;

type CrbGlCodeFormDefaults = Pick<NewCrbGlCode, 'id'>;

type CrbGlCodeFormGroupContent = {
  id: FormControl<ICrbGlCode['id'] | NewCrbGlCode['id']>;
  glCode: FormControl<ICrbGlCode['glCode']>;
  glDescription: FormControl<ICrbGlCode['glDescription']>;
  glType: FormControl<ICrbGlCode['glType']>;
  institutionCategory: FormControl<ICrbGlCode['institutionCategory']>;
};

export type CrbGlCodeFormGroup = FormGroup<CrbGlCodeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbGlCodeFormService {
  createCrbGlCodeFormGroup(crbGlCode: CrbGlCodeFormGroupInput = { id: null }): CrbGlCodeFormGroup {
    const crbGlCodeRawValue = {
      ...this.getFormDefaults(),
      ...crbGlCode,
    };
    return new FormGroup<CrbGlCodeFormGroupContent>({
      id: new FormControl(
        { value: crbGlCodeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      glCode: new FormControl(crbGlCodeRawValue.glCode, {
        validators: [Validators.required],
      }),
      glDescription: new FormControl(crbGlCodeRawValue.glDescription, {
        validators: [Validators.required],
      }),
      glType: new FormControl(crbGlCodeRawValue.glType, {
        validators: [Validators.required],
      }),
      institutionCategory: new FormControl(crbGlCodeRawValue.institutionCategory, {
        validators: [Validators.required],
      }),
    });
  }

  getCrbGlCode(form: CrbGlCodeFormGroup): ICrbGlCode | NewCrbGlCode {
    return form.getRawValue() as ICrbGlCode | NewCrbGlCode;
  }

  resetForm(form: CrbGlCodeFormGroup, crbGlCode: CrbGlCodeFormGroupInput): void {
    const crbGlCodeRawValue = { ...this.getFormDefaults(), ...crbGlCode };
    form.reset(
      {
        ...crbGlCodeRawValue,
        id: { value: crbGlCodeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbGlCodeFormDefaults {
    return {
      id: null,
    };
  }
}

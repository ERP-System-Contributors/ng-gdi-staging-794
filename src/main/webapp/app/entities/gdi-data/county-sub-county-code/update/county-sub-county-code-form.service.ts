import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICountySubCountyCode, NewCountySubCountyCode } from '../county-sub-county-code.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICountySubCountyCode for edit and NewCountySubCountyCodeFormGroupInput for create.
 */
type CountySubCountyCodeFormGroupInput = ICountySubCountyCode | PartialWithRequiredKeyOf<NewCountySubCountyCode>;

type CountySubCountyCodeFormDefaults = Pick<NewCountySubCountyCode, 'id'>;

type CountySubCountyCodeFormGroupContent = {
  id: FormControl<ICountySubCountyCode['id'] | NewCountySubCountyCode['id']>;
  subCountyCode: FormControl<ICountySubCountyCode['subCountyCode']>;
  subCountyName: FormControl<ICountySubCountyCode['subCountyName']>;
  countyCode: FormControl<ICountySubCountyCode['countyCode']>;
  countyName: FormControl<ICountySubCountyCode['countyName']>;
};

export type CountySubCountyCodeFormGroup = FormGroup<CountySubCountyCodeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CountySubCountyCodeFormService {
  createCountySubCountyCodeFormGroup(countySubCountyCode: CountySubCountyCodeFormGroupInput = { id: null }): CountySubCountyCodeFormGroup {
    const countySubCountyCodeRawValue = {
      ...this.getFormDefaults(),
      ...countySubCountyCode,
    };
    return new FormGroup<CountySubCountyCodeFormGroupContent>({
      id: new FormControl(
        { value: countySubCountyCodeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      subCountyCode: new FormControl(countySubCountyCodeRawValue.subCountyCode, {
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^\\d{4}$')],
      }),
      subCountyName: new FormControl(countySubCountyCodeRawValue.subCountyName, {
        validators: [Validators.required],
      }),
      countyCode: new FormControl(countySubCountyCodeRawValue.countyCode, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern('^\\d{2}$')],
      }),
      countyName: new FormControl(countySubCountyCodeRawValue.countyName, {
        validators: [Validators.required],
      }),
    });
  }

  getCountySubCountyCode(form: CountySubCountyCodeFormGroup): ICountySubCountyCode | NewCountySubCountyCode {
    return form.getRawValue() as ICountySubCountyCode | NewCountySubCountyCode;
  }

  resetForm(form: CountySubCountyCodeFormGroup, countySubCountyCode: CountySubCountyCodeFormGroupInput): void {
    const countySubCountyCodeRawValue = { ...this.getFormDefaults(), ...countySubCountyCode };
    form.reset(
      {
        ...countySubCountyCodeRawValue,
        id: { value: countySubCountyCodeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CountySubCountyCodeFormDefaults {
    return {
      id: null,
    };
  }
}

import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISnaSectorCode, NewSnaSectorCode } from '../sna-sector-code.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISnaSectorCode for edit and NewSnaSectorCodeFormGroupInput for create.
 */
type SnaSectorCodeFormGroupInput = ISnaSectorCode | PartialWithRequiredKeyOf<NewSnaSectorCode>;

type SnaSectorCodeFormDefaults = Pick<NewSnaSectorCode, 'id'>;

type SnaSectorCodeFormGroupContent = {
  id: FormControl<ISnaSectorCode['id'] | NewSnaSectorCode['id']>;
  sectorTypeCode: FormControl<ISnaSectorCode['sectorTypeCode']>;
  mainSectorCode: FormControl<ISnaSectorCode['mainSectorCode']>;
  mainSectorTypeName: FormControl<ISnaSectorCode['mainSectorTypeName']>;
  subSectorCode: FormControl<ISnaSectorCode['subSectorCode']>;
  subSectorName: FormControl<ISnaSectorCode['subSectorName']>;
  subSubSectorCode: FormControl<ISnaSectorCode['subSubSectorCode']>;
  subSubSectorName: FormControl<ISnaSectorCode['subSubSectorName']>;
};

export type SnaSectorCodeFormGroup = FormGroup<SnaSectorCodeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SnaSectorCodeFormService {
  createSnaSectorCodeFormGroup(snaSectorCode: SnaSectorCodeFormGroupInput = { id: null }): SnaSectorCodeFormGroup {
    const snaSectorCodeRawValue = {
      ...this.getFormDefaults(),
      ...snaSectorCode,
    };
    return new FormGroup<SnaSectorCodeFormGroupContent>({
      id: new FormControl(
        { value: snaSectorCodeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      sectorTypeCode: new FormControl(snaSectorCodeRawValue.sectorTypeCode, {
        validators: [Validators.required],
      }),
      mainSectorCode: new FormControl(snaSectorCodeRawValue.mainSectorCode),
      mainSectorTypeName: new FormControl(snaSectorCodeRawValue.mainSectorTypeName),
      subSectorCode: new FormControl(snaSectorCodeRawValue.subSectorCode),
      subSectorName: new FormControl(snaSectorCodeRawValue.subSectorName),
      subSubSectorCode: new FormControl(snaSectorCodeRawValue.subSubSectorCode),
      subSubSectorName: new FormControl(snaSectorCodeRawValue.subSubSectorName),
    });
  }

  getSnaSectorCode(form: SnaSectorCodeFormGroup): ISnaSectorCode | NewSnaSectorCode {
    return form.getRawValue() as ISnaSectorCode | NewSnaSectorCode;
  }

  resetForm(form: SnaSectorCodeFormGroup, snaSectorCode: SnaSectorCodeFormGroupInput): void {
    const snaSectorCodeRawValue = { ...this.getFormDefaults(), ...snaSectorCode };
    form.reset(
      {
        ...snaSectorCodeRawValue,
        id: { value: snaSectorCodeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SnaSectorCodeFormDefaults {
    return {
      id: null,
    };
  }
}

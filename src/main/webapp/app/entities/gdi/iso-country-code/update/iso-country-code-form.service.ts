import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IIsoCountryCode, NewIsoCountryCode } from '../iso-country-code.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IIsoCountryCode for edit and NewIsoCountryCodeFormGroupInput for create.
 */
type IsoCountryCodeFormGroupInput = IIsoCountryCode | PartialWithRequiredKeyOf<NewIsoCountryCode>;

type IsoCountryCodeFormDefaults = Pick<NewIsoCountryCode, 'id'>;

type IsoCountryCodeFormGroupContent = {
  id: FormControl<IIsoCountryCode['id'] | NewIsoCountryCode['id']>;
  countryCode: FormControl<IIsoCountryCode['countryCode']>;
  countryDescription: FormControl<IIsoCountryCode['countryDescription']>;
  continentCode: FormControl<IIsoCountryCode['continentCode']>;
  continentName: FormControl<IIsoCountryCode['continentName']>;
  subRegion: FormControl<IIsoCountryCode['subRegion']>;
};

export type IsoCountryCodeFormGroup = FormGroup<IsoCountryCodeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class IsoCountryCodeFormService {
  createIsoCountryCodeFormGroup(isoCountryCode: IsoCountryCodeFormGroupInput = { id: null }): IsoCountryCodeFormGroup {
    const isoCountryCodeRawValue = {
      ...this.getFormDefaults(),
      ...isoCountryCode,
    };
    return new FormGroup<IsoCountryCodeFormGroupContent>({
      id: new FormControl(
        { value: isoCountryCodeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      countryCode: new FormControl(isoCountryCodeRawValue.countryCode),
      countryDescription: new FormControl(isoCountryCodeRawValue.countryDescription),
      continentCode: new FormControl(isoCountryCodeRawValue.continentCode),
      continentName: new FormControl(isoCountryCodeRawValue.continentName),
      subRegion: new FormControl(isoCountryCodeRawValue.subRegion),
    });
  }

  getIsoCountryCode(form: IsoCountryCodeFormGroup): IIsoCountryCode | NewIsoCountryCode {
    return form.getRawValue() as IIsoCountryCode | NewIsoCountryCode;
  }

  resetForm(form: IsoCountryCodeFormGroup, isoCountryCode: IsoCountryCodeFormGroupInput): void {
    const isoCountryCodeRawValue = { ...this.getFormDefaults(), ...isoCountryCode };
    form.reset(
      {
        ...isoCountryCodeRawValue,
        id: { value: isoCountryCodeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): IsoCountryCodeFormDefaults {
    return {
      id: null,
    };
  }
}

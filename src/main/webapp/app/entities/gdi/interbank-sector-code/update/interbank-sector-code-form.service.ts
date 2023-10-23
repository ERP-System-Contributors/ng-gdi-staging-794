///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IInterbankSectorCode, NewInterbankSectorCode } from '../interbank-sector-code.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInterbankSectorCode for edit and NewInterbankSectorCodeFormGroupInput for create.
 */
type InterbankSectorCodeFormGroupInput = IInterbankSectorCode | PartialWithRequiredKeyOf<NewInterbankSectorCode>;

type InterbankSectorCodeFormDefaults = Pick<NewInterbankSectorCode, 'id'>;

type InterbankSectorCodeFormGroupContent = {
  id: FormControl<IInterbankSectorCode['id'] | NewInterbankSectorCode['id']>;
  interbankSectorCode: FormControl<IInterbankSectorCode['interbankSectorCode']>;
  interbankSectorCodeDescription: FormControl<IInterbankSectorCode['interbankSectorCodeDescription']>;
};

export type InterbankSectorCodeFormGroup = FormGroup<InterbankSectorCodeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InterbankSectorCodeFormService {
  createInterbankSectorCodeFormGroup(interbankSectorCode: InterbankSectorCodeFormGroupInput = { id: null }): InterbankSectorCodeFormGroup {
    const interbankSectorCodeRawValue = {
      ...this.getFormDefaults(),
      ...interbankSectorCode,
    };
    return new FormGroup<InterbankSectorCodeFormGroupContent>({
      id: new FormControl(
        { value: interbankSectorCodeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      interbankSectorCode: new FormControl(interbankSectorCodeRawValue.interbankSectorCode, {
        validators: [Validators.required],
      }),
      interbankSectorCodeDescription: new FormControl(interbankSectorCodeRawValue.interbankSectorCodeDescription),
    });
  }

  getInterbankSectorCode(form: InterbankSectorCodeFormGroup): IInterbankSectorCode | NewInterbankSectorCode {
    return form.getRawValue() as IInterbankSectorCode | NewInterbankSectorCode;
  }

  resetForm(form: InterbankSectorCodeFormGroup, interbankSectorCode: InterbankSectorCodeFormGroupInput): void {
    const interbankSectorCodeRawValue = { ...this.getFormDefaults(), ...interbankSectorCode };
    form.reset(
      {
        ...interbankSectorCodeRawValue,
        id: { value: interbankSectorCodeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): InterbankSectorCodeFormDefaults {
    return {
      id: null,
    };
  }
}

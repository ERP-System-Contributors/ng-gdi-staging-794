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

import { IIssuersOfSecurities, NewIssuersOfSecurities } from '../issuers-of-securities.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IIssuersOfSecurities for edit and NewIssuersOfSecuritiesFormGroupInput for create.
 */
type IssuersOfSecuritiesFormGroupInput = IIssuersOfSecurities | PartialWithRequiredKeyOf<NewIssuersOfSecurities>;

type IssuersOfSecuritiesFormDefaults = Pick<NewIssuersOfSecurities, 'id'>;

type IssuersOfSecuritiesFormGroupContent = {
  id: FormControl<IIssuersOfSecurities['id'] | NewIssuersOfSecurities['id']>;
  issuerOfSecuritiesCode: FormControl<IIssuersOfSecurities['issuerOfSecuritiesCode']>;
  issuerOfSecurities: FormControl<IIssuersOfSecurities['issuerOfSecurities']>;
  issuerOfSecuritiesDescription: FormControl<IIssuersOfSecurities['issuerOfSecuritiesDescription']>;
};

export type IssuersOfSecuritiesFormGroup = FormGroup<IssuersOfSecuritiesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class IssuersOfSecuritiesFormService {
  createIssuersOfSecuritiesFormGroup(issuersOfSecurities: IssuersOfSecuritiesFormGroupInput = { id: null }): IssuersOfSecuritiesFormGroup {
    const issuersOfSecuritiesRawValue = {
      ...this.getFormDefaults(),
      ...issuersOfSecurities,
    };
    return new FormGroup<IssuersOfSecuritiesFormGroupContent>({
      id: new FormControl(
        { value: issuersOfSecuritiesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      issuerOfSecuritiesCode: new FormControl(issuersOfSecuritiesRawValue.issuerOfSecuritiesCode, {
        validators: [Validators.required],
      }),
      issuerOfSecurities: new FormControl(issuersOfSecuritiesRawValue.issuerOfSecurities, {
        validators: [Validators.required],
      }),
      issuerOfSecuritiesDescription: new FormControl(issuersOfSecuritiesRawValue.issuerOfSecuritiesDescription),
    });
  }

  getIssuersOfSecurities(form: IssuersOfSecuritiesFormGroup): IIssuersOfSecurities | NewIssuersOfSecurities {
    return form.getRawValue() as IIssuersOfSecurities | NewIssuersOfSecurities;
  }

  resetForm(form: IssuersOfSecuritiesFormGroup, issuersOfSecurities: IssuersOfSecuritiesFormGroupInput): void {
    const issuersOfSecuritiesRawValue = { ...this.getFormDefaults(), ...issuersOfSecurities };
    form.reset(
      {
        ...issuersOfSecuritiesRawValue,
        id: { value: issuersOfSecuritiesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): IssuersOfSecuritiesFormDefaults {
    return {
      id: null,
    };
  }
}

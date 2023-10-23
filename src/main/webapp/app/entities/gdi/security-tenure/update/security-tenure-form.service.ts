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

import { ISecurityTenure, NewSecurityTenure } from '../security-tenure.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISecurityTenure for edit and NewSecurityTenureFormGroupInput for create.
 */
type SecurityTenureFormGroupInput = ISecurityTenure | PartialWithRequiredKeyOf<NewSecurityTenure>;

type SecurityTenureFormDefaults = Pick<NewSecurityTenure, 'id'>;

type SecurityTenureFormGroupContent = {
  id: FormControl<ISecurityTenure['id'] | NewSecurityTenure['id']>;
  securityTenureCode: FormControl<ISecurityTenure['securityTenureCode']>;
  securityTenureType: FormControl<ISecurityTenure['securityTenureType']>;
  securityTenureDetails: FormControl<ISecurityTenure['securityTenureDetails']>;
};

export type SecurityTenureFormGroup = FormGroup<SecurityTenureFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SecurityTenureFormService {
  createSecurityTenureFormGroup(securityTenure: SecurityTenureFormGroupInput = { id: null }): SecurityTenureFormGroup {
    const securityTenureRawValue = {
      ...this.getFormDefaults(),
      ...securityTenure,
    };
    return new FormGroup<SecurityTenureFormGroupContent>({
      id: new FormControl(
        { value: securityTenureRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      securityTenureCode: new FormControl(securityTenureRawValue.securityTenureCode, {
        validators: [Validators.required],
      }),
      securityTenureType: new FormControl(securityTenureRawValue.securityTenureType, {
        validators: [Validators.required],
      }),
      securityTenureDetails: new FormControl(securityTenureRawValue.securityTenureDetails),
    });
  }

  getSecurityTenure(form: SecurityTenureFormGroup): ISecurityTenure | NewSecurityTenure {
    return form.getRawValue() as ISecurityTenure | NewSecurityTenure;
  }

  resetForm(form: SecurityTenureFormGroup, securityTenure: SecurityTenureFormGroupInput): void {
    const securityTenureRawValue = { ...this.getFormDefaults(), ...securityTenure };
    form.reset(
      {
        ...securityTenureRawValue,
        id: { value: securityTenureRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SecurityTenureFormDefaults {
    return {
      id: null,
    };
  }
}

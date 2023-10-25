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

import { ISecurityClassificationType, NewSecurityClassificationType } from '../security-classification-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISecurityClassificationType for edit and NewSecurityClassificationTypeFormGroupInput for create.
 */
type SecurityClassificationTypeFormGroupInput = ISecurityClassificationType | PartialWithRequiredKeyOf<NewSecurityClassificationType>;

type SecurityClassificationTypeFormDefaults = Pick<NewSecurityClassificationType, 'id'>;

type SecurityClassificationTypeFormGroupContent = {
  id: FormControl<ISecurityClassificationType['id'] | NewSecurityClassificationType['id']>;
  securityClassificationTypeCode: FormControl<ISecurityClassificationType['securityClassificationTypeCode']>;
  securityClassificationType: FormControl<ISecurityClassificationType['securityClassificationType']>;
  securityClassificationDetails: FormControl<ISecurityClassificationType['securityClassificationDetails']>;
};

export type SecurityClassificationTypeFormGroup = FormGroup<SecurityClassificationTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SecurityClassificationTypeFormService {
  createSecurityClassificationTypeFormGroup(
    securityClassificationType: SecurityClassificationTypeFormGroupInput = { id: null }
  ): SecurityClassificationTypeFormGroup {
    const securityClassificationTypeRawValue = {
      ...this.getFormDefaults(),
      ...securityClassificationType,
    };
    return new FormGroup<SecurityClassificationTypeFormGroupContent>({
      id: new FormControl(
        { value: securityClassificationTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      securityClassificationTypeCode: new FormControl(securityClassificationTypeRawValue.securityClassificationTypeCode, {
        validators: [Validators.required],
      }),
      securityClassificationType: new FormControl(securityClassificationTypeRawValue.securityClassificationType, {
        validators: [Validators.required],
      }),
      securityClassificationDetails: new FormControl(securityClassificationTypeRawValue.securityClassificationDetails),
    });
  }

  getSecurityClassificationType(form: SecurityClassificationTypeFormGroup): ISecurityClassificationType | NewSecurityClassificationType {
    return form.getRawValue() as ISecurityClassificationType | NewSecurityClassificationType;
  }

  resetForm(form: SecurityClassificationTypeFormGroup, securityClassificationType: SecurityClassificationTypeFormGroupInput): void {
    const securityClassificationTypeRawValue = { ...this.getFormDefaults(), ...securityClassificationType };
    form.reset(
      {
        ...securityClassificationTypeRawValue,
        id: { value: securityClassificationTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SecurityClassificationTypeFormDefaults {
    return {
      id: null,
    };
  }
}

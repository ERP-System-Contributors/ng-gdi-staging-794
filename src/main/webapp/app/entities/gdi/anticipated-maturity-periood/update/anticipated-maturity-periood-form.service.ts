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

import { IAnticipatedMaturityPeriood, NewAnticipatedMaturityPeriood } from '../anticipated-maturity-periood.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAnticipatedMaturityPeriood for edit and NewAnticipatedMaturityPerioodFormGroupInput for create.
 */
type AnticipatedMaturityPerioodFormGroupInput = IAnticipatedMaturityPeriood | PartialWithRequiredKeyOf<NewAnticipatedMaturityPeriood>;

type AnticipatedMaturityPerioodFormDefaults = Pick<NewAnticipatedMaturityPeriood, 'id'>;

type AnticipatedMaturityPerioodFormGroupContent = {
  id: FormControl<IAnticipatedMaturityPeriood['id'] | NewAnticipatedMaturityPeriood['id']>;
  anticipatedMaturityTenorCode: FormControl<IAnticipatedMaturityPeriood['anticipatedMaturityTenorCode']>;
  aniticipatedMaturityTenorType: FormControl<IAnticipatedMaturityPeriood['aniticipatedMaturityTenorType']>;
  anticipatedMaturityTenorDetails: FormControl<IAnticipatedMaturityPeriood['anticipatedMaturityTenorDetails']>;
};

export type AnticipatedMaturityPerioodFormGroup = FormGroup<AnticipatedMaturityPerioodFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AnticipatedMaturityPerioodFormService {
  createAnticipatedMaturityPerioodFormGroup(
    anticipatedMaturityPeriood: AnticipatedMaturityPerioodFormGroupInput = { id: null }
  ): AnticipatedMaturityPerioodFormGroup {
    const anticipatedMaturityPerioodRawValue = {
      ...this.getFormDefaults(),
      ...anticipatedMaturityPeriood,
    };
    return new FormGroup<AnticipatedMaturityPerioodFormGroupContent>({
      id: new FormControl(
        { value: anticipatedMaturityPerioodRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      anticipatedMaturityTenorCode: new FormControl(anticipatedMaturityPerioodRawValue.anticipatedMaturityTenorCode, {
        validators: [Validators.required],
      }),
      aniticipatedMaturityTenorType: new FormControl(anticipatedMaturityPerioodRawValue.aniticipatedMaturityTenorType, {
        validators: [Validators.required],
      }),
      anticipatedMaturityTenorDetails: new FormControl(anticipatedMaturityPerioodRawValue.anticipatedMaturityTenorDetails),
    });
  }

  getAnticipatedMaturityPeriood(form: AnticipatedMaturityPerioodFormGroup): IAnticipatedMaturityPeriood | NewAnticipatedMaturityPeriood {
    return form.getRawValue() as IAnticipatedMaturityPeriood | NewAnticipatedMaturityPeriood;
  }

  resetForm(form: AnticipatedMaturityPerioodFormGroup, anticipatedMaturityPeriood: AnticipatedMaturityPerioodFormGroupInput): void {
    const anticipatedMaturityPerioodRawValue = { ...this.getFormDefaults(), ...anticipatedMaturityPeriood };
    form.reset(
      {
        ...anticipatedMaturityPerioodRawValue,
        id: { value: anticipatedMaturityPerioodRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AnticipatedMaturityPerioodFormDefaults {
    return {
      id: null,
    };
  }
}

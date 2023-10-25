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

import { IReasonsForBouncedCheque, NewReasonsForBouncedCheque } from '../reasons-for-bounced-cheque.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IReasonsForBouncedCheque for edit and NewReasonsForBouncedChequeFormGroupInput for create.
 */
type ReasonsForBouncedChequeFormGroupInput = IReasonsForBouncedCheque | PartialWithRequiredKeyOf<NewReasonsForBouncedCheque>;

type ReasonsForBouncedChequeFormDefaults = Pick<NewReasonsForBouncedCheque, 'id'>;

type ReasonsForBouncedChequeFormGroupContent = {
  id: FormControl<IReasonsForBouncedCheque['id'] | NewReasonsForBouncedCheque['id']>;
  bouncedChequeReasonsTypeCode: FormControl<IReasonsForBouncedCheque['bouncedChequeReasonsTypeCode']>;
  bouncedChequeReasonsType: FormControl<IReasonsForBouncedCheque['bouncedChequeReasonsType']>;
};

export type ReasonsForBouncedChequeFormGroup = FormGroup<ReasonsForBouncedChequeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ReasonsForBouncedChequeFormService {
  createReasonsForBouncedChequeFormGroup(
    reasonsForBouncedCheque: ReasonsForBouncedChequeFormGroupInput = { id: null }
  ): ReasonsForBouncedChequeFormGroup {
    const reasonsForBouncedChequeRawValue = {
      ...this.getFormDefaults(),
      ...reasonsForBouncedCheque,
    };
    return new FormGroup<ReasonsForBouncedChequeFormGroupContent>({
      id: new FormControl(
        { value: reasonsForBouncedChequeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      bouncedChequeReasonsTypeCode: new FormControl(reasonsForBouncedChequeRawValue.bouncedChequeReasonsTypeCode, {
        validators: [Validators.required],
      }),
      bouncedChequeReasonsType: new FormControl(reasonsForBouncedChequeRawValue.bouncedChequeReasonsType),
    });
  }

  getReasonsForBouncedCheque(form: ReasonsForBouncedChequeFormGroup): IReasonsForBouncedCheque | NewReasonsForBouncedCheque {
    return form.getRawValue() as IReasonsForBouncedCheque | NewReasonsForBouncedCheque;
  }

  resetForm(form: ReasonsForBouncedChequeFormGroup, reasonsForBouncedCheque: ReasonsForBouncedChequeFormGroupInput): void {
    const reasonsForBouncedChequeRawValue = { ...this.getFormDefaults(), ...reasonsForBouncedCheque };
    form.reset(
      {
        ...reasonsForBouncedChequeRawValue,
        id: { value: reasonsForBouncedChequeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ReasonsForBouncedChequeFormDefaults {
    return {
      id: null,
    };
  }
}

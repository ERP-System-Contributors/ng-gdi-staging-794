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

import { IAcquiringIssuingFlag, NewAcquiringIssuingFlag } from '../acquiring-issuing-flag.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAcquiringIssuingFlag for edit and NewAcquiringIssuingFlagFormGroupInput for create.
 */
type AcquiringIssuingFlagFormGroupInput = IAcquiringIssuingFlag | PartialWithRequiredKeyOf<NewAcquiringIssuingFlag>;

type AcquiringIssuingFlagFormDefaults = Pick<NewAcquiringIssuingFlag, 'id'>;

type AcquiringIssuingFlagFormGroupContent = {
  id: FormControl<IAcquiringIssuingFlag['id'] | NewAcquiringIssuingFlag['id']>;
  cardAcquiringIssuingFlagCode: FormControl<IAcquiringIssuingFlag['cardAcquiringIssuingFlagCode']>;
  cardAcquiringIssuingDescription: FormControl<IAcquiringIssuingFlag['cardAcquiringIssuingDescription']>;
  cardAcquiringIssuingDetails: FormControl<IAcquiringIssuingFlag['cardAcquiringIssuingDetails']>;
};

export type AcquiringIssuingFlagFormGroup = FormGroup<AcquiringIssuingFlagFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AcquiringIssuingFlagFormService {
  createAcquiringIssuingFlagFormGroup(
    acquiringIssuingFlag: AcquiringIssuingFlagFormGroupInput = { id: null }
  ): AcquiringIssuingFlagFormGroup {
    const acquiringIssuingFlagRawValue = {
      ...this.getFormDefaults(),
      ...acquiringIssuingFlag,
    };
    return new FormGroup<AcquiringIssuingFlagFormGroupContent>({
      id: new FormControl(
        { value: acquiringIssuingFlagRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      cardAcquiringIssuingFlagCode: new FormControl(acquiringIssuingFlagRawValue.cardAcquiringIssuingFlagCode, {
        validators: [Validators.required],
      }),
      cardAcquiringIssuingDescription: new FormControl(acquiringIssuingFlagRawValue.cardAcquiringIssuingDescription, {
        validators: [Validators.required],
      }),
      cardAcquiringIssuingDetails: new FormControl(acquiringIssuingFlagRawValue.cardAcquiringIssuingDetails),
    });
  }

  getAcquiringIssuingFlag(form: AcquiringIssuingFlagFormGroup): IAcquiringIssuingFlag | NewAcquiringIssuingFlag {
    return form.getRawValue() as IAcquiringIssuingFlag | NewAcquiringIssuingFlag;
  }

  resetForm(form: AcquiringIssuingFlagFormGroup, acquiringIssuingFlag: AcquiringIssuingFlagFormGroupInput): void {
    const acquiringIssuingFlagRawValue = { ...this.getFormDefaults(), ...acquiringIssuingFlag };
    form.reset(
      {
        ...acquiringIssuingFlagRawValue,
        id: { value: acquiringIssuingFlagRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AcquiringIssuingFlagFormDefaults {
    return {
      id: null,
    };
  }
}

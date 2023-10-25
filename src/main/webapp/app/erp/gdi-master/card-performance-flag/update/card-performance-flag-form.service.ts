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

import { ICardPerformanceFlag, NewCardPerformanceFlag } from '../card-performance-flag.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICardPerformanceFlag for edit and NewCardPerformanceFlagFormGroupInput for create.
 */
type CardPerformanceFlagFormGroupInput = ICardPerformanceFlag | PartialWithRequiredKeyOf<NewCardPerformanceFlag>;

type CardPerformanceFlagFormDefaults = Pick<NewCardPerformanceFlag, 'id'>;

type CardPerformanceFlagFormGroupContent = {
  id: FormControl<ICardPerformanceFlag['id'] | NewCardPerformanceFlag['id']>;
  cardPerformanceFlag: FormControl<ICardPerformanceFlag['cardPerformanceFlag']>;
  cardPerformanceFlagDescription: FormControl<ICardPerformanceFlag['cardPerformanceFlagDescription']>;
  cardPerformanceFlagDetails: FormControl<ICardPerformanceFlag['cardPerformanceFlagDetails']>;
};

export type CardPerformanceFlagFormGroup = FormGroup<CardPerformanceFlagFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CardPerformanceFlagFormService {
  createCardPerformanceFlagFormGroup(cardPerformanceFlag: CardPerformanceFlagFormGroupInput = { id: null }): CardPerformanceFlagFormGroup {
    const cardPerformanceFlagRawValue = {
      ...this.getFormDefaults(),
      ...cardPerformanceFlag,
    };
    return new FormGroup<CardPerformanceFlagFormGroupContent>({
      id: new FormControl(
        { value: cardPerformanceFlagRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      cardPerformanceFlag: new FormControl(cardPerformanceFlagRawValue.cardPerformanceFlag, {
        validators: [Validators.required],
      }),
      cardPerformanceFlagDescription: new FormControl(cardPerformanceFlagRawValue.cardPerformanceFlagDescription, {
        validators: [Validators.required],
      }),
      cardPerformanceFlagDetails: new FormControl(cardPerformanceFlagRawValue.cardPerformanceFlagDetails),
    });
  }

  getCardPerformanceFlag(form: CardPerformanceFlagFormGroup): ICardPerformanceFlag | NewCardPerformanceFlag {
    return form.getRawValue() as ICardPerformanceFlag | NewCardPerformanceFlag;
  }

  resetForm(form: CardPerformanceFlagFormGroup, cardPerformanceFlag: CardPerformanceFlagFormGroupInput): void {
    const cardPerformanceFlagRawValue = { ...this.getFormDefaults(), ...cardPerformanceFlag };
    form.reset(
      {
        ...cardPerformanceFlagRawValue,
        id: { value: cardPerformanceFlagRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CardPerformanceFlagFormDefaults {
    return {
      id: null,
    };
  }
}

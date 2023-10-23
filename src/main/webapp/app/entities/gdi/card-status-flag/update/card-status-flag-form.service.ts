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

import { ICardStatusFlag, NewCardStatusFlag } from '../card-status-flag.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICardStatusFlag for edit and NewCardStatusFlagFormGroupInput for create.
 */
type CardStatusFlagFormGroupInput = ICardStatusFlag | PartialWithRequiredKeyOf<NewCardStatusFlag>;

type CardStatusFlagFormDefaults = Pick<NewCardStatusFlag, 'id'>;

type CardStatusFlagFormGroupContent = {
  id: FormControl<ICardStatusFlag['id'] | NewCardStatusFlag['id']>;
  cardStatusFlag: FormControl<ICardStatusFlag['cardStatusFlag']>;
  cardStatusFlagDescription: FormControl<ICardStatusFlag['cardStatusFlagDescription']>;
  cardStatusFlagDetails: FormControl<ICardStatusFlag['cardStatusFlagDetails']>;
};

export type CardStatusFlagFormGroup = FormGroup<CardStatusFlagFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CardStatusFlagFormService {
  createCardStatusFlagFormGroup(cardStatusFlag: CardStatusFlagFormGroupInput = { id: null }): CardStatusFlagFormGroup {
    const cardStatusFlagRawValue = {
      ...this.getFormDefaults(),
      ...cardStatusFlag,
    };
    return new FormGroup<CardStatusFlagFormGroupContent>({
      id: new FormControl(
        { value: cardStatusFlagRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      cardStatusFlag: new FormControl(cardStatusFlagRawValue.cardStatusFlag, {
        validators: [Validators.required],
      }),
      cardStatusFlagDescription: new FormControl(cardStatusFlagRawValue.cardStatusFlagDescription, {
        validators: [Validators.required],
      }),
      cardStatusFlagDetails: new FormControl(cardStatusFlagRawValue.cardStatusFlagDetails),
    });
  }

  getCardStatusFlag(form: CardStatusFlagFormGroup): ICardStatusFlag | NewCardStatusFlag {
    return form.getRawValue() as ICardStatusFlag | NewCardStatusFlag;
  }

  resetForm(form: CardStatusFlagFormGroup, cardStatusFlag: CardStatusFlagFormGroupInput): void {
    const cardStatusFlagRawValue = { ...this.getFormDefaults(), ...cardStatusFlag };
    form.reset(
      {
        ...cardStatusFlagRawValue,
        id: { value: cardStatusFlagRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CardStatusFlagFormDefaults {
    return {
      id: null,
    };
  }
}

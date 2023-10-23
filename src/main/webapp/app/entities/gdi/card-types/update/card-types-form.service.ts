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

import { ICardTypes, NewCardTypes } from '../card-types.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICardTypes for edit and NewCardTypesFormGroupInput for create.
 */
type CardTypesFormGroupInput = ICardTypes | PartialWithRequiredKeyOf<NewCardTypes>;

type CardTypesFormDefaults = Pick<NewCardTypes, 'id'>;

type CardTypesFormGroupContent = {
  id: FormControl<ICardTypes['id'] | NewCardTypes['id']>;
  cardTypeCode: FormControl<ICardTypes['cardTypeCode']>;
  cardType: FormControl<ICardTypes['cardType']>;
  cardTypeDetails: FormControl<ICardTypes['cardTypeDetails']>;
};

export type CardTypesFormGroup = FormGroup<CardTypesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CardTypesFormService {
  createCardTypesFormGroup(cardTypes: CardTypesFormGroupInput = { id: null }): CardTypesFormGroup {
    const cardTypesRawValue = {
      ...this.getFormDefaults(),
      ...cardTypes,
    };
    return new FormGroup<CardTypesFormGroupContent>({
      id: new FormControl(
        { value: cardTypesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      cardTypeCode: new FormControl(cardTypesRawValue.cardTypeCode, {
        validators: [Validators.required],
      }),
      cardType: new FormControl(cardTypesRawValue.cardType, {
        validators: [Validators.required],
      }),
      cardTypeDetails: new FormControl(cardTypesRawValue.cardTypeDetails),
    });
  }

  getCardTypes(form: CardTypesFormGroup): ICardTypes | NewCardTypes {
    return form.getRawValue() as ICardTypes | NewCardTypes;
  }

  resetForm(form: CardTypesFormGroup, cardTypes: CardTypesFormGroupInput): void {
    const cardTypesRawValue = { ...this.getFormDefaults(), ...cardTypes };
    form.reset(
      {
        ...cardTypesRawValue,
        id: { value: cardTypesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CardTypesFormDefaults {
    return {
      id: null,
    };
  }
}

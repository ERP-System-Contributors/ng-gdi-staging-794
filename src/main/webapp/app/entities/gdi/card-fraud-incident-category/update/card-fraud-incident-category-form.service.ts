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

import { ICardFraudIncidentCategory, NewCardFraudIncidentCategory } from '../card-fraud-incident-category.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICardFraudIncidentCategory for edit and NewCardFraudIncidentCategoryFormGroupInput for create.
 */
type CardFraudIncidentCategoryFormGroupInput = ICardFraudIncidentCategory | PartialWithRequiredKeyOf<NewCardFraudIncidentCategory>;

type CardFraudIncidentCategoryFormDefaults = Pick<NewCardFraudIncidentCategory, 'id'>;

type CardFraudIncidentCategoryFormGroupContent = {
  id: FormControl<ICardFraudIncidentCategory['id'] | NewCardFraudIncidentCategory['id']>;
  cardFraudCategoryTypeCode: FormControl<ICardFraudIncidentCategory['cardFraudCategoryTypeCode']>;
  cardFraudCategoryType: FormControl<ICardFraudIncidentCategory['cardFraudCategoryType']>;
  cardFraudCategoryTypeDescription: FormControl<ICardFraudIncidentCategory['cardFraudCategoryTypeDescription']>;
};

export type CardFraudIncidentCategoryFormGroup = FormGroup<CardFraudIncidentCategoryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CardFraudIncidentCategoryFormService {
  createCardFraudIncidentCategoryFormGroup(
    cardFraudIncidentCategory: CardFraudIncidentCategoryFormGroupInput = { id: null }
  ): CardFraudIncidentCategoryFormGroup {
    const cardFraudIncidentCategoryRawValue = {
      ...this.getFormDefaults(),
      ...cardFraudIncidentCategory,
    };
    return new FormGroup<CardFraudIncidentCategoryFormGroupContent>({
      id: new FormControl(
        { value: cardFraudIncidentCategoryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      cardFraudCategoryTypeCode: new FormControl(cardFraudIncidentCategoryRawValue.cardFraudCategoryTypeCode, {
        validators: [Validators.required],
      }),
      cardFraudCategoryType: new FormControl(cardFraudIncidentCategoryRawValue.cardFraudCategoryType, {
        validators: [Validators.required],
      }),
      cardFraudCategoryTypeDescription: new FormControl(cardFraudIncidentCategoryRawValue.cardFraudCategoryTypeDescription),
    });
  }

  getCardFraudIncidentCategory(form: CardFraudIncidentCategoryFormGroup): ICardFraudIncidentCategory | NewCardFraudIncidentCategory {
    return form.getRawValue() as ICardFraudIncidentCategory | NewCardFraudIncidentCategory;
  }

  resetForm(form: CardFraudIncidentCategoryFormGroup, cardFraudIncidentCategory: CardFraudIncidentCategoryFormGroupInput): void {
    const cardFraudIncidentCategoryRawValue = { ...this.getFormDefaults(), ...cardFraudIncidentCategory };
    form.reset(
      {
        ...cardFraudIncidentCategoryRawValue,
        id: { value: cardFraudIncidentCategoryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CardFraudIncidentCategoryFormDefaults {
    return {
      id: null,
    };
  }
}

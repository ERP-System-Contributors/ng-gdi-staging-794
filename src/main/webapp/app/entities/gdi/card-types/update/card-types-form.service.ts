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

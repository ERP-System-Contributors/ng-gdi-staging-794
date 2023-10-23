import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICardCategoryType, NewCardCategoryType } from '../card-category-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICardCategoryType for edit and NewCardCategoryTypeFormGroupInput for create.
 */
type CardCategoryTypeFormGroupInput = ICardCategoryType | PartialWithRequiredKeyOf<NewCardCategoryType>;

type CardCategoryTypeFormDefaults = Pick<NewCardCategoryType, 'id'>;

type CardCategoryTypeFormGroupContent = {
  id: FormControl<ICardCategoryType['id'] | NewCardCategoryType['id']>;
  cardCategoryFlag: FormControl<ICardCategoryType['cardCategoryFlag']>;
  cardCategoryDescription: FormControl<ICardCategoryType['cardCategoryDescription']>;
  cardCategoryDetails: FormControl<ICardCategoryType['cardCategoryDetails']>;
};

export type CardCategoryTypeFormGroup = FormGroup<CardCategoryTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CardCategoryTypeFormService {
  createCardCategoryTypeFormGroup(cardCategoryType: CardCategoryTypeFormGroupInput = { id: null }): CardCategoryTypeFormGroup {
    const cardCategoryTypeRawValue = {
      ...this.getFormDefaults(),
      ...cardCategoryType,
    };
    return new FormGroup<CardCategoryTypeFormGroupContent>({
      id: new FormControl(
        { value: cardCategoryTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      cardCategoryFlag: new FormControl(cardCategoryTypeRawValue.cardCategoryFlag, {
        validators: [Validators.required],
      }),
      cardCategoryDescription: new FormControl(cardCategoryTypeRawValue.cardCategoryDescription, {
        validators: [Validators.required],
      }),
      cardCategoryDetails: new FormControl(cardCategoryTypeRawValue.cardCategoryDetails),
    });
  }

  getCardCategoryType(form: CardCategoryTypeFormGroup): ICardCategoryType | NewCardCategoryType {
    return form.getRawValue() as ICardCategoryType | NewCardCategoryType;
  }

  resetForm(form: CardCategoryTypeFormGroup, cardCategoryType: CardCategoryTypeFormGroupInput): void {
    const cardCategoryTypeRawValue = { ...this.getFormDefaults(), ...cardCategoryType };
    form.reset(
      {
        ...cardCategoryTypeRawValue,
        id: { value: cardCategoryTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CardCategoryTypeFormDefaults {
    return {
      id: null,
    };
  }
}

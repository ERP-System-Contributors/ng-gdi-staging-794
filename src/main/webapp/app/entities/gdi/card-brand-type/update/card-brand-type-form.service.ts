import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICardBrandType, NewCardBrandType } from '../card-brand-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICardBrandType for edit and NewCardBrandTypeFormGroupInput for create.
 */
type CardBrandTypeFormGroupInput = ICardBrandType | PartialWithRequiredKeyOf<NewCardBrandType>;

type CardBrandTypeFormDefaults = Pick<NewCardBrandType, 'id'>;

type CardBrandTypeFormGroupContent = {
  id: FormControl<ICardBrandType['id'] | NewCardBrandType['id']>;
  cardBrandTypeCode: FormControl<ICardBrandType['cardBrandTypeCode']>;
  cardBrandType: FormControl<ICardBrandType['cardBrandType']>;
  cardBrandTypeDetails: FormControl<ICardBrandType['cardBrandTypeDetails']>;
};

export type CardBrandTypeFormGroup = FormGroup<CardBrandTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CardBrandTypeFormService {
  createCardBrandTypeFormGroup(cardBrandType: CardBrandTypeFormGroupInput = { id: null }): CardBrandTypeFormGroup {
    const cardBrandTypeRawValue = {
      ...this.getFormDefaults(),
      ...cardBrandType,
    };
    return new FormGroup<CardBrandTypeFormGroupContent>({
      id: new FormControl(
        { value: cardBrandTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      cardBrandTypeCode: new FormControl(cardBrandTypeRawValue.cardBrandTypeCode, {
        validators: [Validators.required],
      }),
      cardBrandType: new FormControl(cardBrandTypeRawValue.cardBrandType, {
        validators: [Validators.required],
      }),
      cardBrandTypeDetails: new FormControl(cardBrandTypeRawValue.cardBrandTypeDetails),
    });
  }

  getCardBrandType(form: CardBrandTypeFormGroup): ICardBrandType | NewCardBrandType {
    return form.getRawValue() as ICardBrandType | NewCardBrandType;
  }

  resetForm(form: CardBrandTypeFormGroup, cardBrandType: CardBrandTypeFormGroupInput): void {
    const cardBrandTypeRawValue = { ...this.getFormDefaults(), ...cardBrandType };
    form.reset(
      {
        ...cardBrandTypeRawValue,
        id: { value: cardBrandTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CardBrandTypeFormDefaults {
    return {
      id: null,
    };
  }
}

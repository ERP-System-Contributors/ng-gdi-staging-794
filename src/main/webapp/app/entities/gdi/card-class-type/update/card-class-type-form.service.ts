import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICardClassType, NewCardClassType } from '../card-class-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICardClassType for edit and NewCardClassTypeFormGroupInput for create.
 */
type CardClassTypeFormGroupInput = ICardClassType | PartialWithRequiredKeyOf<NewCardClassType>;

type CardClassTypeFormDefaults = Pick<NewCardClassType, 'id'>;

type CardClassTypeFormGroupContent = {
  id: FormControl<ICardClassType['id'] | NewCardClassType['id']>;
  cardClassTypeCode: FormControl<ICardClassType['cardClassTypeCode']>;
  cardClassType: FormControl<ICardClassType['cardClassType']>;
  cardClassDetails: FormControl<ICardClassType['cardClassDetails']>;
};

export type CardClassTypeFormGroup = FormGroup<CardClassTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CardClassTypeFormService {
  createCardClassTypeFormGroup(cardClassType: CardClassTypeFormGroupInput = { id: null }): CardClassTypeFormGroup {
    const cardClassTypeRawValue = {
      ...this.getFormDefaults(),
      ...cardClassType,
    };
    return new FormGroup<CardClassTypeFormGroupContent>({
      id: new FormControl(
        { value: cardClassTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      cardClassTypeCode: new FormControl(cardClassTypeRawValue.cardClassTypeCode, {
        validators: [Validators.required],
      }),
      cardClassType: new FormControl(cardClassTypeRawValue.cardClassType, {
        validators: [Validators.required],
      }),
      cardClassDetails: new FormControl(cardClassTypeRawValue.cardClassDetails),
    });
  }

  getCardClassType(form: CardClassTypeFormGroup): ICardClassType | NewCardClassType {
    return form.getRawValue() as ICardClassType | NewCardClassType;
  }

  resetForm(form: CardClassTypeFormGroup, cardClassType: CardClassTypeFormGroupInput): void {
    const cardClassTypeRawValue = { ...this.getFormDefaults(), ...cardClassType };
    form.reset(
      {
        ...cardClassTypeRawValue,
        id: { value: cardClassTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CardClassTypeFormDefaults {
    return {
      id: null,
    };
  }
}

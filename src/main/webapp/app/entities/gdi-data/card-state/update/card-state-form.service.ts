import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICardState, NewCardState } from '../card-state.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICardState for edit and NewCardStateFormGroupInput for create.
 */
type CardStateFormGroupInput = ICardState | PartialWithRequiredKeyOf<NewCardState>;

type CardStateFormDefaults = Pick<NewCardState, 'id'>;

type CardStateFormGroupContent = {
  id: FormControl<ICardState['id'] | NewCardState['id']>;
  cardStateFlag: FormControl<ICardState['cardStateFlag']>;
  cardStateFlagDetails: FormControl<ICardState['cardStateFlagDetails']>;
  cardStateFlagDescription: FormControl<ICardState['cardStateFlagDescription']>;
};

export type CardStateFormGroup = FormGroup<CardStateFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CardStateFormService {
  createCardStateFormGroup(cardState: CardStateFormGroupInput = { id: null }): CardStateFormGroup {
    const cardStateRawValue = {
      ...this.getFormDefaults(),
      ...cardState,
    };
    return new FormGroup<CardStateFormGroupContent>({
      id: new FormControl(
        { value: cardStateRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      cardStateFlag: new FormControl(cardStateRawValue.cardStateFlag, {
        validators: [Validators.required],
      }),
      cardStateFlagDetails: new FormControl(cardStateRawValue.cardStateFlagDetails, {
        validators: [Validators.required],
      }),
      cardStateFlagDescription: new FormControl(cardStateRawValue.cardStateFlagDescription),
    });
  }

  getCardState(form: CardStateFormGroup): ICardState | NewCardState {
    return form.getRawValue() as ICardState | NewCardState;
  }

  resetForm(form: CardStateFormGroup, cardState: CardStateFormGroupInput): void {
    const cardStateRawValue = { ...this.getFormDefaults(), ...cardState };
    form.reset(
      {
        ...cardStateRawValue,
        id: { value: cardStateRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CardStateFormDefaults {
    return {
      id: null,
    };
  }
}

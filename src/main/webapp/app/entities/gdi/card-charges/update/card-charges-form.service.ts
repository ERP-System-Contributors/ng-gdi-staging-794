import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICardCharges, NewCardCharges } from '../card-charges.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICardCharges for edit and NewCardChargesFormGroupInput for create.
 */
type CardChargesFormGroupInput = ICardCharges | PartialWithRequiredKeyOf<NewCardCharges>;

type CardChargesFormDefaults = Pick<NewCardCharges, 'id'>;

type CardChargesFormGroupContent = {
  id: FormControl<ICardCharges['id'] | NewCardCharges['id']>;
  cardChargeType: FormControl<ICardCharges['cardChargeType']>;
  cardChargeTypeName: FormControl<ICardCharges['cardChargeTypeName']>;
  cardChargeDetails: FormControl<ICardCharges['cardChargeDetails']>;
};

export type CardChargesFormGroup = FormGroup<CardChargesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CardChargesFormService {
  createCardChargesFormGroup(cardCharges: CardChargesFormGroupInput = { id: null }): CardChargesFormGroup {
    const cardChargesRawValue = {
      ...this.getFormDefaults(),
      ...cardCharges,
    };
    return new FormGroup<CardChargesFormGroupContent>({
      id: new FormControl(
        { value: cardChargesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      cardChargeType: new FormControl(cardChargesRawValue.cardChargeType, {
        validators: [Validators.required],
      }),
      cardChargeTypeName: new FormControl(cardChargesRawValue.cardChargeTypeName, {
        validators: [Validators.required],
      }),
      cardChargeDetails: new FormControl(cardChargesRawValue.cardChargeDetails),
    });
  }

  getCardCharges(form: CardChargesFormGroup): ICardCharges | NewCardCharges {
    return form.getRawValue() as ICardCharges | NewCardCharges;
  }

  resetForm(form: CardChargesFormGroup, cardCharges: CardChargesFormGroupInput): void {
    const cardChargesRawValue = { ...this.getFormDefaults(), ...cardCharges };
    form.reset(
      {
        ...cardChargesRawValue,
        id: { value: cardChargesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CardChargesFormDefaults {
    return {
      id: null,
    };
  }
}

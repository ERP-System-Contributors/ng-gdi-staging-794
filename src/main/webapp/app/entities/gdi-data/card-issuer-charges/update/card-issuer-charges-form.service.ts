import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICardIssuerCharges, NewCardIssuerCharges } from '../card-issuer-charges.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICardIssuerCharges for edit and NewCardIssuerChargesFormGroupInput for create.
 */
type CardIssuerChargesFormGroupInput = ICardIssuerCharges | PartialWithRequiredKeyOf<NewCardIssuerCharges>;

type CardIssuerChargesFormDefaults = Pick<NewCardIssuerCharges, 'id'>;

type CardIssuerChargesFormGroupContent = {
  id: FormControl<ICardIssuerCharges['id'] | NewCardIssuerCharges['id']>;
  reportingDate: FormControl<ICardIssuerCharges['reportingDate']>;
  cardFeeChargeInLCY: FormControl<ICardIssuerCharges['cardFeeChargeInLCY']>;
  bankCode: FormControl<ICardIssuerCharges['bankCode']>;
  cardCategory: FormControl<ICardIssuerCharges['cardCategory']>;
  cardType: FormControl<ICardIssuerCharges['cardType']>;
  cardBrand: FormControl<ICardIssuerCharges['cardBrand']>;
  cardClass: FormControl<ICardIssuerCharges['cardClass']>;
  cardChargeType: FormControl<ICardIssuerCharges['cardChargeType']>;
};

export type CardIssuerChargesFormGroup = FormGroup<CardIssuerChargesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CardIssuerChargesFormService {
  createCardIssuerChargesFormGroup(cardIssuerCharges: CardIssuerChargesFormGroupInput = { id: null }): CardIssuerChargesFormGroup {
    const cardIssuerChargesRawValue = {
      ...this.getFormDefaults(),
      ...cardIssuerCharges,
    };
    return new FormGroup<CardIssuerChargesFormGroupContent>({
      id: new FormControl(
        { value: cardIssuerChargesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      reportingDate: new FormControl(cardIssuerChargesRawValue.reportingDate, {
        validators: [Validators.required],
      }),
      cardFeeChargeInLCY: new FormControl(cardIssuerChargesRawValue.cardFeeChargeInLCY, {
        validators: [Validators.required, Validators.min(0)],
      }),
      bankCode: new FormControl(cardIssuerChargesRawValue.bankCode, {
        validators: [Validators.required],
      }),
      cardCategory: new FormControl(cardIssuerChargesRawValue.cardCategory, {
        validators: [Validators.required],
      }),
      cardType: new FormControl(cardIssuerChargesRawValue.cardType, {
        validators: [Validators.required],
      }),
      cardBrand: new FormControl(cardIssuerChargesRawValue.cardBrand, {
        validators: [Validators.required],
      }),
      cardClass: new FormControl(cardIssuerChargesRawValue.cardClass, {
        validators: [Validators.required],
      }),
      cardChargeType: new FormControl(cardIssuerChargesRawValue.cardChargeType, {
        validators: [Validators.required],
      }),
    });
  }

  getCardIssuerCharges(form: CardIssuerChargesFormGroup): ICardIssuerCharges | NewCardIssuerCharges {
    return form.getRawValue() as ICardIssuerCharges | NewCardIssuerCharges;
  }

  resetForm(form: CardIssuerChargesFormGroup, cardIssuerCharges: CardIssuerChargesFormGroupInput): void {
    const cardIssuerChargesRawValue = { ...this.getFormDefaults(), ...cardIssuerCharges };
    form.reset(
      {
        ...cardIssuerChargesRawValue,
        id: { value: cardIssuerChargesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CardIssuerChargesFormDefaults {
    return {
      id: null,
    };
  }
}

import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICardUsageInformation, NewCardUsageInformation } from '../card-usage-information.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICardUsageInformation for edit and NewCardUsageInformationFormGroupInput for create.
 */
type CardUsageInformationFormGroupInput = ICardUsageInformation | PartialWithRequiredKeyOf<NewCardUsageInformation>;

type CardUsageInformationFormDefaults = Pick<NewCardUsageInformation, 'id'>;

type CardUsageInformationFormGroupContent = {
  id: FormControl<ICardUsageInformation['id'] | NewCardUsageInformation['id']>;
  reportingDate: FormControl<ICardUsageInformation['reportingDate']>;
  totalNumberOfLiveCards: FormControl<ICardUsageInformation['totalNumberOfLiveCards']>;
  totalActiveCards: FormControl<ICardUsageInformation['totalActiveCards']>;
  totalNumberOfTransactionsDone: FormControl<ICardUsageInformation['totalNumberOfTransactionsDone']>;
  totalValueOfTransactionsDoneInLCY: FormControl<ICardUsageInformation['totalValueOfTransactionsDoneInLCY']>;
  bankCode: FormControl<ICardUsageInformation['bankCode']>;
  cardType: FormControl<ICardUsageInformation['cardType']>;
  cardBrand: FormControl<ICardUsageInformation['cardBrand']>;
  cardCategoryType: FormControl<ICardUsageInformation['cardCategoryType']>;
  transactionType: FormControl<ICardUsageInformation['transactionType']>;
  channelType: FormControl<ICardUsageInformation['channelType']>;
  cardState: FormControl<ICardUsageInformation['cardState']>;
};

export type CardUsageInformationFormGroup = FormGroup<CardUsageInformationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CardUsageInformationFormService {
  createCardUsageInformationFormGroup(
    cardUsageInformation: CardUsageInformationFormGroupInput = { id: null }
  ): CardUsageInformationFormGroup {
    const cardUsageInformationRawValue = {
      ...this.getFormDefaults(),
      ...cardUsageInformation,
    };
    return new FormGroup<CardUsageInformationFormGroupContent>({
      id: new FormControl(
        { value: cardUsageInformationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      reportingDate: new FormControl(cardUsageInformationRawValue.reportingDate, {
        validators: [Validators.required],
      }),
      totalNumberOfLiveCards: new FormControl(cardUsageInformationRawValue.totalNumberOfLiveCards, {
        validators: [Validators.required, Validators.min(0)],
      }),
      totalActiveCards: new FormControl(cardUsageInformationRawValue.totalActiveCards, {
        validators: [Validators.required, Validators.min(0)],
      }),
      totalNumberOfTransactionsDone: new FormControl(cardUsageInformationRawValue.totalNumberOfTransactionsDone, {
        validators: [Validators.required, Validators.min(0)],
      }),
      totalValueOfTransactionsDoneInLCY: new FormControl(cardUsageInformationRawValue.totalValueOfTransactionsDoneInLCY, {
        validators: [Validators.required, Validators.min(0)],
      }),
      bankCode: new FormControl(cardUsageInformationRawValue.bankCode, {
        validators: [Validators.required],
      }),
      cardType: new FormControl(cardUsageInformationRawValue.cardType, {
        validators: [Validators.required],
      }),
      cardBrand: new FormControl(cardUsageInformationRawValue.cardBrand, {
        validators: [Validators.required],
      }),
      cardCategoryType: new FormControl(cardUsageInformationRawValue.cardCategoryType, {
        validators: [Validators.required],
      }),
      transactionType: new FormControl(cardUsageInformationRawValue.transactionType, {
        validators: [Validators.required],
      }),
      channelType: new FormControl(cardUsageInformationRawValue.channelType, {
        validators: [Validators.required],
      }),
      cardState: new FormControl(cardUsageInformationRawValue.cardState, {
        validators: [Validators.required],
      }),
    });
  }

  getCardUsageInformation(form: CardUsageInformationFormGroup): ICardUsageInformation | NewCardUsageInformation {
    return form.getRawValue() as ICardUsageInformation | NewCardUsageInformation;
  }

  resetForm(form: CardUsageInformationFormGroup, cardUsageInformation: CardUsageInformationFormGroupInput): void {
    const cardUsageInformationRawValue = { ...this.getFormDefaults(), ...cardUsageInformation };
    form.reset(
      {
        ...cardUsageInformationRawValue,
        id: { value: cardUsageInformationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CardUsageInformationFormDefaults {
    return {
      id: null,
    };
  }
}

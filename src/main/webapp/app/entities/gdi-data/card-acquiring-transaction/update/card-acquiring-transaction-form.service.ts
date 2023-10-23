import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICardAcquiringTransaction, NewCardAcquiringTransaction } from '../card-acquiring-transaction.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICardAcquiringTransaction for edit and NewCardAcquiringTransactionFormGroupInput for create.
 */
type CardAcquiringTransactionFormGroupInput = ICardAcquiringTransaction | PartialWithRequiredKeyOf<NewCardAcquiringTransaction>;

type CardAcquiringTransactionFormDefaults = Pick<NewCardAcquiringTransaction, 'id'>;

type CardAcquiringTransactionFormGroupContent = {
  id: FormControl<ICardAcquiringTransaction['id'] | NewCardAcquiringTransaction['id']>;
  reportingDate: FormControl<ICardAcquiringTransaction['reportingDate']>;
  terminalId: FormControl<ICardAcquiringTransaction['terminalId']>;
  numberOfTransactions: FormControl<ICardAcquiringTransaction['numberOfTransactions']>;
  valueOfTransactionsInLCY: FormControl<ICardAcquiringTransaction['valueOfTransactionsInLCY']>;
  bankCode: FormControl<ICardAcquiringTransaction['bankCode']>;
  channelType: FormControl<ICardAcquiringTransaction['channelType']>;
  cardBrandType: FormControl<ICardAcquiringTransaction['cardBrandType']>;
  currencyOfTransaction: FormControl<ICardAcquiringTransaction['currencyOfTransaction']>;
  cardIssuerCategory: FormControl<ICardAcquiringTransaction['cardIssuerCategory']>;
};

export type CardAcquiringTransactionFormGroup = FormGroup<CardAcquiringTransactionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CardAcquiringTransactionFormService {
  createCardAcquiringTransactionFormGroup(
    cardAcquiringTransaction: CardAcquiringTransactionFormGroupInput = { id: null }
  ): CardAcquiringTransactionFormGroup {
    const cardAcquiringTransactionRawValue = {
      ...this.getFormDefaults(),
      ...cardAcquiringTransaction,
    };
    return new FormGroup<CardAcquiringTransactionFormGroupContent>({
      id: new FormControl(
        { value: cardAcquiringTransactionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      reportingDate: new FormControl(cardAcquiringTransactionRawValue.reportingDate, {
        validators: [Validators.required],
      }),
      terminalId: new FormControl(cardAcquiringTransactionRawValue.terminalId, {
        validators: [Validators.required],
      }),
      numberOfTransactions: new FormControl(cardAcquiringTransactionRawValue.numberOfTransactions, {
        validators: [Validators.required, Validators.min(0)],
      }),
      valueOfTransactionsInLCY: new FormControl(cardAcquiringTransactionRawValue.valueOfTransactionsInLCY, {
        validators: [Validators.required, Validators.min(0)],
      }),
      bankCode: new FormControl(cardAcquiringTransactionRawValue.bankCode, {
        validators: [Validators.required],
      }),
      channelType: new FormControl(cardAcquiringTransactionRawValue.channelType, {
        validators: [Validators.required],
      }),
      cardBrandType: new FormControl(cardAcquiringTransactionRawValue.cardBrandType, {
        validators: [Validators.required],
      }),
      currencyOfTransaction: new FormControl(cardAcquiringTransactionRawValue.currencyOfTransaction, {
        validators: [Validators.required],
      }),
      cardIssuerCategory: new FormControl(cardAcquiringTransactionRawValue.cardIssuerCategory, {
        validators: [Validators.required],
      }),
    });
  }

  getCardAcquiringTransaction(form: CardAcquiringTransactionFormGroup): ICardAcquiringTransaction | NewCardAcquiringTransaction {
    return form.getRawValue() as ICardAcquiringTransaction | NewCardAcquiringTransaction;
  }

  resetForm(form: CardAcquiringTransactionFormGroup, cardAcquiringTransaction: CardAcquiringTransactionFormGroupInput): void {
    const cardAcquiringTransactionRawValue = { ...this.getFormDefaults(), ...cardAcquiringTransaction };
    form.reset(
      {
        ...cardAcquiringTransactionRawValue,
        id: { value: cardAcquiringTransactionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CardAcquiringTransactionFormDefaults {
    return {
      id: null,
    };
  }
}

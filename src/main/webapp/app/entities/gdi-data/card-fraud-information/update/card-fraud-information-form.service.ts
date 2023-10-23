import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICardFraudInformation, NewCardFraudInformation } from '../card-fraud-information.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICardFraudInformation for edit and NewCardFraudInformationFormGroupInput for create.
 */
type CardFraudInformationFormGroupInput = ICardFraudInformation | PartialWithRequiredKeyOf<NewCardFraudInformation>;

type CardFraudInformationFormDefaults = Pick<NewCardFraudInformation, 'id'>;

type CardFraudInformationFormGroupContent = {
  id: FormControl<ICardFraudInformation['id'] | NewCardFraudInformation['id']>;
  reportingDate: FormControl<ICardFraudInformation['reportingDate']>;
  totalNumberOfFraudIncidents: FormControl<ICardFraudInformation['totalNumberOfFraudIncidents']>;
  valueOfFraudIncedentsInLCY: FormControl<ICardFraudInformation['valueOfFraudIncedentsInLCY']>;
};

export type CardFraudInformationFormGroup = FormGroup<CardFraudInformationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CardFraudInformationFormService {
  createCardFraudInformationFormGroup(
    cardFraudInformation: CardFraudInformationFormGroupInput = { id: null }
  ): CardFraudInformationFormGroup {
    const cardFraudInformationRawValue = {
      ...this.getFormDefaults(),
      ...cardFraudInformation,
    };
    return new FormGroup<CardFraudInformationFormGroupContent>({
      id: new FormControl(
        { value: cardFraudInformationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      reportingDate: new FormControl(cardFraudInformationRawValue.reportingDate, {
        validators: [Validators.required],
      }),
      totalNumberOfFraudIncidents: new FormControl(cardFraudInformationRawValue.totalNumberOfFraudIncidents, {
        validators: [Validators.required, Validators.min(0)],
      }),
      valueOfFraudIncedentsInLCY: new FormControl(cardFraudInformationRawValue.valueOfFraudIncedentsInLCY, {
        validators: [Validators.required, Validators.min(0)],
      }),
    });
  }

  getCardFraudInformation(form: CardFraudInformationFormGroup): ICardFraudInformation | NewCardFraudInformation {
    return form.getRawValue() as ICardFraudInformation | NewCardFraudInformation;
  }

  resetForm(form: CardFraudInformationFormGroup, cardFraudInformation: CardFraudInformationFormGroupInput): void {
    const cardFraudInformationRawValue = { ...this.getFormDefaults(), ...cardFraudInformation };
    form.reset(
      {
        ...cardFraudInformationRawValue,
        id: { value: cardFraudInformationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CardFraudInformationFormDefaults {
    return {
      id: null,
    };
  }
}

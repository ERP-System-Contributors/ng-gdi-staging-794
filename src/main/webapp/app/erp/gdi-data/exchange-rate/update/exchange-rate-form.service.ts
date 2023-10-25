///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IExchangeRate, NewExchangeRate } from '../exchange-rate.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IExchangeRate for edit and NewExchangeRateFormGroupInput for create.
 */
type ExchangeRateFormGroupInput = IExchangeRate | PartialWithRequiredKeyOf<NewExchangeRate>;

type ExchangeRateFormDefaults = Pick<NewExchangeRate, 'id'>;

type ExchangeRateFormGroupContent = {
  id: FormControl<IExchangeRate['id'] | NewExchangeRate['id']>;
  businessReportingDay: FormControl<IExchangeRate['businessReportingDay']>;
  buyingRate: FormControl<IExchangeRate['buyingRate']>;
  sellingRate: FormControl<IExchangeRate['sellingRate']>;
  meanRate: FormControl<IExchangeRate['meanRate']>;
  closingBidRate: FormControl<IExchangeRate['closingBidRate']>;
  closingOfferRate: FormControl<IExchangeRate['closingOfferRate']>;
  usdCrossRate: FormControl<IExchangeRate['usdCrossRate']>;
  institutionCode: FormControl<IExchangeRate['institutionCode']>;
  currencyCode: FormControl<IExchangeRate['currencyCode']>;
};

export type ExchangeRateFormGroup = FormGroup<ExchangeRateFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ExchangeRateFormService {
  createExchangeRateFormGroup(exchangeRate: ExchangeRateFormGroupInput = { id: null }): ExchangeRateFormGroup {
    const exchangeRateRawValue = {
      ...this.getFormDefaults(),
      ...exchangeRate,
    };
    return new FormGroup<ExchangeRateFormGroupContent>({
      id: new FormControl(
        { value: exchangeRateRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      businessReportingDay: new FormControl(exchangeRateRawValue.businessReportingDay, {
        validators: [Validators.required],
      }),
      buyingRate: new FormControl(exchangeRateRawValue.buyingRate, {
        validators: [Validators.required],
      }),
      sellingRate: new FormControl(exchangeRateRawValue.sellingRate, {
        validators: [Validators.required],
      }),
      meanRate: new FormControl(exchangeRateRawValue.meanRate, {
        validators: [Validators.required],
      }),
      closingBidRate: new FormControl(exchangeRateRawValue.closingBidRate, {
        validators: [Validators.required],
      }),
      closingOfferRate: new FormControl(exchangeRateRawValue.closingOfferRate, {
        validators: [Validators.required],
      }),
      usdCrossRate: new FormControl(exchangeRateRawValue.usdCrossRate, {
        validators: [Validators.required],
      }),
      institutionCode: new FormControl(exchangeRateRawValue.institutionCode, {
        validators: [Validators.required],
      }),
      currencyCode: new FormControl(exchangeRateRawValue.currencyCode, {
        validators: [Validators.required],
      }),
    });
  }

  getExchangeRate(form: ExchangeRateFormGroup): IExchangeRate | NewExchangeRate {
    return form.getRawValue() as IExchangeRate | NewExchangeRate;
  }

  resetForm(form: ExchangeRateFormGroup, exchangeRate: ExchangeRateFormGroupInput): void {
    const exchangeRateRawValue = { ...this.getFormDefaults(), ...exchangeRate };
    form.reset(
      {
        ...exchangeRateRawValue,
        id: { value: exchangeRateRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ExchangeRateFormDefaults {
    return {
      id: null,
    };
  }
}

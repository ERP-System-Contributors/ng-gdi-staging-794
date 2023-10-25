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

import { IFxReceiptPurposeType, NewFxReceiptPurposeType } from '../fx-receipt-purpose-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFxReceiptPurposeType for edit and NewFxReceiptPurposeTypeFormGroupInput for create.
 */
type FxReceiptPurposeTypeFormGroupInput = IFxReceiptPurposeType | PartialWithRequiredKeyOf<NewFxReceiptPurposeType>;

type FxReceiptPurposeTypeFormDefaults = Pick<NewFxReceiptPurposeType, 'id'>;

type FxReceiptPurposeTypeFormGroupContent = {
  id: FormControl<IFxReceiptPurposeType['id'] | NewFxReceiptPurposeType['id']>;
  itemCode: FormControl<IFxReceiptPurposeType['itemCode']>;
  attribute1ReceiptPaymentPurposeCode: FormControl<IFxReceiptPurposeType['attribute1ReceiptPaymentPurposeCode']>;
  attribute1ReceiptPaymentPurposeType: FormControl<IFxReceiptPurposeType['attribute1ReceiptPaymentPurposeType']>;
  attribute2ReceiptPaymentPurposeCode: FormControl<IFxReceiptPurposeType['attribute2ReceiptPaymentPurposeCode']>;
  attribute2ReceiptPaymentPurposeDescription: FormControl<IFxReceiptPurposeType['attribute2ReceiptPaymentPurposeDescription']>;
  attribute3ReceiptPaymentPurposeCode: FormControl<IFxReceiptPurposeType['attribute3ReceiptPaymentPurposeCode']>;
  attribute3ReceiptPaymentPurposeDescription: FormControl<IFxReceiptPurposeType['attribute3ReceiptPaymentPurposeDescription']>;
  attribute4ReceiptPaymentPurposeCode: FormControl<IFxReceiptPurposeType['attribute4ReceiptPaymentPurposeCode']>;
  attribute4ReceiptPaymentPurposeDescription: FormControl<IFxReceiptPurposeType['attribute4ReceiptPaymentPurposeDescription']>;
  attribute5ReceiptPaymentPurposeCode: FormControl<IFxReceiptPurposeType['attribute5ReceiptPaymentPurposeCode']>;
  attribute5ReceiptPaymentPurposeDescription: FormControl<IFxReceiptPurposeType['attribute5ReceiptPaymentPurposeDescription']>;
  lastChild: FormControl<IFxReceiptPurposeType['lastChild']>;
};

export type FxReceiptPurposeTypeFormGroup = FormGroup<FxReceiptPurposeTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FxReceiptPurposeTypeFormService {
  createFxReceiptPurposeTypeFormGroup(
    fxReceiptPurposeType: FxReceiptPurposeTypeFormGroupInput = { id: null }
  ): FxReceiptPurposeTypeFormGroup {
    const fxReceiptPurposeTypeRawValue = {
      ...this.getFormDefaults(),
      ...fxReceiptPurposeType,
    };
    return new FormGroup<FxReceiptPurposeTypeFormGroupContent>({
      id: new FormControl(
        { value: fxReceiptPurposeTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      itemCode: new FormControl(fxReceiptPurposeTypeRawValue.itemCode, {
        validators: [Validators.required],
      }),
      attribute1ReceiptPaymentPurposeCode: new FormControl(fxReceiptPurposeTypeRawValue.attribute1ReceiptPaymentPurposeCode),
      attribute1ReceiptPaymentPurposeType: new FormControl(fxReceiptPurposeTypeRawValue.attribute1ReceiptPaymentPurposeType),
      attribute2ReceiptPaymentPurposeCode: new FormControl(fxReceiptPurposeTypeRawValue.attribute2ReceiptPaymentPurposeCode),
      attribute2ReceiptPaymentPurposeDescription: new FormControl(fxReceiptPurposeTypeRawValue.attribute2ReceiptPaymentPurposeDescription),
      attribute3ReceiptPaymentPurposeCode: new FormControl(fxReceiptPurposeTypeRawValue.attribute3ReceiptPaymentPurposeCode),
      attribute3ReceiptPaymentPurposeDescription: new FormControl(fxReceiptPurposeTypeRawValue.attribute3ReceiptPaymentPurposeDescription),
      attribute4ReceiptPaymentPurposeCode: new FormControl(fxReceiptPurposeTypeRawValue.attribute4ReceiptPaymentPurposeCode),
      attribute4ReceiptPaymentPurposeDescription: new FormControl(fxReceiptPurposeTypeRawValue.attribute4ReceiptPaymentPurposeDescription),
      attribute5ReceiptPaymentPurposeCode: new FormControl(fxReceiptPurposeTypeRawValue.attribute5ReceiptPaymentPurposeCode),
      attribute5ReceiptPaymentPurposeDescription: new FormControl(fxReceiptPurposeTypeRawValue.attribute5ReceiptPaymentPurposeDescription),
      lastChild: new FormControl(fxReceiptPurposeTypeRawValue.lastChild),
    });
  }

  getFxReceiptPurposeType(form: FxReceiptPurposeTypeFormGroup): IFxReceiptPurposeType | NewFxReceiptPurposeType {
    return form.getRawValue() as IFxReceiptPurposeType | NewFxReceiptPurposeType;
  }

  resetForm(form: FxReceiptPurposeTypeFormGroup, fxReceiptPurposeType: FxReceiptPurposeTypeFormGroupInput): void {
    const fxReceiptPurposeTypeRawValue = { ...this.getFormDefaults(), ...fxReceiptPurposeType };
    form.reset(
      {
        ...fxReceiptPurposeTypeRawValue,
        id: { value: fxReceiptPurposeTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FxReceiptPurposeTypeFormDefaults {
    return {
      id: null,
    };
  }
}

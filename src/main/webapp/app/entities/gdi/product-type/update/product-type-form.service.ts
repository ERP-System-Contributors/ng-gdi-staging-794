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

import { IProductType, NewProductType } from '../product-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProductType for edit and NewProductTypeFormGroupInput for create.
 */
type ProductTypeFormGroupInput = IProductType | PartialWithRequiredKeyOf<NewProductType>;

type ProductTypeFormDefaults = Pick<NewProductType, 'id'>;

type ProductTypeFormGroupContent = {
  id: FormControl<IProductType['id'] | NewProductType['id']>;
  productCode: FormControl<IProductType['productCode']>;
  productType: FormControl<IProductType['productType']>;
  productTypeDescription: FormControl<IProductType['productTypeDescription']>;
};

export type ProductTypeFormGroup = FormGroup<ProductTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProductTypeFormService {
  createProductTypeFormGroup(productType: ProductTypeFormGroupInput = { id: null }): ProductTypeFormGroup {
    const productTypeRawValue = {
      ...this.getFormDefaults(),
      ...productType,
    };
    return new FormGroup<ProductTypeFormGroupContent>({
      id: new FormControl(
        { value: productTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      productCode: new FormControl(productTypeRawValue.productCode, {
        validators: [Validators.required],
      }),
      productType: new FormControl(productTypeRawValue.productType),
      productTypeDescription: new FormControl(productTypeRawValue.productTypeDescription),
    });
  }

  getProductType(form: ProductTypeFormGroup): IProductType | NewProductType {
    return form.getRawValue() as IProductType | NewProductType;
  }

  resetForm(form: ProductTypeFormGroup, productType: ProductTypeFormGroupInput): void {
    const productTypeRawValue = { ...this.getFormDefaults(), ...productType };
    form.reset(
      {
        ...productTypeRawValue,
        id: { value: productTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ProductTypeFormDefaults {
    return {
      id: null,
    };
  }
}

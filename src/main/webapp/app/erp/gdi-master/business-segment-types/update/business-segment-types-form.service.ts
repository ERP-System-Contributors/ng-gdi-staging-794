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

import { IBusinessSegmentTypes, NewBusinessSegmentTypes } from '../business-segment-types.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBusinessSegmentTypes for edit and NewBusinessSegmentTypesFormGroupInput for create.
 */
type BusinessSegmentTypesFormGroupInput = IBusinessSegmentTypes | PartialWithRequiredKeyOf<NewBusinessSegmentTypes>;

type BusinessSegmentTypesFormDefaults = Pick<NewBusinessSegmentTypes, 'id'>;

type BusinessSegmentTypesFormGroupContent = {
  id: FormControl<IBusinessSegmentTypes['id'] | NewBusinessSegmentTypes['id']>;
  businessEconomicSegmentCode: FormControl<IBusinessSegmentTypes['businessEconomicSegmentCode']>;
  businessEconomicSegment: FormControl<IBusinessSegmentTypes['businessEconomicSegment']>;
  details: FormControl<IBusinessSegmentTypes['details']>;
};

export type BusinessSegmentTypesFormGroup = FormGroup<BusinessSegmentTypesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BusinessSegmentTypesFormService {
  createBusinessSegmentTypesFormGroup(
    businessSegmentTypes: BusinessSegmentTypesFormGroupInput = { id: null }
  ): BusinessSegmentTypesFormGroup {
    const businessSegmentTypesRawValue = {
      ...this.getFormDefaults(),
      ...businessSegmentTypes,
    };
    return new FormGroup<BusinessSegmentTypesFormGroupContent>({
      id: new FormControl(
        { value: businessSegmentTypesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      businessEconomicSegmentCode: new FormControl(businessSegmentTypesRawValue.businessEconomicSegmentCode, {
        validators: [Validators.required],
      }),
      businessEconomicSegment: new FormControl(businessSegmentTypesRawValue.businessEconomicSegment, {
        validators: [Validators.required],
      }),
      details: new FormControl(businessSegmentTypesRawValue.details),
    });
  }

  getBusinessSegmentTypes(form: BusinessSegmentTypesFormGroup): IBusinessSegmentTypes | NewBusinessSegmentTypes {
    return form.getRawValue() as IBusinessSegmentTypes | NewBusinessSegmentTypes;
  }

  resetForm(form: BusinessSegmentTypesFormGroup, businessSegmentTypes: BusinessSegmentTypesFormGroupInput): void {
    const businessSegmentTypesRawValue = { ...this.getFormDefaults(), ...businessSegmentTypes };
    form.reset(
      {
        ...businessSegmentTypesRawValue,
        id: { value: businessSegmentTypesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): BusinessSegmentTypesFormDefaults {
    return {
      id: null,
    };
  }
}

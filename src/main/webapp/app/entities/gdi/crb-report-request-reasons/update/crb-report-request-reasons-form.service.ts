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

import { ICrbReportRequestReasons, NewCrbReportRequestReasons } from '../crb-report-request-reasons.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbReportRequestReasons for edit and NewCrbReportRequestReasonsFormGroupInput for create.
 */
type CrbReportRequestReasonsFormGroupInput = ICrbReportRequestReasons | PartialWithRequiredKeyOf<NewCrbReportRequestReasons>;

type CrbReportRequestReasonsFormDefaults = Pick<NewCrbReportRequestReasons, 'id'>;

type CrbReportRequestReasonsFormGroupContent = {
  id: FormControl<ICrbReportRequestReasons['id'] | NewCrbReportRequestReasons['id']>;
  creditReportRequestReasonTypeCode: FormControl<ICrbReportRequestReasons['creditReportRequestReasonTypeCode']>;
  creditReportRequestReasonType: FormControl<ICrbReportRequestReasons['creditReportRequestReasonType']>;
  creditReportRequestDetails: FormControl<ICrbReportRequestReasons['creditReportRequestDetails']>;
};

export type CrbReportRequestReasonsFormGroup = FormGroup<CrbReportRequestReasonsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbReportRequestReasonsFormService {
  createCrbReportRequestReasonsFormGroup(
    crbReportRequestReasons: CrbReportRequestReasonsFormGroupInput = { id: null }
  ): CrbReportRequestReasonsFormGroup {
    const crbReportRequestReasonsRawValue = {
      ...this.getFormDefaults(),
      ...crbReportRequestReasons,
    };
    return new FormGroup<CrbReportRequestReasonsFormGroupContent>({
      id: new FormControl(
        { value: crbReportRequestReasonsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      creditReportRequestReasonTypeCode: new FormControl(crbReportRequestReasonsRawValue.creditReportRequestReasonTypeCode, {
        validators: [Validators.required],
      }),
      creditReportRequestReasonType: new FormControl(crbReportRequestReasonsRawValue.creditReportRequestReasonType, {
        validators: [Validators.required],
      }),
      creditReportRequestDetails: new FormControl(crbReportRequestReasonsRawValue.creditReportRequestDetails),
    });
  }

  getCrbReportRequestReasons(form: CrbReportRequestReasonsFormGroup): ICrbReportRequestReasons | NewCrbReportRequestReasons {
    return form.getRawValue() as ICrbReportRequestReasons | NewCrbReportRequestReasons;
  }

  resetForm(form: CrbReportRequestReasonsFormGroup, crbReportRequestReasons: CrbReportRequestReasonsFormGroupInput): void {
    const crbReportRequestReasonsRawValue = { ...this.getFormDefaults(), ...crbReportRequestReasons };
    form.reset(
      {
        ...crbReportRequestReasonsRawValue,
        id: { value: crbReportRequestReasonsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbReportRequestReasonsFormDefaults {
    return {
      id: null,
    };
  }
}

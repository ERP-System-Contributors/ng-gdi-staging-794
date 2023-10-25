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

import { ICrbReportViewBand, NewCrbReportViewBand } from '../crb-report-view-band.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbReportViewBand for edit and NewCrbReportViewBandFormGroupInput for create.
 */
type CrbReportViewBandFormGroupInput = ICrbReportViewBand | PartialWithRequiredKeyOf<NewCrbReportViewBand>;

type CrbReportViewBandFormDefaults = Pick<NewCrbReportViewBand, 'id'>;

type CrbReportViewBandFormGroupContent = {
  id: FormControl<ICrbReportViewBand['id'] | NewCrbReportViewBand['id']>;
  reportViewCode: FormControl<ICrbReportViewBand['reportViewCode']>;
  reportViewCategory: FormControl<ICrbReportViewBand['reportViewCategory']>;
  reportViewCategoryDescription: FormControl<ICrbReportViewBand['reportViewCategoryDescription']>;
};

export type CrbReportViewBandFormGroup = FormGroup<CrbReportViewBandFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbReportViewBandFormService {
  createCrbReportViewBandFormGroup(crbReportViewBand: CrbReportViewBandFormGroupInput = { id: null }): CrbReportViewBandFormGroup {
    const crbReportViewBandRawValue = {
      ...this.getFormDefaults(),
      ...crbReportViewBand,
    };
    return new FormGroup<CrbReportViewBandFormGroupContent>({
      id: new FormControl(
        { value: crbReportViewBandRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      reportViewCode: new FormControl(crbReportViewBandRawValue.reportViewCode, {
        validators: [Validators.required],
      }),
      reportViewCategory: new FormControl(crbReportViewBandRawValue.reportViewCategory, {
        validators: [Validators.required],
      }),
      reportViewCategoryDescription: new FormControl(crbReportViewBandRawValue.reportViewCategoryDescription),
    });
  }

  getCrbReportViewBand(form: CrbReportViewBandFormGroup): ICrbReportViewBand | NewCrbReportViewBand {
    return form.getRawValue() as ICrbReportViewBand | NewCrbReportViewBand;
  }

  resetForm(form: CrbReportViewBandFormGroup, crbReportViewBand: CrbReportViewBandFormGroupInput): void {
    const crbReportViewBandRawValue = { ...this.getFormDefaults(), ...crbReportViewBand };
    form.reset(
      {
        ...crbReportViewBandRawValue,
        id: { value: crbReportViewBandRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbReportViewBandFormDefaults {
    return {
      id: null,
    };
  }
}

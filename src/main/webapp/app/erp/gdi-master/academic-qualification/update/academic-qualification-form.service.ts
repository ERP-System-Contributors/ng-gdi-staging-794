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

import { IAcademicQualification, NewAcademicQualification } from '../academic-qualification.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAcademicQualification for edit and NewAcademicQualificationFormGroupInput for create.
 */
type AcademicQualificationFormGroupInput = IAcademicQualification | PartialWithRequiredKeyOf<NewAcademicQualification>;

type AcademicQualificationFormDefaults = Pick<NewAcademicQualification, 'id'>;

type AcademicQualificationFormGroupContent = {
  id: FormControl<IAcademicQualification['id'] | NewAcademicQualification['id']>;
  academicQualificationsCode: FormControl<IAcademicQualification['academicQualificationsCode']>;
  academicQualificationType: FormControl<IAcademicQualification['academicQualificationType']>;
  academicQualificationTypeDetail: FormControl<IAcademicQualification['academicQualificationTypeDetail']>;
};

export type AcademicQualificationFormGroup = FormGroup<AcademicQualificationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AcademicQualificationFormService {
  createAcademicQualificationFormGroup(
    academicQualification: AcademicQualificationFormGroupInput = { id: null }
  ): AcademicQualificationFormGroup {
    const academicQualificationRawValue = {
      ...this.getFormDefaults(),
      ...academicQualification,
    };
    return new FormGroup<AcademicQualificationFormGroupContent>({
      id: new FormControl(
        { value: academicQualificationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      academicQualificationsCode: new FormControl(academicQualificationRawValue.academicQualificationsCode, {
        validators: [Validators.required],
      }),
      academicQualificationType: new FormControl(academicQualificationRawValue.academicQualificationType, {
        validators: [Validators.required],
      }),
      academicQualificationTypeDetail: new FormControl(academicQualificationRawValue.academicQualificationTypeDetail),
    });
  }

  getAcademicQualification(form: AcademicQualificationFormGroup): IAcademicQualification | NewAcademicQualification {
    return form.getRawValue() as IAcademicQualification | NewAcademicQualification;
  }

  resetForm(form: AcademicQualificationFormGroup, academicQualification: AcademicQualificationFormGroupInput): void {
    const academicQualificationRawValue = { ...this.getFormDefaults(), ...academicQualification };
    form.reset(
      {
        ...academicQualificationRawValue,
        id: { value: academicQualificationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AcademicQualificationFormDefaults {
    return {
      id: null,
    };
  }
}

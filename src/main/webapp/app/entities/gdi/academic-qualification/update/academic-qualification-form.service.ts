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

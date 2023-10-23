import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProfessionalQualification, NewProfessionalQualification } from '../professional-qualification.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProfessionalQualification for edit and NewProfessionalQualificationFormGroupInput for create.
 */
type ProfessionalQualificationFormGroupInput = IProfessionalQualification | PartialWithRequiredKeyOf<NewProfessionalQualification>;

type ProfessionalQualificationFormDefaults = Pick<NewProfessionalQualification, 'id'>;

type ProfessionalQualificationFormGroupContent = {
  id: FormControl<IProfessionalQualification['id'] | NewProfessionalQualification['id']>;
  professionalQualificationsCode: FormControl<IProfessionalQualification['professionalQualificationsCode']>;
  professionalQualificationsType: FormControl<IProfessionalQualification['professionalQualificationsType']>;
  professionalQualificationsDetails: FormControl<IProfessionalQualification['professionalQualificationsDetails']>;
};

export type ProfessionalQualificationFormGroup = FormGroup<ProfessionalQualificationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProfessionalQualificationFormService {
  createProfessionalQualificationFormGroup(
    professionalQualification: ProfessionalQualificationFormGroupInput = { id: null }
  ): ProfessionalQualificationFormGroup {
    const professionalQualificationRawValue = {
      ...this.getFormDefaults(),
      ...professionalQualification,
    };
    return new FormGroup<ProfessionalQualificationFormGroupContent>({
      id: new FormControl(
        { value: professionalQualificationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      professionalQualificationsCode: new FormControl(professionalQualificationRawValue.professionalQualificationsCode, {
        validators: [Validators.required],
      }),
      professionalQualificationsType: new FormControl(professionalQualificationRawValue.professionalQualificationsType, {
        validators: [Validators.required],
      }),
      professionalQualificationsDetails: new FormControl(professionalQualificationRawValue.professionalQualificationsDetails),
    });
  }

  getProfessionalQualification(form: ProfessionalQualificationFormGroup): IProfessionalQualification | NewProfessionalQualification {
    return form.getRawValue() as IProfessionalQualification | NewProfessionalQualification;
  }

  resetForm(form: ProfessionalQualificationFormGroup, professionalQualification: ProfessionalQualificationFormGroupInput): void {
    const professionalQualificationRawValue = { ...this.getFormDefaults(), ...professionalQualification };
    form.reset(
      {
        ...professionalQualificationRawValue,
        id: { value: professionalQualificationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ProfessionalQualificationFormDefaults {
    return {
      id: null,
    };
  }
}

import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEmploymentTerms, NewEmploymentTerms } from '../employment-terms.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEmploymentTerms for edit and NewEmploymentTermsFormGroupInput for create.
 */
type EmploymentTermsFormGroupInput = IEmploymentTerms | PartialWithRequiredKeyOf<NewEmploymentTerms>;

type EmploymentTermsFormDefaults = Pick<NewEmploymentTerms, 'id'>;

type EmploymentTermsFormGroupContent = {
  id: FormControl<IEmploymentTerms['id'] | NewEmploymentTerms['id']>;
  employmentTermsCode: FormControl<IEmploymentTerms['employmentTermsCode']>;
  employmentTermsStatus: FormControl<IEmploymentTerms['employmentTermsStatus']>;
};

export type EmploymentTermsFormGroup = FormGroup<EmploymentTermsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EmploymentTermsFormService {
  createEmploymentTermsFormGroup(employmentTerms: EmploymentTermsFormGroupInput = { id: null }): EmploymentTermsFormGroup {
    const employmentTermsRawValue = {
      ...this.getFormDefaults(),
      ...employmentTerms,
    };
    return new FormGroup<EmploymentTermsFormGroupContent>({
      id: new FormControl(
        { value: employmentTermsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      employmentTermsCode: new FormControl(employmentTermsRawValue.employmentTermsCode, {
        validators: [Validators.required],
      }),
      employmentTermsStatus: new FormControl(employmentTermsRawValue.employmentTermsStatus, {
        validators: [Validators.required],
      }),
    });
  }

  getEmploymentTerms(form: EmploymentTermsFormGroup): IEmploymentTerms | NewEmploymentTerms {
    return form.getRawValue() as IEmploymentTerms | NewEmploymentTerms;
  }

  resetForm(form: EmploymentTermsFormGroup, employmentTerms: EmploymentTermsFormGroupInput): void {
    const employmentTermsRawValue = { ...this.getFormDefaults(), ...employmentTerms };
    form.reset(
      {
        ...employmentTermsRawValue,
        id: { value: employmentTermsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EmploymentTermsFormDefaults {
    return {
      id: null,
    };
  }
}

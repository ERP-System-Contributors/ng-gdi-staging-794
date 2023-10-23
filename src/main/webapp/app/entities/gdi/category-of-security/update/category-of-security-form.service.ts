import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICategoryOfSecurity, NewCategoryOfSecurity } from '../category-of-security.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICategoryOfSecurity for edit and NewCategoryOfSecurityFormGroupInput for create.
 */
type CategoryOfSecurityFormGroupInput = ICategoryOfSecurity | PartialWithRequiredKeyOf<NewCategoryOfSecurity>;

type CategoryOfSecurityFormDefaults = Pick<NewCategoryOfSecurity, 'id'>;

type CategoryOfSecurityFormGroupContent = {
  id: FormControl<ICategoryOfSecurity['id'] | NewCategoryOfSecurity['id']>;
  categoryOfSecurity: FormControl<ICategoryOfSecurity['categoryOfSecurity']>;
  categoryOfSecurityDetails: FormControl<ICategoryOfSecurity['categoryOfSecurityDetails']>;
  categoryOfSecurityDescription: FormControl<ICategoryOfSecurity['categoryOfSecurityDescription']>;
};

export type CategoryOfSecurityFormGroup = FormGroup<CategoryOfSecurityFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CategoryOfSecurityFormService {
  createCategoryOfSecurityFormGroup(categoryOfSecurity: CategoryOfSecurityFormGroupInput = { id: null }): CategoryOfSecurityFormGroup {
    const categoryOfSecurityRawValue = {
      ...this.getFormDefaults(),
      ...categoryOfSecurity,
    };
    return new FormGroup<CategoryOfSecurityFormGroupContent>({
      id: new FormControl(
        { value: categoryOfSecurityRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      categoryOfSecurity: new FormControl(categoryOfSecurityRawValue.categoryOfSecurity, {
        validators: [Validators.required],
      }),
      categoryOfSecurityDetails: new FormControl(categoryOfSecurityRawValue.categoryOfSecurityDetails, {
        validators: [Validators.required],
      }),
      categoryOfSecurityDescription: new FormControl(categoryOfSecurityRawValue.categoryOfSecurityDescription),
    });
  }

  getCategoryOfSecurity(form: CategoryOfSecurityFormGroup): ICategoryOfSecurity | NewCategoryOfSecurity {
    return form.getRawValue() as ICategoryOfSecurity | NewCategoryOfSecurity;
  }

  resetForm(form: CategoryOfSecurityFormGroup, categoryOfSecurity: CategoryOfSecurityFormGroupInput): void {
    const categoryOfSecurityRawValue = { ...this.getFormDefaults(), ...categoryOfSecurity };
    form.reset(
      {
        ...categoryOfSecurityRawValue,
        id: { value: categoryOfSecurityRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CategoryOfSecurityFormDefaults {
    return {
      id: null,
    };
  }
}

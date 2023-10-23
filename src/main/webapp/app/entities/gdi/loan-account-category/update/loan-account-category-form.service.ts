import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILoanAccountCategory, NewLoanAccountCategory } from '../loan-account-category.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILoanAccountCategory for edit and NewLoanAccountCategoryFormGroupInput for create.
 */
type LoanAccountCategoryFormGroupInput = ILoanAccountCategory | PartialWithRequiredKeyOf<NewLoanAccountCategory>;

type LoanAccountCategoryFormDefaults = Pick<NewLoanAccountCategory, 'id'>;

type LoanAccountCategoryFormGroupContent = {
  id: FormControl<ILoanAccountCategory['id'] | NewLoanAccountCategory['id']>;
  loanAccountMutationCode: FormControl<ILoanAccountCategory['loanAccountMutationCode']>;
  loanAccountMutationType: FormControl<ILoanAccountCategory['loanAccountMutationType']>;
  loanAccountMutationDetails: FormControl<ILoanAccountCategory['loanAccountMutationDetails']>;
  loanAccountMutationDescription: FormControl<ILoanAccountCategory['loanAccountMutationDescription']>;
};

export type LoanAccountCategoryFormGroup = FormGroup<LoanAccountCategoryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LoanAccountCategoryFormService {
  createLoanAccountCategoryFormGroup(loanAccountCategory: LoanAccountCategoryFormGroupInput = { id: null }): LoanAccountCategoryFormGroup {
    const loanAccountCategoryRawValue = {
      ...this.getFormDefaults(),
      ...loanAccountCategory,
    };
    return new FormGroup<LoanAccountCategoryFormGroupContent>({
      id: new FormControl(
        { value: loanAccountCategoryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      loanAccountMutationCode: new FormControl(loanAccountCategoryRawValue.loanAccountMutationCode, {
        validators: [Validators.required],
      }),
      loanAccountMutationType: new FormControl(loanAccountCategoryRawValue.loanAccountMutationType, {
        validators: [Validators.required],
      }),
      loanAccountMutationDetails: new FormControl(loanAccountCategoryRawValue.loanAccountMutationDetails, {
        validators: [Validators.required],
      }),
      loanAccountMutationDescription: new FormControl(loanAccountCategoryRawValue.loanAccountMutationDescription),
    });
  }

  getLoanAccountCategory(form: LoanAccountCategoryFormGroup): ILoanAccountCategory | NewLoanAccountCategory {
    return form.getRawValue() as ILoanAccountCategory | NewLoanAccountCategory;
  }

  resetForm(form: LoanAccountCategoryFormGroup, loanAccountCategory: LoanAccountCategoryFormGroupInput): void {
    const loanAccountCategoryRawValue = { ...this.getFormDefaults(), ...loanAccountCategory };
    form.reset(
      {
        ...loanAccountCategoryRawValue,
        id: { value: loanAccountCategoryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): LoanAccountCategoryFormDefaults {
    return {
      id: null,
    };
  }
}

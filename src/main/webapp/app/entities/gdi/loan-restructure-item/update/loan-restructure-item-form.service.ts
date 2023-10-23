import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILoanRestructureItem, NewLoanRestructureItem } from '../loan-restructure-item.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILoanRestructureItem for edit and NewLoanRestructureItemFormGroupInput for create.
 */
type LoanRestructureItemFormGroupInput = ILoanRestructureItem | PartialWithRequiredKeyOf<NewLoanRestructureItem>;

type LoanRestructureItemFormDefaults = Pick<NewLoanRestructureItem, 'id'>;

type LoanRestructureItemFormGroupContent = {
  id: FormControl<ILoanRestructureItem['id'] | NewLoanRestructureItem['id']>;
  loanRestructureItemCode: FormControl<ILoanRestructureItem['loanRestructureItemCode']>;
  loanRestructureItemType: FormControl<ILoanRestructureItem['loanRestructureItemType']>;
  loanRestructureItemDetails: FormControl<ILoanRestructureItem['loanRestructureItemDetails']>;
};

export type LoanRestructureItemFormGroup = FormGroup<LoanRestructureItemFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LoanRestructureItemFormService {
  createLoanRestructureItemFormGroup(loanRestructureItem: LoanRestructureItemFormGroupInput = { id: null }): LoanRestructureItemFormGroup {
    const loanRestructureItemRawValue = {
      ...this.getFormDefaults(),
      ...loanRestructureItem,
    };
    return new FormGroup<LoanRestructureItemFormGroupContent>({
      id: new FormControl(
        { value: loanRestructureItemRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      loanRestructureItemCode: new FormControl(loanRestructureItemRawValue.loanRestructureItemCode, {
        validators: [Validators.required],
      }),
      loanRestructureItemType: new FormControl(loanRestructureItemRawValue.loanRestructureItemType, {
        validators: [Validators.required],
      }),
      loanRestructureItemDetails: new FormControl(loanRestructureItemRawValue.loanRestructureItemDetails),
    });
  }

  getLoanRestructureItem(form: LoanRestructureItemFormGroup): ILoanRestructureItem | NewLoanRestructureItem {
    return form.getRawValue() as ILoanRestructureItem | NewLoanRestructureItem;
  }

  resetForm(form: LoanRestructureItemFormGroup, loanRestructureItem: LoanRestructureItemFormGroupInput): void {
    const loanRestructureItemRawValue = { ...this.getFormDefaults(), ...loanRestructureItem };
    form.reset(
      {
        ...loanRestructureItemRawValue,
        id: { value: loanRestructureItemRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): LoanRestructureItemFormDefaults {
    return {
      id: null,
    };
  }
}

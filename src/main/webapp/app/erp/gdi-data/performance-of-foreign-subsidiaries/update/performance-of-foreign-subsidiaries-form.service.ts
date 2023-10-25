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

import { IPerformanceOfForeignSubsidiaries, NewPerformanceOfForeignSubsidiaries } from '../performance-of-foreign-subsidiaries.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPerformanceOfForeignSubsidiaries for edit and NewPerformanceOfForeignSubsidiariesFormGroupInput for create.
 */
type PerformanceOfForeignSubsidiariesFormGroupInput =
  | IPerformanceOfForeignSubsidiaries
  | PartialWithRequiredKeyOf<NewPerformanceOfForeignSubsidiaries>;

type PerformanceOfForeignSubsidiariesFormDefaults = Pick<NewPerformanceOfForeignSubsidiaries, 'id'>;

type PerformanceOfForeignSubsidiariesFormGroupContent = {
  id: FormControl<IPerformanceOfForeignSubsidiaries['id'] | NewPerformanceOfForeignSubsidiaries['id']>;
  subsidiaryName: FormControl<IPerformanceOfForeignSubsidiaries['subsidiaryName']>;
  reportingDate: FormControl<IPerformanceOfForeignSubsidiaries['reportingDate']>;
  subsidiaryId: FormControl<IPerformanceOfForeignSubsidiaries['subsidiaryId']>;
  grossLoansAmount: FormControl<IPerformanceOfForeignSubsidiaries['grossLoansAmount']>;
  grossNPALoanAmount: FormControl<IPerformanceOfForeignSubsidiaries['grossNPALoanAmount']>;
  grossAssetsAmount: FormControl<IPerformanceOfForeignSubsidiaries['grossAssetsAmount']>;
  grossDepositsAmount: FormControl<IPerformanceOfForeignSubsidiaries['grossDepositsAmount']>;
  profitBeforeTax: FormControl<IPerformanceOfForeignSubsidiaries['profitBeforeTax']>;
  totalCapitalAdequacyRatio: FormControl<IPerformanceOfForeignSubsidiaries['totalCapitalAdequacyRatio']>;
  liquidityRatio: FormControl<IPerformanceOfForeignSubsidiaries['liquidityRatio']>;
  generalProvisions: FormControl<IPerformanceOfForeignSubsidiaries['generalProvisions']>;
  specificProvisions: FormControl<IPerformanceOfForeignSubsidiaries['specificProvisions']>;
  interestInSuspenseAmount: FormControl<IPerformanceOfForeignSubsidiaries['interestInSuspenseAmount']>;
  totalNumberOfStaff: FormControl<IPerformanceOfForeignSubsidiaries['totalNumberOfStaff']>;
  numberOfBranches: FormControl<IPerformanceOfForeignSubsidiaries['numberOfBranches']>;
  bankCode: FormControl<IPerformanceOfForeignSubsidiaries['bankCode']>;
  subsidiaryCountryCode: FormControl<IPerformanceOfForeignSubsidiaries['subsidiaryCountryCode']>;
};

export type PerformanceOfForeignSubsidiariesFormGroup = FormGroup<PerformanceOfForeignSubsidiariesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PerformanceOfForeignSubsidiariesFormService {
  createPerformanceOfForeignSubsidiariesFormGroup(
    performanceOfForeignSubsidiaries: PerformanceOfForeignSubsidiariesFormGroupInput = { id: null }
  ): PerformanceOfForeignSubsidiariesFormGroup {
    const performanceOfForeignSubsidiariesRawValue = {
      ...this.getFormDefaults(),
      ...performanceOfForeignSubsidiaries,
    };
    return new FormGroup<PerformanceOfForeignSubsidiariesFormGroupContent>({
      id: new FormControl(
        { value: performanceOfForeignSubsidiariesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      subsidiaryName: new FormControl(performanceOfForeignSubsidiariesRawValue.subsidiaryName, {
        validators: [Validators.required],
      }),
      reportingDate: new FormControl(performanceOfForeignSubsidiariesRawValue.reportingDate, {
        validators: [Validators.required],
      }),
      subsidiaryId: new FormControl(performanceOfForeignSubsidiariesRawValue.subsidiaryId, {
        validators: [Validators.required],
      }),
      grossLoansAmount: new FormControl(performanceOfForeignSubsidiariesRawValue.grossLoansAmount, {
        validators: [Validators.required],
      }),
      grossNPALoanAmount: new FormControl(performanceOfForeignSubsidiariesRawValue.grossNPALoanAmount, {
        validators: [Validators.required],
      }),
      grossAssetsAmount: new FormControl(performanceOfForeignSubsidiariesRawValue.grossAssetsAmount, {
        validators: [Validators.required],
      }),
      grossDepositsAmount: new FormControl(performanceOfForeignSubsidiariesRawValue.grossDepositsAmount, {
        validators: [Validators.required],
      }),
      profitBeforeTax: new FormControl(performanceOfForeignSubsidiariesRawValue.profitBeforeTax, {
        validators: [Validators.required],
      }),
      totalCapitalAdequacyRatio: new FormControl(performanceOfForeignSubsidiariesRawValue.totalCapitalAdequacyRatio, {
        validators: [Validators.required],
      }),
      liquidityRatio: new FormControl(performanceOfForeignSubsidiariesRawValue.liquidityRatio, {
        validators: [Validators.required],
      }),
      generalProvisions: new FormControl(performanceOfForeignSubsidiariesRawValue.generalProvisions, {
        validators: [Validators.required],
      }),
      specificProvisions: new FormControl(performanceOfForeignSubsidiariesRawValue.specificProvisions, {
        validators: [Validators.required],
      }),
      interestInSuspenseAmount: new FormControl(performanceOfForeignSubsidiariesRawValue.interestInSuspenseAmount, {
        validators: [Validators.required],
      }),
      totalNumberOfStaff: new FormControl(performanceOfForeignSubsidiariesRawValue.totalNumberOfStaff, {
        validators: [Validators.required, Validators.min(1)],
      }),
      numberOfBranches: new FormControl(performanceOfForeignSubsidiariesRawValue.numberOfBranches, {
        validators: [Validators.required, Validators.min(1)],
      }),
      bankCode: new FormControl(performanceOfForeignSubsidiariesRawValue.bankCode, {
        validators: [Validators.required],
      }),
      subsidiaryCountryCode: new FormControl(performanceOfForeignSubsidiariesRawValue.subsidiaryCountryCode, {
        validators: [Validators.required],
      }),
    });
  }

  getPerformanceOfForeignSubsidiaries(
    form: PerformanceOfForeignSubsidiariesFormGroup
  ): IPerformanceOfForeignSubsidiaries | NewPerformanceOfForeignSubsidiaries {
    return form.getRawValue() as IPerformanceOfForeignSubsidiaries | NewPerformanceOfForeignSubsidiaries;
  }

  resetForm(
    form: PerformanceOfForeignSubsidiariesFormGroup,
    performanceOfForeignSubsidiaries: PerformanceOfForeignSubsidiariesFormGroupInput
  ): void {
    const performanceOfForeignSubsidiariesRawValue = { ...this.getFormDefaults(), ...performanceOfForeignSubsidiaries };
    form.reset(
      {
        ...performanceOfForeignSubsidiariesRawValue,
        id: { value: performanceOfForeignSubsidiariesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PerformanceOfForeignSubsidiariesFormDefaults {
    return {
      id: null,
    };
  }
}

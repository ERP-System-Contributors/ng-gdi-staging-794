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

import { ITerminalsAndPOS, NewTerminalsAndPOS } from '../terminals-and-pos.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITerminalsAndPOS for edit and NewTerminalsAndPOSFormGroupInput for create.
 */
type TerminalsAndPOSFormGroupInput = ITerminalsAndPOS | PartialWithRequiredKeyOf<NewTerminalsAndPOS>;

type TerminalsAndPOSFormDefaults = Pick<NewTerminalsAndPOS, 'id'>;

type TerminalsAndPOSFormGroupContent = {
  id: FormControl<ITerminalsAndPOS['id'] | NewTerminalsAndPOS['id']>;
  reportingDate: FormControl<ITerminalsAndPOS['reportingDate']>;
  terminalId: FormControl<ITerminalsAndPOS['terminalId']>;
  merchantId: FormControl<ITerminalsAndPOS['merchantId']>;
  terminalName: FormControl<ITerminalsAndPOS['terminalName']>;
  terminalLocation: FormControl<ITerminalsAndPOS['terminalLocation']>;
  iso6709Latitute: FormControl<ITerminalsAndPOS['iso6709Latitute']>;
  iso6709Longitude: FormControl<ITerminalsAndPOS['iso6709Longitude']>;
  terminalOpeningDate: FormControl<ITerminalsAndPOS['terminalOpeningDate']>;
  terminalClosureDate: FormControl<ITerminalsAndPOS['terminalClosureDate']>;
  terminalType: FormControl<ITerminalsAndPOS['terminalType']>;
  terminalFunctionality: FormControl<ITerminalsAndPOS['terminalFunctionality']>;
  physicalLocation: FormControl<ITerminalsAndPOS['physicalLocation']>;
  bankId: FormControl<ITerminalsAndPOS['bankId']>;
  branchId: FormControl<ITerminalsAndPOS['branchId']>;
};

export type TerminalsAndPOSFormGroup = FormGroup<TerminalsAndPOSFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TerminalsAndPOSFormService {
  createTerminalsAndPOSFormGroup(terminalsAndPOS: TerminalsAndPOSFormGroupInput = { id: null }): TerminalsAndPOSFormGroup {
    const terminalsAndPOSRawValue = {
      ...this.getFormDefaults(),
      ...terminalsAndPOS,
    };
    return new FormGroup<TerminalsAndPOSFormGroupContent>({
      id: new FormControl(
        { value: terminalsAndPOSRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      reportingDate: new FormControl(terminalsAndPOSRawValue.reportingDate, {
        validators: [Validators.required],
      }),
      terminalId: new FormControl(terminalsAndPOSRawValue.terminalId, {
        validators: [Validators.required],
      }),
      merchantId: new FormControl(terminalsAndPOSRawValue.merchantId, {
        validators: [Validators.required],
      }),
      terminalName: new FormControl(terminalsAndPOSRawValue.terminalName, {
        validators: [Validators.required],
      }),
      terminalLocation: new FormControl(terminalsAndPOSRawValue.terminalLocation, {
        validators: [Validators.required],
      }),
      iso6709Latitute: new FormControl(terminalsAndPOSRawValue.iso6709Latitute, {
        validators: [Validators.required],
      }),
      iso6709Longitude: new FormControl(terminalsAndPOSRawValue.iso6709Longitude, {
        validators: [Validators.required],
      }),
      terminalOpeningDate: new FormControl(terminalsAndPOSRawValue.terminalOpeningDate, {
        validators: [Validators.required],
      }),
      terminalClosureDate: new FormControl(terminalsAndPOSRawValue.terminalClosureDate),
      terminalType: new FormControl(terminalsAndPOSRawValue.terminalType, {
        validators: [Validators.required],
      }),
      terminalFunctionality: new FormControl(terminalsAndPOSRawValue.terminalFunctionality, {
        validators: [Validators.required],
      }),
      physicalLocation: new FormControl(terminalsAndPOSRawValue.physicalLocation, {
        validators: [Validators.required],
      }),
      bankId: new FormControl(terminalsAndPOSRawValue.bankId, {
        validators: [Validators.required],
      }),
      branchId: new FormControl(terminalsAndPOSRawValue.branchId, {
        validators: [Validators.required],
      }),
    });
  }

  getTerminalsAndPOS(form: TerminalsAndPOSFormGroup): ITerminalsAndPOS | NewTerminalsAndPOS {
    return form.getRawValue() as ITerminalsAndPOS | NewTerminalsAndPOS;
  }

  resetForm(form: TerminalsAndPOSFormGroup, terminalsAndPOS: TerminalsAndPOSFormGroupInput): void {
    const terminalsAndPOSRawValue = { ...this.getFormDefaults(), ...terminalsAndPOS };
    form.reset(
      {
        ...terminalsAndPOSRawValue,
        id: { value: terminalsAndPOSRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TerminalsAndPOSFormDefaults {
    return {
      id: null,
    };
  }
}

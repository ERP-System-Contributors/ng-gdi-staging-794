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

import { IAccountAttributeMetadata, NewAccountAttributeMetadata } from '../account-attribute-metadata.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAccountAttributeMetadata for edit and NewAccountAttributeMetadataFormGroupInput for create.
 */
type AccountAttributeMetadataFormGroupInput = IAccountAttributeMetadata | PartialWithRequiredKeyOf<NewAccountAttributeMetadata>;

type AccountAttributeMetadataFormDefaults = Pick<NewAccountAttributeMetadata, 'id'>;

type AccountAttributeMetadataFormGroupContent = {
  id: FormControl<IAccountAttributeMetadata['id'] | NewAccountAttributeMetadata['id']>;
  precedence: FormControl<IAccountAttributeMetadata['precedence']>;
  columnName: FormControl<IAccountAttributeMetadata['columnName']>;
  shortName: FormControl<IAccountAttributeMetadata['shortName']>;
  detailedDefinition: FormControl<IAccountAttributeMetadata['detailedDefinition']>;
  dataType: FormControl<IAccountAttributeMetadata['dataType']>;
  length: FormControl<IAccountAttributeMetadata['length']>;
  columnIndex: FormControl<IAccountAttributeMetadata['columnIndex']>;
  mandatoryFieldFlag: FormControl<IAccountAttributeMetadata['mandatoryFieldFlag']>;
  businessValidation: FormControl<IAccountAttributeMetadata['businessValidation']>;
  technicalValidation: FormControl<IAccountAttributeMetadata['technicalValidation']>;
  dbColumnName: FormControl<IAccountAttributeMetadata['dbColumnName']>;
  metadataVersion: FormControl<IAccountAttributeMetadata['metadataVersion']>;
  standardInputTemplate: FormControl<IAccountAttributeMetadata['standardInputTemplate']>;
};

export type AccountAttributeMetadataFormGroup = FormGroup<AccountAttributeMetadataFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AccountAttributeMetadataFormService {
  createAccountAttributeMetadataFormGroup(
    accountAttributeMetadata: AccountAttributeMetadataFormGroupInput = { id: null }
  ): AccountAttributeMetadataFormGroup {
    const accountAttributeMetadataRawValue = {
      ...this.getFormDefaults(),
      ...accountAttributeMetadata,
    };
    return new FormGroup<AccountAttributeMetadataFormGroupContent>({
      id: new FormControl(
        { value: accountAttributeMetadataRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      precedence: new FormControl(accountAttributeMetadataRawValue.precedence, {
        validators: [Validators.required],
      }),
      columnName: new FormControl(accountAttributeMetadataRawValue.columnName, {
        validators: [Validators.required],
      }),
      shortName: new FormControl(accountAttributeMetadataRawValue.shortName, {
        validators: [Validators.required],
      }),
      detailedDefinition: new FormControl(accountAttributeMetadataRawValue.detailedDefinition),
      dataType: new FormControl(accountAttributeMetadataRawValue.dataType, {
        validators: [Validators.required],
      }),
      length: new FormControl(accountAttributeMetadataRawValue.length),
      columnIndex: new FormControl(accountAttributeMetadataRawValue.columnIndex),
      mandatoryFieldFlag: new FormControl(accountAttributeMetadataRawValue.mandatoryFieldFlag, {
        validators: [Validators.required],
      }),
      businessValidation: new FormControl(accountAttributeMetadataRawValue.businessValidation),
      technicalValidation: new FormControl(accountAttributeMetadataRawValue.technicalValidation),
      dbColumnName: new FormControl(accountAttributeMetadataRawValue.dbColumnName),
      metadataVersion: new FormControl(accountAttributeMetadataRawValue.metadataVersion),
      standardInputTemplate: new FormControl(accountAttributeMetadataRawValue.standardInputTemplate),
    });
  }

  getAccountAttributeMetadata(form: AccountAttributeMetadataFormGroup): IAccountAttributeMetadata | NewAccountAttributeMetadata {
    return form.getRawValue() as IAccountAttributeMetadata | NewAccountAttributeMetadata;
  }

  resetForm(form: AccountAttributeMetadataFormGroup, accountAttributeMetadata: AccountAttributeMetadataFormGroupInput): void {
    const accountAttributeMetadataRawValue = { ...this.getFormDefaults(), ...accountAttributeMetadata };
    form.reset(
      {
        ...accountAttributeMetadataRawValue,
        id: { value: accountAttributeMetadataRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AccountAttributeMetadataFormDefaults {
    return {
      id: null,
    };
  }
}

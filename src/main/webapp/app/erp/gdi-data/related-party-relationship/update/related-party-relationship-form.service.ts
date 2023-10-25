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

import { IRelatedPartyRelationship, NewRelatedPartyRelationship } from '../related-party-relationship.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRelatedPartyRelationship for edit and NewRelatedPartyRelationshipFormGroupInput for create.
 */
type RelatedPartyRelationshipFormGroupInput = IRelatedPartyRelationship | PartialWithRequiredKeyOf<NewRelatedPartyRelationship>;

type RelatedPartyRelationshipFormDefaults = Pick<NewRelatedPartyRelationship, 'id'>;

type RelatedPartyRelationshipFormGroupContent = {
  id: FormControl<IRelatedPartyRelationship['id'] | NewRelatedPartyRelationship['id']>;
  reportingDate: FormControl<IRelatedPartyRelationship['reportingDate']>;
  customerId: FormControl<IRelatedPartyRelationship['customerId']>;
  relatedPartyId: FormControl<IRelatedPartyRelationship['relatedPartyId']>;
  bankCode: FormControl<IRelatedPartyRelationship['bankCode']>;
  branchId: FormControl<IRelatedPartyRelationship['branchId']>;
  relationshipType: FormControl<IRelatedPartyRelationship['relationshipType']>;
};

export type RelatedPartyRelationshipFormGroup = FormGroup<RelatedPartyRelationshipFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RelatedPartyRelationshipFormService {
  createRelatedPartyRelationshipFormGroup(
    relatedPartyRelationship: RelatedPartyRelationshipFormGroupInput = { id: null }
  ): RelatedPartyRelationshipFormGroup {
    const relatedPartyRelationshipRawValue = {
      ...this.getFormDefaults(),
      ...relatedPartyRelationship,
    };
    return new FormGroup<RelatedPartyRelationshipFormGroupContent>({
      id: new FormControl(
        { value: relatedPartyRelationshipRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      reportingDate: new FormControl(relatedPartyRelationshipRawValue.reportingDate, {
        validators: [Validators.required],
      }),
      customerId: new FormControl(relatedPartyRelationshipRawValue.customerId, {
        validators: [Validators.required],
      }),
      relatedPartyId: new FormControl(relatedPartyRelationshipRawValue.relatedPartyId, {
        validators: [Validators.required],
      }),
      bankCode: new FormControl(relatedPartyRelationshipRawValue.bankCode, {
        validators: [Validators.required],
      }),
      branchId: new FormControl(relatedPartyRelationshipRawValue.branchId, {
        validators: [Validators.required],
      }),
      relationshipType: new FormControl(relatedPartyRelationshipRawValue.relationshipType, {
        validators: [Validators.required],
      }),
    });
  }

  getRelatedPartyRelationship(form: RelatedPartyRelationshipFormGroup): IRelatedPartyRelationship | NewRelatedPartyRelationship {
    return form.getRawValue() as IRelatedPartyRelationship | NewRelatedPartyRelationship;
  }

  resetForm(form: RelatedPartyRelationshipFormGroup, relatedPartyRelationship: RelatedPartyRelationshipFormGroupInput): void {
    const relatedPartyRelationshipRawValue = { ...this.getFormDefaults(), ...relatedPartyRelationship };
    form.reset(
      {
        ...relatedPartyRelationshipRawValue,
        id: { value: relatedPartyRelationshipRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): RelatedPartyRelationshipFormDefaults {
    return {
      id: null,
    };
  }
}

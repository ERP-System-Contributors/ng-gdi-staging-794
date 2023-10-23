import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPartyRelationType, NewPartyRelationType } from '../party-relation-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPartyRelationType for edit and NewPartyRelationTypeFormGroupInput for create.
 */
type PartyRelationTypeFormGroupInput = IPartyRelationType | PartialWithRequiredKeyOf<NewPartyRelationType>;

type PartyRelationTypeFormDefaults = Pick<NewPartyRelationType, 'id'>;

type PartyRelationTypeFormGroupContent = {
  id: FormControl<IPartyRelationType['id'] | NewPartyRelationType['id']>;
  partyRelationTypeCode: FormControl<IPartyRelationType['partyRelationTypeCode']>;
  partyRelationType: FormControl<IPartyRelationType['partyRelationType']>;
  partyRelationTypeDescription: FormControl<IPartyRelationType['partyRelationTypeDescription']>;
};

export type PartyRelationTypeFormGroup = FormGroup<PartyRelationTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PartyRelationTypeFormService {
  createPartyRelationTypeFormGroup(partyRelationType: PartyRelationTypeFormGroupInput = { id: null }): PartyRelationTypeFormGroup {
    const partyRelationTypeRawValue = {
      ...this.getFormDefaults(),
      ...partyRelationType,
    };
    return new FormGroup<PartyRelationTypeFormGroupContent>({
      id: new FormControl(
        { value: partyRelationTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      partyRelationTypeCode: new FormControl(partyRelationTypeRawValue.partyRelationTypeCode, {
        validators: [Validators.required],
      }),
      partyRelationType: new FormControl(partyRelationTypeRawValue.partyRelationType, {
        validators: [Validators.required],
      }),
      partyRelationTypeDescription: new FormControl(partyRelationTypeRawValue.partyRelationTypeDescription),
    });
  }

  getPartyRelationType(form: PartyRelationTypeFormGroup): IPartyRelationType | NewPartyRelationType {
    return form.getRawValue() as IPartyRelationType | NewPartyRelationType;
  }

  resetForm(form: PartyRelationTypeFormGroup, partyRelationType: PartyRelationTypeFormGroupInput): void {
    const partyRelationTypeRawValue = { ...this.getFormDefaults(), ...partyRelationType };
    form.reset(
      {
        ...partyRelationTypeRawValue,
        id: { value: partyRelationTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PartyRelationTypeFormDefaults {
    return {
      id: null,
    };
  }
}

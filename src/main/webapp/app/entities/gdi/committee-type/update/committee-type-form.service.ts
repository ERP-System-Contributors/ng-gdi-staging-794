import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICommitteeType, NewCommitteeType } from '../committee-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICommitteeType for edit and NewCommitteeTypeFormGroupInput for create.
 */
type CommitteeTypeFormGroupInput = ICommitteeType | PartialWithRequiredKeyOf<NewCommitteeType>;

type CommitteeTypeFormDefaults = Pick<NewCommitteeType, 'id'>;

type CommitteeTypeFormGroupContent = {
  id: FormControl<ICommitteeType['id'] | NewCommitteeType['id']>;
  committeeTypeCode: FormControl<ICommitteeType['committeeTypeCode']>;
  committeeType: FormControl<ICommitteeType['committeeType']>;
  committeeTypeDetails: FormControl<ICommitteeType['committeeTypeDetails']>;
};

export type CommitteeTypeFormGroup = FormGroup<CommitteeTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CommitteeTypeFormService {
  createCommitteeTypeFormGroup(committeeType: CommitteeTypeFormGroupInput = { id: null }): CommitteeTypeFormGroup {
    const committeeTypeRawValue = {
      ...this.getFormDefaults(),
      ...committeeType,
    };
    return new FormGroup<CommitteeTypeFormGroupContent>({
      id: new FormControl(
        { value: committeeTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      committeeTypeCode: new FormControl(committeeTypeRawValue.committeeTypeCode, {
        validators: [Validators.required],
      }),
      committeeType: new FormControl(committeeTypeRawValue.committeeType),
      committeeTypeDetails: new FormControl(committeeTypeRawValue.committeeTypeDetails),
    });
  }

  getCommitteeType(form: CommitteeTypeFormGroup): ICommitteeType | NewCommitteeType {
    return form.getRawValue() as ICommitteeType | NewCommitteeType;
  }

  resetForm(form: CommitteeTypeFormGroup, committeeType: CommitteeTypeFormGroupInput): void {
    const committeeTypeRawValue = { ...this.getFormDefaults(), ...committeeType };
    form.reset(
      {
        ...committeeTypeRawValue,
        id: { value: committeeTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CommitteeTypeFormDefaults {
    return {
      id: null,
    };
  }
}

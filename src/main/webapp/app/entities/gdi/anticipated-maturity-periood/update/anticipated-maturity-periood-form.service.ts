import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAnticipatedMaturityPeriood, NewAnticipatedMaturityPeriood } from '../anticipated-maturity-periood.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAnticipatedMaturityPeriood for edit and NewAnticipatedMaturityPerioodFormGroupInput for create.
 */
type AnticipatedMaturityPerioodFormGroupInput = IAnticipatedMaturityPeriood | PartialWithRequiredKeyOf<NewAnticipatedMaturityPeriood>;

type AnticipatedMaturityPerioodFormDefaults = Pick<NewAnticipatedMaturityPeriood, 'id'>;

type AnticipatedMaturityPerioodFormGroupContent = {
  id: FormControl<IAnticipatedMaturityPeriood['id'] | NewAnticipatedMaturityPeriood['id']>;
  anticipatedMaturityTenorCode: FormControl<IAnticipatedMaturityPeriood['anticipatedMaturityTenorCode']>;
  aniticipatedMaturityTenorType: FormControl<IAnticipatedMaturityPeriood['aniticipatedMaturityTenorType']>;
  anticipatedMaturityTenorDetails: FormControl<IAnticipatedMaturityPeriood['anticipatedMaturityTenorDetails']>;
};

export type AnticipatedMaturityPerioodFormGroup = FormGroup<AnticipatedMaturityPerioodFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AnticipatedMaturityPerioodFormService {
  createAnticipatedMaturityPerioodFormGroup(
    anticipatedMaturityPeriood: AnticipatedMaturityPerioodFormGroupInput = { id: null }
  ): AnticipatedMaturityPerioodFormGroup {
    const anticipatedMaturityPerioodRawValue = {
      ...this.getFormDefaults(),
      ...anticipatedMaturityPeriood,
    };
    return new FormGroup<AnticipatedMaturityPerioodFormGroupContent>({
      id: new FormControl(
        { value: anticipatedMaturityPerioodRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      anticipatedMaturityTenorCode: new FormControl(anticipatedMaturityPerioodRawValue.anticipatedMaturityTenorCode, {
        validators: [Validators.required],
      }),
      aniticipatedMaturityTenorType: new FormControl(anticipatedMaturityPerioodRawValue.aniticipatedMaturityTenorType, {
        validators: [Validators.required],
      }),
      anticipatedMaturityTenorDetails: new FormControl(anticipatedMaturityPerioodRawValue.anticipatedMaturityTenorDetails),
    });
  }

  getAnticipatedMaturityPeriood(form: AnticipatedMaturityPerioodFormGroup): IAnticipatedMaturityPeriood | NewAnticipatedMaturityPeriood {
    return form.getRawValue() as IAnticipatedMaturityPeriood | NewAnticipatedMaturityPeriood;
  }

  resetForm(form: AnticipatedMaturityPerioodFormGroup, anticipatedMaturityPeriood: AnticipatedMaturityPerioodFormGroupInput): void {
    const anticipatedMaturityPerioodRawValue = { ...this.getFormDefaults(), ...anticipatedMaturityPeriood };
    form.reset(
      {
        ...anticipatedMaturityPerioodRawValue,
        id: { value: anticipatedMaturityPerioodRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AnticipatedMaturityPerioodFormDefaults {
    return {
      id: null,
    };
  }
}

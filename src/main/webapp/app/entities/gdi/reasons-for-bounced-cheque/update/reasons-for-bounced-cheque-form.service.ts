import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IReasonsForBouncedCheque, NewReasonsForBouncedCheque } from '../reasons-for-bounced-cheque.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IReasonsForBouncedCheque for edit and NewReasonsForBouncedChequeFormGroupInput for create.
 */
type ReasonsForBouncedChequeFormGroupInput = IReasonsForBouncedCheque | PartialWithRequiredKeyOf<NewReasonsForBouncedCheque>;

type ReasonsForBouncedChequeFormDefaults = Pick<NewReasonsForBouncedCheque, 'id'>;

type ReasonsForBouncedChequeFormGroupContent = {
  id: FormControl<IReasonsForBouncedCheque['id'] | NewReasonsForBouncedCheque['id']>;
  bouncedChequeReasonsTypeCode: FormControl<IReasonsForBouncedCheque['bouncedChequeReasonsTypeCode']>;
  bouncedChequeReasonsType: FormControl<IReasonsForBouncedCheque['bouncedChequeReasonsType']>;
};

export type ReasonsForBouncedChequeFormGroup = FormGroup<ReasonsForBouncedChequeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ReasonsForBouncedChequeFormService {
  createReasonsForBouncedChequeFormGroup(
    reasonsForBouncedCheque: ReasonsForBouncedChequeFormGroupInput = { id: null }
  ): ReasonsForBouncedChequeFormGroup {
    const reasonsForBouncedChequeRawValue = {
      ...this.getFormDefaults(),
      ...reasonsForBouncedCheque,
    };
    return new FormGroup<ReasonsForBouncedChequeFormGroupContent>({
      id: new FormControl(
        { value: reasonsForBouncedChequeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      bouncedChequeReasonsTypeCode: new FormControl(reasonsForBouncedChequeRawValue.bouncedChequeReasonsTypeCode, {
        validators: [Validators.required],
      }),
      bouncedChequeReasonsType: new FormControl(reasonsForBouncedChequeRawValue.bouncedChequeReasonsType),
    });
  }

  getReasonsForBouncedCheque(form: ReasonsForBouncedChequeFormGroup): IReasonsForBouncedCheque | NewReasonsForBouncedCheque {
    return form.getRawValue() as IReasonsForBouncedCheque | NewReasonsForBouncedCheque;
  }

  resetForm(form: ReasonsForBouncedChequeFormGroup, reasonsForBouncedCheque: ReasonsForBouncedChequeFormGroupInput): void {
    const reasonsForBouncedChequeRawValue = { ...this.getFormDefaults(), ...reasonsForBouncedCheque };
    form.reset(
      {
        ...reasonsForBouncedChequeRawValue,
        id: { value: reasonsForBouncedChequeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ReasonsForBouncedChequeFormDefaults {
    return {
      id: null,
    };
  }
}

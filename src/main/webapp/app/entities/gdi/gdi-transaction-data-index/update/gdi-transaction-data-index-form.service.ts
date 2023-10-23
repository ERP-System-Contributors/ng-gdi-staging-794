import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IGdiTransactionDataIndex, NewGdiTransactionDataIndex } from '../gdi-transaction-data-index.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IGdiTransactionDataIndex for edit and NewGdiTransactionDataIndexFormGroupInput for create.
 */
type GdiTransactionDataIndexFormGroupInput = IGdiTransactionDataIndex | PartialWithRequiredKeyOf<NewGdiTransactionDataIndex>;

type GdiTransactionDataIndexFormDefaults = Pick<NewGdiTransactionDataIndex, 'id' | 'masterDataItems'>;

type GdiTransactionDataIndexFormGroupContent = {
  id: FormControl<IGdiTransactionDataIndex['id'] | NewGdiTransactionDataIndex['id']>;
  datasetName: FormControl<IGdiTransactionDataIndex['datasetName']>;
  databaseName: FormControl<IGdiTransactionDataIndex['databaseName']>;
  updateFrequency: FormControl<IGdiTransactionDataIndex['updateFrequency']>;
  datasetBehavior: FormControl<IGdiTransactionDataIndex['datasetBehavior']>;
  minimumDatarowsPerRequest: FormControl<IGdiTransactionDataIndex['minimumDatarowsPerRequest']>;
  maximumDataRowsPerRequest: FormControl<IGdiTransactionDataIndex['maximumDataRowsPerRequest']>;
  datasetDescription: FormControl<IGdiTransactionDataIndex['datasetDescription']>;
  dataTemplate: FormControl<IGdiTransactionDataIndex['dataTemplate']>;
  dataTemplateContentType: FormControl<IGdiTransactionDataIndex['dataTemplateContentType']>;
  masterDataItems: FormControl<IGdiTransactionDataIndex['masterDataItems']>;
};

export type GdiTransactionDataIndexFormGroup = FormGroup<GdiTransactionDataIndexFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class GdiTransactionDataIndexFormService {
  createGdiTransactionDataIndexFormGroup(
    gdiTransactionDataIndex: GdiTransactionDataIndexFormGroupInput = { id: null }
  ): GdiTransactionDataIndexFormGroup {
    const gdiTransactionDataIndexRawValue = {
      ...this.getFormDefaults(),
      ...gdiTransactionDataIndex,
    };
    return new FormGroup<GdiTransactionDataIndexFormGroupContent>({
      id: new FormControl(
        { value: gdiTransactionDataIndexRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      datasetName: new FormControl(gdiTransactionDataIndexRawValue.datasetName, {
        validators: [Validators.required],
      }),
      databaseName: new FormControl(gdiTransactionDataIndexRawValue.databaseName, {
        validators: [Validators.required],
      }),
      updateFrequency: new FormControl(gdiTransactionDataIndexRawValue.updateFrequency, {
        validators: [Validators.required],
      }),
      datasetBehavior: new FormControl(gdiTransactionDataIndexRawValue.datasetBehavior, {
        validators: [Validators.required],
      }),
      minimumDatarowsPerRequest: new FormControl(gdiTransactionDataIndexRawValue.minimumDatarowsPerRequest),
      maximumDataRowsPerRequest: new FormControl(gdiTransactionDataIndexRawValue.maximumDataRowsPerRequest),
      datasetDescription: new FormControl(gdiTransactionDataIndexRawValue.datasetDescription),
      dataTemplate: new FormControl(gdiTransactionDataIndexRawValue.dataTemplate),
      dataTemplateContentType: new FormControl(gdiTransactionDataIndexRawValue.dataTemplateContentType),
      masterDataItems: new FormControl(gdiTransactionDataIndexRawValue.masterDataItems ?? []),
    });
  }

  getGdiTransactionDataIndex(form: GdiTransactionDataIndexFormGroup): IGdiTransactionDataIndex | NewGdiTransactionDataIndex {
    return form.getRawValue() as IGdiTransactionDataIndex | NewGdiTransactionDataIndex;
  }

  resetForm(form: GdiTransactionDataIndexFormGroup, gdiTransactionDataIndex: GdiTransactionDataIndexFormGroupInput): void {
    const gdiTransactionDataIndexRawValue = { ...this.getFormDefaults(), ...gdiTransactionDataIndex };
    form.reset(
      {
        ...gdiTransactionDataIndexRawValue,
        id: { value: gdiTransactionDataIndexRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): GdiTransactionDataIndexFormDefaults {
    return {
      id: null,
      masterDataItems: [],
    };
  }
}

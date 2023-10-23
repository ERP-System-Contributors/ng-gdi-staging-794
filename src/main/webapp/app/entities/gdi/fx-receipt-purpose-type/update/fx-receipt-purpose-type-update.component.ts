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

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { FxReceiptPurposeTypeFormService, FxReceiptPurposeTypeFormGroup } from './fx-receipt-purpose-type-form.service';
import { IFxReceiptPurposeType } from '../fx-receipt-purpose-type.model';
import { FxReceiptPurposeTypeService } from '../service/fx-receipt-purpose-type.service';

@Component({
  selector: 'jhi-fx-receipt-purpose-type-update',
  templateUrl: './fx-receipt-purpose-type-update.component.html',
})
export class FxReceiptPurposeTypeUpdateComponent implements OnInit {
  isSaving = false;
  fxReceiptPurposeType: IFxReceiptPurposeType | null = null;

  editForm: FxReceiptPurposeTypeFormGroup = this.fxReceiptPurposeTypeFormService.createFxReceiptPurposeTypeFormGroup();

  constructor(
    protected fxReceiptPurposeTypeService: FxReceiptPurposeTypeService,
    protected fxReceiptPurposeTypeFormService: FxReceiptPurposeTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fxReceiptPurposeType }) => {
      this.fxReceiptPurposeType = fxReceiptPurposeType;
      if (fxReceiptPurposeType) {
        this.updateForm(fxReceiptPurposeType);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fxReceiptPurposeType = this.fxReceiptPurposeTypeFormService.getFxReceiptPurposeType(this.editForm);
    if (fxReceiptPurposeType.id !== null) {
      this.subscribeToSaveResponse(this.fxReceiptPurposeTypeService.update(fxReceiptPurposeType));
    } else {
      this.subscribeToSaveResponse(this.fxReceiptPurposeTypeService.create(fxReceiptPurposeType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFxReceiptPurposeType>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(fxReceiptPurposeType: IFxReceiptPurposeType): void {
    this.fxReceiptPurposeType = fxReceiptPurposeType;
    this.fxReceiptPurposeTypeFormService.resetForm(this.editForm, fxReceiptPurposeType);
  }
}

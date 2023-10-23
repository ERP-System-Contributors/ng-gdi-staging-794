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

import { CrbProductServiceFeeTypeFormService, CrbProductServiceFeeTypeFormGroup } from './crb-product-service-fee-type-form.service';
import { ICrbProductServiceFeeType } from '../crb-product-service-fee-type.model';
import { CrbProductServiceFeeTypeService } from '../service/crb-product-service-fee-type.service';

@Component({
  selector: 'jhi-crb-product-service-fee-type-update',
  templateUrl: './crb-product-service-fee-type-update.component.html',
})
export class CrbProductServiceFeeTypeUpdateComponent implements OnInit {
  isSaving = false;
  crbProductServiceFeeType: ICrbProductServiceFeeType | null = null;

  editForm: CrbProductServiceFeeTypeFormGroup = this.crbProductServiceFeeTypeFormService.createCrbProductServiceFeeTypeFormGroup();

  constructor(
    protected crbProductServiceFeeTypeService: CrbProductServiceFeeTypeService,
    protected crbProductServiceFeeTypeFormService: CrbProductServiceFeeTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crbProductServiceFeeType }) => {
      this.crbProductServiceFeeType = crbProductServiceFeeType;
      if (crbProductServiceFeeType) {
        this.updateForm(crbProductServiceFeeType);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const crbProductServiceFeeType = this.crbProductServiceFeeTypeFormService.getCrbProductServiceFeeType(this.editForm);
    if (crbProductServiceFeeType.id !== null) {
      this.subscribeToSaveResponse(this.crbProductServiceFeeTypeService.update(crbProductServiceFeeType));
    } else {
      this.subscribeToSaveResponse(this.crbProductServiceFeeTypeService.create(crbProductServiceFeeType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrbProductServiceFeeType>>): void {
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

  protected updateForm(crbProductServiceFeeType: ICrbProductServiceFeeType): void {
    this.crbProductServiceFeeType = crbProductServiceFeeType;
    this.crbProductServiceFeeTypeFormService.resetForm(this.editForm, crbProductServiceFeeType);
  }
}

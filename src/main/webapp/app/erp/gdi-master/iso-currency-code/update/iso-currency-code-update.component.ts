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

import { IsoCurrencyCodeFormService, IsoCurrencyCodeFormGroup } from './iso-currency-code-form.service';
import { IIsoCurrencyCode } from '../iso-currency-code.model';
import { IsoCurrencyCodeService } from '../service/iso-currency-code.service';

@Component({
  selector: 'jhi-iso-currency-code-update',
  templateUrl: './iso-currency-code-update.component.html',
})
export class IsoCurrencyCodeUpdateComponent implements OnInit {
  isSaving = false;
  isoCurrencyCode: IIsoCurrencyCode | null = null;

  editForm: IsoCurrencyCodeFormGroup = this.isoCurrencyCodeFormService.createIsoCurrencyCodeFormGroup();

  constructor(
    protected isoCurrencyCodeService: IsoCurrencyCodeService,
    protected isoCurrencyCodeFormService: IsoCurrencyCodeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ isoCurrencyCode }) => {
      this.isoCurrencyCode = isoCurrencyCode;
      if (isoCurrencyCode) {
        this.updateForm(isoCurrencyCode);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const isoCurrencyCode = this.isoCurrencyCodeFormService.getIsoCurrencyCode(this.editForm);
    if (isoCurrencyCode.id !== null) {
      this.subscribeToSaveResponse(this.isoCurrencyCodeService.update(isoCurrencyCode));
    } else {
      this.subscribeToSaveResponse(this.isoCurrencyCodeService.create(isoCurrencyCode));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IIsoCurrencyCode>>): void {
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

  protected updateForm(isoCurrencyCode: IIsoCurrencyCode): void {
    this.isoCurrencyCode = isoCurrencyCode;
    this.isoCurrencyCodeFormService.resetForm(this.editForm, isoCurrencyCode);
  }
}

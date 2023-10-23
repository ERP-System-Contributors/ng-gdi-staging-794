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

import { CrbGlCodeFormService, CrbGlCodeFormGroup } from './crb-gl-code-form.service';
import { ICrbGlCode } from '../crb-gl-code.model';
import { CrbGlCodeService } from '../service/crb-gl-code.service';

@Component({
  selector: 'jhi-crb-gl-code-update',
  templateUrl: './crb-gl-code-update.component.html',
})
export class CrbGlCodeUpdateComponent implements OnInit {
  isSaving = false;
  crbGlCode: ICrbGlCode | null = null;

  editForm: CrbGlCodeFormGroup = this.crbGlCodeFormService.createCrbGlCodeFormGroup();

  constructor(
    protected crbGlCodeService: CrbGlCodeService,
    protected crbGlCodeFormService: CrbGlCodeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crbGlCode }) => {
      this.crbGlCode = crbGlCode;
      if (crbGlCode) {
        this.updateForm(crbGlCode);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const crbGlCode = this.crbGlCodeFormService.getCrbGlCode(this.editForm);
    if (crbGlCode.id !== null) {
      this.subscribeToSaveResponse(this.crbGlCodeService.update(crbGlCode));
    } else {
      this.subscribeToSaveResponse(this.crbGlCodeService.create(crbGlCode));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrbGlCode>>): void {
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

  protected updateForm(crbGlCode: ICrbGlCode): void {
    this.crbGlCode = crbGlCode;
    this.crbGlCodeFormService.resetForm(this.editForm, crbGlCode);
  }
}

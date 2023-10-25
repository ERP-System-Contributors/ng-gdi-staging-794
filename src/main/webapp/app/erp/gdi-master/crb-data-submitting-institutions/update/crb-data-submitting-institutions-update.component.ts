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

import {
  CrbDataSubmittingInstitutionsFormService,
  CrbDataSubmittingInstitutionsFormGroup,
} from './crb-data-submitting-institutions-form.service';
import { ICrbDataSubmittingInstitutions } from '../crb-data-submitting-institutions.model';
import { CrbDataSubmittingInstitutionsService } from '../service/crb-data-submitting-institutions.service';

@Component({
  selector: 'jhi-crb-data-submitting-institutions-update',
  templateUrl: './crb-data-submitting-institutions-update.component.html',
})
export class CrbDataSubmittingInstitutionsUpdateComponent implements OnInit {
  isSaving = false;
  crbDataSubmittingInstitutions: ICrbDataSubmittingInstitutions | null = null;

  editForm: CrbDataSubmittingInstitutionsFormGroup =
    this.crbDataSubmittingInstitutionsFormService.createCrbDataSubmittingInstitutionsFormGroup();

  constructor(
    protected crbDataSubmittingInstitutionsService: CrbDataSubmittingInstitutionsService,
    protected crbDataSubmittingInstitutionsFormService: CrbDataSubmittingInstitutionsFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crbDataSubmittingInstitutions }) => {
      this.crbDataSubmittingInstitutions = crbDataSubmittingInstitutions;
      if (crbDataSubmittingInstitutions) {
        this.updateForm(crbDataSubmittingInstitutions);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const crbDataSubmittingInstitutions = this.crbDataSubmittingInstitutionsFormService.getCrbDataSubmittingInstitutions(this.editForm);
    if (crbDataSubmittingInstitutions.id !== null) {
      this.subscribeToSaveResponse(this.crbDataSubmittingInstitutionsService.update(crbDataSubmittingInstitutions));
    } else {
      this.subscribeToSaveResponse(this.crbDataSubmittingInstitutionsService.create(crbDataSubmittingInstitutions));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrbDataSubmittingInstitutions>>): void {
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

  protected updateForm(crbDataSubmittingInstitutions: ICrbDataSubmittingInstitutions): void {
    this.crbDataSubmittingInstitutions = crbDataSubmittingInstitutions;
    this.crbDataSubmittingInstitutionsFormService.resetForm(this.editForm, crbDataSubmittingInstitutions);
  }
}

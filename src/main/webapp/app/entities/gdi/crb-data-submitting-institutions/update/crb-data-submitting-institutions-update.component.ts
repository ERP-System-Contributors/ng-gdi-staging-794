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

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CrbAccountHolderTypeFormService, CrbAccountHolderTypeFormGroup } from './crb-account-holder-type-form.service';
import { ICrbAccountHolderType } from '../crb-account-holder-type.model';
import { CrbAccountHolderTypeService } from '../service/crb-account-holder-type.service';

@Component({
  selector: 'jhi-crb-account-holder-type-update',
  templateUrl: './crb-account-holder-type-update.component.html',
})
export class CrbAccountHolderTypeUpdateComponent implements OnInit {
  isSaving = false;
  crbAccountHolderType: ICrbAccountHolderType | null = null;

  editForm: CrbAccountHolderTypeFormGroup = this.crbAccountHolderTypeFormService.createCrbAccountHolderTypeFormGroup();

  constructor(
    protected crbAccountHolderTypeService: CrbAccountHolderTypeService,
    protected crbAccountHolderTypeFormService: CrbAccountHolderTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crbAccountHolderType }) => {
      this.crbAccountHolderType = crbAccountHolderType;
      if (crbAccountHolderType) {
        this.updateForm(crbAccountHolderType);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const crbAccountHolderType = this.crbAccountHolderTypeFormService.getCrbAccountHolderType(this.editForm);
    if (crbAccountHolderType.id !== null) {
      this.subscribeToSaveResponse(this.crbAccountHolderTypeService.update(crbAccountHolderType));
    } else {
      this.subscribeToSaveResponse(this.crbAccountHolderTypeService.create(crbAccountHolderType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrbAccountHolderType>>): void {
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

  protected updateForm(crbAccountHolderType: ICrbAccountHolderType): void {
    this.crbAccountHolderType = crbAccountHolderType;
    this.crbAccountHolderTypeFormService.resetForm(this.editForm, crbAccountHolderType);
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoanAccountCategoryFormService, LoanAccountCategoryFormGroup } from './loan-account-category-form.service';
import { ILoanAccountCategory } from '../loan-account-category.model';
import { LoanAccountCategoryService } from '../service/loan-account-category.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { LoanAccountMutationTypes } from 'app/entities/enumerations/loan-account-mutation-types.model';

@Component({
  selector: 'jhi-loan-account-category-update',
  templateUrl: './loan-account-category-update.component.html',
})
export class LoanAccountCategoryUpdateComponent implements OnInit {
  isSaving = false;
  loanAccountCategory: ILoanAccountCategory | null = null;
  loanAccountMutationTypesValues = Object.keys(LoanAccountMutationTypes);

  editForm: LoanAccountCategoryFormGroup = this.loanAccountCategoryFormService.createLoanAccountCategoryFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected loanAccountCategoryService: LoanAccountCategoryService,
    protected loanAccountCategoryFormService: LoanAccountCategoryFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ loanAccountCategory }) => {
      this.loanAccountCategory = loanAccountCategory;
      if (loanAccountCategory) {
        this.updateForm(loanAccountCategory);
      }
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('ngGdiStaging794App.error', { message: err.message })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const loanAccountCategory = this.loanAccountCategoryFormService.getLoanAccountCategory(this.editForm);
    if (loanAccountCategory.id !== null) {
      this.subscribeToSaveResponse(this.loanAccountCategoryService.update(loanAccountCategory));
    } else {
      this.subscribeToSaveResponse(this.loanAccountCategoryService.create(loanAccountCategory));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILoanAccountCategory>>): void {
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

  protected updateForm(loanAccountCategory: ILoanAccountCategory): void {
    this.loanAccountCategory = loanAccountCategory;
    this.loanAccountCategoryFormService.resetForm(this.editForm, loanAccountCategory);
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import {
  CrbSubmittingInstitutionCategoryFormService,
  CrbSubmittingInstitutionCategoryFormGroup,
} from './crb-submitting-institution-category-form.service';
import { ICrbSubmittingInstitutionCategory } from '../crb-submitting-institution-category.model';
import { CrbSubmittingInstitutionCategoryService } from '../service/crb-submitting-institution-category.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-crb-submitting-institution-category-update',
  templateUrl: './crb-submitting-institution-category-update.component.html',
})
export class CrbSubmittingInstitutionCategoryUpdateComponent implements OnInit {
  isSaving = false;
  crbSubmittingInstitutionCategory: ICrbSubmittingInstitutionCategory | null = null;

  editForm: CrbSubmittingInstitutionCategoryFormGroup =
    this.crbSubmittingInstitutionCategoryFormService.createCrbSubmittingInstitutionCategoryFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected crbSubmittingInstitutionCategoryService: CrbSubmittingInstitutionCategoryService,
    protected crbSubmittingInstitutionCategoryFormService: CrbSubmittingInstitutionCategoryFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crbSubmittingInstitutionCategory }) => {
      this.crbSubmittingInstitutionCategory = crbSubmittingInstitutionCategory;
      if (crbSubmittingInstitutionCategory) {
        this.updateForm(crbSubmittingInstitutionCategory);
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
    const crbSubmittingInstitutionCategory = this.crbSubmittingInstitutionCategoryFormService.getCrbSubmittingInstitutionCategory(
      this.editForm
    );
    if (crbSubmittingInstitutionCategory.id !== null) {
      this.subscribeToSaveResponse(this.crbSubmittingInstitutionCategoryService.update(crbSubmittingInstitutionCategory));
    } else {
      this.subscribeToSaveResponse(this.crbSubmittingInstitutionCategoryService.create(crbSubmittingInstitutionCategory));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrbSubmittingInstitutionCategory>>): void {
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

  protected updateForm(crbSubmittingInstitutionCategory: ICrbSubmittingInstitutionCategory): void {
    this.crbSubmittingInstitutionCategory = crbSubmittingInstitutionCategory;
    this.crbSubmittingInstitutionCategoryFormService.resetForm(this.editForm, crbSubmittingInstitutionCategory);
  }
}

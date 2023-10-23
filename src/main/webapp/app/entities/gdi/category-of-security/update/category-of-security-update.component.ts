import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CategoryOfSecurityFormService, CategoryOfSecurityFormGroup } from './category-of-security-form.service';
import { ICategoryOfSecurity } from '../category-of-security.model';
import { CategoryOfSecurityService } from '../service/category-of-security.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-category-of-security-update',
  templateUrl: './category-of-security-update.component.html',
})
export class CategoryOfSecurityUpdateComponent implements OnInit {
  isSaving = false;
  categoryOfSecurity: ICategoryOfSecurity | null = null;

  editForm: CategoryOfSecurityFormGroup = this.categoryOfSecurityFormService.createCategoryOfSecurityFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected categoryOfSecurityService: CategoryOfSecurityService,
    protected categoryOfSecurityFormService: CategoryOfSecurityFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ categoryOfSecurity }) => {
      this.categoryOfSecurity = categoryOfSecurity;
      if (categoryOfSecurity) {
        this.updateForm(categoryOfSecurity);
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
    const categoryOfSecurity = this.categoryOfSecurityFormService.getCategoryOfSecurity(this.editForm);
    if (categoryOfSecurity.id !== null) {
      this.subscribeToSaveResponse(this.categoryOfSecurityService.update(categoryOfSecurity));
    } else {
      this.subscribeToSaveResponse(this.categoryOfSecurityService.create(categoryOfSecurity));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategoryOfSecurity>>): void {
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

  protected updateForm(categoryOfSecurity: ICategoryOfSecurity): void {
    this.categoryOfSecurity = categoryOfSecurity;
    this.categoryOfSecurityFormService.resetForm(this.editForm, categoryOfSecurity);
  }
}

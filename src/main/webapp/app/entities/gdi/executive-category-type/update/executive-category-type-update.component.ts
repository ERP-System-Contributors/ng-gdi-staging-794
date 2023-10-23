import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ExecutiveCategoryTypeFormService, ExecutiveCategoryTypeFormGroup } from './executive-category-type-form.service';
import { IExecutiveCategoryType } from '../executive-category-type.model';
import { ExecutiveCategoryTypeService } from '../service/executive-category-type.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-executive-category-type-update',
  templateUrl: './executive-category-type-update.component.html',
})
export class ExecutiveCategoryTypeUpdateComponent implements OnInit {
  isSaving = false;
  executiveCategoryType: IExecutiveCategoryType | null = null;

  editForm: ExecutiveCategoryTypeFormGroup = this.executiveCategoryTypeFormService.createExecutiveCategoryTypeFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected executiveCategoryTypeService: ExecutiveCategoryTypeService,
    protected executiveCategoryTypeFormService: ExecutiveCategoryTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ executiveCategoryType }) => {
      this.executiveCategoryType = executiveCategoryType;
      if (executiveCategoryType) {
        this.updateForm(executiveCategoryType);
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
    const executiveCategoryType = this.executiveCategoryTypeFormService.getExecutiveCategoryType(this.editForm);
    if (executiveCategoryType.id !== null) {
      this.subscribeToSaveResponse(this.executiveCategoryTypeService.update(executiveCategoryType));
    } else {
      this.subscribeToSaveResponse(this.executiveCategoryTypeService.create(executiveCategoryType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExecutiveCategoryType>>): void {
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

  protected updateForm(executiveCategoryType: IExecutiveCategoryType): void {
    this.executiveCategoryType = executiveCategoryType;
    this.executiveCategoryTypeFormService.resetForm(this.editForm, executiveCategoryType);
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { InsiderCategoryTypesFormService, InsiderCategoryTypesFormGroup } from './insider-category-types-form.service';
import { IInsiderCategoryTypes } from '../insider-category-types.model';
import { InsiderCategoryTypesService } from '../service/insider-category-types.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-insider-category-types-update',
  templateUrl: './insider-category-types-update.component.html',
})
export class InsiderCategoryTypesUpdateComponent implements OnInit {
  isSaving = false;
  insiderCategoryTypes: IInsiderCategoryTypes | null = null;

  editForm: InsiderCategoryTypesFormGroup = this.insiderCategoryTypesFormService.createInsiderCategoryTypesFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected insiderCategoryTypesService: InsiderCategoryTypesService,
    protected insiderCategoryTypesFormService: InsiderCategoryTypesFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ insiderCategoryTypes }) => {
      this.insiderCategoryTypes = insiderCategoryTypes;
      if (insiderCategoryTypes) {
        this.updateForm(insiderCategoryTypes);
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
    const insiderCategoryTypes = this.insiderCategoryTypesFormService.getInsiderCategoryTypes(this.editForm);
    if (insiderCategoryTypes.id !== null) {
      this.subscribeToSaveResponse(this.insiderCategoryTypesService.update(insiderCategoryTypes));
    } else {
      this.subscribeToSaveResponse(this.insiderCategoryTypesService.create(insiderCategoryTypes));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInsiderCategoryTypes>>): void {
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

  protected updateForm(insiderCategoryTypes: IInsiderCategoryTypes): void {
    this.insiderCategoryTypes = insiderCategoryTypes;
    this.insiderCategoryTypesFormService.resetForm(this.editForm, insiderCategoryTypes);
  }
}

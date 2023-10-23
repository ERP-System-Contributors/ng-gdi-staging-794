import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { FxRateTypeFormService, FxRateTypeFormGroup } from './fx-rate-type-form.service';
import { IFxRateType } from '../fx-rate-type.model';
import { FxRateTypeService } from '../service/fx-rate-type.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-fx-rate-type-update',
  templateUrl: './fx-rate-type-update.component.html',
})
export class FxRateTypeUpdateComponent implements OnInit {
  isSaving = false;
  fxRateType: IFxRateType | null = null;

  editForm: FxRateTypeFormGroup = this.fxRateTypeFormService.createFxRateTypeFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected fxRateTypeService: FxRateTypeService,
    protected fxRateTypeFormService: FxRateTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fxRateType }) => {
      this.fxRateType = fxRateType;
      if (fxRateType) {
        this.updateForm(fxRateType);
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
    const fxRateType = this.fxRateTypeFormService.getFxRateType(this.editForm);
    if (fxRateType.id !== null) {
      this.subscribeToSaveResponse(this.fxRateTypeService.update(fxRateType));
    } else {
      this.subscribeToSaveResponse(this.fxRateTypeService.create(fxRateType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFxRateType>>): void {
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

  protected updateForm(fxRateType: IFxRateType): void {
    this.fxRateType = fxRateType;
    this.fxRateTypeFormService.resetForm(this.editForm, fxRateType);
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { DerivativeSubTypeFormService, DerivativeSubTypeFormGroup } from './derivative-sub-type-form.service';
import { IDerivativeSubType } from '../derivative-sub-type.model';
import { DerivativeSubTypeService } from '../service/derivative-sub-type.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-derivative-sub-type-update',
  templateUrl: './derivative-sub-type-update.component.html',
})
export class DerivativeSubTypeUpdateComponent implements OnInit {
  isSaving = false;
  derivativeSubType: IDerivativeSubType | null = null;

  editForm: DerivativeSubTypeFormGroup = this.derivativeSubTypeFormService.createDerivativeSubTypeFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected derivativeSubTypeService: DerivativeSubTypeService,
    protected derivativeSubTypeFormService: DerivativeSubTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ derivativeSubType }) => {
      this.derivativeSubType = derivativeSubType;
      if (derivativeSubType) {
        this.updateForm(derivativeSubType);
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
    const derivativeSubType = this.derivativeSubTypeFormService.getDerivativeSubType(this.editForm);
    if (derivativeSubType.id !== null) {
      this.subscribeToSaveResponse(this.derivativeSubTypeService.update(derivativeSubType));
    } else {
      this.subscribeToSaveResponse(this.derivativeSubTypeService.create(derivativeSubType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDerivativeSubType>>): void {
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

  protected updateForm(derivativeSubType: IDerivativeSubType): void {
    this.derivativeSubType = derivativeSubType;
    this.derivativeSubTypeFormService.resetForm(this.editForm, derivativeSubType);
  }
}

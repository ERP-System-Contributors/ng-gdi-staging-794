import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { DerivativeUnderlyingAssetFormService, DerivativeUnderlyingAssetFormGroup } from './derivative-underlying-asset-form.service';
import { IDerivativeUnderlyingAsset } from '../derivative-underlying-asset.model';
import { DerivativeUnderlyingAssetService } from '../service/derivative-underlying-asset.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-derivative-underlying-asset-update',
  templateUrl: './derivative-underlying-asset-update.component.html',
})
export class DerivativeUnderlyingAssetUpdateComponent implements OnInit {
  isSaving = false;
  derivativeUnderlyingAsset: IDerivativeUnderlyingAsset | null = null;

  editForm: DerivativeUnderlyingAssetFormGroup = this.derivativeUnderlyingAssetFormService.createDerivativeUnderlyingAssetFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected derivativeUnderlyingAssetService: DerivativeUnderlyingAssetService,
    protected derivativeUnderlyingAssetFormService: DerivativeUnderlyingAssetFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ derivativeUnderlyingAsset }) => {
      this.derivativeUnderlyingAsset = derivativeUnderlyingAsset;
      if (derivativeUnderlyingAsset) {
        this.updateForm(derivativeUnderlyingAsset);
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
    const derivativeUnderlyingAsset = this.derivativeUnderlyingAssetFormService.getDerivativeUnderlyingAsset(this.editForm);
    if (derivativeUnderlyingAsset.id !== null) {
      this.subscribeToSaveResponse(this.derivativeUnderlyingAssetService.update(derivativeUnderlyingAsset));
    } else {
      this.subscribeToSaveResponse(this.derivativeUnderlyingAssetService.create(derivativeUnderlyingAsset));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDerivativeUnderlyingAsset>>): void {
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

  protected updateForm(derivativeUnderlyingAsset: IDerivativeUnderlyingAsset): void {
    this.derivativeUnderlyingAsset = derivativeUnderlyingAsset;
    this.derivativeUnderlyingAssetFormService.resetForm(this.editForm, derivativeUnderlyingAsset);
  }
}

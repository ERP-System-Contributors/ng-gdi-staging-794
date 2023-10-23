import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CrbAmountCategoryBandFormService, CrbAmountCategoryBandFormGroup } from './crb-amount-category-band-form.service';
import { ICrbAmountCategoryBand } from '../crb-amount-category-band.model';
import { CrbAmountCategoryBandService } from '../service/crb-amount-category-band.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-crb-amount-category-band-update',
  templateUrl: './crb-amount-category-band-update.component.html',
})
export class CrbAmountCategoryBandUpdateComponent implements OnInit {
  isSaving = false;
  crbAmountCategoryBand: ICrbAmountCategoryBand | null = null;

  editForm: CrbAmountCategoryBandFormGroup = this.crbAmountCategoryBandFormService.createCrbAmountCategoryBandFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected crbAmountCategoryBandService: CrbAmountCategoryBandService,
    protected crbAmountCategoryBandFormService: CrbAmountCategoryBandFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crbAmountCategoryBand }) => {
      this.crbAmountCategoryBand = crbAmountCategoryBand;
      if (crbAmountCategoryBand) {
        this.updateForm(crbAmountCategoryBand);
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
    const crbAmountCategoryBand = this.crbAmountCategoryBandFormService.getCrbAmountCategoryBand(this.editForm);
    if (crbAmountCategoryBand.id !== null) {
      this.subscribeToSaveResponse(this.crbAmountCategoryBandService.update(crbAmountCategoryBand));
    } else {
      this.subscribeToSaveResponse(this.crbAmountCategoryBandService.create(crbAmountCategoryBand));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrbAmountCategoryBand>>): void {
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

  protected updateForm(crbAmountCategoryBand: ICrbAmountCategoryBand): void {
    this.crbAmountCategoryBand = crbAmountCategoryBand;
    this.crbAmountCategoryBandFormService.resetForm(this.editForm, crbAmountCategoryBand);
  }
}

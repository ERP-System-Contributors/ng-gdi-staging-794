import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CrbReportViewBandFormService, CrbReportViewBandFormGroup } from './crb-report-view-band-form.service';
import { ICrbReportViewBand } from '../crb-report-view-band.model';
import { CrbReportViewBandService } from '../service/crb-report-view-band.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-crb-report-view-band-update',
  templateUrl: './crb-report-view-band-update.component.html',
})
export class CrbReportViewBandUpdateComponent implements OnInit {
  isSaving = false;
  crbReportViewBand: ICrbReportViewBand | null = null;

  editForm: CrbReportViewBandFormGroup = this.crbReportViewBandFormService.createCrbReportViewBandFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected crbReportViewBandService: CrbReportViewBandService,
    protected crbReportViewBandFormService: CrbReportViewBandFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crbReportViewBand }) => {
      this.crbReportViewBand = crbReportViewBand;
      if (crbReportViewBand) {
        this.updateForm(crbReportViewBand);
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
    const crbReportViewBand = this.crbReportViewBandFormService.getCrbReportViewBand(this.editForm);
    if (crbReportViewBand.id !== null) {
      this.subscribeToSaveResponse(this.crbReportViewBandService.update(crbReportViewBand));
    } else {
      this.subscribeToSaveResponse(this.crbReportViewBandService.create(crbReportViewBand));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrbReportViewBand>>): void {
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

  protected updateForm(crbReportViewBand: ICrbReportViewBand): void {
    this.crbReportViewBand = crbReportViewBand;
    this.crbReportViewBandFormService.resetForm(this.editForm, crbReportViewBand);
  }
}

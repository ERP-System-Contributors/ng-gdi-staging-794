import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CrbComplaintTypeFormService, CrbComplaintTypeFormGroup } from './crb-complaint-type-form.service';
import { ICrbComplaintType } from '../crb-complaint-type.model';
import { CrbComplaintTypeService } from '../service/crb-complaint-type.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-crb-complaint-type-update',
  templateUrl: './crb-complaint-type-update.component.html',
})
export class CrbComplaintTypeUpdateComponent implements OnInit {
  isSaving = false;
  crbComplaintType: ICrbComplaintType | null = null;

  editForm: CrbComplaintTypeFormGroup = this.crbComplaintTypeFormService.createCrbComplaintTypeFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected crbComplaintTypeService: CrbComplaintTypeService,
    protected crbComplaintTypeFormService: CrbComplaintTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crbComplaintType }) => {
      this.crbComplaintType = crbComplaintType;
      if (crbComplaintType) {
        this.updateForm(crbComplaintType);
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
    const crbComplaintType = this.crbComplaintTypeFormService.getCrbComplaintType(this.editForm);
    if (crbComplaintType.id !== null) {
      this.subscribeToSaveResponse(this.crbComplaintTypeService.update(crbComplaintType));
    } else {
      this.subscribeToSaveResponse(this.crbComplaintTypeService.create(crbComplaintType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrbComplaintType>>): void {
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

  protected updateForm(crbComplaintType: ICrbComplaintType): void {
    this.crbComplaintType = crbComplaintType;
    this.crbComplaintTypeFormService.resetForm(this.editForm, crbComplaintType);
  }
}

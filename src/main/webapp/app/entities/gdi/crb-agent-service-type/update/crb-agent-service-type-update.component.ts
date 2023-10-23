import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CrbAgentServiceTypeFormService, CrbAgentServiceTypeFormGroup } from './crb-agent-service-type-form.service';
import { ICrbAgentServiceType } from '../crb-agent-service-type.model';
import { CrbAgentServiceTypeService } from '../service/crb-agent-service-type.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-crb-agent-service-type-update',
  templateUrl: './crb-agent-service-type-update.component.html',
})
export class CrbAgentServiceTypeUpdateComponent implements OnInit {
  isSaving = false;
  crbAgentServiceType: ICrbAgentServiceType | null = null;

  editForm: CrbAgentServiceTypeFormGroup = this.crbAgentServiceTypeFormService.createCrbAgentServiceTypeFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected crbAgentServiceTypeService: CrbAgentServiceTypeService,
    protected crbAgentServiceTypeFormService: CrbAgentServiceTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crbAgentServiceType }) => {
      this.crbAgentServiceType = crbAgentServiceType;
      if (crbAgentServiceType) {
        this.updateForm(crbAgentServiceType);
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
    const crbAgentServiceType = this.crbAgentServiceTypeFormService.getCrbAgentServiceType(this.editForm);
    if (crbAgentServiceType.id !== null) {
      this.subscribeToSaveResponse(this.crbAgentServiceTypeService.update(crbAgentServiceType));
    } else {
      this.subscribeToSaveResponse(this.crbAgentServiceTypeService.create(crbAgentServiceType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrbAgentServiceType>>): void {
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

  protected updateForm(crbAgentServiceType: ICrbAgentServiceType): void {
    this.crbAgentServiceType = crbAgentServiceType;
    this.crbAgentServiceTypeFormService.resetForm(this.editForm, crbAgentServiceType);
  }
}

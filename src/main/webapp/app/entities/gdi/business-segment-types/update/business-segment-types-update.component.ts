import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { BusinessSegmentTypesFormService, BusinessSegmentTypesFormGroup } from './business-segment-types-form.service';
import { IBusinessSegmentTypes } from '../business-segment-types.model';
import { BusinessSegmentTypesService } from '../service/business-segment-types.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-business-segment-types-update',
  templateUrl: './business-segment-types-update.component.html',
})
export class BusinessSegmentTypesUpdateComponent implements OnInit {
  isSaving = false;
  businessSegmentTypes: IBusinessSegmentTypes | null = null;

  editForm: BusinessSegmentTypesFormGroup = this.businessSegmentTypesFormService.createBusinessSegmentTypesFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected businessSegmentTypesService: BusinessSegmentTypesService,
    protected businessSegmentTypesFormService: BusinessSegmentTypesFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ businessSegmentTypes }) => {
      this.businessSegmentTypes = businessSegmentTypes;
      if (businessSegmentTypes) {
        this.updateForm(businessSegmentTypes);
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
    const businessSegmentTypes = this.businessSegmentTypesFormService.getBusinessSegmentTypes(this.editForm);
    if (businessSegmentTypes.id !== null) {
      this.subscribeToSaveResponse(this.businessSegmentTypesService.update(businessSegmentTypes));
    } else {
      this.subscribeToSaveResponse(this.businessSegmentTypesService.create(businessSegmentTypes));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBusinessSegmentTypes>>): void {
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

  protected updateForm(businessSegmentTypes: IBusinessSegmentTypes): void {
    this.businessSegmentTypes = businessSegmentTypes;
    this.businessSegmentTypesFormService.resetForm(this.editForm, businessSegmentTypes);
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IsicEconomicActivityFormService, IsicEconomicActivityFormGroup } from './isic-economic-activity-form.service';
import { IIsicEconomicActivity } from '../isic-economic-activity.model';
import { IsicEconomicActivityService } from '../service/isic-economic-activity.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-isic-economic-activity-update',
  templateUrl: './isic-economic-activity-update.component.html',
})
export class IsicEconomicActivityUpdateComponent implements OnInit {
  isSaving = false;
  isicEconomicActivity: IIsicEconomicActivity | null = null;

  editForm: IsicEconomicActivityFormGroup = this.isicEconomicActivityFormService.createIsicEconomicActivityFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected isicEconomicActivityService: IsicEconomicActivityService,
    protected isicEconomicActivityFormService: IsicEconomicActivityFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ isicEconomicActivity }) => {
      this.isicEconomicActivity = isicEconomicActivity;
      if (isicEconomicActivity) {
        this.updateForm(isicEconomicActivity);
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
    const isicEconomicActivity = this.isicEconomicActivityFormService.getIsicEconomicActivity(this.editForm);
    if (isicEconomicActivity.id !== null) {
      this.subscribeToSaveResponse(this.isicEconomicActivityService.update(isicEconomicActivity));
    } else {
      this.subscribeToSaveResponse(this.isicEconomicActivityService.create(isicEconomicActivity));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IIsicEconomicActivity>>): void {
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

  protected updateForm(isicEconomicActivity: IIsicEconomicActivity): void {
    this.isicEconomicActivity = isicEconomicActivity;
    this.isicEconomicActivityFormService.resetForm(this.editForm, isicEconomicActivity);
  }
}

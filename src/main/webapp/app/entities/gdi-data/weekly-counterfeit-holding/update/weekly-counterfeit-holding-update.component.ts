import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { WeeklyCounterfeitHoldingFormService, WeeklyCounterfeitHoldingFormGroup } from './weekly-counterfeit-holding-form.service';
import { IWeeklyCounterfeitHolding } from '../weekly-counterfeit-holding.model';
import { WeeklyCounterfeitHoldingService } from '../service/weekly-counterfeit-holding.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-weekly-counterfeit-holding-update',
  templateUrl: './weekly-counterfeit-holding-update.component.html',
})
export class WeeklyCounterfeitHoldingUpdateComponent implements OnInit {
  isSaving = false;
  weeklyCounterfeitHolding: IWeeklyCounterfeitHolding | null = null;

  editForm: WeeklyCounterfeitHoldingFormGroup = this.weeklyCounterfeitHoldingFormService.createWeeklyCounterfeitHoldingFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected weeklyCounterfeitHoldingService: WeeklyCounterfeitHoldingService,
    protected weeklyCounterfeitHoldingFormService: WeeklyCounterfeitHoldingFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ weeklyCounterfeitHolding }) => {
      this.weeklyCounterfeitHolding = weeklyCounterfeitHolding;
      if (weeklyCounterfeitHolding) {
        this.updateForm(weeklyCounterfeitHolding);
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
    const weeklyCounterfeitHolding = this.weeklyCounterfeitHoldingFormService.getWeeklyCounterfeitHolding(this.editForm);
    if (weeklyCounterfeitHolding.id !== null) {
      this.subscribeToSaveResponse(this.weeklyCounterfeitHoldingService.update(weeklyCounterfeitHolding));
    } else {
      this.subscribeToSaveResponse(this.weeklyCounterfeitHoldingService.create(weeklyCounterfeitHolding));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWeeklyCounterfeitHolding>>): void {
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

  protected updateForm(weeklyCounterfeitHolding: IWeeklyCounterfeitHolding): void {
    this.weeklyCounterfeitHolding = weeklyCounterfeitHolding;
    this.weeklyCounterfeitHoldingFormService.resetForm(this.editForm, weeklyCounterfeitHolding);
  }
}

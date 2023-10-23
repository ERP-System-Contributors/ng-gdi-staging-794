import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CounterpartyTypeFormService, CounterpartyTypeFormGroup } from './counterparty-type-form.service';
import { ICounterpartyType } from '../counterparty-type.model';
import { CounterpartyTypeService } from '../service/counterparty-type.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-counterparty-type-update',
  templateUrl: './counterparty-type-update.component.html',
})
export class CounterpartyTypeUpdateComponent implements OnInit {
  isSaving = false;
  counterpartyType: ICounterpartyType | null = null;

  editForm: CounterpartyTypeFormGroup = this.counterpartyTypeFormService.createCounterpartyTypeFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected counterpartyTypeService: CounterpartyTypeService,
    protected counterpartyTypeFormService: CounterpartyTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ counterpartyType }) => {
      this.counterpartyType = counterpartyType;
      if (counterpartyType) {
        this.updateForm(counterpartyType);
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
    const counterpartyType = this.counterpartyTypeFormService.getCounterpartyType(this.editForm);
    if (counterpartyType.id !== null) {
      this.subscribeToSaveResponse(this.counterpartyTypeService.update(counterpartyType));
    } else {
      this.subscribeToSaveResponse(this.counterpartyTypeService.create(counterpartyType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICounterpartyType>>): void {
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

  protected updateForm(counterpartyType: ICounterpartyType): void {
    this.counterpartyType = counterpartyType;
    this.counterpartyTypeFormService.resetForm(this.editForm, counterpartyType);
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CounterPartyCategoryFormService, CounterPartyCategoryFormGroup } from './counter-party-category-form.service';
import { ICounterPartyCategory } from '../counter-party-category.model';
import { CounterPartyCategoryService } from '../service/counter-party-category.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { CounterpartyCategory } from 'app/entities/enumerations/counterparty-category.model';

@Component({
  selector: 'jhi-counter-party-category-update',
  templateUrl: './counter-party-category-update.component.html',
})
export class CounterPartyCategoryUpdateComponent implements OnInit {
  isSaving = false;
  counterPartyCategory: ICounterPartyCategory | null = null;
  counterpartyCategoryValues = Object.keys(CounterpartyCategory);

  editForm: CounterPartyCategoryFormGroup = this.counterPartyCategoryFormService.createCounterPartyCategoryFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected counterPartyCategoryService: CounterPartyCategoryService,
    protected counterPartyCategoryFormService: CounterPartyCategoryFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ counterPartyCategory }) => {
      this.counterPartyCategory = counterPartyCategory;
      if (counterPartyCategory) {
        this.updateForm(counterPartyCategory);
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
    const counterPartyCategory = this.counterPartyCategoryFormService.getCounterPartyCategory(this.editForm);
    if (counterPartyCategory.id !== null) {
      this.subscribeToSaveResponse(this.counterPartyCategoryService.update(counterPartyCategory));
    } else {
      this.subscribeToSaveResponse(this.counterPartyCategoryService.create(counterPartyCategory));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICounterPartyCategory>>): void {
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

  protected updateForm(counterPartyCategory: ICounterPartyCategory): void {
    this.counterPartyCategory = counterPartyCategory;
    this.counterPartyCategoryFormService.resetForm(this.editForm, counterPartyCategory);
  }
}

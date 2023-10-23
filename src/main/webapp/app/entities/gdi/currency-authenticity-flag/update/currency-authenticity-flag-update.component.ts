import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CurrencyAuthenticityFlagFormService, CurrencyAuthenticityFlagFormGroup } from './currency-authenticity-flag-form.service';
import { ICurrencyAuthenticityFlag } from '../currency-authenticity-flag.model';
import { CurrencyAuthenticityFlagService } from '../service/currency-authenticity-flag.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { CurrencyAuthenticityFlags } from 'app/entities/enumerations/currency-authenticity-flags.model';
import { CurrencyAuthenticityTypes } from 'app/entities/enumerations/currency-authenticity-types.model';

@Component({
  selector: 'jhi-currency-authenticity-flag-update',
  templateUrl: './currency-authenticity-flag-update.component.html',
})
export class CurrencyAuthenticityFlagUpdateComponent implements OnInit {
  isSaving = false;
  currencyAuthenticityFlag: ICurrencyAuthenticityFlag | null = null;
  currencyAuthenticityFlagsValues = Object.keys(CurrencyAuthenticityFlags);
  currencyAuthenticityTypesValues = Object.keys(CurrencyAuthenticityTypes);

  editForm: CurrencyAuthenticityFlagFormGroup = this.currencyAuthenticityFlagFormService.createCurrencyAuthenticityFlagFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected currencyAuthenticityFlagService: CurrencyAuthenticityFlagService,
    protected currencyAuthenticityFlagFormService: CurrencyAuthenticityFlagFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ currencyAuthenticityFlag }) => {
      this.currencyAuthenticityFlag = currencyAuthenticityFlag;
      if (currencyAuthenticityFlag) {
        this.updateForm(currencyAuthenticityFlag);
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
    const currencyAuthenticityFlag = this.currencyAuthenticityFlagFormService.getCurrencyAuthenticityFlag(this.editForm);
    if (currencyAuthenticityFlag.id !== null) {
      this.subscribeToSaveResponse(this.currencyAuthenticityFlagService.update(currencyAuthenticityFlag));
    } else {
      this.subscribeToSaveResponse(this.currencyAuthenticityFlagService.create(currencyAuthenticityFlag));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICurrencyAuthenticityFlag>>): void {
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

  protected updateForm(currencyAuthenticityFlag: ICurrencyAuthenticityFlag): void {
    this.currencyAuthenticityFlag = currencyAuthenticityFlag;
    this.currencyAuthenticityFlagFormService.resetForm(this.editForm, currencyAuthenticityFlag);
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IsoCurrencyCodeFormService, IsoCurrencyCodeFormGroup } from './iso-currency-code-form.service';
import { IIsoCurrencyCode } from '../iso-currency-code.model';
import { IsoCurrencyCodeService } from '../service/iso-currency-code.service';

@Component({
  selector: 'jhi-iso-currency-code-update',
  templateUrl: './iso-currency-code-update.component.html',
})
export class IsoCurrencyCodeUpdateComponent implements OnInit {
  isSaving = false;
  isoCurrencyCode: IIsoCurrencyCode | null = null;

  editForm: IsoCurrencyCodeFormGroup = this.isoCurrencyCodeFormService.createIsoCurrencyCodeFormGroup();

  constructor(
    protected isoCurrencyCodeService: IsoCurrencyCodeService,
    protected isoCurrencyCodeFormService: IsoCurrencyCodeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ isoCurrencyCode }) => {
      this.isoCurrencyCode = isoCurrencyCode;
      if (isoCurrencyCode) {
        this.updateForm(isoCurrencyCode);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const isoCurrencyCode = this.isoCurrencyCodeFormService.getIsoCurrencyCode(this.editForm);
    if (isoCurrencyCode.id !== null) {
      this.subscribeToSaveResponse(this.isoCurrencyCodeService.update(isoCurrencyCode));
    } else {
      this.subscribeToSaveResponse(this.isoCurrencyCodeService.create(isoCurrencyCode));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IIsoCurrencyCode>>): void {
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

  protected updateForm(isoCurrencyCode: IIsoCurrencyCode): void {
    this.isoCurrencyCode = isoCurrencyCode;
    this.isoCurrencyCodeFormService.resetForm(this.editForm, isoCurrencyCode);
  }
}

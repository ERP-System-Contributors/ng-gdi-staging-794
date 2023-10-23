import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { FraudCategoryFlagFormService, FraudCategoryFlagFormGroup } from './fraud-category-flag-form.service';
import { IFraudCategoryFlag } from '../fraud-category-flag.model';
import { FraudCategoryFlagService } from '../service/fraud-category-flag.service';
import { FlagCodes } from 'app/entities/enumerations/flag-codes.model';

@Component({
  selector: 'jhi-fraud-category-flag-update',
  templateUrl: './fraud-category-flag-update.component.html',
})
export class FraudCategoryFlagUpdateComponent implements OnInit {
  isSaving = false;
  fraudCategoryFlag: IFraudCategoryFlag | null = null;
  flagCodesValues = Object.keys(FlagCodes);

  editForm: FraudCategoryFlagFormGroup = this.fraudCategoryFlagFormService.createFraudCategoryFlagFormGroup();

  constructor(
    protected fraudCategoryFlagService: FraudCategoryFlagService,
    protected fraudCategoryFlagFormService: FraudCategoryFlagFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fraudCategoryFlag }) => {
      this.fraudCategoryFlag = fraudCategoryFlag;
      if (fraudCategoryFlag) {
        this.updateForm(fraudCategoryFlag);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fraudCategoryFlag = this.fraudCategoryFlagFormService.getFraudCategoryFlag(this.editForm);
    if (fraudCategoryFlag.id !== null) {
      this.subscribeToSaveResponse(this.fraudCategoryFlagService.update(fraudCategoryFlag));
    } else {
      this.subscribeToSaveResponse(this.fraudCategoryFlagService.create(fraudCategoryFlag));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFraudCategoryFlag>>): void {
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

  protected updateForm(fraudCategoryFlag: IFraudCategoryFlag): void {
    this.fraudCategoryFlag = fraudCategoryFlag;
    this.fraudCategoryFlagFormService.resetForm(this.editForm, fraudCategoryFlag);
  }
}

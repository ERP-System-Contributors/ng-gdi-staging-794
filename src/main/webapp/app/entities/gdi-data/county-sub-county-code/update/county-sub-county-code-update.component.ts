import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CountySubCountyCodeFormService, CountySubCountyCodeFormGroup } from './county-sub-county-code-form.service';
import { ICountySubCountyCode } from '../county-sub-county-code.model';
import { CountySubCountyCodeService } from '../service/county-sub-county-code.service';

@Component({
  selector: 'jhi-county-sub-county-code-update',
  templateUrl: './county-sub-county-code-update.component.html',
})
export class CountySubCountyCodeUpdateComponent implements OnInit {
  isSaving = false;
  countySubCountyCode: ICountySubCountyCode | null = null;

  editForm: CountySubCountyCodeFormGroup = this.countySubCountyCodeFormService.createCountySubCountyCodeFormGroup();

  constructor(
    protected countySubCountyCodeService: CountySubCountyCodeService,
    protected countySubCountyCodeFormService: CountySubCountyCodeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ countySubCountyCode }) => {
      this.countySubCountyCode = countySubCountyCode;
      if (countySubCountyCode) {
        this.updateForm(countySubCountyCode);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const countySubCountyCode = this.countySubCountyCodeFormService.getCountySubCountyCode(this.editForm);
    if (countySubCountyCode.id !== null) {
      this.subscribeToSaveResponse(this.countySubCountyCodeService.update(countySubCountyCode));
    } else {
      this.subscribeToSaveResponse(this.countySubCountyCodeService.create(countySubCountyCode));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICountySubCountyCode>>): void {
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

  protected updateForm(countySubCountyCode: ICountySubCountyCode): void {
    this.countySubCountyCode = countySubCountyCode;
    this.countySubCountyCodeFormService.resetForm(this.editForm, countySubCountyCode);
  }
}

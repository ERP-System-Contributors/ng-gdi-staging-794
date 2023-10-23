import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CrbAgingBandsFormService, CrbAgingBandsFormGroup } from './crb-aging-bands-form.service';
import { ICrbAgingBands } from '../crb-aging-bands.model';
import { CrbAgingBandsService } from '../service/crb-aging-bands.service';

@Component({
  selector: 'jhi-crb-aging-bands-update',
  templateUrl: './crb-aging-bands-update.component.html',
})
export class CrbAgingBandsUpdateComponent implements OnInit {
  isSaving = false;
  crbAgingBands: ICrbAgingBands | null = null;

  editForm: CrbAgingBandsFormGroup = this.crbAgingBandsFormService.createCrbAgingBandsFormGroup();

  constructor(
    protected crbAgingBandsService: CrbAgingBandsService,
    protected crbAgingBandsFormService: CrbAgingBandsFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crbAgingBands }) => {
      this.crbAgingBands = crbAgingBands;
      if (crbAgingBands) {
        this.updateForm(crbAgingBands);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const crbAgingBands = this.crbAgingBandsFormService.getCrbAgingBands(this.editForm);
    if (crbAgingBands.id !== null) {
      this.subscribeToSaveResponse(this.crbAgingBandsService.update(crbAgingBands));
    } else {
      this.subscribeToSaveResponse(this.crbAgingBandsService.create(crbAgingBands));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrbAgingBands>>): void {
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

  protected updateForm(crbAgingBands: ICrbAgingBands): void {
    this.crbAgingBands = crbAgingBands;
    this.crbAgingBandsFormService.resetForm(this.editForm, crbAgingBands);
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SnaSectorCodeFormService, SnaSectorCodeFormGroup } from './sna-sector-code-form.service';
import { ISnaSectorCode } from '../sna-sector-code.model';
import { SnaSectorCodeService } from '../service/sna-sector-code.service';

@Component({
  selector: 'jhi-sna-sector-code-update',
  templateUrl: './sna-sector-code-update.component.html',
})
export class SnaSectorCodeUpdateComponent implements OnInit {
  isSaving = false;
  snaSectorCode: ISnaSectorCode | null = null;

  editForm: SnaSectorCodeFormGroup = this.snaSectorCodeFormService.createSnaSectorCodeFormGroup();

  constructor(
    protected snaSectorCodeService: SnaSectorCodeService,
    protected snaSectorCodeFormService: SnaSectorCodeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ snaSectorCode }) => {
      this.snaSectorCode = snaSectorCode;
      if (snaSectorCode) {
        this.updateForm(snaSectorCode);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const snaSectorCode = this.snaSectorCodeFormService.getSnaSectorCode(this.editForm);
    if (snaSectorCode.id !== null) {
      this.subscribeToSaveResponse(this.snaSectorCodeService.update(snaSectorCode));
    } else {
      this.subscribeToSaveResponse(this.snaSectorCodeService.create(snaSectorCode));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISnaSectorCode>>): void {
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

  protected updateForm(snaSectorCode: ISnaSectorCode): void {
    this.snaSectorCode = snaSectorCode;
    this.snaSectorCodeFormService.resetForm(this.editForm, snaSectorCode);
  }
}

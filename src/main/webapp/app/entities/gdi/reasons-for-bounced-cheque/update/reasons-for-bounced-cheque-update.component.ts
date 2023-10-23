import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ReasonsForBouncedChequeFormService, ReasonsForBouncedChequeFormGroup } from './reasons-for-bounced-cheque-form.service';
import { IReasonsForBouncedCheque } from '../reasons-for-bounced-cheque.model';
import { ReasonsForBouncedChequeService } from '../service/reasons-for-bounced-cheque.service';

@Component({
  selector: 'jhi-reasons-for-bounced-cheque-update',
  templateUrl: './reasons-for-bounced-cheque-update.component.html',
})
export class ReasonsForBouncedChequeUpdateComponent implements OnInit {
  isSaving = false;
  reasonsForBouncedCheque: IReasonsForBouncedCheque | null = null;

  editForm: ReasonsForBouncedChequeFormGroup = this.reasonsForBouncedChequeFormService.createReasonsForBouncedChequeFormGroup();

  constructor(
    protected reasonsForBouncedChequeService: ReasonsForBouncedChequeService,
    protected reasonsForBouncedChequeFormService: ReasonsForBouncedChequeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reasonsForBouncedCheque }) => {
      this.reasonsForBouncedCheque = reasonsForBouncedCheque;
      if (reasonsForBouncedCheque) {
        this.updateForm(reasonsForBouncedCheque);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reasonsForBouncedCheque = this.reasonsForBouncedChequeFormService.getReasonsForBouncedCheque(this.editForm);
    if (reasonsForBouncedCheque.id !== null) {
      this.subscribeToSaveResponse(this.reasonsForBouncedChequeService.update(reasonsForBouncedCheque));
    } else {
      this.subscribeToSaveResponse(this.reasonsForBouncedChequeService.create(reasonsForBouncedCheque));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReasonsForBouncedCheque>>): void {
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

  protected updateForm(reasonsForBouncedCheque: IReasonsForBouncedCheque): void {
    this.reasonsForBouncedCheque = reasonsForBouncedCheque;
    this.reasonsForBouncedChequeFormService.resetForm(this.editForm, reasonsForBouncedCheque);
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { BankTransactionTypeFormService, BankTransactionTypeFormGroup } from './bank-transaction-type-form.service';
import { IBankTransactionType } from '../bank-transaction-type.model';
import { BankTransactionTypeService } from '../service/bank-transaction-type.service';

@Component({
  selector: 'jhi-bank-transaction-type-update',
  templateUrl: './bank-transaction-type-update.component.html',
})
export class BankTransactionTypeUpdateComponent implements OnInit {
  isSaving = false;
  bankTransactionType: IBankTransactionType | null = null;

  editForm: BankTransactionTypeFormGroup = this.bankTransactionTypeFormService.createBankTransactionTypeFormGroup();

  constructor(
    protected bankTransactionTypeService: BankTransactionTypeService,
    protected bankTransactionTypeFormService: BankTransactionTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bankTransactionType }) => {
      this.bankTransactionType = bankTransactionType;
      if (bankTransactionType) {
        this.updateForm(bankTransactionType);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bankTransactionType = this.bankTransactionTypeFormService.getBankTransactionType(this.editForm);
    if (bankTransactionType.id !== null) {
      this.subscribeToSaveResponse(this.bankTransactionTypeService.update(bankTransactionType));
    } else {
      this.subscribeToSaveResponse(this.bankTransactionTypeService.create(bankTransactionType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBankTransactionType>>): void {
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

  protected updateForm(bankTransactionType: IBankTransactionType): void {
    this.bankTransactionType = bankTransactionType;
    this.bankTransactionTypeFormService.resetForm(this.editForm, bankTransactionType);
  }
}

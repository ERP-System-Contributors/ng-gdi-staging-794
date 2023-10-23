///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

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

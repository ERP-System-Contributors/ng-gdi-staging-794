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

import { KenyanCurrencyDenominationFormService, KenyanCurrencyDenominationFormGroup } from './kenyan-currency-denomination-form.service';
import { IKenyanCurrencyDenomination } from '../kenyan-currency-denomination.model';
import { KenyanCurrencyDenominationService } from '../service/kenyan-currency-denomination.service';

@Component({
  selector: 'jhi-kenyan-currency-denomination-update',
  templateUrl: './kenyan-currency-denomination-update.component.html',
})
export class KenyanCurrencyDenominationUpdateComponent implements OnInit {
  isSaving = false;
  kenyanCurrencyDenomination: IKenyanCurrencyDenomination | null = null;

  editForm: KenyanCurrencyDenominationFormGroup = this.kenyanCurrencyDenominationFormService.createKenyanCurrencyDenominationFormGroup();

  constructor(
    protected kenyanCurrencyDenominationService: KenyanCurrencyDenominationService,
    protected kenyanCurrencyDenominationFormService: KenyanCurrencyDenominationFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ kenyanCurrencyDenomination }) => {
      this.kenyanCurrencyDenomination = kenyanCurrencyDenomination;
      if (kenyanCurrencyDenomination) {
        this.updateForm(kenyanCurrencyDenomination);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const kenyanCurrencyDenomination = this.kenyanCurrencyDenominationFormService.getKenyanCurrencyDenomination(this.editForm);
    if (kenyanCurrencyDenomination.id !== null) {
      this.subscribeToSaveResponse(this.kenyanCurrencyDenominationService.update(kenyanCurrencyDenomination));
    } else {
      this.subscribeToSaveResponse(this.kenyanCurrencyDenominationService.create(kenyanCurrencyDenomination));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IKenyanCurrencyDenomination>>): void {
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

  protected updateForm(kenyanCurrencyDenomination: IKenyanCurrencyDenomination): void {
    this.kenyanCurrencyDenomination = kenyanCurrencyDenomination;
    this.kenyanCurrencyDenominationFormService.resetForm(this.editForm, kenyanCurrencyDenomination);
  }
}

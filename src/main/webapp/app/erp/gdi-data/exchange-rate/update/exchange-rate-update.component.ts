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
import { finalize, map } from 'rxjs/operators';

import { ExchangeRateFormService, ExchangeRateFormGroup } from './exchange-rate-form.service';
import { IExchangeRate } from '../exchange-rate.model';
import { ExchangeRateService } from '../service/exchange-rate.service';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { InstitutionCodeService } from 'app/entities/gdi/institution-code/service/institution-code.service';
import { IIsoCurrencyCode } from 'app/entities/gdi/iso-currency-code/iso-currency-code.model';
import { IsoCurrencyCodeService } from 'app/entities/gdi/iso-currency-code/service/iso-currency-code.service';

@Component({
  selector: 'jhi-exchange-rate-update',
  templateUrl: './exchange-rate-update.component.html',
})
export class ExchangeRateUpdateComponent implements OnInit {
  isSaving = false;
  exchangeRate: IExchangeRate | null = null;

  institutionCodesSharedCollection: IInstitutionCode[] = [];
  isoCurrencyCodesSharedCollection: IIsoCurrencyCode[] = [];

  editForm: ExchangeRateFormGroup = this.exchangeRateFormService.createExchangeRateFormGroup();

  constructor(
    protected exchangeRateService: ExchangeRateService,
    protected exchangeRateFormService: ExchangeRateFormService,
    protected institutionCodeService: InstitutionCodeService,
    protected isoCurrencyCodeService: IsoCurrencyCodeService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareInstitutionCode = (o1: IInstitutionCode | null, o2: IInstitutionCode | null): boolean =>
    this.institutionCodeService.compareInstitutionCode(o1, o2);

  compareIsoCurrencyCode = (o1: IIsoCurrencyCode | null, o2: IIsoCurrencyCode | null): boolean =>
    this.isoCurrencyCodeService.compareIsoCurrencyCode(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ exchangeRate }) => {
      this.exchangeRate = exchangeRate;
      if (exchangeRate) {
        this.updateForm(exchangeRate);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const exchangeRate = this.exchangeRateFormService.getExchangeRate(this.editForm);
    if (exchangeRate.id !== null) {
      this.subscribeToSaveResponse(this.exchangeRateService.update(exchangeRate));
    } else {
      this.subscribeToSaveResponse(this.exchangeRateService.create(exchangeRate));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExchangeRate>>): void {
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

  protected updateForm(exchangeRate: IExchangeRate): void {
    this.exchangeRate = exchangeRate;
    this.exchangeRateFormService.resetForm(this.editForm, exchangeRate);

    this.institutionCodesSharedCollection = this.institutionCodeService.addInstitutionCodeToCollectionIfMissing<IInstitutionCode>(
      this.institutionCodesSharedCollection,
      exchangeRate.institutionCode
    );
    this.isoCurrencyCodesSharedCollection = this.isoCurrencyCodeService.addIsoCurrencyCodeToCollectionIfMissing<IIsoCurrencyCode>(
      this.isoCurrencyCodesSharedCollection,
      exchangeRate.currencyCode
    );
  }

  protected loadRelationshipsOptions(): void {
    this.institutionCodeService
      .query()
      .pipe(map((res: HttpResponse<IInstitutionCode[]>) => res.body ?? []))
      .pipe(
        map((institutionCodes: IInstitutionCode[]) =>
          this.institutionCodeService.addInstitutionCodeToCollectionIfMissing<IInstitutionCode>(
            institutionCodes,
            this.exchangeRate?.institutionCode
          )
        )
      )
      .subscribe((institutionCodes: IInstitutionCode[]) => (this.institutionCodesSharedCollection = institutionCodes));

    this.isoCurrencyCodeService
      .query()
      .pipe(map((res: HttpResponse<IIsoCurrencyCode[]>) => res.body ?? []))
      .pipe(
        map((isoCurrencyCodes: IIsoCurrencyCode[]) =>
          this.isoCurrencyCodeService.addIsoCurrencyCodeToCollectionIfMissing<IIsoCurrencyCode>(
            isoCurrencyCodes,
            this.exchangeRate?.currencyCode
          )
        )
      )
      .subscribe((isoCurrencyCodes: IIsoCurrencyCode[]) => (this.isoCurrencyCodesSharedCollection = isoCurrencyCodes));
  }
}

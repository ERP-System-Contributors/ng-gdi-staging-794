import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { WeeklyCashHoldingFormService, WeeklyCashHoldingFormGroup } from './weekly-cash-holding-form.service';
import { IWeeklyCashHolding } from '../weekly-cash-holding.model';
import { WeeklyCashHoldingService } from '../service/weekly-cash-holding.service';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { InstitutionCodeService } from 'app/entities/gdi/institution-code/service/institution-code.service';
import { IBankBranchCode } from 'app/entities/gdi/bank-branch-code/bank-branch-code.model';
import { BankBranchCodeService } from 'app/entities/gdi/bank-branch-code/service/bank-branch-code.service';
import { ICountySubCountyCode } from 'app/entities/gdi-data/county-sub-county-code/county-sub-county-code.model';
import { CountySubCountyCodeService } from 'app/entities/gdi-data/county-sub-county-code/service/county-sub-county-code.service';
import { IKenyanCurrencyDenomination } from 'app/entities/gdi/kenyan-currency-denomination/kenyan-currency-denomination.model';
import { KenyanCurrencyDenominationService } from 'app/entities/gdi/kenyan-currency-denomination/service/kenyan-currency-denomination.service';

@Component({
  selector: 'jhi-weekly-cash-holding-update',
  templateUrl: './weekly-cash-holding-update.component.html',
})
export class WeeklyCashHoldingUpdateComponent implements OnInit {
  isSaving = false;
  weeklyCashHolding: IWeeklyCashHolding | null = null;

  institutionCodesSharedCollection: IInstitutionCode[] = [];
  bankBranchCodesSharedCollection: IBankBranchCode[] = [];
  countySubCountyCodesSharedCollection: ICountySubCountyCode[] = [];
  kenyanCurrencyDenominationsSharedCollection: IKenyanCurrencyDenomination[] = [];

  editForm: WeeklyCashHoldingFormGroup = this.weeklyCashHoldingFormService.createWeeklyCashHoldingFormGroup();

  constructor(
    protected weeklyCashHoldingService: WeeklyCashHoldingService,
    protected weeklyCashHoldingFormService: WeeklyCashHoldingFormService,
    protected institutionCodeService: InstitutionCodeService,
    protected bankBranchCodeService: BankBranchCodeService,
    protected countySubCountyCodeService: CountySubCountyCodeService,
    protected kenyanCurrencyDenominationService: KenyanCurrencyDenominationService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareInstitutionCode = (o1: IInstitutionCode | null, o2: IInstitutionCode | null): boolean =>
    this.institutionCodeService.compareInstitutionCode(o1, o2);

  compareBankBranchCode = (o1: IBankBranchCode | null, o2: IBankBranchCode | null): boolean =>
    this.bankBranchCodeService.compareBankBranchCode(o1, o2);

  compareCountySubCountyCode = (o1: ICountySubCountyCode | null, o2: ICountySubCountyCode | null): boolean =>
    this.countySubCountyCodeService.compareCountySubCountyCode(o1, o2);

  compareKenyanCurrencyDenomination = (o1: IKenyanCurrencyDenomination | null, o2: IKenyanCurrencyDenomination | null): boolean =>
    this.kenyanCurrencyDenominationService.compareKenyanCurrencyDenomination(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ weeklyCashHolding }) => {
      this.weeklyCashHolding = weeklyCashHolding;
      if (weeklyCashHolding) {
        this.updateForm(weeklyCashHolding);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const weeklyCashHolding = this.weeklyCashHoldingFormService.getWeeklyCashHolding(this.editForm);
    if (weeklyCashHolding.id !== null) {
      this.subscribeToSaveResponse(this.weeklyCashHoldingService.update(weeklyCashHolding));
    } else {
      this.subscribeToSaveResponse(this.weeklyCashHoldingService.create(weeklyCashHolding));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWeeklyCashHolding>>): void {
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

  protected updateForm(weeklyCashHolding: IWeeklyCashHolding): void {
    this.weeklyCashHolding = weeklyCashHolding;
    this.weeklyCashHoldingFormService.resetForm(this.editForm, weeklyCashHolding);

    this.institutionCodesSharedCollection = this.institutionCodeService.addInstitutionCodeToCollectionIfMissing<IInstitutionCode>(
      this.institutionCodesSharedCollection,
      weeklyCashHolding.bankCode
    );
    this.bankBranchCodesSharedCollection = this.bankBranchCodeService.addBankBranchCodeToCollectionIfMissing<IBankBranchCode>(
      this.bankBranchCodesSharedCollection,
      weeklyCashHolding.branchId
    );
    this.countySubCountyCodesSharedCollection =
      this.countySubCountyCodeService.addCountySubCountyCodeToCollectionIfMissing<ICountySubCountyCode>(
        this.countySubCountyCodesSharedCollection,
        weeklyCashHolding.subCountyCode
      );
    this.kenyanCurrencyDenominationsSharedCollection =
      this.kenyanCurrencyDenominationService.addKenyanCurrencyDenominationToCollectionIfMissing<IKenyanCurrencyDenomination>(
        this.kenyanCurrencyDenominationsSharedCollection,
        weeklyCashHolding.denomination
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
            this.weeklyCashHolding?.bankCode
          )
        )
      )
      .subscribe((institutionCodes: IInstitutionCode[]) => (this.institutionCodesSharedCollection = institutionCodes));

    this.bankBranchCodeService
      .query()
      .pipe(map((res: HttpResponse<IBankBranchCode[]>) => res.body ?? []))
      .pipe(
        map((bankBranchCodes: IBankBranchCode[]) =>
          this.bankBranchCodeService.addBankBranchCodeToCollectionIfMissing<IBankBranchCode>(
            bankBranchCodes,
            this.weeklyCashHolding?.branchId
          )
        )
      )
      .subscribe((bankBranchCodes: IBankBranchCode[]) => (this.bankBranchCodesSharedCollection = bankBranchCodes));

    this.countySubCountyCodeService
      .query()
      .pipe(map((res: HttpResponse<ICountySubCountyCode[]>) => res.body ?? []))
      .pipe(
        map((countySubCountyCodes: ICountySubCountyCode[]) =>
          this.countySubCountyCodeService.addCountySubCountyCodeToCollectionIfMissing<ICountySubCountyCode>(
            countySubCountyCodes,
            this.weeklyCashHolding?.subCountyCode
          )
        )
      )
      .subscribe((countySubCountyCodes: ICountySubCountyCode[]) => (this.countySubCountyCodesSharedCollection = countySubCountyCodes));

    this.kenyanCurrencyDenominationService
      .query()
      .pipe(map((res: HttpResponse<IKenyanCurrencyDenomination[]>) => res.body ?? []))
      .pipe(
        map((kenyanCurrencyDenominations: IKenyanCurrencyDenomination[]) =>
          this.kenyanCurrencyDenominationService.addKenyanCurrencyDenominationToCollectionIfMissing<IKenyanCurrencyDenomination>(
            kenyanCurrencyDenominations,
            this.weeklyCashHolding?.denomination
          )
        )
      )
      .subscribe(
        (kenyanCurrencyDenominations: IKenyanCurrencyDenomination[]) =>
          (this.kenyanCurrencyDenominationsSharedCollection = kenyanCurrencyDenominations)
      );
  }
}

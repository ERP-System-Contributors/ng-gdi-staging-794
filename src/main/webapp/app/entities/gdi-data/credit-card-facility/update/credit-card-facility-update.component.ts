import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CreditCardFacilityFormService, CreditCardFacilityFormGroup } from './credit-card-facility-form.service';
import { ICreditCardFacility } from '../credit-card-facility.model';
import { CreditCardFacilityService } from '../service/credit-card-facility.service';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { InstitutionCodeService } from 'app/entities/gdi/institution-code/service/institution-code.service';
import { ICreditCardOwnership } from 'app/entities/gdi/credit-card-ownership/credit-card-ownership.model';
import { CreditCardOwnershipService } from 'app/entities/gdi/credit-card-ownership/service/credit-card-ownership.service';
import { IIsoCurrencyCode } from 'app/entities/gdi/iso-currency-code/iso-currency-code.model';
import { IsoCurrencyCodeService } from 'app/entities/gdi/iso-currency-code/service/iso-currency-code.service';

@Component({
  selector: 'jhi-credit-card-facility-update',
  templateUrl: './credit-card-facility-update.component.html',
})
export class CreditCardFacilityUpdateComponent implements OnInit {
  isSaving = false;
  creditCardFacility: ICreditCardFacility | null = null;

  institutionCodesSharedCollection: IInstitutionCode[] = [];
  creditCardOwnershipsSharedCollection: ICreditCardOwnership[] = [];
  isoCurrencyCodesSharedCollection: IIsoCurrencyCode[] = [];

  editForm: CreditCardFacilityFormGroup = this.creditCardFacilityFormService.createCreditCardFacilityFormGroup();

  constructor(
    protected creditCardFacilityService: CreditCardFacilityService,
    protected creditCardFacilityFormService: CreditCardFacilityFormService,
    protected institutionCodeService: InstitutionCodeService,
    protected creditCardOwnershipService: CreditCardOwnershipService,
    protected isoCurrencyCodeService: IsoCurrencyCodeService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareInstitutionCode = (o1: IInstitutionCode | null, o2: IInstitutionCode | null): boolean =>
    this.institutionCodeService.compareInstitutionCode(o1, o2);

  compareCreditCardOwnership = (o1: ICreditCardOwnership | null, o2: ICreditCardOwnership | null): boolean =>
    this.creditCardOwnershipService.compareCreditCardOwnership(o1, o2);

  compareIsoCurrencyCode = (o1: IIsoCurrencyCode | null, o2: IIsoCurrencyCode | null): boolean =>
    this.isoCurrencyCodeService.compareIsoCurrencyCode(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ creditCardFacility }) => {
      this.creditCardFacility = creditCardFacility;
      if (creditCardFacility) {
        this.updateForm(creditCardFacility);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const creditCardFacility = this.creditCardFacilityFormService.getCreditCardFacility(this.editForm);
    if (creditCardFacility.id !== null) {
      this.subscribeToSaveResponse(this.creditCardFacilityService.update(creditCardFacility));
    } else {
      this.subscribeToSaveResponse(this.creditCardFacilityService.create(creditCardFacility));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICreditCardFacility>>): void {
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

  protected updateForm(creditCardFacility: ICreditCardFacility): void {
    this.creditCardFacility = creditCardFacility;
    this.creditCardFacilityFormService.resetForm(this.editForm, creditCardFacility);

    this.institutionCodesSharedCollection = this.institutionCodeService.addInstitutionCodeToCollectionIfMissing<IInstitutionCode>(
      this.institutionCodesSharedCollection,
      creditCardFacility.bankCode
    );
    this.creditCardOwnershipsSharedCollection =
      this.creditCardOwnershipService.addCreditCardOwnershipToCollectionIfMissing<ICreditCardOwnership>(
        this.creditCardOwnershipsSharedCollection,
        creditCardFacility.customerCategory
      );
    this.isoCurrencyCodesSharedCollection = this.isoCurrencyCodeService.addIsoCurrencyCodeToCollectionIfMissing<IIsoCurrencyCode>(
      this.isoCurrencyCodesSharedCollection,
      creditCardFacility.currencyCode
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
            this.creditCardFacility?.bankCode
          )
        )
      )
      .subscribe((institutionCodes: IInstitutionCode[]) => (this.institutionCodesSharedCollection = institutionCodes));

    this.creditCardOwnershipService
      .query()
      .pipe(map((res: HttpResponse<ICreditCardOwnership[]>) => res.body ?? []))
      .pipe(
        map((creditCardOwnerships: ICreditCardOwnership[]) =>
          this.creditCardOwnershipService.addCreditCardOwnershipToCollectionIfMissing<ICreditCardOwnership>(
            creditCardOwnerships,
            this.creditCardFacility?.customerCategory
          )
        )
      )
      .subscribe((creditCardOwnerships: ICreditCardOwnership[]) => (this.creditCardOwnershipsSharedCollection = creditCardOwnerships));

    this.isoCurrencyCodeService
      .query()
      .pipe(map((res: HttpResponse<IIsoCurrencyCode[]>) => res.body ?? []))
      .pipe(
        map((isoCurrencyCodes: IIsoCurrencyCode[]) =>
          this.isoCurrencyCodeService.addIsoCurrencyCodeToCollectionIfMissing<IIsoCurrencyCode>(
            isoCurrencyCodes,
            this.creditCardFacility?.currencyCode
          )
        )
      )
      .subscribe((isoCurrencyCodes: IIsoCurrencyCode[]) => (this.isoCurrencyCodesSharedCollection = isoCurrencyCodes));
  }
}

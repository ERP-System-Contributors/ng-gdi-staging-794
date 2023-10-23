import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CollateralInformationFormService, CollateralInformationFormGroup } from './collateral-information-form.service';
import { ICollateralInformation } from '../collateral-information.model';
import { CollateralInformationService } from '../service/collateral-information.service';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { InstitutionCodeService } from 'app/entities/gdi/institution-code/service/institution-code.service';
import { IBankBranchCode } from 'app/entities/gdi/bank-branch-code/bank-branch-code.model';
import { BankBranchCodeService } from 'app/entities/gdi/bank-branch-code/service/bank-branch-code.service';
import { ICollateralType } from 'app/entities/gdi/collateral-type/collateral-type.model';
import { CollateralTypeService } from 'app/entities/gdi/collateral-type/service/collateral-type.service';
import { ICountySubCountyCode } from 'app/entities/gdi-data/county-sub-county-code/county-sub-county-code.model';
import { CountySubCountyCodeService } from 'app/entities/gdi-data/county-sub-county-code/service/county-sub-county-code.service';
import { CollateralInsuredFlagTypes } from 'app/entities/enumerations/collateral-insured-flag-types.model';

@Component({
  selector: 'jhi-collateral-information-update',
  templateUrl: './collateral-information-update.component.html',
})
export class CollateralInformationUpdateComponent implements OnInit {
  isSaving = false;
  collateralInformation: ICollateralInformation | null = null;
  collateralInsuredFlagTypesValues = Object.keys(CollateralInsuredFlagTypes);

  institutionCodesSharedCollection: IInstitutionCode[] = [];
  bankBranchCodesSharedCollection: IBankBranchCode[] = [];
  collateralTypesSharedCollection: ICollateralType[] = [];
  countySubCountyCodesSharedCollection: ICountySubCountyCode[] = [];

  editForm: CollateralInformationFormGroup = this.collateralInformationFormService.createCollateralInformationFormGroup();

  constructor(
    protected collateralInformationService: CollateralInformationService,
    protected collateralInformationFormService: CollateralInformationFormService,
    protected institutionCodeService: InstitutionCodeService,
    protected bankBranchCodeService: BankBranchCodeService,
    protected collateralTypeService: CollateralTypeService,
    protected countySubCountyCodeService: CountySubCountyCodeService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareInstitutionCode = (o1: IInstitutionCode | null, o2: IInstitutionCode | null): boolean =>
    this.institutionCodeService.compareInstitutionCode(o1, o2);

  compareBankBranchCode = (o1: IBankBranchCode | null, o2: IBankBranchCode | null): boolean =>
    this.bankBranchCodeService.compareBankBranchCode(o1, o2);

  compareCollateralType = (o1: ICollateralType | null, o2: ICollateralType | null): boolean =>
    this.collateralTypeService.compareCollateralType(o1, o2);

  compareCountySubCountyCode = (o1: ICountySubCountyCode | null, o2: ICountySubCountyCode | null): boolean =>
    this.countySubCountyCodeService.compareCountySubCountyCode(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ collateralInformation }) => {
      this.collateralInformation = collateralInformation;
      if (collateralInformation) {
        this.updateForm(collateralInformation);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const collateralInformation = this.collateralInformationFormService.getCollateralInformation(this.editForm);
    if (collateralInformation.id !== null) {
      this.subscribeToSaveResponse(this.collateralInformationService.update(collateralInformation));
    } else {
      this.subscribeToSaveResponse(this.collateralInformationService.create(collateralInformation));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICollateralInformation>>): void {
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

  protected updateForm(collateralInformation: ICollateralInformation): void {
    this.collateralInformation = collateralInformation;
    this.collateralInformationFormService.resetForm(this.editForm, collateralInformation);

    this.institutionCodesSharedCollection = this.institutionCodeService.addInstitutionCodeToCollectionIfMissing<IInstitutionCode>(
      this.institutionCodesSharedCollection,
      collateralInformation.bankCode
    );
    this.bankBranchCodesSharedCollection = this.bankBranchCodeService.addBankBranchCodeToCollectionIfMissing<IBankBranchCode>(
      this.bankBranchCodesSharedCollection,
      collateralInformation.branchCode
    );
    this.collateralTypesSharedCollection = this.collateralTypeService.addCollateralTypeToCollectionIfMissing<ICollateralType>(
      this.collateralTypesSharedCollection,
      collateralInformation.collateralType
    );
    this.countySubCountyCodesSharedCollection =
      this.countySubCountyCodeService.addCountySubCountyCodeToCollectionIfMissing<ICountySubCountyCode>(
        this.countySubCountyCodesSharedCollection,
        collateralInformation.countyCode
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
            this.collateralInformation?.bankCode
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
            this.collateralInformation?.branchCode
          )
        )
      )
      .subscribe((bankBranchCodes: IBankBranchCode[]) => (this.bankBranchCodesSharedCollection = bankBranchCodes));

    this.collateralTypeService
      .query()
      .pipe(map((res: HttpResponse<ICollateralType[]>) => res.body ?? []))
      .pipe(
        map((collateralTypes: ICollateralType[]) =>
          this.collateralTypeService.addCollateralTypeToCollectionIfMissing<ICollateralType>(
            collateralTypes,
            this.collateralInformation?.collateralType
          )
        )
      )
      .subscribe((collateralTypes: ICollateralType[]) => (this.collateralTypesSharedCollection = collateralTypes));

    this.countySubCountyCodeService
      .query()
      .pipe(map((res: HttpResponse<ICountySubCountyCode[]>) => res.body ?? []))
      .pipe(
        map((countySubCountyCodes: ICountySubCountyCode[]) =>
          this.countySubCountyCodeService.addCountySubCountyCodeToCollectionIfMissing<ICountySubCountyCode>(
            countySubCountyCodes,
            this.collateralInformation?.countyCode
          )
        )
      )
      .subscribe((countySubCountyCodes: ICountySubCountyCode[]) => (this.countySubCountyCodesSharedCollection = countySubCountyCodes));
  }
}

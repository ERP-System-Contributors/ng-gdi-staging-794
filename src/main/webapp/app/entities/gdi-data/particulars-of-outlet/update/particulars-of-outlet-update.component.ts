import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ParticularsOfOutletFormService, ParticularsOfOutletFormGroup } from './particulars-of-outlet-form.service';
import { IParticularsOfOutlet } from '../particulars-of-outlet.model';
import { ParticularsOfOutletService } from '../service/particulars-of-outlet.service';
import { ICountySubCountyCode } from 'app/entities/gdi-data/county-sub-county-code/county-sub-county-code.model';
import { CountySubCountyCodeService } from 'app/entities/gdi-data/county-sub-county-code/service/county-sub-county-code.service';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { InstitutionCodeService } from 'app/entities/gdi/institution-code/service/institution-code.service';
import { IBankBranchCode } from 'app/entities/gdi/bank-branch-code/bank-branch-code.model';
import { BankBranchCodeService } from 'app/entities/gdi/bank-branch-code/service/bank-branch-code.service';
import { IOutletType } from 'app/entities/gdi/outlet-type/outlet-type.model';
import { OutletTypeService } from 'app/entities/gdi/outlet-type/service/outlet-type.service';
import { IOutletStatus } from 'app/entities/gdi/outlet-status/outlet-status.model';
import { OutletStatusService } from 'app/entities/gdi/outlet-status/service/outlet-status.service';

@Component({
  selector: 'jhi-particulars-of-outlet-update',
  templateUrl: './particulars-of-outlet-update.component.html',
})
export class ParticularsOfOutletUpdateComponent implements OnInit {
  isSaving = false;
  particularsOfOutlet: IParticularsOfOutlet | null = null;

  countySubCountyCodesSharedCollection: ICountySubCountyCode[] = [];
  institutionCodesSharedCollection: IInstitutionCode[] = [];
  bankBranchCodesSharedCollection: IBankBranchCode[] = [];
  outletTypesSharedCollection: IOutletType[] = [];
  outletStatusesSharedCollection: IOutletStatus[] = [];

  editForm: ParticularsOfOutletFormGroup = this.particularsOfOutletFormService.createParticularsOfOutletFormGroup();

  constructor(
    protected particularsOfOutletService: ParticularsOfOutletService,
    protected particularsOfOutletFormService: ParticularsOfOutletFormService,
    protected countySubCountyCodeService: CountySubCountyCodeService,
    protected institutionCodeService: InstitutionCodeService,
    protected bankBranchCodeService: BankBranchCodeService,
    protected outletTypeService: OutletTypeService,
    protected outletStatusService: OutletStatusService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareCountySubCountyCode = (o1: ICountySubCountyCode | null, o2: ICountySubCountyCode | null): boolean =>
    this.countySubCountyCodeService.compareCountySubCountyCode(o1, o2);

  compareInstitutionCode = (o1: IInstitutionCode | null, o2: IInstitutionCode | null): boolean =>
    this.institutionCodeService.compareInstitutionCode(o1, o2);

  compareBankBranchCode = (o1: IBankBranchCode | null, o2: IBankBranchCode | null): boolean =>
    this.bankBranchCodeService.compareBankBranchCode(o1, o2);

  compareOutletType = (o1: IOutletType | null, o2: IOutletType | null): boolean => this.outletTypeService.compareOutletType(o1, o2);

  compareOutletStatus = (o1: IOutletStatus | null, o2: IOutletStatus | null): boolean =>
    this.outletStatusService.compareOutletStatus(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ particularsOfOutlet }) => {
      this.particularsOfOutlet = particularsOfOutlet;
      if (particularsOfOutlet) {
        this.updateForm(particularsOfOutlet);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const particularsOfOutlet = this.particularsOfOutletFormService.getParticularsOfOutlet(this.editForm);
    if (particularsOfOutlet.id !== null) {
      this.subscribeToSaveResponse(this.particularsOfOutletService.update(particularsOfOutlet));
    } else {
      this.subscribeToSaveResponse(this.particularsOfOutletService.create(particularsOfOutlet));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParticularsOfOutlet>>): void {
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

  protected updateForm(particularsOfOutlet: IParticularsOfOutlet): void {
    this.particularsOfOutlet = particularsOfOutlet;
    this.particularsOfOutletFormService.resetForm(this.editForm, particularsOfOutlet);

    this.countySubCountyCodesSharedCollection =
      this.countySubCountyCodeService.addCountySubCountyCodeToCollectionIfMissing<ICountySubCountyCode>(
        this.countySubCountyCodesSharedCollection,
        particularsOfOutlet.subCountyCode
      );
    this.institutionCodesSharedCollection = this.institutionCodeService.addInstitutionCodeToCollectionIfMissing<IInstitutionCode>(
      this.institutionCodesSharedCollection,
      particularsOfOutlet.bankCode
    );
    this.bankBranchCodesSharedCollection = this.bankBranchCodeService.addBankBranchCodeToCollectionIfMissing<IBankBranchCode>(
      this.bankBranchCodesSharedCollection,
      particularsOfOutlet.outletId
    );
    this.outletTypesSharedCollection = this.outletTypeService.addOutletTypeToCollectionIfMissing<IOutletType>(
      this.outletTypesSharedCollection,
      particularsOfOutlet.typeOfOutlet
    );
    this.outletStatusesSharedCollection = this.outletStatusService.addOutletStatusToCollectionIfMissing<IOutletStatus>(
      this.outletStatusesSharedCollection,
      particularsOfOutlet.outletStatus
    );
  }

  protected loadRelationshipsOptions(): void {
    this.countySubCountyCodeService
      .query()
      .pipe(map((res: HttpResponse<ICountySubCountyCode[]>) => res.body ?? []))
      .pipe(
        map((countySubCountyCodes: ICountySubCountyCode[]) =>
          this.countySubCountyCodeService.addCountySubCountyCodeToCollectionIfMissing<ICountySubCountyCode>(
            countySubCountyCodes,
            this.particularsOfOutlet?.subCountyCode
          )
        )
      )
      .subscribe((countySubCountyCodes: ICountySubCountyCode[]) => (this.countySubCountyCodesSharedCollection = countySubCountyCodes));

    this.institutionCodeService
      .query()
      .pipe(map((res: HttpResponse<IInstitutionCode[]>) => res.body ?? []))
      .pipe(
        map((institutionCodes: IInstitutionCode[]) =>
          this.institutionCodeService.addInstitutionCodeToCollectionIfMissing<IInstitutionCode>(
            institutionCodes,
            this.particularsOfOutlet?.bankCode
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
            this.particularsOfOutlet?.outletId
          )
        )
      )
      .subscribe((bankBranchCodes: IBankBranchCode[]) => (this.bankBranchCodesSharedCollection = bankBranchCodes));

    this.outletTypeService
      .query()
      .pipe(map((res: HttpResponse<IOutletType[]>) => res.body ?? []))
      .pipe(
        map((outletTypes: IOutletType[]) =>
          this.outletTypeService.addOutletTypeToCollectionIfMissing<IOutletType>(outletTypes, this.particularsOfOutlet?.typeOfOutlet)
        )
      )
      .subscribe((outletTypes: IOutletType[]) => (this.outletTypesSharedCollection = outletTypes));

    this.outletStatusService
      .query()
      .pipe(map((res: HttpResponse<IOutletStatus[]>) => res.body ?? []))
      .pipe(
        map((outletStatuses: IOutletStatus[]) =>
          this.outletStatusService.addOutletStatusToCollectionIfMissing<IOutletStatus>(
            outletStatuses,
            this.particularsOfOutlet?.outletStatus
          )
        )
      )
      .subscribe((outletStatuses: IOutletStatus[]) => (this.outletStatusesSharedCollection = outletStatuses));
  }
}

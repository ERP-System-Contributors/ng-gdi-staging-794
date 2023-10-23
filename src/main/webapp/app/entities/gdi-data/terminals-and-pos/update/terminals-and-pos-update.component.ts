import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { TerminalsAndPOSFormService, TerminalsAndPOSFormGroup } from './terminals-and-pos-form.service';
import { ITerminalsAndPOS } from '../terminals-and-pos.model';
import { TerminalsAndPOSService } from '../service/terminals-and-pos.service';
import { ITerminalTypes } from 'app/entities/gdi/terminal-types/terminal-types.model';
import { TerminalTypesService } from 'app/entities/gdi/terminal-types/service/terminal-types.service';
import { ITerminalFunctions } from 'app/entities/gdi/terminal-functions/terminal-functions.model';
import { TerminalFunctionsService } from 'app/entities/gdi/terminal-functions/service/terminal-functions.service';
import { ICountySubCountyCode } from 'app/entities/gdi-data/county-sub-county-code/county-sub-county-code.model';
import { CountySubCountyCodeService } from 'app/entities/gdi-data/county-sub-county-code/service/county-sub-county-code.service';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { InstitutionCodeService } from 'app/entities/gdi/institution-code/service/institution-code.service';
import { IBankBranchCode } from 'app/entities/gdi/bank-branch-code/bank-branch-code.model';
import { BankBranchCodeService } from 'app/entities/gdi/bank-branch-code/service/bank-branch-code.service';

@Component({
  selector: 'jhi-terminals-and-pos-update',
  templateUrl: './terminals-and-pos-update.component.html',
})
export class TerminalsAndPOSUpdateComponent implements OnInit {
  isSaving = false;
  terminalsAndPOS: ITerminalsAndPOS | null = null;

  terminalTypesSharedCollection: ITerminalTypes[] = [];
  terminalFunctionsSharedCollection: ITerminalFunctions[] = [];
  countySubCountyCodesSharedCollection: ICountySubCountyCode[] = [];
  institutionCodesSharedCollection: IInstitutionCode[] = [];
  bankBranchCodesSharedCollection: IBankBranchCode[] = [];

  editForm: TerminalsAndPOSFormGroup = this.terminalsAndPOSFormService.createTerminalsAndPOSFormGroup();

  constructor(
    protected terminalsAndPOSService: TerminalsAndPOSService,
    protected terminalsAndPOSFormService: TerminalsAndPOSFormService,
    protected terminalTypesService: TerminalTypesService,
    protected terminalFunctionsService: TerminalFunctionsService,
    protected countySubCountyCodeService: CountySubCountyCodeService,
    protected institutionCodeService: InstitutionCodeService,
    protected bankBranchCodeService: BankBranchCodeService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareTerminalTypes = (o1: ITerminalTypes | null, o2: ITerminalTypes | null): boolean =>
    this.terminalTypesService.compareTerminalTypes(o1, o2);

  compareTerminalFunctions = (o1: ITerminalFunctions | null, o2: ITerminalFunctions | null): boolean =>
    this.terminalFunctionsService.compareTerminalFunctions(o1, o2);

  compareCountySubCountyCode = (o1: ICountySubCountyCode | null, o2: ICountySubCountyCode | null): boolean =>
    this.countySubCountyCodeService.compareCountySubCountyCode(o1, o2);

  compareInstitutionCode = (o1: IInstitutionCode | null, o2: IInstitutionCode | null): boolean =>
    this.institutionCodeService.compareInstitutionCode(o1, o2);

  compareBankBranchCode = (o1: IBankBranchCode | null, o2: IBankBranchCode | null): boolean =>
    this.bankBranchCodeService.compareBankBranchCode(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ terminalsAndPOS }) => {
      this.terminalsAndPOS = terminalsAndPOS;
      if (terminalsAndPOS) {
        this.updateForm(terminalsAndPOS);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const terminalsAndPOS = this.terminalsAndPOSFormService.getTerminalsAndPOS(this.editForm);
    if (terminalsAndPOS.id !== null) {
      this.subscribeToSaveResponse(this.terminalsAndPOSService.update(terminalsAndPOS));
    } else {
      this.subscribeToSaveResponse(this.terminalsAndPOSService.create(terminalsAndPOS));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITerminalsAndPOS>>): void {
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

  protected updateForm(terminalsAndPOS: ITerminalsAndPOS): void {
    this.terminalsAndPOS = terminalsAndPOS;
    this.terminalsAndPOSFormService.resetForm(this.editForm, terminalsAndPOS);

    this.terminalTypesSharedCollection = this.terminalTypesService.addTerminalTypesToCollectionIfMissing<ITerminalTypes>(
      this.terminalTypesSharedCollection,
      terminalsAndPOS.terminalType
    );
    this.terminalFunctionsSharedCollection = this.terminalFunctionsService.addTerminalFunctionsToCollectionIfMissing<ITerminalFunctions>(
      this.terminalFunctionsSharedCollection,
      terminalsAndPOS.terminalFunctionality
    );
    this.countySubCountyCodesSharedCollection =
      this.countySubCountyCodeService.addCountySubCountyCodeToCollectionIfMissing<ICountySubCountyCode>(
        this.countySubCountyCodesSharedCollection,
        terminalsAndPOS.physicalLocation
      );
    this.institutionCodesSharedCollection = this.institutionCodeService.addInstitutionCodeToCollectionIfMissing<IInstitutionCode>(
      this.institutionCodesSharedCollection,
      terminalsAndPOS.bankId
    );
    this.bankBranchCodesSharedCollection = this.bankBranchCodeService.addBankBranchCodeToCollectionIfMissing<IBankBranchCode>(
      this.bankBranchCodesSharedCollection,
      terminalsAndPOS.branchId
    );
  }

  protected loadRelationshipsOptions(): void {
    this.terminalTypesService
      .query()
      .pipe(map((res: HttpResponse<ITerminalTypes[]>) => res.body ?? []))
      .pipe(
        map((terminalTypes: ITerminalTypes[]) =>
          this.terminalTypesService.addTerminalTypesToCollectionIfMissing<ITerminalTypes>(terminalTypes, this.terminalsAndPOS?.terminalType)
        )
      )
      .subscribe((terminalTypes: ITerminalTypes[]) => (this.terminalTypesSharedCollection = terminalTypes));

    this.terminalFunctionsService
      .query()
      .pipe(map((res: HttpResponse<ITerminalFunctions[]>) => res.body ?? []))
      .pipe(
        map((terminalFunctions: ITerminalFunctions[]) =>
          this.terminalFunctionsService.addTerminalFunctionsToCollectionIfMissing<ITerminalFunctions>(
            terminalFunctions,
            this.terminalsAndPOS?.terminalFunctionality
          )
        )
      )
      .subscribe((terminalFunctions: ITerminalFunctions[]) => (this.terminalFunctionsSharedCollection = terminalFunctions));

    this.countySubCountyCodeService
      .query()
      .pipe(map((res: HttpResponse<ICountySubCountyCode[]>) => res.body ?? []))
      .pipe(
        map((countySubCountyCodes: ICountySubCountyCode[]) =>
          this.countySubCountyCodeService.addCountySubCountyCodeToCollectionIfMissing<ICountySubCountyCode>(
            countySubCountyCodes,
            this.terminalsAndPOS?.physicalLocation
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
            this.terminalsAndPOS?.bankId
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
            this.terminalsAndPOS?.branchId
          )
        )
      )
      .subscribe((bankBranchCodes: IBankBranchCode[]) => (this.bankBranchCodesSharedCollection = bankBranchCodes));
  }
}

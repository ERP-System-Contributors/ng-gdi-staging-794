import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AgentBankingActivityFormService, AgentBankingActivityFormGroup } from './agent-banking-activity-form.service';
import { IAgentBankingActivity } from '../agent-banking-activity.model';
import { AgentBankingActivityService } from '../service/agent-banking-activity.service';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { InstitutionCodeService } from 'app/entities/gdi/institution-code/service/institution-code.service';
import { IBankBranchCode } from 'app/entities/gdi/bank-branch-code/bank-branch-code.model';
import { BankBranchCodeService } from 'app/entities/gdi/bank-branch-code/service/bank-branch-code.service';
import { IBankTransactionType } from 'app/entities/gdi/bank-transaction-type/bank-transaction-type.model';
import { BankTransactionTypeService } from 'app/entities/gdi/bank-transaction-type/service/bank-transaction-type.service';

@Component({
  selector: 'jhi-agent-banking-activity-update',
  templateUrl: './agent-banking-activity-update.component.html',
})
export class AgentBankingActivityUpdateComponent implements OnInit {
  isSaving = false;
  agentBankingActivity: IAgentBankingActivity | null = null;

  institutionCodesSharedCollection: IInstitutionCode[] = [];
  bankBranchCodesSharedCollection: IBankBranchCode[] = [];
  bankTransactionTypesSharedCollection: IBankTransactionType[] = [];

  editForm: AgentBankingActivityFormGroup = this.agentBankingActivityFormService.createAgentBankingActivityFormGroup();

  constructor(
    protected agentBankingActivityService: AgentBankingActivityService,
    protected agentBankingActivityFormService: AgentBankingActivityFormService,
    protected institutionCodeService: InstitutionCodeService,
    protected bankBranchCodeService: BankBranchCodeService,
    protected bankTransactionTypeService: BankTransactionTypeService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareInstitutionCode = (o1: IInstitutionCode | null, o2: IInstitutionCode | null): boolean =>
    this.institutionCodeService.compareInstitutionCode(o1, o2);

  compareBankBranchCode = (o1: IBankBranchCode | null, o2: IBankBranchCode | null): boolean =>
    this.bankBranchCodeService.compareBankBranchCode(o1, o2);

  compareBankTransactionType = (o1: IBankTransactionType | null, o2: IBankTransactionType | null): boolean =>
    this.bankTransactionTypeService.compareBankTransactionType(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ agentBankingActivity }) => {
      this.agentBankingActivity = agentBankingActivity;
      if (agentBankingActivity) {
        this.updateForm(agentBankingActivity);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const agentBankingActivity = this.agentBankingActivityFormService.getAgentBankingActivity(this.editForm);
    if (agentBankingActivity.id !== null) {
      this.subscribeToSaveResponse(this.agentBankingActivityService.update(agentBankingActivity));
    } else {
      this.subscribeToSaveResponse(this.agentBankingActivityService.create(agentBankingActivity));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgentBankingActivity>>): void {
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

  protected updateForm(agentBankingActivity: IAgentBankingActivity): void {
    this.agentBankingActivity = agentBankingActivity;
    this.agentBankingActivityFormService.resetForm(this.editForm, agentBankingActivity);

    this.institutionCodesSharedCollection = this.institutionCodeService.addInstitutionCodeToCollectionIfMissing<IInstitutionCode>(
      this.institutionCodesSharedCollection,
      agentBankingActivity.bankCode
    );
    this.bankBranchCodesSharedCollection = this.bankBranchCodeService.addBankBranchCodeToCollectionIfMissing<IBankBranchCode>(
      this.bankBranchCodesSharedCollection,
      agentBankingActivity.branchCode
    );
    this.bankTransactionTypesSharedCollection =
      this.bankTransactionTypeService.addBankTransactionTypeToCollectionIfMissing<IBankTransactionType>(
        this.bankTransactionTypesSharedCollection,
        agentBankingActivity.transactionType
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
            this.agentBankingActivity?.bankCode
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
            this.agentBankingActivity?.branchCode
          )
        )
      )
      .subscribe((bankBranchCodes: IBankBranchCode[]) => (this.bankBranchCodesSharedCollection = bankBranchCodes));

    this.bankTransactionTypeService
      .query()
      .pipe(map((res: HttpResponse<IBankTransactionType[]>) => res.body ?? []))
      .pipe(
        map((bankTransactionTypes: IBankTransactionType[]) =>
          this.bankTransactionTypeService.addBankTransactionTypeToCollectionIfMissing<IBankTransactionType>(
            bankTransactionTypes,
            this.agentBankingActivity?.transactionType
          )
        )
      )
      .subscribe((bankTransactionTypes: IBankTransactionType[]) => (this.bankTransactionTypesSharedCollection = bankTransactionTypes));
  }
}

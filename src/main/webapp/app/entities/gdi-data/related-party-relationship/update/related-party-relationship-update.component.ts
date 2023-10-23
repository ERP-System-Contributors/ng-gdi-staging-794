import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { RelatedPartyRelationshipFormService, RelatedPartyRelationshipFormGroup } from './related-party-relationship-form.service';
import { IRelatedPartyRelationship } from '../related-party-relationship.model';
import { RelatedPartyRelationshipService } from '../service/related-party-relationship.service';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { InstitutionCodeService } from 'app/entities/gdi/institution-code/service/institution-code.service';
import { IBankBranchCode } from 'app/entities/gdi/bank-branch-code/bank-branch-code.model';
import { BankBranchCodeService } from 'app/entities/gdi/bank-branch-code/service/bank-branch-code.service';
import { IPartyRelationType } from 'app/entities/gdi/party-relation-type/party-relation-type.model';
import { PartyRelationTypeService } from 'app/entities/gdi/party-relation-type/service/party-relation-type.service';

@Component({
  selector: 'jhi-related-party-relationship-update',
  templateUrl: './related-party-relationship-update.component.html',
})
export class RelatedPartyRelationshipUpdateComponent implements OnInit {
  isSaving = false;
  relatedPartyRelationship: IRelatedPartyRelationship | null = null;

  institutionCodesSharedCollection: IInstitutionCode[] = [];
  bankBranchCodesSharedCollection: IBankBranchCode[] = [];
  partyRelationTypesSharedCollection: IPartyRelationType[] = [];

  editForm: RelatedPartyRelationshipFormGroup = this.relatedPartyRelationshipFormService.createRelatedPartyRelationshipFormGroup();

  constructor(
    protected relatedPartyRelationshipService: RelatedPartyRelationshipService,
    protected relatedPartyRelationshipFormService: RelatedPartyRelationshipFormService,
    protected institutionCodeService: InstitutionCodeService,
    protected bankBranchCodeService: BankBranchCodeService,
    protected partyRelationTypeService: PartyRelationTypeService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareInstitutionCode = (o1: IInstitutionCode | null, o2: IInstitutionCode | null): boolean =>
    this.institutionCodeService.compareInstitutionCode(o1, o2);

  compareBankBranchCode = (o1: IBankBranchCode | null, o2: IBankBranchCode | null): boolean =>
    this.bankBranchCodeService.compareBankBranchCode(o1, o2);

  comparePartyRelationType = (o1: IPartyRelationType | null, o2: IPartyRelationType | null): boolean =>
    this.partyRelationTypeService.comparePartyRelationType(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ relatedPartyRelationship }) => {
      this.relatedPartyRelationship = relatedPartyRelationship;
      if (relatedPartyRelationship) {
        this.updateForm(relatedPartyRelationship);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const relatedPartyRelationship = this.relatedPartyRelationshipFormService.getRelatedPartyRelationship(this.editForm);
    if (relatedPartyRelationship.id !== null) {
      this.subscribeToSaveResponse(this.relatedPartyRelationshipService.update(relatedPartyRelationship));
    } else {
      this.subscribeToSaveResponse(this.relatedPartyRelationshipService.create(relatedPartyRelationship));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRelatedPartyRelationship>>): void {
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

  protected updateForm(relatedPartyRelationship: IRelatedPartyRelationship): void {
    this.relatedPartyRelationship = relatedPartyRelationship;
    this.relatedPartyRelationshipFormService.resetForm(this.editForm, relatedPartyRelationship);

    this.institutionCodesSharedCollection = this.institutionCodeService.addInstitutionCodeToCollectionIfMissing<IInstitutionCode>(
      this.institutionCodesSharedCollection,
      relatedPartyRelationship.bankCode
    );
    this.bankBranchCodesSharedCollection = this.bankBranchCodeService.addBankBranchCodeToCollectionIfMissing<IBankBranchCode>(
      this.bankBranchCodesSharedCollection,
      relatedPartyRelationship.branchId
    );
    this.partyRelationTypesSharedCollection = this.partyRelationTypeService.addPartyRelationTypeToCollectionIfMissing<IPartyRelationType>(
      this.partyRelationTypesSharedCollection,
      relatedPartyRelationship.relationshipType
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
            this.relatedPartyRelationship?.bankCode
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
            this.relatedPartyRelationship?.branchId
          )
        )
      )
      .subscribe((bankBranchCodes: IBankBranchCode[]) => (this.bankBranchCodesSharedCollection = bankBranchCodes));

    this.partyRelationTypeService
      .query()
      .pipe(map((res: HttpResponse<IPartyRelationType[]>) => res.body ?? []))
      .pipe(
        map((partyRelationTypes: IPartyRelationType[]) =>
          this.partyRelationTypeService.addPartyRelationTypeToCollectionIfMissing<IPartyRelationType>(
            partyRelationTypes,
            this.relatedPartyRelationship?.relationshipType
          )
        )
      )
      .subscribe((partyRelationTypes: IPartyRelationType[]) => (this.partyRelationTypesSharedCollection = partyRelationTypes));
  }
}

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

import { AccountAttributeFormService, AccountAttributeFormGroup } from './account-attribute-form.service';
import { IAccountAttribute } from '../account-attribute.model';
import { AccountAttributeService } from '../service/account-attribute.service';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { InstitutionCodeService } from 'app/entities/gdi/institution-code/service/institution-code.service';
import { IBankBranchCode } from 'app/entities/gdi/bank-branch-code/bank-branch-code.model';
import { BankBranchCodeService } from 'app/entities/gdi/bank-branch-code/service/bank-branch-code.service';
import { IAccountOwnershipType } from 'app/entities/gdi/account-ownership-type/account-ownership-type.model';
import { AccountOwnershipTypeService } from 'app/entities/gdi/account-ownership-type/service/account-ownership-type.service';

@Component({
  selector: 'jhi-account-attribute-update',
  templateUrl: './account-attribute-update.component.html',
})
export class AccountAttributeUpdateComponent implements OnInit {
  isSaving = false;
  accountAttribute: IAccountAttribute | null = null;

  institutionCodesSharedCollection: IInstitutionCode[] = [];
  bankBranchCodesSharedCollection: IBankBranchCode[] = [];
  accountOwnershipTypesSharedCollection: IAccountOwnershipType[] = [];

  editForm: AccountAttributeFormGroup = this.accountAttributeFormService.createAccountAttributeFormGroup();

  constructor(
    protected accountAttributeService: AccountAttributeService,
    protected accountAttributeFormService: AccountAttributeFormService,
    protected institutionCodeService: InstitutionCodeService,
    protected bankBranchCodeService: BankBranchCodeService,
    protected accountOwnershipTypeService: AccountOwnershipTypeService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareInstitutionCode = (o1: IInstitutionCode | null, o2: IInstitutionCode | null): boolean =>
    this.institutionCodeService.compareInstitutionCode(o1, o2);

  compareBankBranchCode = (o1: IBankBranchCode | null, o2: IBankBranchCode | null): boolean =>
    this.bankBranchCodeService.compareBankBranchCode(o1, o2);

  compareAccountOwnershipType = (o1: IAccountOwnershipType | null, o2: IAccountOwnershipType | null): boolean =>
    this.accountOwnershipTypeService.compareAccountOwnershipType(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ accountAttribute }) => {
      this.accountAttribute = accountAttribute;
      if (accountAttribute) {
        this.updateForm(accountAttribute);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const accountAttribute = this.accountAttributeFormService.getAccountAttribute(this.editForm);
    if (accountAttribute.id !== null) {
      this.subscribeToSaveResponse(this.accountAttributeService.update(accountAttribute));
    } else {
      this.subscribeToSaveResponse(this.accountAttributeService.create(accountAttribute));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAccountAttribute>>): void {
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

  protected updateForm(accountAttribute: IAccountAttribute): void {
    this.accountAttribute = accountAttribute;
    this.accountAttributeFormService.resetForm(this.editForm, accountAttribute);

    this.institutionCodesSharedCollection = this.institutionCodeService.addInstitutionCodeToCollectionIfMissing<IInstitutionCode>(
      this.institutionCodesSharedCollection,
      accountAttribute.bankCode
    );
    this.bankBranchCodesSharedCollection = this.bankBranchCodeService.addBankBranchCodeToCollectionIfMissing<IBankBranchCode>(
      this.bankBranchCodesSharedCollection,
      accountAttribute.branchCode
    );
    this.accountOwnershipTypesSharedCollection =
      this.accountOwnershipTypeService.addAccountOwnershipTypeToCollectionIfMissing<IAccountOwnershipType>(
        this.accountOwnershipTypesSharedCollection,
        accountAttribute.accountOwnershipType
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
            this.accountAttribute?.bankCode
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
            this.accountAttribute?.branchCode
          )
        )
      )
      .subscribe((bankBranchCodes: IBankBranchCode[]) => (this.bankBranchCodesSharedCollection = bankBranchCodes));

    this.accountOwnershipTypeService
      .query()
      .pipe(map((res: HttpResponse<IAccountOwnershipType[]>) => res.body ?? []))
      .pipe(
        map((accountOwnershipTypes: IAccountOwnershipType[]) =>
          this.accountOwnershipTypeService.addAccountOwnershipTypeToCollectionIfMissing<IAccountOwnershipType>(
            accountOwnershipTypes,
            this.accountAttribute?.accountOwnershipType
          )
        )
      )
      .subscribe((accountOwnershipTypes: IAccountOwnershipType[]) => (this.accountOwnershipTypesSharedCollection = accountOwnershipTypes));
  }
}

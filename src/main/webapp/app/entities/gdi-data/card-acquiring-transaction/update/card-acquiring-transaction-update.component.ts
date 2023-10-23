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

import { CardAcquiringTransactionFormService, CardAcquiringTransactionFormGroup } from './card-acquiring-transaction-form.service';
import { ICardAcquiringTransaction } from '../card-acquiring-transaction.model';
import { CardAcquiringTransactionService } from '../service/card-acquiring-transaction.service';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { InstitutionCodeService } from 'app/entities/gdi/institution-code/service/institution-code.service';
import { IChannelType } from 'app/entities/gdi/channel-type/channel-type.model';
import { ChannelTypeService } from 'app/entities/gdi/channel-type/service/channel-type.service';
import { ICardBrandType } from 'app/entities/gdi/card-brand-type/card-brand-type.model';
import { CardBrandTypeService } from 'app/entities/gdi/card-brand-type/service/card-brand-type.service';
import { IIsoCurrencyCode } from 'app/entities/gdi/iso-currency-code/iso-currency-code.model';
import { IsoCurrencyCodeService } from 'app/entities/gdi/iso-currency-code/service/iso-currency-code.service';
import { ICardCategoryType } from 'app/entities/gdi/card-category-type/card-category-type.model';
import { CardCategoryTypeService } from 'app/entities/gdi/card-category-type/service/card-category-type.service';

@Component({
  selector: 'jhi-card-acquiring-transaction-update',
  templateUrl: './card-acquiring-transaction-update.component.html',
})
export class CardAcquiringTransactionUpdateComponent implements OnInit {
  isSaving = false;
  cardAcquiringTransaction: ICardAcquiringTransaction | null = null;

  institutionCodesSharedCollection: IInstitutionCode[] = [];
  channelTypesSharedCollection: IChannelType[] = [];
  cardBrandTypesSharedCollection: ICardBrandType[] = [];
  isoCurrencyCodesSharedCollection: IIsoCurrencyCode[] = [];
  cardCategoryTypesSharedCollection: ICardCategoryType[] = [];

  editForm: CardAcquiringTransactionFormGroup = this.cardAcquiringTransactionFormService.createCardAcquiringTransactionFormGroup();

  constructor(
    protected cardAcquiringTransactionService: CardAcquiringTransactionService,
    protected cardAcquiringTransactionFormService: CardAcquiringTransactionFormService,
    protected institutionCodeService: InstitutionCodeService,
    protected channelTypeService: ChannelTypeService,
    protected cardBrandTypeService: CardBrandTypeService,
    protected isoCurrencyCodeService: IsoCurrencyCodeService,
    protected cardCategoryTypeService: CardCategoryTypeService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareInstitutionCode = (o1: IInstitutionCode | null, o2: IInstitutionCode | null): boolean =>
    this.institutionCodeService.compareInstitutionCode(o1, o2);

  compareChannelType = (o1: IChannelType | null, o2: IChannelType | null): boolean => this.channelTypeService.compareChannelType(o1, o2);

  compareCardBrandType = (o1: ICardBrandType | null, o2: ICardBrandType | null): boolean =>
    this.cardBrandTypeService.compareCardBrandType(o1, o2);

  compareIsoCurrencyCode = (o1: IIsoCurrencyCode | null, o2: IIsoCurrencyCode | null): boolean =>
    this.isoCurrencyCodeService.compareIsoCurrencyCode(o1, o2);

  compareCardCategoryType = (o1: ICardCategoryType | null, o2: ICardCategoryType | null): boolean =>
    this.cardCategoryTypeService.compareCardCategoryType(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cardAcquiringTransaction }) => {
      this.cardAcquiringTransaction = cardAcquiringTransaction;
      if (cardAcquiringTransaction) {
        this.updateForm(cardAcquiringTransaction);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cardAcquiringTransaction = this.cardAcquiringTransactionFormService.getCardAcquiringTransaction(this.editForm);
    if (cardAcquiringTransaction.id !== null) {
      this.subscribeToSaveResponse(this.cardAcquiringTransactionService.update(cardAcquiringTransaction));
    } else {
      this.subscribeToSaveResponse(this.cardAcquiringTransactionService.create(cardAcquiringTransaction));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICardAcquiringTransaction>>): void {
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

  protected updateForm(cardAcquiringTransaction: ICardAcquiringTransaction): void {
    this.cardAcquiringTransaction = cardAcquiringTransaction;
    this.cardAcquiringTransactionFormService.resetForm(this.editForm, cardAcquiringTransaction);

    this.institutionCodesSharedCollection = this.institutionCodeService.addInstitutionCodeToCollectionIfMissing<IInstitutionCode>(
      this.institutionCodesSharedCollection,
      cardAcquiringTransaction.bankCode
    );
    this.channelTypesSharedCollection = this.channelTypeService.addChannelTypeToCollectionIfMissing<IChannelType>(
      this.channelTypesSharedCollection,
      cardAcquiringTransaction.channelType
    );
    this.cardBrandTypesSharedCollection = this.cardBrandTypeService.addCardBrandTypeToCollectionIfMissing<ICardBrandType>(
      this.cardBrandTypesSharedCollection,
      cardAcquiringTransaction.cardBrandType
    );
    this.isoCurrencyCodesSharedCollection = this.isoCurrencyCodeService.addIsoCurrencyCodeToCollectionIfMissing<IIsoCurrencyCode>(
      this.isoCurrencyCodesSharedCollection,
      cardAcquiringTransaction.currencyOfTransaction
    );
    this.cardCategoryTypesSharedCollection = this.cardCategoryTypeService.addCardCategoryTypeToCollectionIfMissing<ICardCategoryType>(
      this.cardCategoryTypesSharedCollection,
      cardAcquiringTransaction.cardIssuerCategory
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
            this.cardAcquiringTransaction?.bankCode
          )
        )
      )
      .subscribe((institutionCodes: IInstitutionCode[]) => (this.institutionCodesSharedCollection = institutionCodes));

    this.channelTypeService
      .query()
      .pipe(map((res: HttpResponse<IChannelType[]>) => res.body ?? []))
      .pipe(
        map((channelTypes: IChannelType[]) =>
          this.channelTypeService.addChannelTypeToCollectionIfMissing<IChannelType>(
            channelTypes,
            this.cardAcquiringTransaction?.channelType
          )
        )
      )
      .subscribe((channelTypes: IChannelType[]) => (this.channelTypesSharedCollection = channelTypes));

    this.cardBrandTypeService
      .query()
      .pipe(map((res: HttpResponse<ICardBrandType[]>) => res.body ?? []))
      .pipe(
        map((cardBrandTypes: ICardBrandType[]) =>
          this.cardBrandTypeService.addCardBrandTypeToCollectionIfMissing<ICardBrandType>(
            cardBrandTypes,
            this.cardAcquiringTransaction?.cardBrandType
          )
        )
      )
      .subscribe((cardBrandTypes: ICardBrandType[]) => (this.cardBrandTypesSharedCollection = cardBrandTypes));

    this.isoCurrencyCodeService
      .query()
      .pipe(map((res: HttpResponse<IIsoCurrencyCode[]>) => res.body ?? []))
      .pipe(
        map((isoCurrencyCodes: IIsoCurrencyCode[]) =>
          this.isoCurrencyCodeService.addIsoCurrencyCodeToCollectionIfMissing<IIsoCurrencyCode>(
            isoCurrencyCodes,
            this.cardAcquiringTransaction?.currencyOfTransaction
          )
        )
      )
      .subscribe((isoCurrencyCodes: IIsoCurrencyCode[]) => (this.isoCurrencyCodesSharedCollection = isoCurrencyCodes));

    this.cardCategoryTypeService
      .query()
      .pipe(map((res: HttpResponse<ICardCategoryType[]>) => res.body ?? []))
      .pipe(
        map((cardCategoryTypes: ICardCategoryType[]) =>
          this.cardCategoryTypeService.addCardCategoryTypeToCollectionIfMissing<ICardCategoryType>(
            cardCategoryTypes,
            this.cardAcquiringTransaction?.cardIssuerCategory
          )
        )
      )
      .subscribe((cardCategoryTypes: ICardCategoryType[]) => (this.cardCategoryTypesSharedCollection = cardCategoryTypes));
  }
}

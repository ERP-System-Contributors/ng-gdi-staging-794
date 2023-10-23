import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CardUsageInformationFormService, CardUsageInformationFormGroup } from './card-usage-information-form.service';
import { ICardUsageInformation } from '../card-usage-information.model';
import { CardUsageInformationService } from '../service/card-usage-information.service';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { InstitutionCodeService } from 'app/entities/gdi/institution-code/service/institution-code.service';
import { ICardTypes } from 'app/entities/gdi/card-types/card-types.model';
import { CardTypesService } from 'app/entities/gdi/card-types/service/card-types.service';
import { ICardBrandType } from 'app/entities/gdi/card-brand-type/card-brand-type.model';
import { CardBrandTypeService } from 'app/entities/gdi/card-brand-type/service/card-brand-type.service';
import { ICardCategoryType } from 'app/entities/gdi/card-category-type/card-category-type.model';
import { CardCategoryTypeService } from 'app/entities/gdi/card-category-type/service/card-category-type.service';
import { IBankTransactionType } from 'app/entities/gdi/bank-transaction-type/bank-transaction-type.model';
import { BankTransactionTypeService } from 'app/entities/gdi/bank-transaction-type/service/bank-transaction-type.service';
import { IChannelType } from 'app/entities/gdi/channel-type/channel-type.model';
import { ChannelTypeService } from 'app/entities/gdi/channel-type/service/channel-type.service';
import { ICardState } from 'app/entities/gdi-data/card-state/card-state.model';
import { CardStateService } from 'app/entities/gdi-data/card-state/service/card-state.service';

@Component({
  selector: 'jhi-card-usage-information-update',
  templateUrl: './card-usage-information-update.component.html',
})
export class CardUsageInformationUpdateComponent implements OnInit {
  isSaving = false;
  cardUsageInformation: ICardUsageInformation | null = null;

  institutionCodesSharedCollection: IInstitutionCode[] = [];
  cardTypesSharedCollection: ICardTypes[] = [];
  cardBrandTypesSharedCollection: ICardBrandType[] = [];
  cardCategoryTypesSharedCollection: ICardCategoryType[] = [];
  bankTransactionTypesSharedCollection: IBankTransactionType[] = [];
  channelTypesSharedCollection: IChannelType[] = [];
  cardStatesSharedCollection: ICardState[] = [];

  editForm: CardUsageInformationFormGroup = this.cardUsageInformationFormService.createCardUsageInformationFormGroup();

  constructor(
    protected cardUsageInformationService: CardUsageInformationService,
    protected cardUsageInformationFormService: CardUsageInformationFormService,
    protected institutionCodeService: InstitutionCodeService,
    protected cardTypesService: CardTypesService,
    protected cardBrandTypeService: CardBrandTypeService,
    protected cardCategoryTypeService: CardCategoryTypeService,
    protected bankTransactionTypeService: BankTransactionTypeService,
    protected channelTypeService: ChannelTypeService,
    protected cardStateService: CardStateService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareInstitutionCode = (o1: IInstitutionCode | null, o2: IInstitutionCode | null): boolean =>
    this.institutionCodeService.compareInstitutionCode(o1, o2);

  compareCardTypes = (o1: ICardTypes | null, o2: ICardTypes | null): boolean => this.cardTypesService.compareCardTypes(o1, o2);

  compareCardBrandType = (o1: ICardBrandType | null, o2: ICardBrandType | null): boolean =>
    this.cardBrandTypeService.compareCardBrandType(o1, o2);

  compareCardCategoryType = (o1: ICardCategoryType | null, o2: ICardCategoryType | null): boolean =>
    this.cardCategoryTypeService.compareCardCategoryType(o1, o2);

  compareBankTransactionType = (o1: IBankTransactionType | null, o2: IBankTransactionType | null): boolean =>
    this.bankTransactionTypeService.compareBankTransactionType(o1, o2);

  compareChannelType = (o1: IChannelType | null, o2: IChannelType | null): boolean => this.channelTypeService.compareChannelType(o1, o2);

  compareCardState = (o1: ICardState | null, o2: ICardState | null): boolean => this.cardStateService.compareCardState(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cardUsageInformation }) => {
      this.cardUsageInformation = cardUsageInformation;
      if (cardUsageInformation) {
        this.updateForm(cardUsageInformation);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cardUsageInformation = this.cardUsageInformationFormService.getCardUsageInformation(this.editForm);
    if (cardUsageInformation.id !== null) {
      this.subscribeToSaveResponse(this.cardUsageInformationService.update(cardUsageInformation));
    } else {
      this.subscribeToSaveResponse(this.cardUsageInformationService.create(cardUsageInformation));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICardUsageInformation>>): void {
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

  protected updateForm(cardUsageInformation: ICardUsageInformation): void {
    this.cardUsageInformation = cardUsageInformation;
    this.cardUsageInformationFormService.resetForm(this.editForm, cardUsageInformation);

    this.institutionCodesSharedCollection = this.institutionCodeService.addInstitutionCodeToCollectionIfMissing<IInstitutionCode>(
      this.institutionCodesSharedCollection,
      cardUsageInformation.bankCode
    );
    this.cardTypesSharedCollection = this.cardTypesService.addCardTypesToCollectionIfMissing<ICardTypes>(
      this.cardTypesSharedCollection,
      cardUsageInformation.cardType
    );
    this.cardBrandTypesSharedCollection = this.cardBrandTypeService.addCardBrandTypeToCollectionIfMissing<ICardBrandType>(
      this.cardBrandTypesSharedCollection,
      cardUsageInformation.cardBrand
    );
    this.cardCategoryTypesSharedCollection = this.cardCategoryTypeService.addCardCategoryTypeToCollectionIfMissing<ICardCategoryType>(
      this.cardCategoryTypesSharedCollection,
      cardUsageInformation.cardCategoryType
    );
    this.bankTransactionTypesSharedCollection =
      this.bankTransactionTypeService.addBankTransactionTypeToCollectionIfMissing<IBankTransactionType>(
        this.bankTransactionTypesSharedCollection,
        cardUsageInformation.transactionType
      );
    this.channelTypesSharedCollection = this.channelTypeService.addChannelTypeToCollectionIfMissing<IChannelType>(
      this.channelTypesSharedCollection,
      cardUsageInformation.channelType
    );
    this.cardStatesSharedCollection = this.cardStateService.addCardStateToCollectionIfMissing<ICardState>(
      this.cardStatesSharedCollection,
      cardUsageInformation.cardState
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
            this.cardUsageInformation?.bankCode
          )
        )
      )
      .subscribe((institutionCodes: IInstitutionCode[]) => (this.institutionCodesSharedCollection = institutionCodes));

    this.cardTypesService
      .query()
      .pipe(map((res: HttpResponse<ICardTypes[]>) => res.body ?? []))
      .pipe(
        map((cardTypes: ICardTypes[]) =>
          this.cardTypesService.addCardTypesToCollectionIfMissing<ICardTypes>(cardTypes, this.cardUsageInformation?.cardType)
        )
      )
      .subscribe((cardTypes: ICardTypes[]) => (this.cardTypesSharedCollection = cardTypes));

    this.cardBrandTypeService
      .query()
      .pipe(map((res: HttpResponse<ICardBrandType[]>) => res.body ?? []))
      .pipe(
        map((cardBrandTypes: ICardBrandType[]) =>
          this.cardBrandTypeService.addCardBrandTypeToCollectionIfMissing<ICardBrandType>(
            cardBrandTypes,
            this.cardUsageInformation?.cardBrand
          )
        )
      )
      .subscribe((cardBrandTypes: ICardBrandType[]) => (this.cardBrandTypesSharedCollection = cardBrandTypes));

    this.cardCategoryTypeService
      .query()
      .pipe(map((res: HttpResponse<ICardCategoryType[]>) => res.body ?? []))
      .pipe(
        map((cardCategoryTypes: ICardCategoryType[]) =>
          this.cardCategoryTypeService.addCardCategoryTypeToCollectionIfMissing<ICardCategoryType>(
            cardCategoryTypes,
            this.cardUsageInformation?.cardCategoryType
          )
        )
      )
      .subscribe((cardCategoryTypes: ICardCategoryType[]) => (this.cardCategoryTypesSharedCollection = cardCategoryTypes));

    this.bankTransactionTypeService
      .query()
      .pipe(map((res: HttpResponse<IBankTransactionType[]>) => res.body ?? []))
      .pipe(
        map((bankTransactionTypes: IBankTransactionType[]) =>
          this.bankTransactionTypeService.addBankTransactionTypeToCollectionIfMissing<IBankTransactionType>(
            bankTransactionTypes,
            this.cardUsageInformation?.transactionType
          )
        )
      )
      .subscribe((bankTransactionTypes: IBankTransactionType[]) => (this.bankTransactionTypesSharedCollection = bankTransactionTypes));

    this.channelTypeService
      .query()
      .pipe(map((res: HttpResponse<IChannelType[]>) => res.body ?? []))
      .pipe(
        map((channelTypes: IChannelType[]) =>
          this.channelTypeService.addChannelTypeToCollectionIfMissing<IChannelType>(channelTypes, this.cardUsageInformation?.channelType)
        )
      )
      .subscribe((channelTypes: IChannelType[]) => (this.channelTypesSharedCollection = channelTypes));

    this.cardStateService
      .query()
      .pipe(map((res: HttpResponse<ICardState[]>) => res.body ?? []))
      .pipe(
        map((cardStates: ICardState[]) =>
          this.cardStateService.addCardStateToCollectionIfMissing<ICardState>(cardStates, this.cardUsageInformation?.cardState)
        )
      )
      .subscribe((cardStates: ICardState[]) => (this.cardStatesSharedCollection = cardStates));
  }
}

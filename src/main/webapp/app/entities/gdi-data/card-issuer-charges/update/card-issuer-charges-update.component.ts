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

import { CardIssuerChargesFormService, CardIssuerChargesFormGroup } from './card-issuer-charges-form.service';
import { ICardIssuerCharges } from '../card-issuer-charges.model';
import { CardIssuerChargesService } from '../service/card-issuer-charges.service';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { InstitutionCodeService } from 'app/entities/gdi/institution-code/service/institution-code.service';
import { ICardCategoryType } from 'app/entities/gdi/card-category-type/card-category-type.model';
import { CardCategoryTypeService } from 'app/entities/gdi/card-category-type/service/card-category-type.service';
import { ICardTypes } from 'app/entities/gdi/card-types/card-types.model';
import { CardTypesService } from 'app/entities/gdi/card-types/service/card-types.service';
import { ICardBrandType } from 'app/entities/gdi/card-brand-type/card-brand-type.model';
import { CardBrandTypeService } from 'app/entities/gdi/card-brand-type/service/card-brand-type.service';
import { ICardClassType } from 'app/entities/gdi/card-class-type/card-class-type.model';
import { CardClassTypeService } from 'app/entities/gdi/card-class-type/service/card-class-type.service';
import { ICardCharges } from 'app/entities/gdi/card-charges/card-charges.model';
import { CardChargesService } from 'app/entities/gdi/card-charges/service/card-charges.service';

@Component({
  selector: 'jhi-card-issuer-charges-update',
  templateUrl: './card-issuer-charges-update.component.html',
})
export class CardIssuerChargesUpdateComponent implements OnInit {
  isSaving = false;
  cardIssuerCharges: ICardIssuerCharges | null = null;

  institutionCodesSharedCollection: IInstitutionCode[] = [];
  cardCategoryTypesSharedCollection: ICardCategoryType[] = [];
  cardTypesSharedCollection: ICardTypes[] = [];
  cardBrandTypesSharedCollection: ICardBrandType[] = [];
  cardClassTypesSharedCollection: ICardClassType[] = [];
  cardChargesSharedCollection: ICardCharges[] = [];

  editForm: CardIssuerChargesFormGroup = this.cardIssuerChargesFormService.createCardIssuerChargesFormGroup();

  constructor(
    protected cardIssuerChargesService: CardIssuerChargesService,
    protected cardIssuerChargesFormService: CardIssuerChargesFormService,
    protected institutionCodeService: InstitutionCodeService,
    protected cardCategoryTypeService: CardCategoryTypeService,
    protected cardTypesService: CardTypesService,
    protected cardBrandTypeService: CardBrandTypeService,
    protected cardClassTypeService: CardClassTypeService,
    protected cardChargesService: CardChargesService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareInstitutionCode = (o1: IInstitutionCode | null, o2: IInstitutionCode | null): boolean =>
    this.institutionCodeService.compareInstitutionCode(o1, o2);

  compareCardCategoryType = (o1: ICardCategoryType | null, o2: ICardCategoryType | null): boolean =>
    this.cardCategoryTypeService.compareCardCategoryType(o1, o2);

  compareCardTypes = (o1: ICardTypes | null, o2: ICardTypes | null): boolean => this.cardTypesService.compareCardTypes(o1, o2);

  compareCardBrandType = (o1: ICardBrandType | null, o2: ICardBrandType | null): boolean =>
    this.cardBrandTypeService.compareCardBrandType(o1, o2);

  compareCardClassType = (o1: ICardClassType | null, o2: ICardClassType | null): boolean =>
    this.cardClassTypeService.compareCardClassType(o1, o2);

  compareCardCharges = (o1: ICardCharges | null, o2: ICardCharges | null): boolean => this.cardChargesService.compareCardCharges(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cardIssuerCharges }) => {
      this.cardIssuerCharges = cardIssuerCharges;
      if (cardIssuerCharges) {
        this.updateForm(cardIssuerCharges);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cardIssuerCharges = this.cardIssuerChargesFormService.getCardIssuerCharges(this.editForm);
    if (cardIssuerCharges.id !== null) {
      this.subscribeToSaveResponse(this.cardIssuerChargesService.update(cardIssuerCharges));
    } else {
      this.subscribeToSaveResponse(this.cardIssuerChargesService.create(cardIssuerCharges));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICardIssuerCharges>>): void {
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

  protected updateForm(cardIssuerCharges: ICardIssuerCharges): void {
    this.cardIssuerCharges = cardIssuerCharges;
    this.cardIssuerChargesFormService.resetForm(this.editForm, cardIssuerCharges);

    this.institutionCodesSharedCollection = this.institutionCodeService.addInstitutionCodeToCollectionIfMissing<IInstitutionCode>(
      this.institutionCodesSharedCollection,
      cardIssuerCharges.bankCode
    );
    this.cardCategoryTypesSharedCollection = this.cardCategoryTypeService.addCardCategoryTypeToCollectionIfMissing<ICardCategoryType>(
      this.cardCategoryTypesSharedCollection,
      cardIssuerCharges.cardCategory
    );
    this.cardTypesSharedCollection = this.cardTypesService.addCardTypesToCollectionIfMissing<ICardTypes>(
      this.cardTypesSharedCollection,
      cardIssuerCharges.cardType
    );
    this.cardBrandTypesSharedCollection = this.cardBrandTypeService.addCardBrandTypeToCollectionIfMissing<ICardBrandType>(
      this.cardBrandTypesSharedCollection,
      cardIssuerCharges.cardBrand
    );
    this.cardClassTypesSharedCollection = this.cardClassTypeService.addCardClassTypeToCollectionIfMissing<ICardClassType>(
      this.cardClassTypesSharedCollection,
      cardIssuerCharges.cardClass
    );
    this.cardChargesSharedCollection = this.cardChargesService.addCardChargesToCollectionIfMissing<ICardCharges>(
      this.cardChargesSharedCollection,
      cardIssuerCharges.cardChargeType
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
            this.cardIssuerCharges?.bankCode
          )
        )
      )
      .subscribe((institutionCodes: IInstitutionCode[]) => (this.institutionCodesSharedCollection = institutionCodes));

    this.cardCategoryTypeService
      .query()
      .pipe(map((res: HttpResponse<ICardCategoryType[]>) => res.body ?? []))
      .pipe(
        map((cardCategoryTypes: ICardCategoryType[]) =>
          this.cardCategoryTypeService.addCardCategoryTypeToCollectionIfMissing<ICardCategoryType>(
            cardCategoryTypes,
            this.cardIssuerCharges?.cardCategory
          )
        )
      )
      .subscribe((cardCategoryTypes: ICardCategoryType[]) => (this.cardCategoryTypesSharedCollection = cardCategoryTypes));

    this.cardTypesService
      .query()
      .pipe(map((res: HttpResponse<ICardTypes[]>) => res.body ?? []))
      .pipe(
        map((cardTypes: ICardTypes[]) =>
          this.cardTypesService.addCardTypesToCollectionIfMissing<ICardTypes>(cardTypes, this.cardIssuerCharges?.cardType)
        )
      )
      .subscribe((cardTypes: ICardTypes[]) => (this.cardTypesSharedCollection = cardTypes));

    this.cardBrandTypeService
      .query()
      .pipe(map((res: HttpResponse<ICardBrandType[]>) => res.body ?? []))
      .pipe(
        map((cardBrandTypes: ICardBrandType[]) =>
          this.cardBrandTypeService.addCardBrandTypeToCollectionIfMissing<ICardBrandType>(cardBrandTypes, this.cardIssuerCharges?.cardBrand)
        )
      )
      .subscribe((cardBrandTypes: ICardBrandType[]) => (this.cardBrandTypesSharedCollection = cardBrandTypes));

    this.cardClassTypeService
      .query()
      .pipe(map((res: HttpResponse<ICardClassType[]>) => res.body ?? []))
      .pipe(
        map((cardClassTypes: ICardClassType[]) =>
          this.cardClassTypeService.addCardClassTypeToCollectionIfMissing<ICardClassType>(cardClassTypes, this.cardIssuerCharges?.cardClass)
        )
      )
      .subscribe((cardClassTypes: ICardClassType[]) => (this.cardClassTypesSharedCollection = cardClassTypes));

    this.cardChargesService
      .query()
      .pipe(map((res: HttpResponse<ICardCharges[]>) => res.body ?? []))
      .pipe(
        map((cardCharges: ICardCharges[]) =>
          this.cardChargesService.addCardChargesToCollectionIfMissing<ICardCharges>(cardCharges, this.cardIssuerCharges?.cardChargeType)
        )
      )
      .subscribe((cardCharges: ICardCharges[]) => (this.cardChargesSharedCollection = cardCharges));
  }
}

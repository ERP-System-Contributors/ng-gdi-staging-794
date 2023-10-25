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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CardUsageInformationFormService } from './card-usage-information-form.service';
import { CardUsageInformationService } from '../service/card-usage-information.service';
import { ICardUsageInformation } from '../card-usage-information.model';
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

import { CardUsageInformationUpdateComponent } from './card-usage-information-update.component';

describe('CardUsageInformation Management Update Component', () => {
  let comp: CardUsageInformationUpdateComponent;
  let fixture: ComponentFixture<CardUsageInformationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cardUsageInformationFormService: CardUsageInformationFormService;
  let cardUsageInformationService: CardUsageInformationService;
  let institutionCodeService: InstitutionCodeService;
  let cardTypesService: CardTypesService;
  let cardBrandTypeService: CardBrandTypeService;
  let cardCategoryTypeService: CardCategoryTypeService;
  let bankTransactionTypeService: BankTransactionTypeService;
  let channelTypeService: ChannelTypeService;
  let cardStateService: CardStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CardUsageInformationUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(CardUsageInformationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CardUsageInformationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cardUsageInformationFormService = TestBed.inject(CardUsageInformationFormService);
    cardUsageInformationService = TestBed.inject(CardUsageInformationService);
    institutionCodeService = TestBed.inject(InstitutionCodeService);
    cardTypesService = TestBed.inject(CardTypesService);
    cardBrandTypeService = TestBed.inject(CardBrandTypeService);
    cardCategoryTypeService = TestBed.inject(CardCategoryTypeService);
    bankTransactionTypeService = TestBed.inject(BankTransactionTypeService);
    channelTypeService = TestBed.inject(ChannelTypeService);
    cardStateService = TestBed.inject(CardStateService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call InstitutionCode query and add missing value', () => {
      const cardUsageInformation: ICardUsageInformation = { id: 456 };
      const bankCode: IInstitutionCode = { id: 80418 };
      cardUsageInformation.bankCode = bankCode;

      const institutionCodeCollection: IInstitutionCode[] = [{ id: 33188 }];
      jest.spyOn(institutionCodeService, 'query').mockReturnValue(of(new HttpResponse({ body: institutionCodeCollection })));
      const additionalInstitutionCodes = [bankCode];
      const expectedCollection: IInstitutionCode[] = [...additionalInstitutionCodes, ...institutionCodeCollection];
      jest.spyOn(institutionCodeService, 'addInstitutionCodeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cardUsageInformation });
      comp.ngOnInit();

      expect(institutionCodeService.query).toHaveBeenCalled();
      expect(institutionCodeService.addInstitutionCodeToCollectionIfMissing).toHaveBeenCalledWith(
        institutionCodeCollection,
        ...additionalInstitutionCodes.map(expect.objectContaining)
      );
      expect(comp.institutionCodesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CardTypes query and add missing value', () => {
      const cardUsageInformation: ICardUsageInformation = { id: 456 };
      const cardType: ICardTypes = { id: 99973 };
      cardUsageInformation.cardType = cardType;

      const cardTypesCollection: ICardTypes[] = [{ id: 8132 }];
      jest.spyOn(cardTypesService, 'query').mockReturnValue(of(new HttpResponse({ body: cardTypesCollection })));
      const additionalCardTypes = [cardType];
      const expectedCollection: ICardTypes[] = [...additionalCardTypes, ...cardTypesCollection];
      jest.spyOn(cardTypesService, 'addCardTypesToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cardUsageInformation });
      comp.ngOnInit();

      expect(cardTypesService.query).toHaveBeenCalled();
      expect(cardTypesService.addCardTypesToCollectionIfMissing).toHaveBeenCalledWith(
        cardTypesCollection,
        ...additionalCardTypes.map(expect.objectContaining)
      );
      expect(comp.cardTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CardBrandType query and add missing value', () => {
      const cardUsageInformation: ICardUsageInformation = { id: 456 };
      const cardBrand: ICardBrandType = { id: 70595 };
      cardUsageInformation.cardBrand = cardBrand;

      const cardBrandTypeCollection: ICardBrandType[] = [{ id: 56128 }];
      jest.spyOn(cardBrandTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: cardBrandTypeCollection })));
      const additionalCardBrandTypes = [cardBrand];
      const expectedCollection: ICardBrandType[] = [...additionalCardBrandTypes, ...cardBrandTypeCollection];
      jest.spyOn(cardBrandTypeService, 'addCardBrandTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cardUsageInformation });
      comp.ngOnInit();

      expect(cardBrandTypeService.query).toHaveBeenCalled();
      expect(cardBrandTypeService.addCardBrandTypeToCollectionIfMissing).toHaveBeenCalledWith(
        cardBrandTypeCollection,
        ...additionalCardBrandTypes.map(expect.objectContaining)
      );
      expect(comp.cardBrandTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CardCategoryType query and add missing value', () => {
      const cardUsageInformation: ICardUsageInformation = { id: 456 };
      const cardCategoryType: ICardCategoryType = { id: 25982 };
      cardUsageInformation.cardCategoryType = cardCategoryType;

      const cardCategoryTypeCollection: ICardCategoryType[] = [{ id: 30964 }];
      jest.spyOn(cardCategoryTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: cardCategoryTypeCollection })));
      const additionalCardCategoryTypes = [cardCategoryType];
      const expectedCollection: ICardCategoryType[] = [...additionalCardCategoryTypes, ...cardCategoryTypeCollection];
      jest.spyOn(cardCategoryTypeService, 'addCardCategoryTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cardUsageInformation });
      comp.ngOnInit();

      expect(cardCategoryTypeService.query).toHaveBeenCalled();
      expect(cardCategoryTypeService.addCardCategoryTypeToCollectionIfMissing).toHaveBeenCalledWith(
        cardCategoryTypeCollection,
        ...additionalCardCategoryTypes.map(expect.objectContaining)
      );
      expect(comp.cardCategoryTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BankTransactionType query and add missing value', () => {
      const cardUsageInformation: ICardUsageInformation = { id: 456 };
      const transactionType: IBankTransactionType = { id: 6471 };
      cardUsageInformation.transactionType = transactionType;

      const bankTransactionTypeCollection: IBankTransactionType[] = [{ id: 4142 }];
      jest.spyOn(bankTransactionTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: bankTransactionTypeCollection })));
      const additionalBankTransactionTypes = [transactionType];
      const expectedCollection: IBankTransactionType[] = [...additionalBankTransactionTypes, ...bankTransactionTypeCollection];
      jest.spyOn(bankTransactionTypeService, 'addBankTransactionTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cardUsageInformation });
      comp.ngOnInit();

      expect(bankTransactionTypeService.query).toHaveBeenCalled();
      expect(bankTransactionTypeService.addBankTransactionTypeToCollectionIfMissing).toHaveBeenCalledWith(
        bankTransactionTypeCollection,
        ...additionalBankTransactionTypes.map(expect.objectContaining)
      );
      expect(comp.bankTransactionTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ChannelType query and add missing value', () => {
      const cardUsageInformation: ICardUsageInformation = { id: 456 };
      const channelType: IChannelType = { id: 14847 };
      cardUsageInformation.channelType = channelType;

      const channelTypeCollection: IChannelType[] = [{ id: 72903 }];
      jest.spyOn(channelTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: channelTypeCollection })));
      const additionalChannelTypes = [channelType];
      const expectedCollection: IChannelType[] = [...additionalChannelTypes, ...channelTypeCollection];
      jest.spyOn(channelTypeService, 'addChannelTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cardUsageInformation });
      comp.ngOnInit();

      expect(channelTypeService.query).toHaveBeenCalled();
      expect(channelTypeService.addChannelTypeToCollectionIfMissing).toHaveBeenCalledWith(
        channelTypeCollection,
        ...additionalChannelTypes.map(expect.objectContaining)
      );
      expect(comp.channelTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CardState query and add missing value', () => {
      const cardUsageInformation: ICardUsageInformation = { id: 456 };
      const cardState: ICardState = { id: 53348 };
      cardUsageInformation.cardState = cardState;

      const cardStateCollection: ICardState[] = [{ id: 21298 }];
      jest.spyOn(cardStateService, 'query').mockReturnValue(of(new HttpResponse({ body: cardStateCollection })));
      const additionalCardStates = [cardState];
      const expectedCollection: ICardState[] = [...additionalCardStates, ...cardStateCollection];
      jest.spyOn(cardStateService, 'addCardStateToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cardUsageInformation });
      comp.ngOnInit();

      expect(cardStateService.query).toHaveBeenCalled();
      expect(cardStateService.addCardStateToCollectionIfMissing).toHaveBeenCalledWith(
        cardStateCollection,
        ...additionalCardStates.map(expect.objectContaining)
      );
      expect(comp.cardStatesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const cardUsageInformation: ICardUsageInformation = { id: 456 };
      const bankCode: IInstitutionCode = { id: 99929 };
      cardUsageInformation.bankCode = bankCode;
      const cardType: ICardTypes = { id: 51103 };
      cardUsageInformation.cardType = cardType;
      const cardBrand: ICardBrandType = { id: 27334 };
      cardUsageInformation.cardBrand = cardBrand;
      const cardCategoryType: ICardCategoryType = { id: 37629 };
      cardUsageInformation.cardCategoryType = cardCategoryType;
      const transactionType: IBankTransactionType = { id: 15612 };
      cardUsageInformation.transactionType = transactionType;
      const channelType: IChannelType = { id: 70130 };
      cardUsageInformation.channelType = channelType;
      const cardState: ICardState = { id: 35023 };
      cardUsageInformation.cardState = cardState;

      activatedRoute.data = of({ cardUsageInformation });
      comp.ngOnInit();

      expect(comp.institutionCodesSharedCollection).toContain(bankCode);
      expect(comp.cardTypesSharedCollection).toContain(cardType);
      expect(comp.cardBrandTypesSharedCollection).toContain(cardBrand);
      expect(comp.cardCategoryTypesSharedCollection).toContain(cardCategoryType);
      expect(comp.bankTransactionTypesSharedCollection).toContain(transactionType);
      expect(comp.channelTypesSharedCollection).toContain(channelType);
      expect(comp.cardStatesSharedCollection).toContain(cardState);
      expect(comp.cardUsageInformation).toEqual(cardUsageInformation);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardUsageInformation>>();
      const cardUsageInformation = { id: 123 };
      jest.spyOn(cardUsageInformationFormService, 'getCardUsageInformation').mockReturnValue(cardUsageInformation);
      jest.spyOn(cardUsageInformationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardUsageInformation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cardUsageInformation }));
      saveSubject.complete();

      // THEN
      expect(cardUsageInformationFormService.getCardUsageInformation).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cardUsageInformationService.update).toHaveBeenCalledWith(expect.objectContaining(cardUsageInformation));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardUsageInformation>>();
      const cardUsageInformation = { id: 123 };
      jest.spyOn(cardUsageInformationFormService, 'getCardUsageInformation').mockReturnValue({ id: null });
      jest.spyOn(cardUsageInformationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardUsageInformation: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cardUsageInformation }));
      saveSubject.complete();

      // THEN
      expect(cardUsageInformationFormService.getCardUsageInformation).toHaveBeenCalled();
      expect(cardUsageInformationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardUsageInformation>>();
      const cardUsageInformation = { id: 123 };
      jest.spyOn(cardUsageInformationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardUsageInformation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cardUsageInformationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareInstitutionCode', () => {
      it('Should forward to institutionCodeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(institutionCodeService, 'compareInstitutionCode');
        comp.compareInstitutionCode(entity, entity2);
        expect(institutionCodeService.compareInstitutionCode).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCardTypes', () => {
      it('Should forward to cardTypesService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(cardTypesService, 'compareCardTypes');
        comp.compareCardTypes(entity, entity2);
        expect(cardTypesService.compareCardTypes).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCardBrandType', () => {
      it('Should forward to cardBrandTypeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(cardBrandTypeService, 'compareCardBrandType');
        comp.compareCardBrandType(entity, entity2);
        expect(cardBrandTypeService.compareCardBrandType).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCardCategoryType', () => {
      it('Should forward to cardCategoryTypeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(cardCategoryTypeService, 'compareCardCategoryType');
        comp.compareCardCategoryType(entity, entity2);
        expect(cardCategoryTypeService.compareCardCategoryType).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareBankTransactionType', () => {
      it('Should forward to bankTransactionTypeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(bankTransactionTypeService, 'compareBankTransactionType');
        comp.compareBankTransactionType(entity, entity2);
        expect(bankTransactionTypeService.compareBankTransactionType).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareChannelType', () => {
      it('Should forward to channelTypeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(channelTypeService, 'compareChannelType');
        comp.compareChannelType(entity, entity2);
        expect(channelTypeService.compareChannelType).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCardState', () => {
      it('Should forward to cardStateService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(cardStateService, 'compareCardState');
        comp.compareCardState(entity, entity2);
        expect(cardStateService.compareCardState).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});

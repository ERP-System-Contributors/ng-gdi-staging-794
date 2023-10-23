import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CardAcquiringTransactionFormService } from './card-acquiring-transaction-form.service';
import { CardAcquiringTransactionService } from '../service/card-acquiring-transaction.service';
import { ICardAcquiringTransaction } from '../card-acquiring-transaction.model';
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

import { CardAcquiringTransactionUpdateComponent } from './card-acquiring-transaction-update.component';

describe('CardAcquiringTransaction Management Update Component', () => {
  let comp: CardAcquiringTransactionUpdateComponent;
  let fixture: ComponentFixture<CardAcquiringTransactionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cardAcquiringTransactionFormService: CardAcquiringTransactionFormService;
  let cardAcquiringTransactionService: CardAcquiringTransactionService;
  let institutionCodeService: InstitutionCodeService;
  let channelTypeService: ChannelTypeService;
  let cardBrandTypeService: CardBrandTypeService;
  let isoCurrencyCodeService: IsoCurrencyCodeService;
  let cardCategoryTypeService: CardCategoryTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CardAcquiringTransactionUpdateComponent],
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
      .overrideTemplate(CardAcquiringTransactionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CardAcquiringTransactionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cardAcquiringTransactionFormService = TestBed.inject(CardAcquiringTransactionFormService);
    cardAcquiringTransactionService = TestBed.inject(CardAcquiringTransactionService);
    institutionCodeService = TestBed.inject(InstitutionCodeService);
    channelTypeService = TestBed.inject(ChannelTypeService);
    cardBrandTypeService = TestBed.inject(CardBrandTypeService);
    isoCurrencyCodeService = TestBed.inject(IsoCurrencyCodeService);
    cardCategoryTypeService = TestBed.inject(CardCategoryTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call InstitutionCode query and add missing value', () => {
      const cardAcquiringTransaction: ICardAcquiringTransaction = { id: 456 };
      const bankCode: IInstitutionCode = { id: 86717 };
      cardAcquiringTransaction.bankCode = bankCode;

      const institutionCodeCollection: IInstitutionCode[] = [{ id: 72931 }];
      jest.spyOn(institutionCodeService, 'query').mockReturnValue(of(new HttpResponse({ body: institutionCodeCollection })));
      const additionalInstitutionCodes = [bankCode];
      const expectedCollection: IInstitutionCode[] = [...additionalInstitutionCodes, ...institutionCodeCollection];
      jest.spyOn(institutionCodeService, 'addInstitutionCodeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cardAcquiringTransaction });
      comp.ngOnInit();

      expect(institutionCodeService.query).toHaveBeenCalled();
      expect(institutionCodeService.addInstitutionCodeToCollectionIfMissing).toHaveBeenCalledWith(
        institutionCodeCollection,
        ...additionalInstitutionCodes.map(expect.objectContaining)
      );
      expect(comp.institutionCodesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ChannelType query and add missing value', () => {
      const cardAcquiringTransaction: ICardAcquiringTransaction = { id: 456 };
      const channelType: IChannelType = { id: 73403 };
      cardAcquiringTransaction.channelType = channelType;

      const channelTypeCollection: IChannelType[] = [{ id: 77425 }];
      jest.spyOn(channelTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: channelTypeCollection })));
      const additionalChannelTypes = [channelType];
      const expectedCollection: IChannelType[] = [...additionalChannelTypes, ...channelTypeCollection];
      jest.spyOn(channelTypeService, 'addChannelTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cardAcquiringTransaction });
      comp.ngOnInit();

      expect(channelTypeService.query).toHaveBeenCalled();
      expect(channelTypeService.addChannelTypeToCollectionIfMissing).toHaveBeenCalledWith(
        channelTypeCollection,
        ...additionalChannelTypes.map(expect.objectContaining)
      );
      expect(comp.channelTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CardBrandType query and add missing value', () => {
      const cardAcquiringTransaction: ICardAcquiringTransaction = { id: 456 };
      const cardBrandType: ICardBrandType = { id: 88911 };
      cardAcquiringTransaction.cardBrandType = cardBrandType;

      const cardBrandTypeCollection: ICardBrandType[] = [{ id: 95823 }];
      jest.spyOn(cardBrandTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: cardBrandTypeCollection })));
      const additionalCardBrandTypes = [cardBrandType];
      const expectedCollection: ICardBrandType[] = [...additionalCardBrandTypes, ...cardBrandTypeCollection];
      jest.spyOn(cardBrandTypeService, 'addCardBrandTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cardAcquiringTransaction });
      comp.ngOnInit();

      expect(cardBrandTypeService.query).toHaveBeenCalled();
      expect(cardBrandTypeService.addCardBrandTypeToCollectionIfMissing).toHaveBeenCalledWith(
        cardBrandTypeCollection,
        ...additionalCardBrandTypes.map(expect.objectContaining)
      );
      expect(comp.cardBrandTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call IsoCurrencyCode query and add missing value', () => {
      const cardAcquiringTransaction: ICardAcquiringTransaction = { id: 456 };
      const currencyOfTransaction: IIsoCurrencyCode = { id: 18855 };
      cardAcquiringTransaction.currencyOfTransaction = currencyOfTransaction;

      const isoCurrencyCodeCollection: IIsoCurrencyCode[] = [{ id: 24558 }];
      jest.spyOn(isoCurrencyCodeService, 'query').mockReturnValue(of(new HttpResponse({ body: isoCurrencyCodeCollection })));
      const additionalIsoCurrencyCodes = [currencyOfTransaction];
      const expectedCollection: IIsoCurrencyCode[] = [...additionalIsoCurrencyCodes, ...isoCurrencyCodeCollection];
      jest.spyOn(isoCurrencyCodeService, 'addIsoCurrencyCodeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cardAcquiringTransaction });
      comp.ngOnInit();

      expect(isoCurrencyCodeService.query).toHaveBeenCalled();
      expect(isoCurrencyCodeService.addIsoCurrencyCodeToCollectionIfMissing).toHaveBeenCalledWith(
        isoCurrencyCodeCollection,
        ...additionalIsoCurrencyCodes.map(expect.objectContaining)
      );
      expect(comp.isoCurrencyCodesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CardCategoryType query and add missing value', () => {
      const cardAcquiringTransaction: ICardAcquiringTransaction = { id: 456 };
      const cardIssuerCategory: ICardCategoryType = { id: 4717 };
      cardAcquiringTransaction.cardIssuerCategory = cardIssuerCategory;

      const cardCategoryTypeCollection: ICardCategoryType[] = [{ id: 66011 }];
      jest.spyOn(cardCategoryTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: cardCategoryTypeCollection })));
      const additionalCardCategoryTypes = [cardIssuerCategory];
      const expectedCollection: ICardCategoryType[] = [...additionalCardCategoryTypes, ...cardCategoryTypeCollection];
      jest.spyOn(cardCategoryTypeService, 'addCardCategoryTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cardAcquiringTransaction });
      comp.ngOnInit();

      expect(cardCategoryTypeService.query).toHaveBeenCalled();
      expect(cardCategoryTypeService.addCardCategoryTypeToCollectionIfMissing).toHaveBeenCalledWith(
        cardCategoryTypeCollection,
        ...additionalCardCategoryTypes.map(expect.objectContaining)
      );
      expect(comp.cardCategoryTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const cardAcquiringTransaction: ICardAcquiringTransaction = { id: 456 };
      const bankCode: IInstitutionCode = { id: 52895 };
      cardAcquiringTransaction.bankCode = bankCode;
      const channelType: IChannelType = { id: 49793 };
      cardAcquiringTransaction.channelType = channelType;
      const cardBrandType: ICardBrandType = { id: 87387 };
      cardAcquiringTransaction.cardBrandType = cardBrandType;
      const currencyOfTransaction: IIsoCurrencyCode = { id: 32776 };
      cardAcquiringTransaction.currencyOfTransaction = currencyOfTransaction;
      const cardIssuerCategory: ICardCategoryType = { id: 23688 };
      cardAcquiringTransaction.cardIssuerCategory = cardIssuerCategory;

      activatedRoute.data = of({ cardAcquiringTransaction });
      comp.ngOnInit();

      expect(comp.institutionCodesSharedCollection).toContain(bankCode);
      expect(comp.channelTypesSharedCollection).toContain(channelType);
      expect(comp.cardBrandTypesSharedCollection).toContain(cardBrandType);
      expect(comp.isoCurrencyCodesSharedCollection).toContain(currencyOfTransaction);
      expect(comp.cardCategoryTypesSharedCollection).toContain(cardIssuerCategory);
      expect(comp.cardAcquiringTransaction).toEqual(cardAcquiringTransaction);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardAcquiringTransaction>>();
      const cardAcquiringTransaction = { id: 123 };
      jest.spyOn(cardAcquiringTransactionFormService, 'getCardAcquiringTransaction').mockReturnValue(cardAcquiringTransaction);
      jest.spyOn(cardAcquiringTransactionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardAcquiringTransaction });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cardAcquiringTransaction }));
      saveSubject.complete();

      // THEN
      expect(cardAcquiringTransactionFormService.getCardAcquiringTransaction).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cardAcquiringTransactionService.update).toHaveBeenCalledWith(expect.objectContaining(cardAcquiringTransaction));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardAcquiringTransaction>>();
      const cardAcquiringTransaction = { id: 123 };
      jest.spyOn(cardAcquiringTransactionFormService, 'getCardAcquiringTransaction').mockReturnValue({ id: null });
      jest.spyOn(cardAcquiringTransactionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardAcquiringTransaction: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cardAcquiringTransaction }));
      saveSubject.complete();

      // THEN
      expect(cardAcquiringTransactionFormService.getCardAcquiringTransaction).toHaveBeenCalled();
      expect(cardAcquiringTransactionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardAcquiringTransaction>>();
      const cardAcquiringTransaction = { id: 123 };
      jest.spyOn(cardAcquiringTransactionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardAcquiringTransaction });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cardAcquiringTransactionService.update).toHaveBeenCalled();
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

    describe('compareChannelType', () => {
      it('Should forward to channelTypeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(channelTypeService, 'compareChannelType');
        comp.compareChannelType(entity, entity2);
        expect(channelTypeService.compareChannelType).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareIsoCurrencyCode', () => {
      it('Should forward to isoCurrencyCodeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(isoCurrencyCodeService, 'compareIsoCurrencyCode');
        comp.compareIsoCurrencyCode(entity, entity2);
        expect(isoCurrencyCodeService.compareIsoCurrencyCode).toHaveBeenCalledWith(entity, entity2);
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
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ExchangeRateFormService } from './exchange-rate-form.service';
import { ExchangeRateService } from '../service/exchange-rate.service';
import { IExchangeRate } from '../exchange-rate.model';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { InstitutionCodeService } from 'app/entities/gdi/institution-code/service/institution-code.service';
import { IIsoCurrencyCode } from 'app/entities/gdi/iso-currency-code/iso-currency-code.model';
import { IsoCurrencyCodeService } from 'app/entities/gdi/iso-currency-code/service/iso-currency-code.service';

import { ExchangeRateUpdateComponent } from './exchange-rate-update.component';

describe('ExchangeRate Management Update Component', () => {
  let comp: ExchangeRateUpdateComponent;
  let fixture: ComponentFixture<ExchangeRateUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let exchangeRateFormService: ExchangeRateFormService;
  let exchangeRateService: ExchangeRateService;
  let institutionCodeService: InstitutionCodeService;
  let isoCurrencyCodeService: IsoCurrencyCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ExchangeRateUpdateComponent],
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
      .overrideTemplate(ExchangeRateUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ExchangeRateUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    exchangeRateFormService = TestBed.inject(ExchangeRateFormService);
    exchangeRateService = TestBed.inject(ExchangeRateService);
    institutionCodeService = TestBed.inject(InstitutionCodeService);
    isoCurrencyCodeService = TestBed.inject(IsoCurrencyCodeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call InstitutionCode query and add missing value', () => {
      const exchangeRate: IExchangeRate = { id: 456 };
      const institutionCode: IInstitutionCode = { id: 16888 };
      exchangeRate.institutionCode = institutionCode;

      const institutionCodeCollection: IInstitutionCode[] = [{ id: 52477 }];
      jest.spyOn(institutionCodeService, 'query').mockReturnValue(of(new HttpResponse({ body: institutionCodeCollection })));
      const additionalInstitutionCodes = [institutionCode];
      const expectedCollection: IInstitutionCode[] = [...additionalInstitutionCodes, ...institutionCodeCollection];
      jest.spyOn(institutionCodeService, 'addInstitutionCodeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ exchangeRate });
      comp.ngOnInit();

      expect(institutionCodeService.query).toHaveBeenCalled();
      expect(institutionCodeService.addInstitutionCodeToCollectionIfMissing).toHaveBeenCalledWith(
        institutionCodeCollection,
        ...additionalInstitutionCodes.map(expect.objectContaining)
      );
      expect(comp.institutionCodesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call IsoCurrencyCode query and add missing value', () => {
      const exchangeRate: IExchangeRate = { id: 456 };
      const currencyCode: IIsoCurrencyCode = { id: 48454 };
      exchangeRate.currencyCode = currencyCode;

      const isoCurrencyCodeCollection: IIsoCurrencyCode[] = [{ id: 54544 }];
      jest.spyOn(isoCurrencyCodeService, 'query').mockReturnValue(of(new HttpResponse({ body: isoCurrencyCodeCollection })));
      const additionalIsoCurrencyCodes = [currencyCode];
      const expectedCollection: IIsoCurrencyCode[] = [...additionalIsoCurrencyCodes, ...isoCurrencyCodeCollection];
      jest.spyOn(isoCurrencyCodeService, 'addIsoCurrencyCodeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ exchangeRate });
      comp.ngOnInit();

      expect(isoCurrencyCodeService.query).toHaveBeenCalled();
      expect(isoCurrencyCodeService.addIsoCurrencyCodeToCollectionIfMissing).toHaveBeenCalledWith(
        isoCurrencyCodeCollection,
        ...additionalIsoCurrencyCodes.map(expect.objectContaining)
      );
      expect(comp.isoCurrencyCodesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const exchangeRate: IExchangeRate = { id: 456 };
      const institutionCode: IInstitutionCode = { id: 15877 };
      exchangeRate.institutionCode = institutionCode;
      const currencyCode: IIsoCurrencyCode = { id: 22253 };
      exchangeRate.currencyCode = currencyCode;

      activatedRoute.data = of({ exchangeRate });
      comp.ngOnInit();

      expect(comp.institutionCodesSharedCollection).toContain(institutionCode);
      expect(comp.isoCurrencyCodesSharedCollection).toContain(currencyCode);
      expect(comp.exchangeRate).toEqual(exchangeRate);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IExchangeRate>>();
      const exchangeRate = { id: 123 };
      jest.spyOn(exchangeRateFormService, 'getExchangeRate').mockReturnValue(exchangeRate);
      jest.spyOn(exchangeRateService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ exchangeRate });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: exchangeRate }));
      saveSubject.complete();

      // THEN
      expect(exchangeRateFormService.getExchangeRate).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(exchangeRateService.update).toHaveBeenCalledWith(expect.objectContaining(exchangeRate));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IExchangeRate>>();
      const exchangeRate = { id: 123 };
      jest.spyOn(exchangeRateFormService, 'getExchangeRate').mockReturnValue({ id: null });
      jest.spyOn(exchangeRateService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ exchangeRate: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: exchangeRate }));
      saveSubject.complete();

      // THEN
      expect(exchangeRateFormService.getExchangeRate).toHaveBeenCalled();
      expect(exchangeRateService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IExchangeRate>>();
      const exchangeRate = { id: 123 };
      jest.spyOn(exchangeRateService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ exchangeRate });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(exchangeRateService.update).toHaveBeenCalled();
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

    describe('compareIsoCurrencyCode', () => {
      it('Should forward to isoCurrencyCodeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(isoCurrencyCodeService, 'compareIsoCurrencyCode');
        comp.compareIsoCurrencyCode(entity, entity2);
        expect(isoCurrencyCodeService.compareIsoCurrencyCode).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});

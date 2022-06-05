jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { WorkProjectRegisterService } from '../service/work-project-register.service';
import { IWorkProjectRegister, WorkProjectRegister } from '../work-project-register.model';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { DealerService } from 'app/entities/dealers/dealer/service/dealer.service';
import { ISettlementCurrency } from 'app/entities/settlement-currency/settlement-currency.model';
import { SettlementCurrencyService } from 'app/entities/settlement-currency/service/settlement-currency.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';

import { WorkProjectRegisterUpdateComponent } from './work-project-register-update.component';

describe('WorkProjectRegister Management Update Component', () => {
  let comp: WorkProjectRegisterUpdateComponent;
  let fixture: ComponentFixture<WorkProjectRegisterUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let workProjectRegisterService: WorkProjectRegisterService;
  let dealerService: DealerService;
  let settlementCurrencyService: SettlementCurrencyService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [WorkProjectRegisterUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(WorkProjectRegisterUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WorkProjectRegisterUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    workProjectRegisterService = TestBed.inject(WorkProjectRegisterService);
    dealerService = TestBed.inject(DealerService);
    settlementCurrencyService = TestBed.inject(SettlementCurrencyService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Dealer query and add missing value', () => {
      const workProjectRegister: IWorkProjectRegister = { id: 456 };
      const dealers: IDealer[] = [{ id: 59475 }];
      workProjectRegister.dealers = dealers;

      const dealerCollection: IDealer[] = [{ id: 39036 }];
      jest.spyOn(dealerService, 'query').mockReturnValue(of(new HttpResponse({ body: dealerCollection })));
      const additionalDealers = [...dealers];
      const expectedCollection: IDealer[] = [...additionalDealers, ...dealerCollection];
      jest.spyOn(dealerService, 'addDealerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workProjectRegister });
      comp.ngOnInit();

      expect(dealerService.query).toHaveBeenCalled();
      expect(dealerService.addDealerToCollectionIfMissing).toHaveBeenCalledWith(dealerCollection, ...additionalDealers);
      expect(comp.dealersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SettlementCurrency query and add missing value', () => {
      const workProjectRegister: IWorkProjectRegister = { id: 456 };
      const settlementCurrency: ISettlementCurrency = { id: 12336 };
      workProjectRegister.settlementCurrency = settlementCurrency;

      const settlementCurrencyCollection: ISettlementCurrency[] = [{ id: 21064 }];
      jest.spyOn(settlementCurrencyService, 'query').mockReturnValue(of(new HttpResponse({ body: settlementCurrencyCollection })));
      const additionalSettlementCurrencies = [settlementCurrency];
      const expectedCollection: ISettlementCurrency[] = [...additionalSettlementCurrencies, ...settlementCurrencyCollection];
      jest.spyOn(settlementCurrencyService, 'addSettlementCurrencyToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workProjectRegister });
      comp.ngOnInit();

      expect(settlementCurrencyService.query).toHaveBeenCalled();
      expect(settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing).toHaveBeenCalledWith(
        settlementCurrencyCollection,
        ...additionalSettlementCurrencies
      );
      expect(comp.settlementCurrenciesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const workProjectRegister: IWorkProjectRegister = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 63089 }];
      workProjectRegister.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 1509 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workProjectRegister });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(placeholderCollection, ...additionalPlaceholders);
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const workProjectRegister: IWorkProjectRegister = { id: 456 };
      const dealers: IDealer = { id: 32359 };
      workProjectRegister.dealers = [dealers];
      const settlementCurrency: ISettlementCurrency = { id: 91030 };
      workProjectRegister.settlementCurrency = settlementCurrency;
      const placeholders: IPlaceholder = { id: 97619 };
      workProjectRegister.placeholders = [placeholders];

      activatedRoute.data = of({ workProjectRegister });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(workProjectRegister));
      expect(comp.dealersSharedCollection).toContain(dealers);
      expect(comp.settlementCurrenciesSharedCollection).toContain(settlementCurrency);
      expect(comp.placeholdersSharedCollection).toContain(placeholders);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<WorkProjectRegister>>();
      const workProjectRegister = { id: 123 };
      jest.spyOn(workProjectRegisterService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workProjectRegister });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: workProjectRegister }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(workProjectRegisterService.update).toHaveBeenCalledWith(workProjectRegister);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<WorkProjectRegister>>();
      const workProjectRegister = new WorkProjectRegister();
      jest.spyOn(workProjectRegisterService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workProjectRegister });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: workProjectRegister }));
      saveSubject.complete();

      // THEN
      expect(workProjectRegisterService.create).toHaveBeenCalledWith(workProjectRegister);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<WorkProjectRegister>>();
      const workProjectRegister = { id: 123 };
      jest.spyOn(workProjectRegisterService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workProjectRegister });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(workProjectRegisterService.update).toHaveBeenCalledWith(workProjectRegister);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackDealerById', () => {
      it('Should return tracked Dealer primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackDealerById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackSettlementCurrencyById', () => {
      it('Should return tracked SettlementCurrency primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackSettlementCurrencyById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackPlaceholderById', () => {
      it('Should return tracked Placeholder primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPlaceholderById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedDealer', () => {
      it('Should return option if no Dealer is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedDealer(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Dealer for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedDealer(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Dealer is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedDealer(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedPlaceholder', () => {
      it('Should return option if no Placeholder is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedPlaceholder(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Placeholder for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedPlaceholder(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Placeholder is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedPlaceholder(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});

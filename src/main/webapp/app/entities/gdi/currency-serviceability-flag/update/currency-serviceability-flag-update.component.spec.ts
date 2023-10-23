import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CurrencyServiceabilityFlagFormService } from './currency-serviceability-flag-form.service';
import { CurrencyServiceabilityFlagService } from '../service/currency-serviceability-flag.service';
import { ICurrencyServiceabilityFlag } from '../currency-serviceability-flag.model';

import { CurrencyServiceabilityFlagUpdateComponent } from './currency-serviceability-flag-update.component';

describe('CurrencyServiceabilityFlag Management Update Component', () => {
  let comp: CurrencyServiceabilityFlagUpdateComponent;
  let fixture: ComponentFixture<CurrencyServiceabilityFlagUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let currencyServiceabilityFlagFormService: CurrencyServiceabilityFlagFormService;
  let currencyServiceabilityFlagService: CurrencyServiceabilityFlagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CurrencyServiceabilityFlagUpdateComponent],
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
      .overrideTemplate(CurrencyServiceabilityFlagUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CurrencyServiceabilityFlagUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    currencyServiceabilityFlagFormService = TestBed.inject(CurrencyServiceabilityFlagFormService);
    currencyServiceabilityFlagService = TestBed.inject(CurrencyServiceabilityFlagService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const currencyServiceabilityFlag: ICurrencyServiceabilityFlag = { id: 456 };

      activatedRoute.data = of({ currencyServiceabilityFlag });
      comp.ngOnInit();

      expect(comp.currencyServiceabilityFlag).toEqual(currencyServiceabilityFlag);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICurrencyServiceabilityFlag>>();
      const currencyServiceabilityFlag = { id: 123 };
      jest.spyOn(currencyServiceabilityFlagFormService, 'getCurrencyServiceabilityFlag').mockReturnValue(currencyServiceabilityFlag);
      jest.spyOn(currencyServiceabilityFlagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ currencyServiceabilityFlag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: currencyServiceabilityFlag }));
      saveSubject.complete();

      // THEN
      expect(currencyServiceabilityFlagFormService.getCurrencyServiceabilityFlag).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(currencyServiceabilityFlagService.update).toHaveBeenCalledWith(expect.objectContaining(currencyServiceabilityFlag));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICurrencyServiceabilityFlag>>();
      const currencyServiceabilityFlag = { id: 123 };
      jest.spyOn(currencyServiceabilityFlagFormService, 'getCurrencyServiceabilityFlag').mockReturnValue({ id: null });
      jest.spyOn(currencyServiceabilityFlagService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ currencyServiceabilityFlag: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: currencyServiceabilityFlag }));
      saveSubject.complete();

      // THEN
      expect(currencyServiceabilityFlagFormService.getCurrencyServiceabilityFlag).toHaveBeenCalled();
      expect(currencyServiceabilityFlagService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICurrencyServiceabilityFlag>>();
      const currencyServiceabilityFlag = { id: 123 };
      jest.spyOn(currencyServiceabilityFlagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ currencyServiceabilityFlag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(currencyServiceabilityFlagService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

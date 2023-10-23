import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CurrencyAuthenticityFlagFormService } from './currency-authenticity-flag-form.service';
import { CurrencyAuthenticityFlagService } from '../service/currency-authenticity-flag.service';
import { ICurrencyAuthenticityFlag } from '../currency-authenticity-flag.model';

import { CurrencyAuthenticityFlagUpdateComponent } from './currency-authenticity-flag-update.component';

describe('CurrencyAuthenticityFlag Management Update Component', () => {
  let comp: CurrencyAuthenticityFlagUpdateComponent;
  let fixture: ComponentFixture<CurrencyAuthenticityFlagUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let currencyAuthenticityFlagFormService: CurrencyAuthenticityFlagFormService;
  let currencyAuthenticityFlagService: CurrencyAuthenticityFlagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CurrencyAuthenticityFlagUpdateComponent],
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
      .overrideTemplate(CurrencyAuthenticityFlagUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CurrencyAuthenticityFlagUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    currencyAuthenticityFlagFormService = TestBed.inject(CurrencyAuthenticityFlagFormService);
    currencyAuthenticityFlagService = TestBed.inject(CurrencyAuthenticityFlagService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const currencyAuthenticityFlag: ICurrencyAuthenticityFlag = { id: 456 };

      activatedRoute.data = of({ currencyAuthenticityFlag });
      comp.ngOnInit();

      expect(comp.currencyAuthenticityFlag).toEqual(currencyAuthenticityFlag);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICurrencyAuthenticityFlag>>();
      const currencyAuthenticityFlag = { id: 123 };
      jest.spyOn(currencyAuthenticityFlagFormService, 'getCurrencyAuthenticityFlag').mockReturnValue(currencyAuthenticityFlag);
      jest.spyOn(currencyAuthenticityFlagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ currencyAuthenticityFlag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: currencyAuthenticityFlag }));
      saveSubject.complete();

      // THEN
      expect(currencyAuthenticityFlagFormService.getCurrencyAuthenticityFlag).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(currencyAuthenticityFlagService.update).toHaveBeenCalledWith(expect.objectContaining(currencyAuthenticityFlag));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICurrencyAuthenticityFlag>>();
      const currencyAuthenticityFlag = { id: 123 };
      jest.spyOn(currencyAuthenticityFlagFormService, 'getCurrencyAuthenticityFlag').mockReturnValue({ id: null });
      jest.spyOn(currencyAuthenticityFlagService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ currencyAuthenticityFlag: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: currencyAuthenticityFlag }));
      saveSubject.complete();

      // THEN
      expect(currencyAuthenticityFlagFormService.getCurrencyAuthenticityFlag).toHaveBeenCalled();
      expect(currencyAuthenticityFlagService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICurrencyAuthenticityFlag>>();
      const currencyAuthenticityFlag = { id: 123 };
      jest.spyOn(currencyAuthenticityFlagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ currencyAuthenticityFlag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(currencyAuthenticityFlagService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IsoCurrencyCodeFormService } from './iso-currency-code-form.service';
import { IsoCurrencyCodeService } from '../service/iso-currency-code.service';
import { IIsoCurrencyCode } from '../iso-currency-code.model';

import { IsoCurrencyCodeUpdateComponent } from './iso-currency-code-update.component';

describe('IsoCurrencyCode Management Update Component', () => {
  let comp: IsoCurrencyCodeUpdateComponent;
  let fixture: ComponentFixture<IsoCurrencyCodeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let isoCurrencyCodeFormService: IsoCurrencyCodeFormService;
  let isoCurrencyCodeService: IsoCurrencyCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [IsoCurrencyCodeUpdateComponent],
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
      .overrideTemplate(IsoCurrencyCodeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(IsoCurrencyCodeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    isoCurrencyCodeFormService = TestBed.inject(IsoCurrencyCodeFormService);
    isoCurrencyCodeService = TestBed.inject(IsoCurrencyCodeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const isoCurrencyCode: IIsoCurrencyCode = { id: 456 };

      activatedRoute.data = of({ isoCurrencyCode });
      comp.ngOnInit();

      expect(comp.isoCurrencyCode).toEqual(isoCurrencyCode);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIsoCurrencyCode>>();
      const isoCurrencyCode = { id: 123 };
      jest.spyOn(isoCurrencyCodeFormService, 'getIsoCurrencyCode').mockReturnValue(isoCurrencyCode);
      jest.spyOn(isoCurrencyCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ isoCurrencyCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: isoCurrencyCode }));
      saveSubject.complete();

      // THEN
      expect(isoCurrencyCodeFormService.getIsoCurrencyCode).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(isoCurrencyCodeService.update).toHaveBeenCalledWith(expect.objectContaining(isoCurrencyCode));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIsoCurrencyCode>>();
      const isoCurrencyCode = { id: 123 };
      jest.spyOn(isoCurrencyCodeFormService, 'getIsoCurrencyCode').mockReturnValue({ id: null });
      jest.spyOn(isoCurrencyCodeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ isoCurrencyCode: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: isoCurrencyCode }));
      saveSubject.complete();

      // THEN
      expect(isoCurrencyCodeFormService.getIsoCurrencyCode).toHaveBeenCalled();
      expect(isoCurrencyCodeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIsoCurrencyCode>>();
      const isoCurrencyCode = { id: 123 };
      jest.spyOn(isoCurrencyCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ isoCurrencyCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(isoCurrencyCodeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

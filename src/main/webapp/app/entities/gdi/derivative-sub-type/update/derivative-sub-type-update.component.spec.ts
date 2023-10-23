import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DerivativeSubTypeFormService } from './derivative-sub-type-form.service';
import { DerivativeSubTypeService } from '../service/derivative-sub-type.service';
import { IDerivativeSubType } from '../derivative-sub-type.model';

import { DerivativeSubTypeUpdateComponent } from './derivative-sub-type-update.component';

describe('DerivativeSubType Management Update Component', () => {
  let comp: DerivativeSubTypeUpdateComponent;
  let fixture: ComponentFixture<DerivativeSubTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let derivativeSubTypeFormService: DerivativeSubTypeFormService;
  let derivativeSubTypeService: DerivativeSubTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DerivativeSubTypeUpdateComponent],
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
      .overrideTemplate(DerivativeSubTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DerivativeSubTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    derivativeSubTypeFormService = TestBed.inject(DerivativeSubTypeFormService);
    derivativeSubTypeService = TestBed.inject(DerivativeSubTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const derivativeSubType: IDerivativeSubType = { id: 456 };

      activatedRoute.data = of({ derivativeSubType });
      comp.ngOnInit();

      expect(comp.derivativeSubType).toEqual(derivativeSubType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDerivativeSubType>>();
      const derivativeSubType = { id: 123 };
      jest.spyOn(derivativeSubTypeFormService, 'getDerivativeSubType').mockReturnValue(derivativeSubType);
      jest.spyOn(derivativeSubTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ derivativeSubType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: derivativeSubType }));
      saveSubject.complete();

      // THEN
      expect(derivativeSubTypeFormService.getDerivativeSubType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(derivativeSubTypeService.update).toHaveBeenCalledWith(expect.objectContaining(derivativeSubType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDerivativeSubType>>();
      const derivativeSubType = { id: 123 };
      jest.spyOn(derivativeSubTypeFormService, 'getDerivativeSubType').mockReturnValue({ id: null });
      jest.spyOn(derivativeSubTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ derivativeSubType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: derivativeSubType }));
      saveSubject.complete();

      // THEN
      expect(derivativeSubTypeFormService.getDerivativeSubType).toHaveBeenCalled();
      expect(derivativeSubTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDerivativeSubType>>();
      const derivativeSubType = { id: 123 };
      jest.spyOn(derivativeSubTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ derivativeSubType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(derivativeSubTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CounterPartyCategoryFormService } from './counter-party-category-form.service';
import { CounterPartyCategoryService } from '../service/counter-party-category.service';
import { ICounterPartyCategory } from '../counter-party-category.model';

import { CounterPartyCategoryUpdateComponent } from './counter-party-category-update.component';

describe('CounterPartyCategory Management Update Component', () => {
  let comp: CounterPartyCategoryUpdateComponent;
  let fixture: ComponentFixture<CounterPartyCategoryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let counterPartyCategoryFormService: CounterPartyCategoryFormService;
  let counterPartyCategoryService: CounterPartyCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CounterPartyCategoryUpdateComponent],
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
      .overrideTemplate(CounterPartyCategoryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CounterPartyCategoryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    counterPartyCategoryFormService = TestBed.inject(CounterPartyCategoryFormService);
    counterPartyCategoryService = TestBed.inject(CounterPartyCategoryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const counterPartyCategory: ICounterPartyCategory = { id: 456 };

      activatedRoute.data = of({ counterPartyCategory });
      comp.ngOnInit();

      expect(comp.counterPartyCategory).toEqual(counterPartyCategory);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICounterPartyCategory>>();
      const counterPartyCategory = { id: 123 };
      jest.spyOn(counterPartyCategoryFormService, 'getCounterPartyCategory').mockReturnValue(counterPartyCategory);
      jest.spyOn(counterPartyCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ counterPartyCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: counterPartyCategory }));
      saveSubject.complete();

      // THEN
      expect(counterPartyCategoryFormService.getCounterPartyCategory).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(counterPartyCategoryService.update).toHaveBeenCalledWith(expect.objectContaining(counterPartyCategory));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICounterPartyCategory>>();
      const counterPartyCategory = { id: 123 };
      jest.spyOn(counterPartyCategoryFormService, 'getCounterPartyCategory').mockReturnValue({ id: null });
      jest.spyOn(counterPartyCategoryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ counterPartyCategory: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: counterPartyCategory }));
      saveSubject.complete();

      // THEN
      expect(counterPartyCategoryFormService.getCounterPartyCategory).toHaveBeenCalled();
      expect(counterPartyCategoryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICounterPartyCategory>>();
      const counterPartyCategory = { id: 123 };
      jest.spyOn(counterPartyCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ counterPartyCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(counterPartyCategoryService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

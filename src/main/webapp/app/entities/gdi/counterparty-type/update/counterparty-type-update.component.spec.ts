import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CounterpartyTypeFormService } from './counterparty-type-form.service';
import { CounterpartyTypeService } from '../service/counterparty-type.service';
import { ICounterpartyType } from '../counterparty-type.model';

import { CounterpartyTypeUpdateComponent } from './counterparty-type-update.component';

describe('CounterpartyType Management Update Component', () => {
  let comp: CounterpartyTypeUpdateComponent;
  let fixture: ComponentFixture<CounterpartyTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let counterpartyTypeFormService: CounterpartyTypeFormService;
  let counterpartyTypeService: CounterpartyTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CounterpartyTypeUpdateComponent],
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
      .overrideTemplate(CounterpartyTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CounterpartyTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    counterpartyTypeFormService = TestBed.inject(CounterpartyTypeFormService);
    counterpartyTypeService = TestBed.inject(CounterpartyTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const counterpartyType: ICounterpartyType = { id: 456 };

      activatedRoute.data = of({ counterpartyType });
      comp.ngOnInit();

      expect(comp.counterpartyType).toEqual(counterpartyType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICounterpartyType>>();
      const counterpartyType = { id: 123 };
      jest.spyOn(counterpartyTypeFormService, 'getCounterpartyType').mockReturnValue(counterpartyType);
      jest.spyOn(counterpartyTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ counterpartyType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: counterpartyType }));
      saveSubject.complete();

      // THEN
      expect(counterpartyTypeFormService.getCounterpartyType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(counterpartyTypeService.update).toHaveBeenCalledWith(expect.objectContaining(counterpartyType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICounterpartyType>>();
      const counterpartyType = { id: 123 };
      jest.spyOn(counterpartyTypeFormService, 'getCounterpartyType').mockReturnValue({ id: null });
      jest.spyOn(counterpartyTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ counterpartyType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: counterpartyType }));
      saveSubject.complete();

      // THEN
      expect(counterpartyTypeFormService.getCounterpartyType).toHaveBeenCalled();
      expect(counterpartyTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICounterpartyType>>();
      const counterpartyType = { id: 123 };
      jest.spyOn(counterpartyTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ counterpartyType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(counterpartyTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

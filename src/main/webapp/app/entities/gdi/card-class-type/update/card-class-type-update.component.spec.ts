import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CardClassTypeFormService } from './card-class-type-form.service';
import { CardClassTypeService } from '../service/card-class-type.service';
import { ICardClassType } from '../card-class-type.model';

import { CardClassTypeUpdateComponent } from './card-class-type-update.component';

describe('CardClassType Management Update Component', () => {
  let comp: CardClassTypeUpdateComponent;
  let fixture: ComponentFixture<CardClassTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cardClassTypeFormService: CardClassTypeFormService;
  let cardClassTypeService: CardClassTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CardClassTypeUpdateComponent],
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
      .overrideTemplate(CardClassTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CardClassTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cardClassTypeFormService = TestBed.inject(CardClassTypeFormService);
    cardClassTypeService = TestBed.inject(CardClassTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cardClassType: ICardClassType = { id: 456 };

      activatedRoute.data = of({ cardClassType });
      comp.ngOnInit();

      expect(comp.cardClassType).toEqual(cardClassType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardClassType>>();
      const cardClassType = { id: 123 };
      jest.spyOn(cardClassTypeFormService, 'getCardClassType').mockReturnValue(cardClassType);
      jest.spyOn(cardClassTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardClassType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cardClassType }));
      saveSubject.complete();

      // THEN
      expect(cardClassTypeFormService.getCardClassType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cardClassTypeService.update).toHaveBeenCalledWith(expect.objectContaining(cardClassType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardClassType>>();
      const cardClassType = { id: 123 };
      jest.spyOn(cardClassTypeFormService, 'getCardClassType').mockReturnValue({ id: null });
      jest.spyOn(cardClassTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardClassType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cardClassType }));
      saveSubject.complete();

      // THEN
      expect(cardClassTypeFormService.getCardClassType).toHaveBeenCalled();
      expect(cardClassTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardClassType>>();
      const cardClassType = { id: 123 };
      jest.spyOn(cardClassTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardClassType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cardClassTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

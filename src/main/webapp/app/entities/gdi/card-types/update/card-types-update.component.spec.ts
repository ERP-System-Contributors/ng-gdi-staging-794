import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CardTypesFormService } from './card-types-form.service';
import { CardTypesService } from '../service/card-types.service';
import { ICardTypes } from '../card-types.model';

import { CardTypesUpdateComponent } from './card-types-update.component';

describe('CardTypes Management Update Component', () => {
  let comp: CardTypesUpdateComponent;
  let fixture: ComponentFixture<CardTypesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cardTypesFormService: CardTypesFormService;
  let cardTypesService: CardTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CardTypesUpdateComponent],
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
      .overrideTemplate(CardTypesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CardTypesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cardTypesFormService = TestBed.inject(CardTypesFormService);
    cardTypesService = TestBed.inject(CardTypesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cardTypes: ICardTypes = { id: 456 };

      activatedRoute.data = of({ cardTypes });
      comp.ngOnInit();

      expect(comp.cardTypes).toEqual(cardTypes);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardTypes>>();
      const cardTypes = { id: 123 };
      jest.spyOn(cardTypesFormService, 'getCardTypes').mockReturnValue(cardTypes);
      jest.spyOn(cardTypesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardTypes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cardTypes }));
      saveSubject.complete();

      // THEN
      expect(cardTypesFormService.getCardTypes).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cardTypesService.update).toHaveBeenCalledWith(expect.objectContaining(cardTypes));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardTypes>>();
      const cardTypes = { id: 123 };
      jest.spyOn(cardTypesFormService, 'getCardTypes').mockReturnValue({ id: null });
      jest.spyOn(cardTypesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardTypes: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cardTypes }));
      saveSubject.complete();

      // THEN
      expect(cardTypesFormService.getCardTypes).toHaveBeenCalled();
      expect(cardTypesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardTypes>>();
      const cardTypes = { id: 123 };
      jest.spyOn(cardTypesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardTypes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cardTypesService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

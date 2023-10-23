import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CardStateFormService } from './card-state-form.service';
import { CardStateService } from '../service/card-state.service';
import { ICardState } from '../card-state.model';

import { CardStateUpdateComponent } from './card-state-update.component';

describe('CardState Management Update Component', () => {
  let comp: CardStateUpdateComponent;
  let fixture: ComponentFixture<CardStateUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cardStateFormService: CardStateFormService;
  let cardStateService: CardStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CardStateUpdateComponent],
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
      .overrideTemplate(CardStateUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CardStateUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cardStateFormService = TestBed.inject(CardStateFormService);
    cardStateService = TestBed.inject(CardStateService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cardState: ICardState = { id: 456 };

      activatedRoute.data = of({ cardState });
      comp.ngOnInit();

      expect(comp.cardState).toEqual(cardState);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardState>>();
      const cardState = { id: 123 };
      jest.spyOn(cardStateFormService, 'getCardState').mockReturnValue(cardState);
      jest.spyOn(cardStateService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardState });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cardState }));
      saveSubject.complete();

      // THEN
      expect(cardStateFormService.getCardState).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cardStateService.update).toHaveBeenCalledWith(expect.objectContaining(cardState));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardState>>();
      const cardState = { id: 123 };
      jest.spyOn(cardStateFormService, 'getCardState').mockReturnValue({ id: null });
      jest.spyOn(cardStateService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardState: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cardState }));
      saveSubject.complete();

      // THEN
      expect(cardStateFormService.getCardState).toHaveBeenCalled();
      expect(cardStateService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardState>>();
      const cardState = { id: 123 };
      jest.spyOn(cardStateService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardState });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cardStateService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

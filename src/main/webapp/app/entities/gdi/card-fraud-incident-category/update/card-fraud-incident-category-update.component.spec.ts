///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CardFraudIncidentCategoryFormService } from './card-fraud-incident-category-form.service';
import { CardFraudIncidentCategoryService } from '../service/card-fraud-incident-category.service';
import { ICardFraudIncidentCategory } from '../card-fraud-incident-category.model';

import { CardFraudIncidentCategoryUpdateComponent } from './card-fraud-incident-category-update.component';

describe('CardFraudIncidentCategory Management Update Component', () => {
  let comp: CardFraudIncidentCategoryUpdateComponent;
  let fixture: ComponentFixture<CardFraudIncidentCategoryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cardFraudIncidentCategoryFormService: CardFraudIncidentCategoryFormService;
  let cardFraudIncidentCategoryService: CardFraudIncidentCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CardFraudIncidentCategoryUpdateComponent],
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
      .overrideTemplate(CardFraudIncidentCategoryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CardFraudIncidentCategoryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cardFraudIncidentCategoryFormService = TestBed.inject(CardFraudIncidentCategoryFormService);
    cardFraudIncidentCategoryService = TestBed.inject(CardFraudIncidentCategoryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cardFraudIncidentCategory: ICardFraudIncidentCategory = { id: 456 };

      activatedRoute.data = of({ cardFraudIncidentCategory });
      comp.ngOnInit();

      expect(comp.cardFraudIncidentCategory).toEqual(cardFraudIncidentCategory);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardFraudIncidentCategory>>();
      const cardFraudIncidentCategory = { id: 123 };
      jest.spyOn(cardFraudIncidentCategoryFormService, 'getCardFraudIncidentCategory').mockReturnValue(cardFraudIncidentCategory);
      jest.spyOn(cardFraudIncidentCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardFraudIncidentCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cardFraudIncidentCategory }));
      saveSubject.complete();

      // THEN
      expect(cardFraudIncidentCategoryFormService.getCardFraudIncidentCategory).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cardFraudIncidentCategoryService.update).toHaveBeenCalledWith(expect.objectContaining(cardFraudIncidentCategory));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardFraudIncidentCategory>>();
      const cardFraudIncidentCategory = { id: 123 };
      jest.spyOn(cardFraudIncidentCategoryFormService, 'getCardFraudIncidentCategory').mockReturnValue({ id: null });
      jest.spyOn(cardFraudIncidentCategoryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardFraudIncidentCategory: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cardFraudIncidentCategory }));
      saveSubject.complete();

      // THEN
      expect(cardFraudIncidentCategoryFormService.getCardFraudIncidentCategory).toHaveBeenCalled();
      expect(cardFraudIncidentCategoryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardFraudIncidentCategory>>();
      const cardFraudIncidentCategory = { id: 123 };
      jest.spyOn(cardFraudIncidentCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardFraudIncidentCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cardFraudIncidentCategoryService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

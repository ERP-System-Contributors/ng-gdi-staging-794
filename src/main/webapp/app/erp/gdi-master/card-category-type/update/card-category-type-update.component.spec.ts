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

import { CardCategoryTypeFormService } from './card-category-type-form.service';
import { CardCategoryTypeService } from '../service/card-category-type.service';
import { ICardCategoryType } from '../card-category-type.model';

import { CardCategoryTypeUpdateComponent } from './card-category-type-update.component';

describe('CardCategoryType Management Update Component', () => {
  let comp: CardCategoryTypeUpdateComponent;
  let fixture: ComponentFixture<CardCategoryTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cardCategoryTypeFormService: CardCategoryTypeFormService;
  let cardCategoryTypeService: CardCategoryTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CardCategoryTypeUpdateComponent],
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
      .overrideTemplate(CardCategoryTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CardCategoryTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cardCategoryTypeFormService = TestBed.inject(CardCategoryTypeFormService);
    cardCategoryTypeService = TestBed.inject(CardCategoryTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cardCategoryType: ICardCategoryType = { id: 456 };

      activatedRoute.data = of({ cardCategoryType });
      comp.ngOnInit();

      expect(comp.cardCategoryType).toEqual(cardCategoryType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardCategoryType>>();
      const cardCategoryType = { id: 123 };
      jest.spyOn(cardCategoryTypeFormService, 'getCardCategoryType').mockReturnValue(cardCategoryType);
      jest.spyOn(cardCategoryTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardCategoryType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cardCategoryType }));
      saveSubject.complete();

      // THEN
      expect(cardCategoryTypeFormService.getCardCategoryType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cardCategoryTypeService.update).toHaveBeenCalledWith(expect.objectContaining(cardCategoryType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardCategoryType>>();
      const cardCategoryType = { id: 123 };
      jest.spyOn(cardCategoryTypeFormService, 'getCardCategoryType').mockReturnValue({ id: null });
      jest.spyOn(cardCategoryTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardCategoryType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cardCategoryType }));
      saveSubject.complete();

      // THEN
      expect(cardCategoryTypeFormService.getCardCategoryType).toHaveBeenCalled();
      expect(cardCategoryTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardCategoryType>>();
      const cardCategoryType = { id: 123 };
      jest.spyOn(cardCategoryTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardCategoryType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cardCategoryTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

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

import { CardBrandTypeFormService } from './card-brand-type-form.service';
import { CardBrandTypeService } from '../service/card-brand-type.service';
import { ICardBrandType } from '../card-brand-type.model';

import { CardBrandTypeUpdateComponent } from './card-brand-type-update.component';

describe('CardBrandType Management Update Component', () => {
  let comp: CardBrandTypeUpdateComponent;
  let fixture: ComponentFixture<CardBrandTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cardBrandTypeFormService: CardBrandTypeFormService;
  let cardBrandTypeService: CardBrandTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CardBrandTypeUpdateComponent],
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
      .overrideTemplate(CardBrandTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CardBrandTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cardBrandTypeFormService = TestBed.inject(CardBrandTypeFormService);
    cardBrandTypeService = TestBed.inject(CardBrandTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cardBrandType: ICardBrandType = { id: 456 };

      activatedRoute.data = of({ cardBrandType });
      comp.ngOnInit();

      expect(comp.cardBrandType).toEqual(cardBrandType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardBrandType>>();
      const cardBrandType = { id: 123 };
      jest.spyOn(cardBrandTypeFormService, 'getCardBrandType').mockReturnValue(cardBrandType);
      jest.spyOn(cardBrandTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardBrandType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cardBrandType }));
      saveSubject.complete();

      // THEN
      expect(cardBrandTypeFormService.getCardBrandType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cardBrandTypeService.update).toHaveBeenCalledWith(expect.objectContaining(cardBrandType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardBrandType>>();
      const cardBrandType = { id: 123 };
      jest.spyOn(cardBrandTypeFormService, 'getCardBrandType').mockReturnValue({ id: null });
      jest.spyOn(cardBrandTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardBrandType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cardBrandType }));
      saveSubject.complete();

      // THEN
      expect(cardBrandTypeFormService.getCardBrandType).toHaveBeenCalled();
      expect(cardBrandTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardBrandType>>();
      const cardBrandType = { id: 123 };
      jest.spyOn(cardBrandTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardBrandType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cardBrandTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

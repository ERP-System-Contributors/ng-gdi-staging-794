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

import { CardChargesFormService } from './card-charges-form.service';
import { CardChargesService } from '../service/card-charges.service';
import { ICardCharges } from '../card-charges.model';

import { CardChargesUpdateComponent } from './card-charges-update.component';

describe('CardCharges Management Update Component', () => {
  let comp: CardChargesUpdateComponent;
  let fixture: ComponentFixture<CardChargesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cardChargesFormService: CardChargesFormService;
  let cardChargesService: CardChargesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CardChargesUpdateComponent],
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
      .overrideTemplate(CardChargesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CardChargesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cardChargesFormService = TestBed.inject(CardChargesFormService);
    cardChargesService = TestBed.inject(CardChargesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cardCharges: ICardCharges = { id: 456 };

      activatedRoute.data = of({ cardCharges });
      comp.ngOnInit();

      expect(comp.cardCharges).toEqual(cardCharges);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardCharges>>();
      const cardCharges = { id: 123 };
      jest.spyOn(cardChargesFormService, 'getCardCharges').mockReturnValue(cardCharges);
      jest.spyOn(cardChargesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardCharges });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cardCharges }));
      saveSubject.complete();

      // THEN
      expect(cardChargesFormService.getCardCharges).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cardChargesService.update).toHaveBeenCalledWith(expect.objectContaining(cardCharges));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardCharges>>();
      const cardCharges = { id: 123 };
      jest.spyOn(cardChargesFormService, 'getCardCharges').mockReturnValue({ id: null });
      jest.spyOn(cardChargesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardCharges: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cardCharges }));
      saveSubject.complete();

      // THEN
      expect(cardChargesFormService.getCardCharges).toHaveBeenCalled();
      expect(cardChargesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardCharges>>();
      const cardCharges = { id: 123 };
      jest.spyOn(cardChargesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardCharges });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cardChargesService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

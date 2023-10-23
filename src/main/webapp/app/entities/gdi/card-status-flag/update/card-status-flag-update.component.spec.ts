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

import { CardStatusFlagFormService } from './card-status-flag-form.service';
import { CardStatusFlagService } from '../service/card-status-flag.service';
import { ICardStatusFlag } from '../card-status-flag.model';

import { CardStatusFlagUpdateComponent } from './card-status-flag-update.component';

describe('CardStatusFlag Management Update Component', () => {
  let comp: CardStatusFlagUpdateComponent;
  let fixture: ComponentFixture<CardStatusFlagUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cardStatusFlagFormService: CardStatusFlagFormService;
  let cardStatusFlagService: CardStatusFlagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CardStatusFlagUpdateComponent],
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
      .overrideTemplate(CardStatusFlagUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CardStatusFlagUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cardStatusFlagFormService = TestBed.inject(CardStatusFlagFormService);
    cardStatusFlagService = TestBed.inject(CardStatusFlagService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cardStatusFlag: ICardStatusFlag = { id: 456 };

      activatedRoute.data = of({ cardStatusFlag });
      comp.ngOnInit();

      expect(comp.cardStatusFlag).toEqual(cardStatusFlag);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardStatusFlag>>();
      const cardStatusFlag = { id: 123 };
      jest.spyOn(cardStatusFlagFormService, 'getCardStatusFlag').mockReturnValue(cardStatusFlag);
      jest.spyOn(cardStatusFlagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardStatusFlag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cardStatusFlag }));
      saveSubject.complete();

      // THEN
      expect(cardStatusFlagFormService.getCardStatusFlag).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cardStatusFlagService.update).toHaveBeenCalledWith(expect.objectContaining(cardStatusFlag));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardStatusFlag>>();
      const cardStatusFlag = { id: 123 };
      jest.spyOn(cardStatusFlagFormService, 'getCardStatusFlag').mockReturnValue({ id: null });
      jest.spyOn(cardStatusFlagService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardStatusFlag: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cardStatusFlag }));
      saveSubject.complete();

      // THEN
      expect(cardStatusFlagFormService.getCardStatusFlag).toHaveBeenCalled();
      expect(cardStatusFlagService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardStatusFlag>>();
      const cardStatusFlag = { id: 123 };
      jest.spyOn(cardStatusFlagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardStatusFlag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cardStatusFlagService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

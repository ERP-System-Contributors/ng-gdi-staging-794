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

import { CardPerformanceFlagFormService } from './card-performance-flag-form.service';
import { CardPerformanceFlagService } from '../service/card-performance-flag.service';
import { ICardPerformanceFlag } from '../card-performance-flag.model';

import { CardPerformanceFlagUpdateComponent } from './card-performance-flag-update.component';

describe('CardPerformanceFlag Management Update Component', () => {
  let comp: CardPerformanceFlagUpdateComponent;
  let fixture: ComponentFixture<CardPerformanceFlagUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cardPerformanceFlagFormService: CardPerformanceFlagFormService;
  let cardPerformanceFlagService: CardPerformanceFlagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CardPerformanceFlagUpdateComponent],
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
      .overrideTemplate(CardPerformanceFlagUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CardPerformanceFlagUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cardPerformanceFlagFormService = TestBed.inject(CardPerformanceFlagFormService);
    cardPerformanceFlagService = TestBed.inject(CardPerformanceFlagService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cardPerformanceFlag: ICardPerformanceFlag = { id: 456 };

      activatedRoute.data = of({ cardPerformanceFlag });
      comp.ngOnInit();

      expect(comp.cardPerformanceFlag).toEqual(cardPerformanceFlag);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardPerformanceFlag>>();
      const cardPerformanceFlag = { id: 123 };
      jest.spyOn(cardPerformanceFlagFormService, 'getCardPerformanceFlag').mockReturnValue(cardPerformanceFlag);
      jest.spyOn(cardPerformanceFlagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardPerformanceFlag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cardPerformanceFlag }));
      saveSubject.complete();

      // THEN
      expect(cardPerformanceFlagFormService.getCardPerformanceFlag).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cardPerformanceFlagService.update).toHaveBeenCalledWith(expect.objectContaining(cardPerformanceFlag));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardPerformanceFlag>>();
      const cardPerformanceFlag = { id: 123 };
      jest.spyOn(cardPerformanceFlagFormService, 'getCardPerformanceFlag').mockReturnValue({ id: null });
      jest.spyOn(cardPerformanceFlagService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardPerformanceFlag: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cardPerformanceFlag }));
      saveSubject.complete();

      // THEN
      expect(cardPerformanceFlagFormService.getCardPerformanceFlag).toHaveBeenCalled();
      expect(cardPerformanceFlagService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICardPerformanceFlag>>();
      const cardPerformanceFlag = { id: 123 };
      jest.spyOn(cardPerformanceFlagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cardPerformanceFlag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cardPerformanceFlagService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

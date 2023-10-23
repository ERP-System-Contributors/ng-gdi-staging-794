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

import { KenyanCurrencyDenominationFormService } from './kenyan-currency-denomination-form.service';
import { KenyanCurrencyDenominationService } from '../service/kenyan-currency-denomination.service';
import { IKenyanCurrencyDenomination } from '../kenyan-currency-denomination.model';

import { KenyanCurrencyDenominationUpdateComponent } from './kenyan-currency-denomination-update.component';

describe('KenyanCurrencyDenomination Management Update Component', () => {
  let comp: KenyanCurrencyDenominationUpdateComponent;
  let fixture: ComponentFixture<KenyanCurrencyDenominationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let kenyanCurrencyDenominationFormService: KenyanCurrencyDenominationFormService;
  let kenyanCurrencyDenominationService: KenyanCurrencyDenominationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [KenyanCurrencyDenominationUpdateComponent],
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
      .overrideTemplate(KenyanCurrencyDenominationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(KenyanCurrencyDenominationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    kenyanCurrencyDenominationFormService = TestBed.inject(KenyanCurrencyDenominationFormService);
    kenyanCurrencyDenominationService = TestBed.inject(KenyanCurrencyDenominationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const kenyanCurrencyDenomination: IKenyanCurrencyDenomination = { id: 456 };

      activatedRoute.data = of({ kenyanCurrencyDenomination });
      comp.ngOnInit();

      expect(comp.kenyanCurrencyDenomination).toEqual(kenyanCurrencyDenomination);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKenyanCurrencyDenomination>>();
      const kenyanCurrencyDenomination = { id: 123 };
      jest.spyOn(kenyanCurrencyDenominationFormService, 'getKenyanCurrencyDenomination').mockReturnValue(kenyanCurrencyDenomination);
      jest.spyOn(kenyanCurrencyDenominationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ kenyanCurrencyDenomination });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: kenyanCurrencyDenomination }));
      saveSubject.complete();

      // THEN
      expect(kenyanCurrencyDenominationFormService.getKenyanCurrencyDenomination).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(kenyanCurrencyDenominationService.update).toHaveBeenCalledWith(expect.objectContaining(kenyanCurrencyDenomination));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKenyanCurrencyDenomination>>();
      const kenyanCurrencyDenomination = { id: 123 };
      jest.spyOn(kenyanCurrencyDenominationFormService, 'getKenyanCurrencyDenomination').mockReturnValue({ id: null });
      jest.spyOn(kenyanCurrencyDenominationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ kenyanCurrencyDenomination: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: kenyanCurrencyDenomination }));
      saveSubject.complete();

      // THEN
      expect(kenyanCurrencyDenominationFormService.getKenyanCurrencyDenomination).toHaveBeenCalled();
      expect(kenyanCurrencyDenominationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKenyanCurrencyDenomination>>();
      const kenyanCurrencyDenomination = { id: 123 };
      jest.spyOn(kenyanCurrencyDenominationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ kenyanCurrencyDenomination });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(kenyanCurrencyDenominationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

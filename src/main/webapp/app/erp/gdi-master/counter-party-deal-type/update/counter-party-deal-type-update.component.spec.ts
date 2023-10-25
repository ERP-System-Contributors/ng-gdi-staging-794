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

import { CounterPartyDealTypeFormService } from './counter-party-deal-type-form.service';
import { CounterPartyDealTypeService } from '../service/counter-party-deal-type.service';
import { ICounterPartyDealType } from '../counter-party-deal-type.model';

import { CounterPartyDealTypeUpdateComponent } from './counter-party-deal-type-update.component';

describe('CounterPartyDealType Management Update Component', () => {
  let comp: CounterPartyDealTypeUpdateComponent;
  let fixture: ComponentFixture<CounterPartyDealTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let counterPartyDealTypeFormService: CounterPartyDealTypeFormService;
  let counterPartyDealTypeService: CounterPartyDealTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CounterPartyDealTypeUpdateComponent],
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
      .overrideTemplate(CounterPartyDealTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CounterPartyDealTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    counterPartyDealTypeFormService = TestBed.inject(CounterPartyDealTypeFormService);
    counterPartyDealTypeService = TestBed.inject(CounterPartyDealTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const counterPartyDealType: ICounterPartyDealType = { id: 456 };

      activatedRoute.data = of({ counterPartyDealType });
      comp.ngOnInit();

      expect(comp.counterPartyDealType).toEqual(counterPartyDealType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICounterPartyDealType>>();
      const counterPartyDealType = { id: 123 };
      jest.spyOn(counterPartyDealTypeFormService, 'getCounterPartyDealType').mockReturnValue(counterPartyDealType);
      jest.spyOn(counterPartyDealTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ counterPartyDealType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: counterPartyDealType }));
      saveSubject.complete();

      // THEN
      expect(counterPartyDealTypeFormService.getCounterPartyDealType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(counterPartyDealTypeService.update).toHaveBeenCalledWith(expect.objectContaining(counterPartyDealType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICounterPartyDealType>>();
      const counterPartyDealType = { id: 123 };
      jest.spyOn(counterPartyDealTypeFormService, 'getCounterPartyDealType').mockReturnValue({ id: null });
      jest.spyOn(counterPartyDealTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ counterPartyDealType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: counterPartyDealType }));
      saveSubject.complete();

      // THEN
      expect(counterPartyDealTypeFormService.getCounterPartyDealType).toHaveBeenCalled();
      expect(counterPartyDealTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICounterPartyDealType>>();
      const counterPartyDealType = { id: 123 };
      jest.spyOn(counterPartyDealTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ counterPartyDealType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(counterPartyDealTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

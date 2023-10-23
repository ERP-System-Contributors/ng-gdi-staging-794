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

import { ReasonsForBouncedChequeFormService } from './reasons-for-bounced-cheque-form.service';
import { ReasonsForBouncedChequeService } from '../service/reasons-for-bounced-cheque.service';
import { IReasonsForBouncedCheque } from '../reasons-for-bounced-cheque.model';

import { ReasonsForBouncedChequeUpdateComponent } from './reasons-for-bounced-cheque-update.component';

describe('ReasonsForBouncedCheque Management Update Component', () => {
  let comp: ReasonsForBouncedChequeUpdateComponent;
  let fixture: ComponentFixture<ReasonsForBouncedChequeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let reasonsForBouncedChequeFormService: ReasonsForBouncedChequeFormService;
  let reasonsForBouncedChequeService: ReasonsForBouncedChequeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ReasonsForBouncedChequeUpdateComponent],
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
      .overrideTemplate(ReasonsForBouncedChequeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReasonsForBouncedChequeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    reasonsForBouncedChequeFormService = TestBed.inject(ReasonsForBouncedChequeFormService);
    reasonsForBouncedChequeService = TestBed.inject(ReasonsForBouncedChequeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const reasonsForBouncedCheque: IReasonsForBouncedCheque = { id: 456 };

      activatedRoute.data = of({ reasonsForBouncedCheque });
      comp.ngOnInit();

      expect(comp.reasonsForBouncedCheque).toEqual(reasonsForBouncedCheque);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReasonsForBouncedCheque>>();
      const reasonsForBouncedCheque = { id: 123 };
      jest.spyOn(reasonsForBouncedChequeFormService, 'getReasonsForBouncedCheque').mockReturnValue(reasonsForBouncedCheque);
      jest.spyOn(reasonsForBouncedChequeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reasonsForBouncedCheque });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reasonsForBouncedCheque }));
      saveSubject.complete();

      // THEN
      expect(reasonsForBouncedChequeFormService.getReasonsForBouncedCheque).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(reasonsForBouncedChequeService.update).toHaveBeenCalledWith(expect.objectContaining(reasonsForBouncedCheque));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReasonsForBouncedCheque>>();
      const reasonsForBouncedCheque = { id: 123 };
      jest.spyOn(reasonsForBouncedChequeFormService, 'getReasonsForBouncedCheque').mockReturnValue({ id: null });
      jest.spyOn(reasonsForBouncedChequeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reasonsForBouncedCheque: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reasonsForBouncedCheque }));
      saveSubject.complete();

      // THEN
      expect(reasonsForBouncedChequeFormService.getReasonsForBouncedCheque).toHaveBeenCalled();
      expect(reasonsForBouncedChequeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReasonsForBouncedCheque>>();
      const reasonsForBouncedCheque = { id: 123 };
      jest.spyOn(reasonsForBouncedChequeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reasonsForBouncedCheque });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(reasonsForBouncedChequeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

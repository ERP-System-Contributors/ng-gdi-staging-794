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

import { FxTransactionTypeFormService } from './fx-transaction-type-form.service';
import { FxTransactionTypeService } from '../service/fx-transaction-type.service';
import { IFxTransactionType } from '../fx-transaction-type.model';

import { FxTransactionTypeUpdateComponent } from './fx-transaction-type-update.component';

describe('FxTransactionType Management Update Component', () => {
  let comp: FxTransactionTypeUpdateComponent;
  let fixture: ComponentFixture<FxTransactionTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fxTransactionTypeFormService: FxTransactionTypeFormService;
  let fxTransactionTypeService: FxTransactionTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FxTransactionTypeUpdateComponent],
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
      .overrideTemplate(FxTransactionTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FxTransactionTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fxTransactionTypeFormService = TestBed.inject(FxTransactionTypeFormService);
    fxTransactionTypeService = TestBed.inject(FxTransactionTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const fxTransactionType: IFxTransactionType = { id: 456 };

      activatedRoute.data = of({ fxTransactionType });
      comp.ngOnInit();

      expect(comp.fxTransactionType).toEqual(fxTransactionType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFxTransactionType>>();
      const fxTransactionType = { id: 123 };
      jest.spyOn(fxTransactionTypeFormService, 'getFxTransactionType').mockReturnValue(fxTransactionType);
      jest.spyOn(fxTransactionTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fxTransactionType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fxTransactionType }));
      saveSubject.complete();

      // THEN
      expect(fxTransactionTypeFormService.getFxTransactionType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fxTransactionTypeService.update).toHaveBeenCalledWith(expect.objectContaining(fxTransactionType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFxTransactionType>>();
      const fxTransactionType = { id: 123 };
      jest.spyOn(fxTransactionTypeFormService, 'getFxTransactionType').mockReturnValue({ id: null });
      jest.spyOn(fxTransactionTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fxTransactionType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fxTransactionType }));
      saveSubject.complete();

      // THEN
      expect(fxTransactionTypeFormService.getFxTransactionType).toHaveBeenCalled();
      expect(fxTransactionTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFxTransactionType>>();
      const fxTransactionType = { id: 123 };
      jest.spyOn(fxTransactionTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fxTransactionType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fxTransactionTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

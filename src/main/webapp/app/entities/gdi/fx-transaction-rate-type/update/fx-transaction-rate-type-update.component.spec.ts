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

import { FxTransactionRateTypeFormService } from './fx-transaction-rate-type-form.service';
import { FxTransactionRateTypeService } from '../service/fx-transaction-rate-type.service';
import { IFxTransactionRateType } from '../fx-transaction-rate-type.model';

import { FxTransactionRateTypeUpdateComponent } from './fx-transaction-rate-type-update.component';

describe('FxTransactionRateType Management Update Component', () => {
  let comp: FxTransactionRateTypeUpdateComponent;
  let fixture: ComponentFixture<FxTransactionRateTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fxTransactionRateTypeFormService: FxTransactionRateTypeFormService;
  let fxTransactionRateTypeService: FxTransactionRateTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FxTransactionRateTypeUpdateComponent],
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
      .overrideTemplate(FxTransactionRateTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FxTransactionRateTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fxTransactionRateTypeFormService = TestBed.inject(FxTransactionRateTypeFormService);
    fxTransactionRateTypeService = TestBed.inject(FxTransactionRateTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const fxTransactionRateType: IFxTransactionRateType = { id: 456 };

      activatedRoute.data = of({ fxTransactionRateType });
      comp.ngOnInit();

      expect(comp.fxTransactionRateType).toEqual(fxTransactionRateType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFxTransactionRateType>>();
      const fxTransactionRateType = { id: 123 };
      jest.spyOn(fxTransactionRateTypeFormService, 'getFxTransactionRateType').mockReturnValue(fxTransactionRateType);
      jest.spyOn(fxTransactionRateTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fxTransactionRateType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fxTransactionRateType }));
      saveSubject.complete();

      // THEN
      expect(fxTransactionRateTypeFormService.getFxTransactionRateType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fxTransactionRateTypeService.update).toHaveBeenCalledWith(expect.objectContaining(fxTransactionRateType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFxTransactionRateType>>();
      const fxTransactionRateType = { id: 123 };
      jest.spyOn(fxTransactionRateTypeFormService, 'getFxTransactionRateType').mockReturnValue({ id: null });
      jest.spyOn(fxTransactionRateTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fxTransactionRateType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fxTransactionRateType }));
      saveSubject.complete();

      // THEN
      expect(fxTransactionRateTypeFormService.getFxTransactionRateType).toHaveBeenCalled();
      expect(fxTransactionRateTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFxTransactionRateType>>();
      const fxTransactionRateType = { id: 123 };
      jest.spyOn(fxTransactionRateTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fxTransactionRateType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fxTransactionRateTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

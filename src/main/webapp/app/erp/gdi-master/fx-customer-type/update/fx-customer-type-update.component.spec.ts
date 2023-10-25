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

import { FxCustomerTypeFormService } from './fx-customer-type-form.service';
import { FxCustomerTypeService } from '../service/fx-customer-type.service';
import { IFxCustomerType } from '../fx-customer-type.model';

import { FxCustomerTypeUpdateComponent } from './fx-customer-type-update.component';

describe('FxCustomerType Management Update Component', () => {
  let comp: FxCustomerTypeUpdateComponent;
  let fixture: ComponentFixture<FxCustomerTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fxCustomerTypeFormService: FxCustomerTypeFormService;
  let fxCustomerTypeService: FxCustomerTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FxCustomerTypeUpdateComponent],
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
      .overrideTemplate(FxCustomerTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FxCustomerTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fxCustomerTypeFormService = TestBed.inject(FxCustomerTypeFormService);
    fxCustomerTypeService = TestBed.inject(FxCustomerTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const fxCustomerType: IFxCustomerType = { id: 456 };

      activatedRoute.data = of({ fxCustomerType });
      comp.ngOnInit();

      expect(comp.fxCustomerType).toEqual(fxCustomerType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFxCustomerType>>();
      const fxCustomerType = { id: 123 };
      jest.spyOn(fxCustomerTypeFormService, 'getFxCustomerType').mockReturnValue(fxCustomerType);
      jest.spyOn(fxCustomerTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fxCustomerType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fxCustomerType }));
      saveSubject.complete();

      // THEN
      expect(fxCustomerTypeFormService.getFxCustomerType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fxCustomerTypeService.update).toHaveBeenCalledWith(expect.objectContaining(fxCustomerType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFxCustomerType>>();
      const fxCustomerType = { id: 123 };
      jest.spyOn(fxCustomerTypeFormService, 'getFxCustomerType').mockReturnValue({ id: null });
      jest.spyOn(fxCustomerTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fxCustomerType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fxCustomerType }));
      saveSubject.complete();

      // THEN
      expect(fxCustomerTypeFormService.getFxCustomerType).toHaveBeenCalled();
      expect(fxCustomerTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFxCustomerType>>();
      const fxCustomerType = { id: 123 };
      jest.spyOn(fxCustomerTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fxCustomerType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fxCustomerTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

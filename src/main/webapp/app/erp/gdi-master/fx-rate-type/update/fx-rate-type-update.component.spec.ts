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

import { FxRateTypeFormService } from './fx-rate-type-form.service';
import { FxRateTypeService } from '../service/fx-rate-type.service';
import { IFxRateType } from '../fx-rate-type.model';

import { FxRateTypeUpdateComponent } from './fx-rate-type-update.component';

describe('FxRateType Management Update Component', () => {
  let comp: FxRateTypeUpdateComponent;
  let fixture: ComponentFixture<FxRateTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fxRateTypeFormService: FxRateTypeFormService;
  let fxRateTypeService: FxRateTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FxRateTypeUpdateComponent],
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
      .overrideTemplate(FxRateTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FxRateTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fxRateTypeFormService = TestBed.inject(FxRateTypeFormService);
    fxRateTypeService = TestBed.inject(FxRateTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const fxRateType: IFxRateType = { id: 456 };

      activatedRoute.data = of({ fxRateType });
      comp.ngOnInit();

      expect(comp.fxRateType).toEqual(fxRateType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFxRateType>>();
      const fxRateType = { id: 123 };
      jest.spyOn(fxRateTypeFormService, 'getFxRateType').mockReturnValue(fxRateType);
      jest.spyOn(fxRateTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fxRateType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fxRateType }));
      saveSubject.complete();

      // THEN
      expect(fxRateTypeFormService.getFxRateType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fxRateTypeService.update).toHaveBeenCalledWith(expect.objectContaining(fxRateType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFxRateType>>();
      const fxRateType = { id: 123 };
      jest.spyOn(fxRateTypeFormService, 'getFxRateType').mockReturnValue({ id: null });
      jest.spyOn(fxRateTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fxRateType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fxRateType }));
      saveSubject.complete();

      // THEN
      expect(fxRateTypeFormService.getFxRateType).toHaveBeenCalled();
      expect(fxRateTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFxRateType>>();
      const fxRateType = { id: 123 };
      jest.spyOn(fxRateTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fxRateType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fxRateTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

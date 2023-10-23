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

import { CrbProductServiceFeeTypeFormService } from './crb-product-service-fee-type-form.service';
import { CrbProductServiceFeeTypeService } from '../service/crb-product-service-fee-type.service';
import { ICrbProductServiceFeeType } from '../crb-product-service-fee-type.model';

import { CrbProductServiceFeeTypeUpdateComponent } from './crb-product-service-fee-type-update.component';

describe('CrbProductServiceFeeType Management Update Component', () => {
  let comp: CrbProductServiceFeeTypeUpdateComponent;
  let fixture: ComponentFixture<CrbProductServiceFeeTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crbProductServiceFeeTypeFormService: CrbProductServiceFeeTypeFormService;
  let crbProductServiceFeeTypeService: CrbProductServiceFeeTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrbProductServiceFeeTypeUpdateComponent],
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
      .overrideTemplate(CrbProductServiceFeeTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrbProductServiceFeeTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crbProductServiceFeeTypeFormService = TestBed.inject(CrbProductServiceFeeTypeFormService);
    crbProductServiceFeeTypeService = TestBed.inject(CrbProductServiceFeeTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crbProductServiceFeeType: ICrbProductServiceFeeType = { id: 456 };

      activatedRoute.data = of({ crbProductServiceFeeType });
      comp.ngOnInit();

      expect(comp.crbProductServiceFeeType).toEqual(crbProductServiceFeeType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbProductServiceFeeType>>();
      const crbProductServiceFeeType = { id: 123 };
      jest.spyOn(crbProductServiceFeeTypeFormService, 'getCrbProductServiceFeeType').mockReturnValue(crbProductServiceFeeType);
      jest.spyOn(crbProductServiceFeeTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbProductServiceFeeType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbProductServiceFeeType }));
      saveSubject.complete();

      // THEN
      expect(crbProductServiceFeeTypeFormService.getCrbProductServiceFeeType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crbProductServiceFeeTypeService.update).toHaveBeenCalledWith(expect.objectContaining(crbProductServiceFeeType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbProductServiceFeeType>>();
      const crbProductServiceFeeType = { id: 123 };
      jest.spyOn(crbProductServiceFeeTypeFormService, 'getCrbProductServiceFeeType').mockReturnValue({ id: null });
      jest.spyOn(crbProductServiceFeeTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbProductServiceFeeType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbProductServiceFeeType }));
      saveSubject.complete();

      // THEN
      expect(crbProductServiceFeeTypeFormService.getCrbProductServiceFeeType).toHaveBeenCalled();
      expect(crbProductServiceFeeTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbProductServiceFeeType>>();
      const crbProductServiceFeeType = { id: 123 };
      jest.spyOn(crbProductServiceFeeTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbProductServiceFeeType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crbProductServiceFeeTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

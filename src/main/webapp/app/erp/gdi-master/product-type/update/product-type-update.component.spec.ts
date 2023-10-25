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

import { ProductTypeFormService } from './product-type-form.service';
import { ProductTypeService } from '../service/product-type.service';
import { IProductType } from '../product-type.model';

import { ProductTypeUpdateComponent } from './product-type-update.component';

describe('ProductType Management Update Component', () => {
  let comp: ProductTypeUpdateComponent;
  let fixture: ComponentFixture<ProductTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let productTypeFormService: ProductTypeFormService;
  let productTypeService: ProductTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ProductTypeUpdateComponent],
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
      .overrideTemplate(ProductTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProductTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    productTypeFormService = TestBed.inject(ProductTypeFormService);
    productTypeService = TestBed.inject(ProductTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const productType: IProductType = { id: 456 };

      activatedRoute.data = of({ productType });
      comp.ngOnInit();

      expect(comp.productType).toEqual(productType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProductType>>();
      const productType = { id: 123 };
      jest.spyOn(productTypeFormService, 'getProductType').mockReturnValue(productType);
      jest.spyOn(productTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ productType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: productType }));
      saveSubject.complete();

      // THEN
      expect(productTypeFormService.getProductType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(productTypeService.update).toHaveBeenCalledWith(expect.objectContaining(productType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProductType>>();
      const productType = { id: 123 };
      jest.spyOn(productTypeFormService, 'getProductType').mockReturnValue({ id: null });
      jest.spyOn(productTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ productType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: productType }));
      saveSubject.complete();

      // THEN
      expect(productTypeFormService.getProductType).toHaveBeenCalled();
      expect(productTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProductType>>();
      const productType = { id: 123 };
      jest.spyOn(productTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ productType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(productTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

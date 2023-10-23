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

import { CustomerTypeFormService } from './customer-type-form.service';
import { CustomerTypeService } from '../service/customer-type.service';
import { ICustomerType } from '../customer-type.model';

import { CustomerTypeUpdateComponent } from './customer-type-update.component';

describe('CustomerType Management Update Component', () => {
  let comp: CustomerTypeUpdateComponent;
  let fixture: ComponentFixture<CustomerTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let customerTypeFormService: CustomerTypeFormService;
  let customerTypeService: CustomerTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CustomerTypeUpdateComponent],
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
      .overrideTemplate(CustomerTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CustomerTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    customerTypeFormService = TestBed.inject(CustomerTypeFormService);
    customerTypeService = TestBed.inject(CustomerTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const customerType: ICustomerType = { id: 456 };

      activatedRoute.data = of({ customerType });
      comp.ngOnInit();

      expect(comp.customerType).toEqual(customerType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomerType>>();
      const customerType = { id: 123 };
      jest.spyOn(customerTypeFormService, 'getCustomerType').mockReturnValue(customerType);
      jest.spyOn(customerTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customerType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: customerType }));
      saveSubject.complete();

      // THEN
      expect(customerTypeFormService.getCustomerType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(customerTypeService.update).toHaveBeenCalledWith(expect.objectContaining(customerType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomerType>>();
      const customerType = { id: 123 };
      jest.spyOn(customerTypeFormService, 'getCustomerType').mockReturnValue({ id: null });
      jest.spyOn(customerTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customerType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: customerType }));
      saveSubject.complete();

      // THEN
      expect(customerTypeFormService.getCustomerType).toHaveBeenCalled();
      expect(customerTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomerType>>();
      const customerType = { id: 123 };
      jest.spyOn(customerTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customerType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(customerTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

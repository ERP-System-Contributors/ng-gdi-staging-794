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

import { MerchantTypeFormService } from './merchant-type-form.service';
import { MerchantTypeService } from '../service/merchant-type.service';
import { IMerchantType } from '../merchant-type.model';

import { MerchantTypeUpdateComponent } from './merchant-type-update.component';

describe('MerchantType Management Update Component', () => {
  let comp: MerchantTypeUpdateComponent;
  let fixture: ComponentFixture<MerchantTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let merchantTypeFormService: MerchantTypeFormService;
  let merchantTypeService: MerchantTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MerchantTypeUpdateComponent],
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
      .overrideTemplate(MerchantTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MerchantTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    merchantTypeFormService = TestBed.inject(MerchantTypeFormService);
    merchantTypeService = TestBed.inject(MerchantTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const merchantType: IMerchantType = { id: 456 };

      activatedRoute.data = of({ merchantType });
      comp.ngOnInit();

      expect(comp.merchantType).toEqual(merchantType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMerchantType>>();
      const merchantType = { id: 123 };
      jest.spyOn(merchantTypeFormService, 'getMerchantType').mockReturnValue(merchantType);
      jest.spyOn(merchantTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ merchantType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: merchantType }));
      saveSubject.complete();

      // THEN
      expect(merchantTypeFormService.getMerchantType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(merchantTypeService.update).toHaveBeenCalledWith(expect.objectContaining(merchantType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMerchantType>>();
      const merchantType = { id: 123 };
      jest.spyOn(merchantTypeFormService, 'getMerchantType').mockReturnValue({ id: null });
      jest.spyOn(merchantTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ merchantType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: merchantType }));
      saveSubject.complete();

      // THEN
      expect(merchantTypeFormService.getMerchantType).toHaveBeenCalled();
      expect(merchantTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMerchantType>>();
      const merchantType = { id: 123 };
      jest.spyOn(merchantTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ merchantType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(merchantTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

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

import { SecurityTypeFormService } from './security-type-form.service';
import { SecurityTypeService } from '../service/security-type.service';
import { ISecurityType } from '../security-type.model';

import { SecurityTypeUpdateComponent } from './security-type-update.component';

describe('SecurityType Management Update Component', () => {
  let comp: SecurityTypeUpdateComponent;
  let fixture: ComponentFixture<SecurityTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let securityTypeFormService: SecurityTypeFormService;
  let securityTypeService: SecurityTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SecurityTypeUpdateComponent],
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
      .overrideTemplate(SecurityTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SecurityTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    securityTypeFormService = TestBed.inject(SecurityTypeFormService);
    securityTypeService = TestBed.inject(SecurityTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const securityType: ISecurityType = { id: 456 };

      activatedRoute.data = of({ securityType });
      comp.ngOnInit();

      expect(comp.securityType).toEqual(securityType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISecurityType>>();
      const securityType = { id: 123 };
      jest.spyOn(securityTypeFormService, 'getSecurityType').mockReturnValue(securityType);
      jest.spyOn(securityTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ securityType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: securityType }));
      saveSubject.complete();

      // THEN
      expect(securityTypeFormService.getSecurityType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(securityTypeService.update).toHaveBeenCalledWith(expect.objectContaining(securityType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISecurityType>>();
      const securityType = { id: 123 };
      jest.spyOn(securityTypeFormService, 'getSecurityType').mockReturnValue({ id: null });
      jest.spyOn(securityTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ securityType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: securityType }));
      saveSubject.complete();

      // THEN
      expect(securityTypeFormService.getSecurityType).toHaveBeenCalled();
      expect(securityTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISecurityType>>();
      const securityType = { id: 123 };
      jest.spyOn(securityTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ securityType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(securityTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

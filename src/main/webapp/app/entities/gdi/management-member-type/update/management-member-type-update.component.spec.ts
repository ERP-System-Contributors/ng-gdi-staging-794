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

import { ManagementMemberTypeFormService } from './management-member-type-form.service';
import { ManagementMemberTypeService } from '../service/management-member-type.service';
import { IManagementMemberType } from '../management-member-type.model';

import { ManagementMemberTypeUpdateComponent } from './management-member-type-update.component';

describe('ManagementMemberType Management Update Component', () => {
  let comp: ManagementMemberTypeUpdateComponent;
  let fixture: ComponentFixture<ManagementMemberTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let managementMemberTypeFormService: ManagementMemberTypeFormService;
  let managementMemberTypeService: ManagementMemberTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ManagementMemberTypeUpdateComponent],
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
      .overrideTemplate(ManagementMemberTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ManagementMemberTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    managementMemberTypeFormService = TestBed.inject(ManagementMemberTypeFormService);
    managementMemberTypeService = TestBed.inject(ManagementMemberTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const managementMemberType: IManagementMemberType = { id: 456 };

      activatedRoute.data = of({ managementMemberType });
      comp.ngOnInit();

      expect(comp.managementMemberType).toEqual(managementMemberType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IManagementMemberType>>();
      const managementMemberType = { id: 123 };
      jest.spyOn(managementMemberTypeFormService, 'getManagementMemberType').mockReturnValue(managementMemberType);
      jest.spyOn(managementMemberTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ managementMemberType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: managementMemberType }));
      saveSubject.complete();

      // THEN
      expect(managementMemberTypeFormService.getManagementMemberType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(managementMemberTypeService.update).toHaveBeenCalledWith(expect.objectContaining(managementMemberType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IManagementMemberType>>();
      const managementMemberType = { id: 123 };
      jest.spyOn(managementMemberTypeFormService, 'getManagementMemberType').mockReturnValue({ id: null });
      jest.spyOn(managementMemberTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ managementMemberType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: managementMemberType }));
      saveSubject.complete();

      // THEN
      expect(managementMemberTypeFormService.getManagementMemberType).toHaveBeenCalled();
      expect(managementMemberTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IManagementMemberType>>();
      const managementMemberType = { id: 123 };
      jest.spyOn(managementMemberTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ managementMemberType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(managementMemberTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

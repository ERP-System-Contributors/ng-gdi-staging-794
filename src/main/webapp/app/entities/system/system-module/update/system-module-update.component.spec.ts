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

import { SystemModuleFormService } from './system-module-form.service';
import { SystemModuleService } from '../service/system-module.service';
import { ISystemModule } from '../system-module.model';

import { SystemModuleUpdateComponent } from './system-module-update.component';

describe('SystemModule Management Update Component', () => {
  let comp: SystemModuleUpdateComponent;
  let fixture: ComponentFixture<SystemModuleUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let systemModuleFormService: SystemModuleFormService;
  let systemModuleService: SystemModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SystemModuleUpdateComponent],
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
      .overrideTemplate(SystemModuleUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SystemModuleUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    systemModuleFormService = TestBed.inject(SystemModuleFormService);
    systemModuleService = TestBed.inject(SystemModuleService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const systemModule: ISystemModule = { id: 456 };

      activatedRoute.data = of({ systemModule });
      comp.ngOnInit();

      expect(comp.systemModule).toEqual(systemModule);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISystemModule>>();
      const systemModule = { id: 123 };
      jest.spyOn(systemModuleFormService, 'getSystemModule').mockReturnValue(systemModule);
      jest.spyOn(systemModuleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ systemModule });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: systemModule }));
      saveSubject.complete();

      // THEN
      expect(systemModuleFormService.getSystemModule).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(systemModuleService.update).toHaveBeenCalledWith(expect.objectContaining(systemModule));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISystemModule>>();
      const systemModule = { id: 123 };
      jest.spyOn(systemModuleFormService, 'getSystemModule').mockReturnValue({ id: null });
      jest.spyOn(systemModuleService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ systemModule: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: systemModule }));
      saveSubject.complete();

      // THEN
      expect(systemModuleFormService.getSystemModule).toHaveBeenCalled();
      expect(systemModuleService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISystemModule>>();
      const systemModule = { id: 123 };
      jest.spyOn(systemModuleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ systemModule });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(systemModuleService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

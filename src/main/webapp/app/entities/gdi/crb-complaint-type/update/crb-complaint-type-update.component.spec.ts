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

import { CrbComplaintTypeFormService } from './crb-complaint-type-form.service';
import { CrbComplaintTypeService } from '../service/crb-complaint-type.service';
import { ICrbComplaintType } from '../crb-complaint-type.model';

import { CrbComplaintTypeUpdateComponent } from './crb-complaint-type-update.component';

describe('CrbComplaintType Management Update Component', () => {
  let comp: CrbComplaintTypeUpdateComponent;
  let fixture: ComponentFixture<CrbComplaintTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crbComplaintTypeFormService: CrbComplaintTypeFormService;
  let crbComplaintTypeService: CrbComplaintTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrbComplaintTypeUpdateComponent],
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
      .overrideTemplate(CrbComplaintTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrbComplaintTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crbComplaintTypeFormService = TestBed.inject(CrbComplaintTypeFormService);
    crbComplaintTypeService = TestBed.inject(CrbComplaintTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crbComplaintType: ICrbComplaintType = { id: 456 };

      activatedRoute.data = of({ crbComplaintType });
      comp.ngOnInit();

      expect(comp.crbComplaintType).toEqual(crbComplaintType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbComplaintType>>();
      const crbComplaintType = { id: 123 };
      jest.spyOn(crbComplaintTypeFormService, 'getCrbComplaintType').mockReturnValue(crbComplaintType);
      jest.spyOn(crbComplaintTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbComplaintType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbComplaintType }));
      saveSubject.complete();

      // THEN
      expect(crbComplaintTypeFormService.getCrbComplaintType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crbComplaintTypeService.update).toHaveBeenCalledWith(expect.objectContaining(crbComplaintType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbComplaintType>>();
      const crbComplaintType = { id: 123 };
      jest.spyOn(crbComplaintTypeFormService, 'getCrbComplaintType').mockReturnValue({ id: null });
      jest.spyOn(crbComplaintTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbComplaintType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbComplaintType }));
      saveSubject.complete();

      // THEN
      expect(crbComplaintTypeFormService.getCrbComplaintType).toHaveBeenCalled();
      expect(crbComplaintTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbComplaintType>>();
      const crbComplaintType = { id: 123 };
      jest.spyOn(crbComplaintTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbComplaintType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crbComplaintTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

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

import { CrbSourceOfInformationTypeFormService } from './crb-source-of-information-type-form.service';
import { CrbSourceOfInformationTypeService } from '../service/crb-source-of-information-type.service';
import { ICrbSourceOfInformationType } from '../crb-source-of-information-type.model';

import { CrbSourceOfInformationTypeUpdateComponent } from './crb-source-of-information-type-update.component';

describe('CrbSourceOfInformationType Management Update Component', () => {
  let comp: CrbSourceOfInformationTypeUpdateComponent;
  let fixture: ComponentFixture<CrbSourceOfInformationTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crbSourceOfInformationTypeFormService: CrbSourceOfInformationTypeFormService;
  let crbSourceOfInformationTypeService: CrbSourceOfInformationTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrbSourceOfInformationTypeUpdateComponent],
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
      .overrideTemplate(CrbSourceOfInformationTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrbSourceOfInformationTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crbSourceOfInformationTypeFormService = TestBed.inject(CrbSourceOfInformationTypeFormService);
    crbSourceOfInformationTypeService = TestBed.inject(CrbSourceOfInformationTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crbSourceOfInformationType: ICrbSourceOfInformationType = { id: 456 };

      activatedRoute.data = of({ crbSourceOfInformationType });
      comp.ngOnInit();

      expect(comp.crbSourceOfInformationType).toEqual(crbSourceOfInformationType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbSourceOfInformationType>>();
      const crbSourceOfInformationType = { id: 123 };
      jest.spyOn(crbSourceOfInformationTypeFormService, 'getCrbSourceOfInformationType').mockReturnValue(crbSourceOfInformationType);
      jest.spyOn(crbSourceOfInformationTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbSourceOfInformationType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbSourceOfInformationType }));
      saveSubject.complete();

      // THEN
      expect(crbSourceOfInformationTypeFormService.getCrbSourceOfInformationType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crbSourceOfInformationTypeService.update).toHaveBeenCalledWith(expect.objectContaining(crbSourceOfInformationType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbSourceOfInformationType>>();
      const crbSourceOfInformationType = { id: 123 };
      jest.spyOn(crbSourceOfInformationTypeFormService, 'getCrbSourceOfInformationType').mockReturnValue({ id: null });
      jest.spyOn(crbSourceOfInformationTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbSourceOfInformationType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbSourceOfInformationType }));
      saveSubject.complete();

      // THEN
      expect(crbSourceOfInformationTypeFormService.getCrbSourceOfInformationType).toHaveBeenCalled();
      expect(crbSourceOfInformationTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbSourceOfInformationType>>();
      const crbSourceOfInformationType = { id: 123 };
      jest.spyOn(crbSourceOfInformationTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbSourceOfInformationType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crbSourceOfInformationTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

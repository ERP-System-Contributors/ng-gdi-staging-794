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

import { CrbDataSubmittingInstitutionsFormService } from './crb-data-submitting-institutions-form.service';
import { CrbDataSubmittingInstitutionsService } from '../service/crb-data-submitting-institutions.service';
import { ICrbDataSubmittingInstitutions } from '../crb-data-submitting-institutions.model';

import { CrbDataSubmittingInstitutionsUpdateComponent } from './crb-data-submitting-institutions-update.component';

describe('CrbDataSubmittingInstitutions Management Update Component', () => {
  let comp: CrbDataSubmittingInstitutionsUpdateComponent;
  let fixture: ComponentFixture<CrbDataSubmittingInstitutionsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crbDataSubmittingInstitutionsFormService: CrbDataSubmittingInstitutionsFormService;
  let crbDataSubmittingInstitutionsService: CrbDataSubmittingInstitutionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrbDataSubmittingInstitutionsUpdateComponent],
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
      .overrideTemplate(CrbDataSubmittingInstitutionsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrbDataSubmittingInstitutionsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crbDataSubmittingInstitutionsFormService = TestBed.inject(CrbDataSubmittingInstitutionsFormService);
    crbDataSubmittingInstitutionsService = TestBed.inject(CrbDataSubmittingInstitutionsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crbDataSubmittingInstitutions: ICrbDataSubmittingInstitutions = { id: 456 };

      activatedRoute.data = of({ crbDataSubmittingInstitutions });
      comp.ngOnInit();

      expect(comp.crbDataSubmittingInstitutions).toEqual(crbDataSubmittingInstitutions);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbDataSubmittingInstitutions>>();
      const crbDataSubmittingInstitutions = { id: 123 };
      jest
        .spyOn(crbDataSubmittingInstitutionsFormService, 'getCrbDataSubmittingInstitutions')
        .mockReturnValue(crbDataSubmittingInstitutions);
      jest.spyOn(crbDataSubmittingInstitutionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbDataSubmittingInstitutions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbDataSubmittingInstitutions }));
      saveSubject.complete();

      // THEN
      expect(crbDataSubmittingInstitutionsFormService.getCrbDataSubmittingInstitutions).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crbDataSubmittingInstitutionsService.update).toHaveBeenCalledWith(expect.objectContaining(crbDataSubmittingInstitutions));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbDataSubmittingInstitutions>>();
      const crbDataSubmittingInstitutions = { id: 123 };
      jest.spyOn(crbDataSubmittingInstitutionsFormService, 'getCrbDataSubmittingInstitutions').mockReturnValue({ id: null });
      jest.spyOn(crbDataSubmittingInstitutionsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbDataSubmittingInstitutions: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbDataSubmittingInstitutions }));
      saveSubject.complete();

      // THEN
      expect(crbDataSubmittingInstitutionsFormService.getCrbDataSubmittingInstitutions).toHaveBeenCalled();
      expect(crbDataSubmittingInstitutionsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbDataSubmittingInstitutions>>();
      const crbDataSubmittingInstitutions = { id: 123 };
      jest.spyOn(crbDataSubmittingInstitutionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbDataSubmittingInstitutions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crbDataSubmittingInstitutionsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

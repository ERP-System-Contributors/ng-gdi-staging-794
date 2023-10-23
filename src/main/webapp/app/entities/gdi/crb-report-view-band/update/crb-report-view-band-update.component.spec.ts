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

import { CrbReportViewBandFormService } from './crb-report-view-band-form.service';
import { CrbReportViewBandService } from '../service/crb-report-view-band.service';
import { ICrbReportViewBand } from '../crb-report-view-band.model';

import { CrbReportViewBandUpdateComponent } from './crb-report-view-band-update.component';

describe('CrbReportViewBand Management Update Component', () => {
  let comp: CrbReportViewBandUpdateComponent;
  let fixture: ComponentFixture<CrbReportViewBandUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crbReportViewBandFormService: CrbReportViewBandFormService;
  let crbReportViewBandService: CrbReportViewBandService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrbReportViewBandUpdateComponent],
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
      .overrideTemplate(CrbReportViewBandUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrbReportViewBandUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crbReportViewBandFormService = TestBed.inject(CrbReportViewBandFormService);
    crbReportViewBandService = TestBed.inject(CrbReportViewBandService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crbReportViewBand: ICrbReportViewBand = { id: 456 };

      activatedRoute.data = of({ crbReportViewBand });
      comp.ngOnInit();

      expect(comp.crbReportViewBand).toEqual(crbReportViewBand);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbReportViewBand>>();
      const crbReportViewBand = { id: 123 };
      jest.spyOn(crbReportViewBandFormService, 'getCrbReportViewBand').mockReturnValue(crbReportViewBand);
      jest.spyOn(crbReportViewBandService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbReportViewBand });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbReportViewBand }));
      saveSubject.complete();

      // THEN
      expect(crbReportViewBandFormService.getCrbReportViewBand).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crbReportViewBandService.update).toHaveBeenCalledWith(expect.objectContaining(crbReportViewBand));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbReportViewBand>>();
      const crbReportViewBand = { id: 123 };
      jest.spyOn(crbReportViewBandFormService, 'getCrbReportViewBand').mockReturnValue({ id: null });
      jest.spyOn(crbReportViewBandService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbReportViewBand: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbReportViewBand }));
      saveSubject.complete();

      // THEN
      expect(crbReportViewBandFormService.getCrbReportViewBand).toHaveBeenCalled();
      expect(crbReportViewBandService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbReportViewBand>>();
      const crbReportViewBand = { id: 123 };
      jest.spyOn(crbReportViewBandService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbReportViewBand });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crbReportViewBandService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

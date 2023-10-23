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

import { CrbCreditApplicationStatusFormService } from './crb-credit-application-status-form.service';
import { CrbCreditApplicationStatusService } from '../service/crb-credit-application-status.service';
import { ICrbCreditApplicationStatus } from '../crb-credit-application-status.model';

import { CrbCreditApplicationStatusUpdateComponent } from './crb-credit-application-status-update.component';

describe('CrbCreditApplicationStatus Management Update Component', () => {
  let comp: CrbCreditApplicationStatusUpdateComponent;
  let fixture: ComponentFixture<CrbCreditApplicationStatusUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crbCreditApplicationStatusFormService: CrbCreditApplicationStatusFormService;
  let crbCreditApplicationStatusService: CrbCreditApplicationStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrbCreditApplicationStatusUpdateComponent],
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
      .overrideTemplate(CrbCreditApplicationStatusUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrbCreditApplicationStatusUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crbCreditApplicationStatusFormService = TestBed.inject(CrbCreditApplicationStatusFormService);
    crbCreditApplicationStatusService = TestBed.inject(CrbCreditApplicationStatusService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crbCreditApplicationStatus: ICrbCreditApplicationStatus = { id: 456 };

      activatedRoute.data = of({ crbCreditApplicationStatus });
      comp.ngOnInit();

      expect(comp.crbCreditApplicationStatus).toEqual(crbCreditApplicationStatus);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbCreditApplicationStatus>>();
      const crbCreditApplicationStatus = { id: 123 };
      jest.spyOn(crbCreditApplicationStatusFormService, 'getCrbCreditApplicationStatus').mockReturnValue(crbCreditApplicationStatus);
      jest.spyOn(crbCreditApplicationStatusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbCreditApplicationStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbCreditApplicationStatus }));
      saveSubject.complete();

      // THEN
      expect(crbCreditApplicationStatusFormService.getCrbCreditApplicationStatus).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crbCreditApplicationStatusService.update).toHaveBeenCalledWith(expect.objectContaining(crbCreditApplicationStatus));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbCreditApplicationStatus>>();
      const crbCreditApplicationStatus = { id: 123 };
      jest.spyOn(crbCreditApplicationStatusFormService, 'getCrbCreditApplicationStatus').mockReturnValue({ id: null });
      jest.spyOn(crbCreditApplicationStatusService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbCreditApplicationStatus: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbCreditApplicationStatus }));
      saveSubject.complete();

      // THEN
      expect(crbCreditApplicationStatusFormService.getCrbCreditApplicationStatus).toHaveBeenCalled();
      expect(crbCreditApplicationStatusService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbCreditApplicationStatus>>();
      const crbCreditApplicationStatus = { id: 123 };
      jest.spyOn(crbCreditApplicationStatusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbCreditApplicationStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crbCreditApplicationStatusService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

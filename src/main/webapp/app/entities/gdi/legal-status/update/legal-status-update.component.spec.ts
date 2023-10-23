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

import { LegalStatusFormService } from './legal-status-form.service';
import { LegalStatusService } from '../service/legal-status.service';
import { ILegalStatus } from '../legal-status.model';

import { LegalStatusUpdateComponent } from './legal-status-update.component';

describe('LegalStatus Management Update Component', () => {
  let comp: LegalStatusUpdateComponent;
  let fixture: ComponentFixture<LegalStatusUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let legalStatusFormService: LegalStatusFormService;
  let legalStatusService: LegalStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [LegalStatusUpdateComponent],
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
      .overrideTemplate(LegalStatusUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LegalStatusUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    legalStatusFormService = TestBed.inject(LegalStatusFormService);
    legalStatusService = TestBed.inject(LegalStatusService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const legalStatus: ILegalStatus = { id: 456 };

      activatedRoute.data = of({ legalStatus });
      comp.ngOnInit();

      expect(comp.legalStatus).toEqual(legalStatus);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILegalStatus>>();
      const legalStatus = { id: 123 };
      jest.spyOn(legalStatusFormService, 'getLegalStatus').mockReturnValue(legalStatus);
      jest.spyOn(legalStatusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ legalStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: legalStatus }));
      saveSubject.complete();

      // THEN
      expect(legalStatusFormService.getLegalStatus).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(legalStatusService.update).toHaveBeenCalledWith(expect.objectContaining(legalStatus));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILegalStatus>>();
      const legalStatus = { id: 123 };
      jest.spyOn(legalStatusFormService, 'getLegalStatus').mockReturnValue({ id: null });
      jest.spyOn(legalStatusService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ legalStatus: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: legalStatus }));
      saveSubject.complete();

      // THEN
      expect(legalStatusFormService.getLegalStatus).toHaveBeenCalled();
      expect(legalStatusService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILegalStatus>>();
      const legalStatus = { id: 123 };
      jest.spyOn(legalStatusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ legalStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(legalStatusService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

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

import { AcquiringIssuingFlagFormService } from './acquiring-issuing-flag-form.service';
import { AcquiringIssuingFlagService } from '../service/acquiring-issuing-flag.service';
import { IAcquiringIssuingFlag } from '../acquiring-issuing-flag.model';

import { AcquiringIssuingFlagUpdateComponent } from './acquiring-issuing-flag-update.component';

describe('AcquiringIssuingFlag Management Update Component', () => {
  let comp: AcquiringIssuingFlagUpdateComponent;
  let fixture: ComponentFixture<AcquiringIssuingFlagUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let acquiringIssuingFlagFormService: AcquiringIssuingFlagFormService;
  let acquiringIssuingFlagService: AcquiringIssuingFlagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AcquiringIssuingFlagUpdateComponent],
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
      .overrideTemplate(AcquiringIssuingFlagUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AcquiringIssuingFlagUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    acquiringIssuingFlagFormService = TestBed.inject(AcquiringIssuingFlagFormService);
    acquiringIssuingFlagService = TestBed.inject(AcquiringIssuingFlagService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const acquiringIssuingFlag: IAcquiringIssuingFlag = { id: 456 };

      activatedRoute.data = of({ acquiringIssuingFlag });
      comp.ngOnInit();

      expect(comp.acquiringIssuingFlag).toEqual(acquiringIssuingFlag);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAcquiringIssuingFlag>>();
      const acquiringIssuingFlag = { id: 123 };
      jest.spyOn(acquiringIssuingFlagFormService, 'getAcquiringIssuingFlag').mockReturnValue(acquiringIssuingFlag);
      jest.spyOn(acquiringIssuingFlagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ acquiringIssuingFlag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: acquiringIssuingFlag }));
      saveSubject.complete();

      // THEN
      expect(acquiringIssuingFlagFormService.getAcquiringIssuingFlag).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(acquiringIssuingFlagService.update).toHaveBeenCalledWith(expect.objectContaining(acquiringIssuingFlag));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAcquiringIssuingFlag>>();
      const acquiringIssuingFlag = { id: 123 };
      jest.spyOn(acquiringIssuingFlagFormService, 'getAcquiringIssuingFlag').mockReturnValue({ id: null });
      jest.spyOn(acquiringIssuingFlagService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ acquiringIssuingFlag: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: acquiringIssuingFlag }));
      saveSubject.complete();

      // THEN
      expect(acquiringIssuingFlagFormService.getAcquiringIssuingFlag).toHaveBeenCalled();
      expect(acquiringIssuingFlagService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAcquiringIssuingFlag>>();
      const acquiringIssuingFlag = { id: 123 };
      jest.spyOn(acquiringIssuingFlagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ acquiringIssuingFlag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(acquiringIssuingFlagService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

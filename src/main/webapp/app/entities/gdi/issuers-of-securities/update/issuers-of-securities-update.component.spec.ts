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

import { IssuersOfSecuritiesFormService } from './issuers-of-securities-form.service';
import { IssuersOfSecuritiesService } from '../service/issuers-of-securities.service';
import { IIssuersOfSecurities } from '../issuers-of-securities.model';

import { IssuersOfSecuritiesUpdateComponent } from './issuers-of-securities-update.component';

describe('IssuersOfSecurities Management Update Component', () => {
  let comp: IssuersOfSecuritiesUpdateComponent;
  let fixture: ComponentFixture<IssuersOfSecuritiesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let issuersOfSecuritiesFormService: IssuersOfSecuritiesFormService;
  let issuersOfSecuritiesService: IssuersOfSecuritiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [IssuersOfSecuritiesUpdateComponent],
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
      .overrideTemplate(IssuersOfSecuritiesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(IssuersOfSecuritiesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    issuersOfSecuritiesFormService = TestBed.inject(IssuersOfSecuritiesFormService);
    issuersOfSecuritiesService = TestBed.inject(IssuersOfSecuritiesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const issuersOfSecurities: IIssuersOfSecurities = { id: 456 };

      activatedRoute.data = of({ issuersOfSecurities });
      comp.ngOnInit();

      expect(comp.issuersOfSecurities).toEqual(issuersOfSecurities);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIssuersOfSecurities>>();
      const issuersOfSecurities = { id: 123 };
      jest.spyOn(issuersOfSecuritiesFormService, 'getIssuersOfSecurities').mockReturnValue(issuersOfSecurities);
      jest.spyOn(issuersOfSecuritiesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ issuersOfSecurities });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: issuersOfSecurities }));
      saveSubject.complete();

      // THEN
      expect(issuersOfSecuritiesFormService.getIssuersOfSecurities).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(issuersOfSecuritiesService.update).toHaveBeenCalledWith(expect.objectContaining(issuersOfSecurities));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIssuersOfSecurities>>();
      const issuersOfSecurities = { id: 123 };
      jest.spyOn(issuersOfSecuritiesFormService, 'getIssuersOfSecurities').mockReturnValue({ id: null });
      jest.spyOn(issuersOfSecuritiesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ issuersOfSecurities: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: issuersOfSecurities }));
      saveSubject.complete();

      // THEN
      expect(issuersOfSecuritiesFormService.getIssuersOfSecurities).toHaveBeenCalled();
      expect(issuersOfSecuritiesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIssuersOfSecurities>>();
      const issuersOfSecurities = { id: 123 };
      jest.spyOn(issuersOfSecuritiesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ issuersOfSecurities });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(issuersOfSecuritiesService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

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

import { BusinessSegmentTypesFormService } from './business-segment-types-form.service';
import { BusinessSegmentTypesService } from '../service/business-segment-types.service';
import { IBusinessSegmentTypes } from '../business-segment-types.model';

import { BusinessSegmentTypesUpdateComponent } from './business-segment-types-update.component';

describe('BusinessSegmentTypes Management Update Component', () => {
  let comp: BusinessSegmentTypesUpdateComponent;
  let fixture: ComponentFixture<BusinessSegmentTypesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let businessSegmentTypesFormService: BusinessSegmentTypesFormService;
  let businessSegmentTypesService: BusinessSegmentTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [BusinessSegmentTypesUpdateComponent],
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
      .overrideTemplate(BusinessSegmentTypesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BusinessSegmentTypesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    businessSegmentTypesFormService = TestBed.inject(BusinessSegmentTypesFormService);
    businessSegmentTypesService = TestBed.inject(BusinessSegmentTypesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const businessSegmentTypes: IBusinessSegmentTypes = { id: 456 };

      activatedRoute.data = of({ businessSegmentTypes });
      comp.ngOnInit();

      expect(comp.businessSegmentTypes).toEqual(businessSegmentTypes);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBusinessSegmentTypes>>();
      const businessSegmentTypes = { id: 123 };
      jest.spyOn(businessSegmentTypesFormService, 'getBusinessSegmentTypes').mockReturnValue(businessSegmentTypes);
      jest.spyOn(businessSegmentTypesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ businessSegmentTypes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: businessSegmentTypes }));
      saveSubject.complete();

      // THEN
      expect(businessSegmentTypesFormService.getBusinessSegmentTypes).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(businessSegmentTypesService.update).toHaveBeenCalledWith(expect.objectContaining(businessSegmentTypes));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBusinessSegmentTypes>>();
      const businessSegmentTypes = { id: 123 };
      jest.spyOn(businessSegmentTypesFormService, 'getBusinessSegmentTypes').mockReturnValue({ id: null });
      jest.spyOn(businessSegmentTypesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ businessSegmentTypes: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: businessSegmentTypes }));
      saveSubject.complete();

      // THEN
      expect(businessSegmentTypesFormService.getBusinessSegmentTypes).toHaveBeenCalled();
      expect(businessSegmentTypesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBusinessSegmentTypes>>();
      const businessSegmentTypes = { id: 123 };
      jest.spyOn(businessSegmentTypesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ businessSegmentTypes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(businessSegmentTypesService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

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

import { CrbNatureOfInformationFormService } from './crb-nature-of-information-form.service';
import { CrbNatureOfInformationService } from '../service/crb-nature-of-information.service';
import { ICrbNatureOfInformation } from '../crb-nature-of-information.model';

import { CrbNatureOfInformationUpdateComponent } from './crb-nature-of-information-update.component';

describe('CrbNatureOfInformation Management Update Component', () => {
  let comp: CrbNatureOfInformationUpdateComponent;
  let fixture: ComponentFixture<CrbNatureOfInformationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crbNatureOfInformationFormService: CrbNatureOfInformationFormService;
  let crbNatureOfInformationService: CrbNatureOfInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrbNatureOfInformationUpdateComponent],
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
      .overrideTemplate(CrbNatureOfInformationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrbNatureOfInformationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crbNatureOfInformationFormService = TestBed.inject(CrbNatureOfInformationFormService);
    crbNatureOfInformationService = TestBed.inject(CrbNatureOfInformationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crbNatureOfInformation: ICrbNatureOfInformation = { id: 456 };

      activatedRoute.data = of({ crbNatureOfInformation });
      comp.ngOnInit();

      expect(comp.crbNatureOfInformation).toEqual(crbNatureOfInformation);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbNatureOfInformation>>();
      const crbNatureOfInformation = { id: 123 };
      jest.spyOn(crbNatureOfInformationFormService, 'getCrbNatureOfInformation').mockReturnValue(crbNatureOfInformation);
      jest.spyOn(crbNatureOfInformationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbNatureOfInformation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbNatureOfInformation }));
      saveSubject.complete();

      // THEN
      expect(crbNatureOfInformationFormService.getCrbNatureOfInformation).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crbNatureOfInformationService.update).toHaveBeenCalledWith(expect.objectContaining(crbNatureOfInformation));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbNatureOfInformation>>();
      const crbNatureOfInformation = { id: 123 };
      jest.spyOn(crbNatureOfInformationFormService, 'getCrbNatureOfInformation').mockReturnValue({ id: null });
      jest.spyOn(crbNatureOfInformationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbNatureOfInformation: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crbNatureOfInformation }));
      saveSubject.complete();

      // THEN
      expect(crbNatureOfInformationFormService.getCrbNatureOfInformation).toHaveBeenCalled();
      expect(crbNatureOfInformationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrbNatureOfInformation>>();
      const crbNatureOfInformation = { id: 123 };
      jest.spyOn(crbNatureOfInformationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crbNatureOfInformation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crbNatureOfInformationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

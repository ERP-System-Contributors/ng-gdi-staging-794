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

import { IsoCountryCodeFormService } from './iso-country-code-form.service';
import { IsoCountryCodeService } from '../service/iso-country-code.service';
import { IIsoCountryCode } from '../iso-country-code.model';

import { IsoCountryCodeUpdateComponent } from './iso-country-code-update.component';

describe('IsoCountryCode Management Update Component', () => {
  let comp: IsoCountryCodeUpdateComponent;
  let fixture: ComponentFixture<IsoCountryCodeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let isoCountryCodeFormService: IsoCountryCodeFormService;
  let isoCountryCodeService: IsoCountryCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [IsoCountryCodeUpdateComponent],
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
      .overrideTemplate(IsoCountryCodeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(IsoCountryCodeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    isoCountryCodeFormService = TestBed.inject(IsoCountryCodeFormService);
    isoCountryCodeService = TestBed.inject(IsoCountryCodeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const isoCountryCode: IIsoCountryCode = { id: 456 };

      activatedRoute.data = of({ isoCountryCode });
      comp.ngOnInit();

      expect(comp.isoCountryCode).toEqual(isoCountryCode);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIsoCountryCode>>();
      const isoCountryCode = { id: 123 };
      jest.spyOn(isoCountryCodeFormService, 'getIsoCountryCode').mockReturnValue(isoCountryCode);
      jest.spyOn(isoCountryCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ isoCountryCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: isoCountryCode }));
      saveSubject.complete();

      // THEN
      expect(isoCountryCodeFormService.getIsoCountryCode).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(isoCountryCodeService.update).toHaveBeenCalledWith(expect.objectContaining(isoCountryCode));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIsoCountryCode>>();
      const isoCountryCode = { id: 123 };
      jest.spyOn(isoCountryCodeFormService, 'getIsoCountryCode').mockReturnValue({ id: null });
      jest.spyOn(isoCountryCodeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ isoCountryCode: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: isoCountryCode }));
      saveSubject.complete();

      // THEN
      expect(isoCountryCodeFormService.getIsoCountryCode).toHaveBeenCalled();
      expect(isoCountryCodeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIsoCountryCode>>();
      const isoCountryCode = { id: 123 };
      jest.spyOn(isoCountryCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ isoCountryCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(isoCountryCodeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
